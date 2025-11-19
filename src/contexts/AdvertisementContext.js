import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AdvertisementContext = createContext();

export const useAdvertisement = () => {
  const context = useContext(AdvertisementContext);
  if (!context) {
    throw new Error('useAdvertisement must be used within an AdvertisementProvider');
  }
  return context;
};

export const AdvertisementProvider = ({ children }) => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);

  // Charger les publicités depuis localStorage
  useEffect(() => {
    const savedAds = localStorage.getItem('advertisements');
    if (savedAds) {
      try {
        setAdvertisements(JSON.parse(savedAds));
      } catch (error) {
        console.error('Erreur lors du chargement des publicités:', error);
      }
    } else {
      // Publicités d'exemple
      const defaultAds = [
        {
          id: 1,
          title: 'Restaurant Le Patio - Spécialités Guinéennes',
          description: 'Découvrez nos plats traditionnels dans un cadre chaleureux au cœur de Conakry.',
          imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VmNDQ0NCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+8J+NvSBQYXRpbyBSZXN0YXVyYW50PC90ZXh0Pjwvc3ZnPg==',
          businessId: 1,
          businessName: 'Restaurant Le Patio',
          category: 'restaurants',
          isActive: true,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 jours
          createdAt: new Date().toISOString(),
          views: 0,
          clicks: 0
        },
        {
          id: 2,
          title: 'Hôtel Palm Camayenne - Vue sur l\'Océan',
          description: 'Séjournez dans notre hôtel 4 étoiles avec vue panoramique sur l\'océan Atlantique.',
          imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzNiODJmNiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+8J+OqCBIw7R0ZWwgUGFsbTwvdGV4dD48L3N2Zz4=',
          businessId: 2,
          businessName: 'Hôtel Palm Camayenne',
          category: 'hotels',
          isActive: true,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
          views: 0,
          clicks: 0
        }
      ];
      setAdvertisements(defaultAds);
      localStorage.setItem('advertisements', JSON.stringify(defaultAds));
    }
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('advertisements', JSON.stringify(advertisements));
  }, [advertisements]);

  // Créer une nouvelle publicité
  const createAdvertisement = async (adData) => {
    setLoading(true);
    try {
      const newAd = {
        id: Date.now(),
        ...adData,
        isActive: true,
        createdAt: new Date().toISOString(),
        views: 0,
        clicks: 0
      };

      setAdvertisements(prev => [...prev, newAd]);
      toast.success('Publicité créée avec succès !');
      return newAd;
    } catch (error) {
      console.error('Erreur lors de la création de la publicité:', error);
      toast.error('Erreur lors de la création de la publicité');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour une publicité
  const updateAdvertisement = async (adId, updateData) => {
    setLoading(true);
    try {
      setAdvertisements(prev => prev.map(ad => 
        ad.id === adId ? { ...ad, ...updateData, updatedAt: new Date().toISOString() } : ad
      ));
      toast.success('Publicité mise à jour avec succès !');
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Supprimer une publicité
  const deleteAdvertisement = async (adId) => {
    setLoading(true);
    try {
      setAdvertisements(prev => prev.filter(ad => ad.id !== adId));
      toast.success('Publicité supprimée avec succès !');
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Activer/Désactiver une publicité
  const toggleAdvertisement = async (adId) => {
    const ad = advertisements.find(a => a.id === adId);
    if (ad) {
      return await updateAdvertisement(adId, { isActive: !ad.isActive });
    }
    return false;
  };

  // Obtenir les publicités actives
  const getActiveAdvertisements = () => {
    const now = new Date();
    return advertisements.filter(ad => 
      ad.isActive && 
      new Date(ad.startDate) <= now && 
      new Date(ad.endDate) >= now
    );
  };

  // Incrémenter les vues
  const incrementViews = (adId) => {
    setAdvertisements(prev => prev.map(ad => 
      ad.id === adId ? { ...ad, views: ad.views + 1 } : ad
    ));
  };

  // Incrémenter les clics
  const incrementClicks = (adId) => {
    setAdvertisements(prev => prev.map(ad => 
      ad.id === adId ? { ...ad, clicks: ad.clicks + 1 } : ad
    ));
  };

  const value = {
    advertisements,
    loading,
    createAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
    toggleAdvertisement,
    getActiveAdvertisements,
    incrementViews,
    incrementClicks
  };

  return (
    <AdvertisementContext.Provider value={value}>
      {children}
    </AdvertisementContext.Provider>
  );
};










