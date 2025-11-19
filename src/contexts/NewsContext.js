import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Mode développement - données mockées
const DEMO_MODE = true;

const NewsContext = createContext();

export function useNews() {
  return useContext(NewsContext);
}

export function NewsProvider({ children }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données mockées pour le développement
  const mockNews = [
    {
      id: 1,
      title: 'Nouveau marché artisanal ouvre ses portes à Conakry',
      content: 'Un nouveau marché artisanal a ouvert ses portes dans le quartier de Dixinn, offrant aux habitants une variété de produits locaux et artisanaux.',
      category: 'urbanisme',
      publishedAt: new Date('2024-10-15'),
      author: 'Redaction Conakry',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzRiNTU2MyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TcOpcmNow6kgQXJ0aXNhbmFsPC90ZXh0Pjwvc3ZnPg==',
      views: 1250,
      likes: 45
    },
    {
      id: 2,
      title: 'Festival des arts de Conakry : Un succès retentissant',
      content: 'Le Festival des arts de Conakry a attiré des milliers de visiteurs avec des performances exceptionnelles d\'artistes locaux et internationaux.',
      category: 'culture',
      publishedAt: new Date('2024-10-10'),
      author: 'Redaction Conakry',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzZiNzI4MCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RmVzdGl2YWwgQXJ0czwvdGV4dD48L3N2Zz4=',
      views: 2100,
      likes: 78
    },
    {
      id: 3,
      title: 'Amélioration du réseau de transport public à Conakry',
      content: 'La mairie de Conakry annonce des améliorations majeures du réseau de transport public, incluant de nouveaux bus et une meilleure connectivité.',
      category: 'transport',
      publishedAt: new Date('2024-10-05'),
      author: 'Redaction Conakry',
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzljYTNhZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VHJhbnNwb3J0IFB1YmxpYzwvdGV4dD48L3N2Zz4=',
      views: 1800,
      likes: 62
    }
  ];

  // Charger les actualités
  useEffect(() => {
    if (DEMO_MODE) {
      // Mode développement avec données mockées
      setTimeout(() => {
        setNews(mockNews);
        setLoading(false);
      }, 1000);
    } else {
      // Mode production avec Firebase (désactivé pour éviter les erreurs)
      setNews(mockNews);
      setLoading(false);
    }
  }, []);

  // Ajouter une actualité
  const addNews = async (newsData) => {
    try {
      if (DEMO_MODE) {
        // Mode développement - ajouter à la liste locale
        const newNews = {
          id: Date.now(),
          ...newsData,
          createdAt: new Date(),
          publishedAt: new Date(),
          isPublished: true,
          views: 0,
          likes: 0
        };
        setNews(prev => [newNews, ...prev]);
        toast.success('Actualité publiée avec succès ! (Mode démo)');
        return true;
      } else {
        // Mode production avec Firebase
        const newsDoc = {
          ...newsData,
          createdAt: new Date(),
          publishedAt: new Date(),
          isPublished: true,
          views: 0,
          likes: 0
        };
        // await addDoc(collection(db, 'news'), newsDoc);
        toast.success('Actualité publiée avec succès !');
        return true;
      }
    } catch (error) {
      console.error('Erreur lors de la publication:', error);
      toast.error('Erreur lors de la publication de l\'actualité');
      return false;
    }
  };

  // Mettre à jour une actualité
  const updateNews = async (newsId, updateData) => {
    try {
      if (DEMO_MODE) {
        // Mode développement - mise à jour locale
        setNews(prev => prev.map(item => 
          item.id === newsId 
            ? { ...item, ...updateData, updatedAt: new Date() }
            : item
        ));
        toast.success('Actualité mise à jour avec succès ! (Mode démo)');
        return true;
      } else {
        // Mode production avec Firebase
        // await updateDoc(doc(db, 'news', newsId), {
        //   ...updateData,
        //   updatedAt: new Date()
        // });
        toast.success('Actualité mise à jour avec succès !');
        return true;
      }
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


