import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { usePushNotification } from './PushNotificationContext';
import toast from 'react-hot-toast';

const BookingContext = createContext();

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  // Note: On ne peut pas utiliser usePushNotification ici car il serait dans un autre provider
  // Les notifications seront gérées via le contexte directement

  // Charger les réservations
  useEffect(() => {
    if (currentUser) {
      loadBookings();
    }
  }, [currentUser]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      if (!currentUser) {
        loadBookingsFromLocal();
        return;
      }

      const bookingsRef = collection(db, 'bookings');
      const q = query(
        bookingsRef,
        where('userId', '==', currentUser.uid),
        orderBy('date', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const bookingsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setBookings(bookingsData);
      localStorage.setItem('bookings', JSON.stringify(bookingsData));
    } catch (error) {
      console.warn('Erreur Firebase, utilisation du mode local:', error);
      loadBookingsFromLocal();
    } finally {
      setLoading(false);
    }
  };

  const loadBookingsFromLocal = () => {
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  };

  // Créer une réservation
  const createBooking = async (bookingData) => {
    try {
      setLoading(true);
      
      const booking = {
        ...bookingData,
        userId: currentUser?.uid || 'anonymous',
        userName: currentUser?.displayName || currentUser?.email || 'Utilisateur',
        userEmail: currentUser?.email || '',
        status: 'pending', // pending, confirmed, cancelled, completed
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (currentUser) {
        try {
          const docRef = await addDoc(collection(db, 'bookings'), booking);
          booking.id = docRef.id;
        } catch (error) {
          console.warn('Erreur Firebase, utilisation du mode local:', error);
          booking.id = `local_${Date.now()}`;
        }
      } else {
        booking.id = `local_${Date.now()}`;
      }

      // Sauvegarder en local
      const newBookings = [booking, ...bookings];
      setBookings(newBookings);
      localStorage.setItem('bookings', JSON.stringify(newBookings));

      // La notification sera gérée par le PushNotificationContext séparément

      toast.success('Réservation créée avec succès !');
      return booking;
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      toast.error('Erreur lors de la création de la réservation');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Annuler une réservation
  const cancelBooking = async (bookingId) => {
    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) return;

      if (currentUser && booking.id && !booking.id.startsWith('local_')) {
        try {
          await updateDoc(doc(db, 'bookings', bookingId), {
            status: 'cancelled',
            updatedAt: new Date().toISOString(),
            cancelledAt: new Date().toISOString()
          });
        } catch (error) {
          console.warn('Erreur Firebase:', error);
        }
      }

      const updatedBookings = bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'cancelled', cancelledAt: new Date().toISOString() } : b
      );
      setBookings(updatedBookings);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));

      // La notification sera gérée par le PushNotificationContext

      toast.success('Réservation annulée');
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
      toast.error('Erreur lors de l\'annulation');
    }
  };

  // Mettre à jour le statut d'une réservation
  const updateBookingStatus = async (bookingId, status) => {
    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) return;

      if (currentUser && booking.id && !booking.id.startsWith('local_')) {
        try {
          await updateDoc(doc(db, 'bookings', bookingId), {
            status,
            updatedAt: new Date().toISOString()
          });
        } catch (error) {
          console.warn('Erreur Firebase:', error);
        }
      }

      const updatedBookings = bookings.map(b =>
        b.id === bookingId ? { ...b, status, updatedAt: new Date().toISOString() } : b
      );
      setBookings(updatedBookings);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));

      // La notification sera gérée par le PushNotificationContext

      toast.success('Statut mis à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  // Obtenir les réservations à venir
  const getUpcomingBookings = () => {
    const now = new Date();
    return bookings.filter(booking => {
      if (booking.status === 'cancelled') return false;
      const bookingDate = new Date(`${booking.date}T${booking.time}`);
      return bookingDate > now;
    }).sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });
  };

  // Obtenir les réservations passées
  const getPastBookings = () => {
    const now = new Date();
    return bookings.filter(booking => {
      const bookingDate = new Date(`${booking.date}T${booking.time}`);
      return bookingDate < now || booking.status === 'completed';
    }).sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB - dateA;
    });
  };

  // Vérifier les rappels de réservation (pour les notifications)
  useEffect(() => {
    const checkBookingReminders = () => {
      const upcomingBookings = getUpcomingBookings();
      const now = new Date();

      upcomingBookings.forEach(booking => {
        const bookingDate = new Date(`${booking.date}T${booking.time}`);
        const hoursUntil = (bookingDate - now) / (1000 * 60 * 60);

        // Les rappels seront gérés par le PushNotificationContext
        // Les notifications seront envoyées automatiquement
      });
    };

    // Vérifier toutes les heures
    const interval = setInterval(checkBookingReminders, 60 * 60 * 1000);
    checkBookingReminders(); // Vérifier immédiatement

    return () => clearInterval(interval);
  }, [bookings]);

  const value = {
    bookings,
    loading,
    createBooking,
    cancelBooking,
    updateBookingStatus,
    getUpcomingBookings,
    getPastBookings,
    loadBookings
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

