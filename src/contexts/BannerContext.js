import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc,
  onSnapshot,
  limit
} from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

const BannerContext = createContext();

export function useBanner() {
  return useContext(BannerContext);
}

export function BannerProvider({ children }) {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les bannières actives
  useEffect(() => {
    const q = query(
      collection(db, 'banners'),
      where('isActive', '==', true),
      orderBy('priority', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = new Date();
      const bannersData = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(banner => {
          const startDate = banner.startDate?.toDate ? banner.startDate.toDate() : new Date(banner.startDate);
          const endDate = banner.endDate?.toDate ? banner.endDate.toDate() : new Date(banner.endDate);
          return startDate <= now && endDate >= now;
        });
      setBanners(bannersData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Ajouter une bannière
  const addBanner = async (bannerData) => {
    try {
      const bannerDoc = {
        ...bannerData,
        createdAt: new Date(),
        clicks: 0,
        views: 0
      };

      await addDoc(collection(db, 'banners'), bannerDoc);
      toast.success('Bannière ajoutée avec succès !');
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      toast.error('Erreur lors de l\'ajout de la bannière');
      return false;
    }
  };

  // Mettre à jour une bannière
  const updateBanner = async (bannerId, updateData) => {
    try {
      await updateDoc(doc(db, 'banners', bannerId), {
        ...updateData,
        updatedAt: new Date()
      });
      toast.success('Bannière mise à jour avec succès !');
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour');
      return false;
    }
  };

  // Enregistrer un clic sur une bannière
  const recordBannerClick = async (bannerId) => {
    try {
      const bannerRef = doc(db, 'banners', bannerId);
      await updateDoc(bannerRef, {
        clicks: banners.find(b => b.id === bannerId)?.clicks + 1 || 1,
        lastClickAt: new Date()
      });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du clic:', error);
    }
  };

  // Obtenir les bannières par position
  const getBannersByPosition = (position) => {
    return banners.filter(banner => banner.position === position);
  };

  // Obtenir les bannières prioritaires
  const getPriorityBanners = (limitCount = 3) => {
    return banners
      .sort((a, b) => b.priority - a.priority)
      .slice(0, limitCount);
  };

  const value = {
    banners,
    loading,
    addBanner,
    updateBanner,
    recordBannerClick,
    getBannersByPosition,
    getPriorityBanners
  };

  return (
    <BannerContext.Provider value={value}>
      {children}
    </BannerContext.Provider>
  );
}


