import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc,
  onSnapshot,
  limit,
  where
} from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

const NewsContext = createContext();

export function useNews() {
  return useContext(NewsContext);
}

export function NewsProvider({ children }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les actualités
  useEffect(() => {
    const q = query(
      collection(db, 'news'),
      where('isPublished', '==', true),
      orderBy('publishedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNews(newsData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Ajouter une actualité
  const addNews = async (newsData) => {
    try {
      const newsDoc = {
        ...newsData,
        createdAt: new Date(),
        publishedAt: new Date(),
        isPublished: true,
        views: 0,
        likes: 0
      };

      await addDoc(collection(db, 'news'), newsDoc);
      toast.success('Actualité publiée avec succès !');
      return true;
    } catch (error) {
      console.error('Erreur lors de la publication:', error);
      toast.error('Erreur lors de la publication de l\'actualité');
      return false;
    }
  };

  // Mettre à jour une actualité
  const updateNews = async (newsId, updateData) => {
    try {
      await updateDoc(doc(db, 'news', newsId), {
        ...updateData,
        updatedAt: new Date()
      });
      toast.success('Actualité mise à jour avec succès !');
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour');
      return false;
    }
  };

  // Obtenir les actualités récentes
  const getRecentNews = (limitCount = 5) => {
    return news.slice(0, limitCount);
  };

  // Obtenir les actualités par catégorie
  const getNewsByCategory = (category) => {
    return news.filter(item => item.category === category);
  };

  // Rechercher dans les actualités
  const searchNews = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return news.filter(item => 
      item.title.toLowerCase().includes(term) ||
      item.content.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  };

  const value = {
    news,
    loading,
    addNews,
    updateNews,
    getRecentNews,
    getNewsByCategory,
    searchNews
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
}


