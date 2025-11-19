import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ActivityContext = createContext();

export function useActivity() {
  return useContext(ActivityContext);
}

export function ActivityProvider({ children }) {
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem('activities');
    return savedActivities ? JSON.parse(savedActivities) : [
      {
        id: 1,
        title: 'Fête de l\'Indépendance',
        description: 'Grande célébration de l\'indépendance de la Guinée avec défilé, musique et animations.',
        location: 'Place de la République, Conakry',
        date: '2024-10-02',
        time: '08:00',
        category: 'culture',
        organizer: 'Gouvernement de Guinée',
        contact: '620123456',
        email: 'fete@guinee.gn',
        media: {
          type: 'image/jpeg',
          data: 'https://via.placeholder.com/600x400/FF6B35/FFFFFF?text=Fete+Independance'
        },
        isActive: true,
        views: 2500,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Festival de Musique Africaine',
        description: 'Festival international de musique avec des artistes venus de toute l\'Afrique.',
        location: 'Palais des Nations, Conakry',
        date: '2024-11-15',
        time: '18:00',
        category: 'musique',
        organizer: 'Association Culturelle Guinéenne',
        contact: '620987654',
        email: 'festival@culture.gn',
        media: {
          type: 'video/mp4',
          data: 'https://via.placeholder.com/600x400/8E44AD/FFFFFF?text=Festival+Musique'
        },
        isActive: true,
        views: 1800,
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Exposition d\'Art Contemporain',
        description: 'Exposition d\'œuvres d\'artistes guinéens contemporains au Centre Culturel.',
        location: 'Centre Culturel Franco-Guinéen',
        date: '2024-12-01',
        time: '14:00',
        category: 'art',
        organizer: 'Centre Culturel Franco-Guinéen',
        contact: '620555123',
        email: 'art@ccfg.gn',
        media: {
          type: 'image/jpeg',
          data: 'https://via.placeholder.com/600x400/3498DB/FFFFFF?text=Art+Contemporain'
        },
        isActive: true,
        views: 1200,
        createdAt: new Date().toISOString()
      }
    ];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  const getActiveActivities = () => {
    const now = new Date();
    return activities.filter(activity =>
      activity.isActive &&
      new Date(activity.date) >= now
    ).sort((a, b) => new Date(a.date) - new Date(b.date)); // Prochaines activités en premier
  };

  const createActivity = async (activityData) => {
    setLoading(true);
    try {
      const newActivity = {
        id: Date.now(),
        ...activityData,
        isActive: true,
        views: 0,
        createdAt: new Date().toISOString()
      };
      setActivities(prev => [...prev, newActivity]);
      toast.success('Activité créée avec succès !');
      return true;
    } catch (error) {
      console.error('Erreur lors de la création de l\'activité:', error);
      toast.error('Erreur lors de la création de l\'activité');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateActivity = async (activityId, updateData) => {
    setLoading(true);
    try {
      setActivities(prev => prev.map(activity =>
        activity.id === activityId ? { ...activity, ...updateData, updatedAt: new Date().toISOString() } : activity
      ));
      toast.success('Activité mise à jour avec succès !');
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'activité:', error);
      toast.error('Erreur lors de la mise à jour de l\'activité');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteActivity = async (activityId) => {
    setLoading(true);
    try {
      setActivities(prev => prev.filter(activity => activity.id !== activityId));
      toast.success('Activité supprimée avec succès !');
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'activité:', error);
      toast.error('Erreur lors de la suppression de l\'activité');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleActivity = async (activityId) => {
    setLoading(true);
    try {
      setActivities(prev => prev.map(activity =>
        activity.id === activityId ? { ...activity, isActive: !activity.isActive, updatedAt: new Date().toISOString() } : activity
      ));
      toast.success('Statut de l\'activité mis à jour !');
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de l\'activité:', error);
      toast.error('Erreur lors de la mise à jour du statut de l\'activité');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = (activityId) => {
    setActivities(prev => prev.map(activity =>
      activity.id === activityId ? { ...activity, views: (activity.views || 0) + 1 } : activity
    ));
  };

  const getActivitiesByCategory = (category) => {
    return activities.filter(activity => activity.category === category);
  };

  const value = {
    activities,
    loading,
    getActiveActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    toggleActivity,
    incrementViews,
    getActivitiesByCategory
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}










