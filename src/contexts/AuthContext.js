import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Inscription
  async function signup(email, password, userData) {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Mettre à jour le profil
      await updateProfile(user, {
        displayName: userData.name
      });

      // Créer le profil utilisateur dans Firestore
      const userProfileData = {
        uid: user.uid,
        email: user.email,
        name: userData.name,
        phone: userData.phone || '',
        role: 'user',
        createdAt: new Date(),
        isActive: true
      };

      await setDoc(doc(db, 'users', user.uid), userProfileData);
      setUserProfile(userProfileData);
      
      toast.success('Compte créé avec succès !');
      return user;
    } catch (error) {
      toast.error('Erreur lors de la création du compte: ' + error.message);
      throw error;
    }
  }

  // Connexion
  async function login(email, password) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Connexion réussie !');
      return user;
    } catch (error) {
      toast.error('Erreur de connexion: ' + error.message);
      throw error;
    }
  }

  // Déconnexion
  async function logout() {
    try {
      await signOut(auth);
      setUserProfile(null);
      toast.success('Déconnexion réussie !');
    } catch (error) {
      toast.error('Erreur de déconnexion: ' + error.message);
      throw error;
    }
  }

  // Charger le profil utilisateur
  async function loadUserProfile(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const profileData = userDoc.data();
        setUserProfile(profileData);
        return profileData;
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    }
    return null;
  }

  // Vérifier si l'utilisateur est admin
  const isAdmin = () => {
    return userProfile?.role === 'admin';
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    login,
    signup,
    logout,
    loadUserProfile,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}


