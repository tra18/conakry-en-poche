import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  MapPin, 
  Settings, 
  ToggleLeft, 
  ToggleRight,
  Smartphone,
  Wifi,
  WifiOff
} from 'lucide-react';

const NotificationSystem = () => {
  const [permission, setPermission] = useState('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [locationPermission, setLocationPermission] = useState('default');
  const [geofencingEnabled, setGeofencingEnabled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({
    newBusinesses: true,
    promotions: true,
    nearbyOffers: true,
    bookingReminders: true,
    reviewRequests: false,
    weeklyDigest: true
  });

  useEffect(() => {
    checkNotificationPermission();
    checkLocationPermission();
    loadNotificationSettings();
  }, []);

  const checkNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = Notification.permission;
      setPermission(permission);
      
      if (permission === 'granted') {
        setIsSubscribed(true);
      }
    }
  };

  const checkLocationPermission = async () => {
    if ('geolocation' in navigator) {
      try {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        setLocationPermission(permission.state);
      } catch (error) {
        console.log('Location permission check failed:', error);
      }
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermission(permission);
      
      if (permission === 'granted') {
        setIsSubscribed(true);
        subscribeToNotifications();
      }
    }
  };

  const subscribeToNotifications = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY' // Replace with actual VAPID key
        });
        
        // Send subscription to server
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscription)
        });
        
        setIsSubscribed(true);
        showNotification('Notifications activées', 'Vous recevrez maintenant les notifications push');
      } catch (error) {
        console.error('Error subscribing to notifications:', error);
      }
    }
  };

  const unsubscribeFromNotifications = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        
        if (subscription) {
          await subscription.unsubscribe();
          
          // Notify server
          await fetch('/api/unsubscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscription)
          });
        }
        
        setIsSubscribed(false);
        showNotification('Notifications désactivées', 'Vous ne recevrez plus les notifications push');
      } catch (error) {
        console.error('Error unsubscribing from notifications:', error);
      }
    }
  };

  const requestLocationPermission = async () => {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
          });
        });
        
        setLocationPermission('granted');
        setGeofencingEnabled(true);
        showNotification('Géolocalisation activée', 'Vous recevrez des notifications basées sur votre position');
      } catch (error) {
        setLocationPermission('denied');
        showNotification('Géolocalisation refusée', 'Activez la géolocalisation pour recevoir des offres personnalisées');
      }
    }
  };

  const showNotification = (title, body) => {
    if (permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/logo192.png',
        badge: '/logo192.png',
        tag: 'conakry-en-poche'
      });
    }
  };

  const loadNotificationSettings = () => {
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const saveNotificationSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
  };

  const handleSettingChange = (setting, value) => {
    const newSettings = { ...settings, [setting]: value };
    saveNotificationSettings(newSettings);
  };

  const sendTestNotification = () => {
    showNotification(
      'Test de notification',
      'Si vous voyez ce message, les notifications fonctionnent correctement !'
    );
  };

  const getPermissionStatus = (permission) => {
    switch (permission) {
      case 'granted': return { text: 'Autorisé', color: 'text-green-400', icon: '✅' };
      case 'denied': return { text: 'Refusé', color: 'text-red-400', icon: '❌' };
      default: return { text: 'Non demandé', color: 'text-yellow-400', icon: '⚠️' };
    }
  };

  const notificationStatus = getPermissionStatus(permission);
  const locationStatus = getPermissionStatus(locationPermission);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Bell className="w-6 h-6 mr-2 text-blue-400" />
        Notifications
      </h3>

      {/* Notification Permission */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-white font-medium">Notifications Push</h4>
            <p className="text-white/70 text-sm">Recevez des notifications sur votre appareil</p>
          </div>
          <div className={`flex items-center space-x-2 ${notificationStatus.color}`}>
            <span>{notificationStatus.icon}</span>
            <span className="text-sm">{notificationStatus.text}</span>
          </div>
        </div>

        {permission === 'default' && (
          <button
            onClick={requestNotificationPermission}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-500/30 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span>Activer les notifications</span>
          </button>
        )}

        {permission === 'granted' && (
          <div className="flex space-x-3">
            <button
              onClick={isSubscribed ? unsubscribeFromNotifications : subscribeToNotifications}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-colors ${
                isSubscribed
                  ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30'
                  : 'bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30'
              }`}
            >
              {isSubscribed ? (
                <>
                  <Bell className="w-5 h-5" />
                  <span>Désactiver</span>
                </>
              ) : (
                <>
                  <Bell className="w-5 h-5" />
                  <span>Activer</span>
                </>
              )}
            </button>
            <button
              onClick={sendTestNotification}
              className="px-4 py-3 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-400 hover:bg-purple-500/30 transition-colors"
            >
              Test
            </button>
          </div>
        )}
      </div>

      {/* Location Permission */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-white font-medium">Géolocalisation</h4>
            <p className="text-white/70 text-sm">Notifications basées sur votre position</p>
          </div>
          <div className={`flex items-center space-x-2 ${locationStatus.color}`}>
            <span>{locationStatus.icon}</span>
            <span className="text-sm">{locationStatus.text}</span>
          </div>
        </div>

        {locationPermission === 'default' && (
          <button
            onClick={requestLocationPermission}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 hover:bg-green-500/30 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            <span>Activer la géolocalisation</span>
          </button>
        )}

        {locationPermission === 'granted' && (
          <div className="flex items-center justify-between">
            <span className="text-white/80">Géofencing activé</span>
            <button
              onClick={() => setGeofencingEnabled(!geofencingEnabled)}
              className={`flex items-center space-x-2 ${
                geofencingEnabled ? 'text-green-400' : 'text-gray-400'
              }`}
            >
              {geofencingEnabled ? (
                <ToggleRight className="w-6 h-6" />
              ) : (
                <ToggleLeft className="w-6 h-6" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="space-y-4">
        <h4 className="text-white font-medium flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Préférences
        </h4>

        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <span className="text-white/80 text-sm">
                {key === 'newBusinesses' && 'Nouvelles entreprises'}
                {key === 'promotions' && 'Promotions et offres'}
                {key === 'nearbyOffers' && 'Offres à proximité'}
                {key === 'bookingReminders' && 'Rappels de réservation'}
                {key === 'reviewRequests' && 'Demandes d\'avis'}
                {key === 'weeklyDigest' && 'Résumé hebdomadaire'}
              </span>
            </div>
            <button
              onClick={() => handleSettingChange(key, !value)}
              className={`flex items-center space-x-2 ${
                value ? 'text-green-400' : 'text-gray-400'
              }`}
            >
              {value ? (
                <ToggleRight className="w-6 h-6" />
              ) : (
                <ToggleLeft className="w-6 h-6" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Device Info */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <h4 className="text-white font-medium mb-3">Informations appareil</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between text-white/70">
            <span>Type d'appareil</span>
            <span className="flex items-center">
              <Smartphone className="w-4 h-4 mr-1" />
              Mobile
            </span>
          </div>
          <div className="flex items-center justify-between text-white/70">
            <span>Connexion</span>
            <span className="flex items-center">
              <Wifi className="w-4 h-4 mr-1 text-green-400" />
              En ligne
            </span>
          </div>
          <div className="flex items-center justify-between text-white/70">
            <span>PWA installée</span>
            <span className="text-green-400">✓</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSystem;
