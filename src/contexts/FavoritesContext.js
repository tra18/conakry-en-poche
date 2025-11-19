import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [lists, setLists] = useState([]); // Listes personnalisées
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  // Charger les favoris
  useEffect(() => {
    if (currentUser) {
      loadFavorites();
      loadLists();
    } else {
      // Fallback vers localStorage
      loadFavoritesFromLocal();
      loadListsFromLocal();
    }
  }, [currentUser]);

  const loadFavorites = async () => {
    try {
      if (!currentUser) {
        loadFavoritesFromLocal();
        return;
      }

      setLoading(true);
      const favoritesRef = collection(db, 'favorites');
      const q = query(favoritesRef, where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const favoritesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setFavorites(favoritesData);
      
      // Sauvegarder aussi en local comme backup
      localStorage.setItem('favorites', JSON.stringify(favoritesData));
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
      loadFavoritesFromLocal();
    } finally {
      setLoading(false);
    }
  };

  const loadFavoritesFromLocal = () => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  };

  const loadLists = async () => {
    try {
      if (!currentUser) {
        loadListsFromLocal();
        return;
      }

      const listsRef = collection(db, 'favoriteLists');
      const q = query(listsRef, where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const listsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setLists(listsData);
      localStorage.setItem('favoriteLists', JSON.stringify(listsData));
    } catch (error) {
      console.error('Erreur lors du chargement des listes:', error);
      loadListsFromLocal();
    }
  };

  const loadListsFromLocal = () => {
    const savedLists = localStorage.getItem('favoriteLists');
    if (savedLists) {
      setLists(JSON.parse(savedLists));
    }
  };

  // Ajouter aux favoris
  const addToFavorites = async (business) => {
    try {
      const isAlreadyFavorite = favorites.some(fav => fav.businessId === business.id);
      if (isAlreadyFavorite) {
        toast.error('Déjà dans vos favoris');
        return;
      }

      const favoriteData = {
        businessId: business.id,
        business: business,
        userId: currentUser?.uid || 'anonymous',
        addedAt: new Date().toISOString()
      };

      if (currentUser) {
        try {
          const docRef = await addDoc(collection(db, 'favorites'), favoriteData);
          favoriteData.id = docRef.id;
        } catch (error) {
          console.warn('Erreur Firebase, utilisation du stockage local:', error);
        }
      }

      // Sauvegarder en local
      const newFavorites = [...favorites, favoriteData];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      toast.success('Ajouté aux favoris !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout aux favoris:', error);
      toast.error('Erreur lors de l\'ajout aux favoris');
    }
  };

  // Retirer des favoris
  const removeFromFavorites = async (businessId) => {
    try {
      const favorite = favorites.find(fav => fav.businessId === businessId);
      
      if (favorite && favorite.id && currentUser) {
        try {
          await deleteDoc(doc(db, 'favorites', favorite.id));
        } catch (error) {
          console.warn('Erreur Firebase:', error);
        }
      }

      const newFavorites = favorites.filter(fav => fav.businessId !== businessId);
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      toast.success('Retiré des favoris');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  // Vérifier si une entreprise est en favoris
  const isFavorite = (businessId) => {
    return favorites.some(fav => fav.businessId === businessId);
  };

  // Créer une liste personnalisée
  const createList = async (listName, description = '') => {
    try {
      const listData = {
        name: listName,
        description,
        userId: currentUser?.uid || 'anonymous',
        businesses: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (currentUser) {
        try {
          const docRef = await addDoc(collection(db, 'favoriteLists'), listData);
          listData.id = docRef.id;
        } catch (error) {
          console.warn('Erreur Firebase, utilisation du stockage local:', error);
          listData.id = `local_${Date.now()}`;
        }
      } else {
        listData.id = `local_${Date.now()}`;
      }

      const newLists = [...lists, listData];
      setLists(newLists);
      localStorage.setItem('favoriteLists', JSON.stringify(newLists));

      toast.success(`Liste "${listName}" créée !`);
      return listData;
    } catch (error) {
      console.error('Erreur lors de la création de la liste:', error);
      toast.error('Erreur lors de la création de la liste');
      throw error;
    }
  };

  // Ajouter une entreprise à une liste
  const addBusinessToList = async (listId, business) => {
    try {
      const list = lists.find(l => l.id === listId);
      if (!list) return;

      const isAlreadyInList = list.businesses.some(b => b.id === business.id);
      if (isAlreadyInList) {
        toast.error('Déjà dans cette liste');
        return;
      }

      const updatedList = {
        ...list,
        businesses: [...list.businesses, business],
        updatedAt: new Date().toISOString()
      };

      if (currentUser && list.id && !list.id.startsWith('local_')) {
        try {
          await setDoc(doc(db, 'favoriteLists', list.id), updatedList);
        } catch (error) {
          console.warn('Erreur Firebase:', error);
        }
      }

      const newLists = lists.map(l => l.id === listId ? updatedList : l);
      setLists(newLists);
      localStorage.setItem('favoriteLists', JSON.stringify(newLists));

      toast.success('Ajouté à la liste !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout à la liste:', error);
      toast.error('Erreur lors de l\'ajout à la liste');
    }
  };

  // Retirer une entreprise d'une liste
  const removeBusinessFromList = async (listId, businessId) => {
    try {
      const list = lists.find(l => l.id === listId);
      if (!list) return;

      const updatedList = {
        ...list,
        businesses: list.businesses.filter(b => b.id !== businessId),
        updatedAt: new Date().toISOString()
      };

      if (currentUser && list.id && !list.id.startsWith('local_')) {
        try {
          await setDoc(doc(db, 'favoriteLists', list.id), updatedList);
        } catch (error) {
          console.warn('Erreur Firebase:', error);
        }
      }

      const newLists = lists.map(l => l.id === listId ? updatedList : l);
      setLists(newLists);
      localStorage.setItem('favoriteLists', JSON.stringify(newLists));

      toast.success('Retiré de la liste');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  // Supprimer une liste
  const deleteList = async (listId) => {
    try {
      const list = lists.find(l => l.id === listId);
      
      if (list && list.id && !list.id.startsWith('local_') && currentUser) {
        try {
          await deleteDoc(doc(db, 'favoriteLists', list.id));
        } catch (error) {
          console.warn('Erreur Firebase:', error);
        }
      }

      const newLists = lists.filter(l => l.id !== listId);
      setLists(newLists);
      localStorage.setItem('favoriteLists', JSON.stringify(newLists));

      toast.success('Liste supprimée');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  // Exporter une liste en PDF (simulation)
  const exportList = (listId) => {
    const list = lists.find(l => l.id === listId);
    if (!list) return;

    const data = JSON.stringify(list, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${list.name.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Liste exportée !');
  };

  const value = {
    favorites,
    lists,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    createList,
    addBusinessToList,
    removeBusinessFromList,
    deleteList,
    exportList,
    loadFavorites,
    loadLists
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

