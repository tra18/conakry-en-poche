import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
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
        console.log('Profil utilisateur chargé:', { uid, role: profileData.role, email: profileData.email });
        setUserProfile(profileData);
        return profileData;
      } else {
        // Si le document n'existe pas, le créer avec les données de base
        console.warn('Document utilisateur non trouvé, création...');
        const user = auth.currentUser;
        if (user) {
          const defaultProfile = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || user.email?.split('@')[0] || 'Utilisateur',
            phone: '',
            role: 'user', // Par défaut, pas admin
            createdAt: new Date(),
            isActive: true
          };
          try {
            await setDoc(doc(db, 'users', uid), defaultProfile);
            setUserProfile(defaultProfile);
            console.log('Profil utilisateur créé:', defaultProfile);
            return defaultProfile;
          } catch (createError) {
            console.error('Erreur lors de la création du profil:', createError);
            // Si la création échoue, utiliser quand même le profil par défaut en mémoire
            setUserProfile(defaultProfile);
            return defaultProfile;
          }
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      // Si c'est une erreur de permission, créer un profil par défaut en mémoire
      if (error.message?.includes('permission') || error.message?.includes('Missing or insufficient')) {
        console.warn('Permissions insuffisantes, utilisation d\'un profil par défaut en mémoire');
        const user = auth.currentUser;
        if (user) {
          const defaultProfile = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || user.email?.split('@')[0] || 'Utilisateur',
            phone: '',
            role: 'user',
            createdAt: new Date(),
            isActive: true
          };
          setUserProfile(defaultProfile);
          return defaultProfile;
        }
      } else {
        // Pour les autres erreurs, afficher un message
        toast.error('Erreur lors du chargement du profil utilisateur');
      }
    }
    return null;
  }

  // Mettre à jour le rôle d'un utilisateur (pour les admins)
  async function updateUserRole(userId, newRole) {
    try {
      await updateDoc(doc(db, 'users', userId), {
        role: newRole,
        updatedAt: new Date()
      });
      
      // Si c'est l'utilisateur actuel, recharger le profil
      if (currentUser && currentUser.uid === userId) {
        await loadUserProfile(userId);
      }
      
      toast.success('Rôle utilisateur mis à jour avec succès');
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
      toast.error('Erreur lors de la mise à jour du rôle');
      throw error;
    }
  }

  // Vérifier si l'utilisateur est admin
  const isAdmin = () => {
    // Attendre que le profil soit chargé
    if (loading) {
      return false;
    }
    const isAdminUser = userProfile?.role === 'admin';
    // Ne logger que si on a un utilisateur connecté
    if (currentUser) {
      console.log('Vérification admin:', { 
        hasProfile: !!userProfile, 
        role: userProfile?.role, 
        isAdmin: isAdminUser,
        email: currentUser?.email,
        uid: currentUser?.uid
      });
    }
    return isAdminUser;
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
    updateUserRole,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}




