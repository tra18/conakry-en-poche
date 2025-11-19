import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc, orderBy, Timestamp } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { usePushNotification } from './PushNotificationContext';
import toast from 'react-hot-toast';

const EventContext = createContext();

export function useEvent() {
  return useContext(EventContext);
}

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  // Note: Les notifications seront gérées via le PushNotificationContext séparément

  // Charger les événements
  useEffect(() => {
    loadEvents();
    if (currentUser) {
      loadFavoriteEvents();
    }
  }, [currentUser]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, where('isPublished', '==', true), orderBy('startDate', 'asc'));

      try {
        const querySnapshot = await getDocs(q);
        const eventsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          startDate: doc.data().startDate?.toDate?.() || new Date(doc.data().startDate),
          endDate: doc.data().endDate?.toDate?.() || new Date(doc.data().endDate)
        }));

        setEvents(eventsData);
        localStorage.setItem('events', JSON.stringify(eventsData));
      } catch (error) {
        console.warn('Erreur Firebase, utilisation du mode local:', error);
        loadEventsFromLocal();
      }
    } catch (error) {
      console.warn('Erreur lors du chargement:', error);
      loadEventsFromLocal();
    } finally {
      setLoading(false);
    }
  };

  const loadEventsFromLocal = () => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      const eventsData = JSON.parse(savedEvents).map(event => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate)
      }));
      setEvents(eventsData);
    }
  };

  const loadFavoriteEvents = async () => {
    try {
      if (!currentUser) {
        loadFavoriteEventsFromLocal();
        return;
      }

      const favoritesRef = collection(db, 'eventFavorites');
      const q = query(favoritesRef, where('userId', '==', currentUser.uid));

      try {
        const querySnapshot = await getDocs(q);
        const favoritesData = querySnapshot.docs.map(doc => doc.data().eventId);
        setFavoriteEvents(favoritesData);
        localStorage.setItem('eventFavorites', JSON.stringify(favoritesData));
      } catch (error) {
        console.warn('Erreur Firebase:', error);
        loadFavoriteEventsFromLocal();
      }
    } catch (error) {
      loadFavoriteEventsFromLocal();
    }
  };

  const loadFavoriteEventsFromLocal = () => {
    const savedFavorites = localStorage.getItem('eventFavorites');
    if (savedFavorites) {
      setFavoriteEvents(JSON.parse(savedFavorites));
    }
  };

  // Ajouter aux favoris
  const addToFavorites = async (eventId) => {
    try {
      if (favoriteEvents.includes(eventId)) {
        toast.error('Déjà dans vos favoris');
        return;
      }

      if (currentUser) {
        try {
          await addDoc(collection(db, 'eventFavorites'), {
            userId: currentUser.uid,
            eventId,
            addedAt: new Date().toISOString()
          });
        } catch (error) {
          console.warn('Erreur Firebase:', error);
        }
      }

      const newFavorites = [...favoriteEvents, eventId];
      setFavoriteEvents(newFavorites);
      localStorage.setItem('eventFavorites', JSON.stringify(newFavorites));

      toast.success('Ajouté aux favoris !');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de l\'ajout');
    }
  };

  // Retirer des favoris
  const removeFromFavorites = async (eventId) => {
    try {
      if (currentUser) {
        try {
          const favoritesRef = collection(db, 'eventFavorites');
          const q = query(
            favoritesRef,
            where('userId', '==', currentUser.uid),
            where('eventId', '==', eventId)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.docs.forEach(doc => {
            deleteDoc(doc.ref);
          });
        } catch (error) {
          console.warn('Erreur Firebase:', error);
        }
      }

      const newFavorites = favoriteEvents.filter(id => id !== eventId);
      setFavoriteEvents(newFavorites);
      localStorage.setItem('eventFavorites', JSON.stringify(newFavorites));

      toast.success('Retiré des favoris');
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  // Vérifier si un événement est en favoris
  const isFavorite = (eventId) => {
    return favoriteEvents.includes(eventId);
  };

  // Obtenir les événements à venir
  const getUpcomingEvents = () => {
    const now = new Date();
    return events.filter(event => {
      const startDate = new Date(event.startDate);
      return startDate >= now;
    }).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  };

  // Obtenir les événements du jour
  const getTodayEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return events.filter(event => {
      const startDate = new Date(event.startDate);
      return startDate >= today && startDate < tomorrow;
    });
  };

  // Obtenir les événements de la semaine
  const getWeekEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    return events.filter(event => {
      const startDate = new Date(event.startDate);
      return startDate >= today && startDate < nextWeek;
    }).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  };

  // Obtenir les événements par catégorie
  const getEventsByCategory = (category) => {
    return events.filter(event => event.category === category);
  };

  // Envoyer des rappels pour les événements favoris
  useEffect(() => {
    const checkEventReminders = () => {
      const favoriteEventsList = events.filter(e => favoriteEvents.includes(e.id));
      const now = new Date();

      favoriteEventsList.forEach(event => {
        const startDate = new Date(event.startDate);
        const hoursUntil = (startDate - now) / (1000 * 60 * 60);

        // Les rappels seront gérés par le PushNotificationContext
        // Les notifications seront envoyées automatiquement
      });
    };

    const interval = setInterval(checkEventReminders, 60 * 60 * 1000);
    checkEventReminders();

    return () => clearInterval(interval);
  }, [events, favoriteEvents]);

  const value = {
    events,
    favoriteEvents,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getUpcomingEvents,
    getTodayEvents,
    getWeekEvents,
    getEventsByCategory,
    loadEvents
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}

