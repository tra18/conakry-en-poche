import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const PushNotificationContext = createContext();

export function usePushNotification() {
  return useContext(PushNotificationContext);
}

export function PushNotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [permission, setPermission] = useState('default');
  const [subscription, setSubscription] = useState(null);
  const [settings, setSettings] = useState({
    newBusinesses: true,
    promotions: true,
    nearbyOffers: true,
    bookingReminders: true,
    reviewRequests: false,
    weeklyDigest: true,
    eventAlerts: true,
    trafficAlerts: true
  });
  const { currentUser } = useAuth();

  // Vérifier la permission au chargement
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
    loadSettings();
    if (currentUser) {
      loadNotifications();
    }
  }, [currentUser]);

  // Écouter les nouvelles notifications en temps réel
  useEffect(() => {
    if (!currentUser) return;

    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', currentUser.uid),
      where('read', '==', false)
    );

    try {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newNotifications = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNotifications(newNotifications);
        setUnreadCount(newNotifications.length);
      });

      return () => unsubscribe();
    } catch (error) {
      console.warn('Erreur Firebase, utilisation du mode local:', error);
      loadNotificationsFromLocal();
    }
  }, [currentUser]);

  // Charger les notifications
  const loadNotifications = async () => {
    try {
      if (!currentUser) {
        loadNotificationsFromLocal();
        return;
      }

      const notificationsRef = collection(db, 'notifications');
      const q = query(
        notificationsRef,
        where('userId', '==', currentUser.uid),
        where('read', '==', false)
      );

      const querySnapshot = await getDocs(q);
      const notificationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setNotifications(notificationsData);
      setUnreadCount(notificationsData.length);
      localStorage.setItem('notifications', JSON.stringify(notificationsData));
    } catch (error) {
      console.warn('Erreur Firebase, utilisation du mode local:', error);
      loadNotificationsFromLocal();
    }
  };

  const loadNotificationsFromLocal = () => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      const notificationsData = JSON.parse(savedNotifications);
      setNotifications(notificationsData);
      setUnreadCount(notificationsData.filter(n => !n.read).length);
    }
  };

  // Demander la permission
  const requestPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('Votre navigateur ne supporte pas les notifications');
      return false;
    }

    const permission = await Notification.requestPermission();
    setPermission(permission);

    if (permission === 'granted') {
      toast.success('Notifications activées !');
      await subscribeToPush();
      return true;
    } else {
      toast.error('Notifications refusées');
      return false;
    }
  };

  // S'abonner aux notifications push
  const subscribeToPush = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.REACT_APP_VAPID_PUBLIC_KEY || 'DEMO_KEY'
          )
        });

        setSubscription(sub);

        // Sauvegarder l'abonnement
        if (currentUser) {
          try {
            await addDoc(collection(db, 'pushSubscriptions'), {
              userId: currentUser.uid,
              subscription: sub.toJSON(),
              createdAt: new Date().toISOString()
            });
          } catch (error) {
            console.warn('Erreur Firebase:', error);
          }
        }

        // Sauvegarder en local
        localStorage.setItem('pushSubscription', JSON.stringify(sub.toJSON()));
        return true;
      } catch (error) {
        console.error('Erreur lors de l\'abonnement:', error);
        toast.error('Erreur lors de l\'activation des notifications push');
        return false;
      }
    }
    return false;
  };

  // Se désabonner
  const unsubscribeFromPush = async () => {
    if (subscription) {
      try {
        await subscription.unsubscribe();
        setSubscription(null);
        localStorage.removeItem('pushSubscription');
        toast.success('Notifications push désactivées');
      } catch (error) {
        console.error('Erreur lors du désabonnement:', error);
      }
    }
  };

  // Créer une notification
  const createNotification = async (notificationData) => {
    const notification = {
      ...notificationData,
      userId: currentUser?.uid || 'anonymous',
      read: false,
      createdAt: new Date().toISOString(),
      type: notificationData.type || 'info'
    };

    // Afficher la notification navigateur si permission accordée
    if (permission === 'granted') {
      showBrowserNotification(notification.title, notification.body, notification.icon);
    }

    // Sauvegarder dans Firebase
    if (currentUser) {
      try {
        await addDoc(collection(db, 'notifications'), notification);
      } catch (error) {
        console.warn('Erreur Firebase, utilisation du mode local:', error);
      }
    }

    // Sauvegarder en local
    const newNotifications = [...notifications, { ...notification, id: Date.now().toString() }];
    setNotifications(newNotifications);
    setUnreadCount(prev => prev + 1);
    localStorage.setItem('notifications', JSON.stringify(newNotifications));

    toast.success(notification.title);
  };

  // Marquer comme lu
  const markAsRead = async (notificationId) => {
    if (currentUser) {
      try {
        await updateDoc(doc(db, 'notifications', notificationId), {
          read: true,
          readAt: new Date().toISOString()
        });
      } catch (error) {
        console.warn('Erreur Firebase:', error);
      }
    }

    const updatedNotifications = notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    setUnreadCount(prev => Math.max(0, prev - 1));
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  // Marquer toutes comme lues
  const markAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.read).map(n => n.id);

    if (currentUser) {
      for (const id of unreadIds) {
        try {
          await updateDoc(doc(db, 'notifications', id), {
            read: true,
            readAt: new Date().toISOString()
          });
        } catch (error) {
          console.warn('Erreur Firebase:', error);
        }
      }
    }

    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  // Supprimer une notification
  const deleteNotification = async (notificationId) => {
    if (currentUser) {
      try {
        await deleteDoc(doc(db, 'notifications', notificationId));
      } catch (error) {
        console.warn('Erreur Firebase:', error);
      }
    }

    const updatedNotifications = notifications.filter(n => n.id !== notificationId);
    setNotifications(updatedNotifications);
    setUnreadCount(prev => {
      const deleted = notifications.find(n => n.id === notificationId);
      return deleted && !deleted.read ? Math.max(0, prev - 1) : prev;
    });
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  // Afficher une notification navigateur
  const showBrowserNotification = (title, body, icon = '/logo192.png') => {
    if (permission === 'granted') {
      new Notification(title, {
        body,
        icon,
        badge: '/logo192.png',
        tag: 'conakry-en-poche',
        requireInteraction: false
      });
    }
  };

  // Notifications automatiques selon les préférences
  const sendNotificationIfEnabled = (type, title, body, icon) => {
    if (settings[type] !== false) {
      createNotification({
        type,
        title,
        body,
        icon
      });
    }
  };

  // 1. Notifier les nouvelles entreprises validées
  const notifyNewBusiness = (business) => {
    if (settings.newBusinesses) {
      const categoryIcons = {
        restaurants: '🍽️',
        hotels: '🏨',
        pharmacies: '💊',
        hopitaux: '🏥',
        banques: '🏦',
        ecoles: '🎓',
        universites: '🏛️',
        transport: '🚌',
        shopping: '🛍️',
        loisirs: '🎮',
        sport: '⚽',
        beaute: '💄',
        automobile: '🚗',
        administration: '🏛️',
        services: '🔧'
      };
      
      createNotification({
        type: 'newBusinesses',
        title: `Nouvelle entreprise : ${business.name}`,
        body: `${business.category ? categoryIcons[business.category] || '🏢' : '🏢'} ${business.address || 'Conakry'}`,
        icon: '/logo192.png',
        data: {
          businessId: business.id,
          category: business.category,
          action: 'view_business'
        }
      });
    }
  };

  // 2. Notifier les promotions et offres spéciales
  const notifyPromotion = (promotion) => {
    if (settings.promotions) {
      createNotification({
        type: 'promotions',
        title: promotion.title || 'Nouvelle promotion !',
        body: promotion.description || promotion.discount || 'Profitez de cette offre spéciale',
        icon: '/logo192.png',
        data: {
          promotionId: promotion.id,
          businessId: promotion.businessId,
          action: 'view_promotion'
        }
      });
    }
  };

  // 3. Rappels de réservations
  const notifyBookingReminder = (booking) => {
    if (settings.bookingReminders) {
      const bookingDate = new Date(booking.date);
      const now = new Date();
      const hoursUntilBooking = (bookingDate - now) / (1000 * 60 * 60);
      
      // Notifier 24h avant
      if (hoursUntilBooking <= 24 && hoursUntilBooking > 23) {
        createNotification({
          type: 'bookingReminders',
          title: 'Rappel : Réservation demain',
          body: `${booking.businessName || 'Votre réservation'} - ${booking.date ? new Date(booking.date).toLocaleDateString('fr-FR') : ''}`,
          icon: '/logo192.png',
          data: {
            bookingId: booking.id,
            action: 'view_booking'
          }
        });
      }
      
      // Notifier 2h avant
      if (hoursUntilBooking <= 2 && hoursUntilBooking > 1) {
        createNotification({
          type: 'bookingReminders',
          title: 'Rappel : Réservation dans 2h',
          body: `${booking.businessName || 'Votre réservation'} - ${booking.time || ''}`,
          icon: '/logo192.png',
          data: {
            bookingId: booking.id,
            action: 'view_booking'
          }
        });
      }
    }
  };

  // 4. Alertes trafic personnalisées
  const notifyTrafficAlert = (trafficData) => {
    if (settings.trafficAlerts) {
      const { area, level, message } = trafficData;
      const levelEmojis = {
        heavy: '🔴',
        moderate: '🟡',
        light: '🟢'
      };
      
      createNotification({
        type: 'trafficAlerts',
        title: `Trafic ${level === 'heavy' ? 'dense' : level === 'moderate' ? 'modéré' : 'fluide'} : ${area}`,
        body: message || `Conditions de trafic ${level === 'heavy' ? 'difficiles' : level === 'moderate' ? 'modérées' : 'normales'} dans cette zone`,
        icon: '/logo192.png',
        data: {
          area,
          level,
          action: 'view_traffic'
        }
      });
    }
  };

  // Vérifier les rappels de réservations toutes les heures
  useEffect(() => {
    if (!currentUser || !settings.bookingReminders) return;

    const checkBookingReminders = async () => {
      try {
        // Charger les réservations depuis localStorage ou Firebase
        const savedBookings = localStorage.getItem('bookings');
        if (savedBookings) {
          const bookings = JSON.parse(savedBookings);
          const upcomingBookings = bookings.filter(b => {
            if (!b.date) return false;
            const bookingDate = new Date(b.date);
            const now = new Date();
            const hoursUntilBooking = (bookingDate - now) / (1000 * 60 * 60);
            return hoursUntilBooking > 0 && hoursUntilBooking <= 24 && b.status !== 'cancelled';
          });

          upcomingBookings.forEach(booking => {
            notifyBookingReminder(booking);
          });
        }
      } catch (error) {
        console.warn('Erreur lors de la vérification des rappels:', error);
      }
    };

    // Vérifier immédiatement
    checkBookingReminders();

    // Vérifier toutes les heures
    const interval = setInterval(checkBookingReminders, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [currentUser, settings.bookingReminders]);

  // Charger les paramètres
  const loadSettings = () => {
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  // Sauvegarder les paramètres
  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
  };

  // Fonction utilitaire pour convertir la clé VAPID
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const value = {
    notifications,
    unreadCount,
    permission,
    subscription,
    settings,
    requestPermission,
    subscribeToPush,
    unsubscribeFromPush,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    showBrowserNotification,
    sendNotificationIfEnabled,
    saveSettings,
    loadNotifications,
    // Nouvelles fonctions de notifications spécifiques
    notifyNewBusiness,
    notifyPromotion,
    notifyBookingReminder,
    notifyTrafficAlert
  };

  return (
    <PushNotificationContext.Provider value={value}>
      {children}
    </PushNotificationContext.Provider>
  );
}

