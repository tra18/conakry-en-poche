import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  doc, 
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const RoadReportContext = createContext();

export const useRoadReport = () => {
  const context = useContext(RoadReportContext);
  if (!context) {
    throw new Error('useRoadReport must be used within a RoadReportProvider');
  }
  return context;
};

export const RoadReportProvider = ({ children }) => {
  const { currentUser, userProfile, isAdmin: checkIsAdmin } = useAuth();
  const [reports, setReports] = useState([]);
  const [pendingReports, setPendingReports] = useState([]);
  const [approvedReports, setApprovedReports] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Vérifier si l'utilisateur est admin
  const isAdmin = checkIsAdmin ? checkIsAdmin() : false;

  // Types de signalements
  const reportTypes = [
    { id: 'roadwork', name: 'Travaux routiers', icon: '🚧', color: '#f59e0b' },
    { id: 'accident', name: 'Accident', icon: '🚨', color: '#ef4444' },
    { id: 'traffic', name: 'Embouteillage', icon: '🚗', color: '#3b82f6' }
  ];

  // Charger les signalements depuis Firestore
  useEffect(() => {
    setLoading(true);
    
    let unsubscribePending = null;

    // Écouter les signalements en attente UNIQUEMENT pour les admins
    if (isAdmin && currentUser) {
      try {
        const pendingQuery = query(
          collection(db, 'roadReports'),
          where('status', '==', 'pending'),
          orderBy('createdAt', 'desc')
        );

        unsubscribePending = onSnapshot(
          pendingQuery,
          (snapshot) => {
            const pending = [];
            snapshot.forEach((doc) => {
              pending.push({ id: doc.id, ...doc.data() });
            });
            setPendingReports(pending);
          },
          (error) => {
            console.error('Erreur lors du chargement des signalements en attente:', error);
            // Ne pas afficher l'erreur si c'est juste une permission
            if (!error.message?.includes('permission') && !error.message?.includes('Missing or insufficient')) {
              toast.error('Erreur lors du chargement des signalements');
            }
          }
        );
      } catch (error) {
        console.error('Erreur lors de la création de la requête pending:', error);
      }
    } else {
      // Si pas admin, initialiser avec un tableau vide
      setPendingReports([]);
    }

    // Écouter les signalements approuvés (lecture publique)
    const approvedQuery = query(
      collection(db, 'roadReports'),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeApproved = onSnapshot(
      approvedQuery,
      (snapshot) => {
        const approved = [];
        snapshot.forEach((doc) => {
          approved.push({ id: doc.id, ...doc.data() });
        });
        setApprovedReports(approved);
        setReports(approved); // Les signalements publics sont les approuvés
        setLoading(false);
      },
      (error) => {
        console.error('Erreur lors du chargement des signalements approuvés:', error);
        // Ne pas afficher l'erreur si c'est juste une permission
        if (!error.message?.includes('permission') && !error.message?.includes('Missing or insufficient')) {
          toast.error('Erreur lors du chargement des signalements');
        }
        setLoading(false);
      }
    );

    return () => {
      if (unsubscribePending) {
        unsubscribePending();
      }
      unsubscribeApproved();
    };
  }, [isAdmin, currentUser]);

  // Uploader une image vers Firebase Storage (sans authentification)
  const uploadImage = async (file) => {
    try {
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 15);
      const fileName = `roadReports/anonymous/${timestamp}_${randomId}_${file.name}`;
      const storageRef = ref(storage, fileName);
      
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      return downloadURL;
    } catch (error) {
      console.error('Erreur lors de l\'upload de l\'image:', error);
      
      // Si c'est une erreur CORS, Storage non activé, ou erreur réseau, retourner null
      // pour permettre la soumission du signalement sans image
      if (error.code === 'storage/unauthorized' || 
          error.code === 'storage/unknown' ||
          error.message?.includes('CORS') || 
          error.message?.includes('blocked') ||
          error.message?.includes('ERR_FAILED') ||
          error.message?.includes('network')) {
        console.warn('Firebase Storage non disponible ou erreur CORS, le signalement sera soumis sans image');
        return null; // Retourner null au lieu de throw pour continuer
      }
      
      // Pour les autres erreurs, on throw quand même
      throw error;
    }
  };

  // Soumettre un nouveau signalement (avec ou sans authentification)
  const submitReport = async (reportData, userId = null, imageFile = null, userInfo = {}) => {
    try {
      let imageUrl = null;

      // Uploader l'image si fournie
      if (imageFile) {
        try {
          imageUrl = await uploadImage(imageFile);
          if (!imageUrl) {
            console.warn('Upload d\'image échoué (Storage non disponible), continuation sans image');
            toast.error('L\'upload de l\'image a échoué. Le signalement sera soumis sans photo.');
          }
        } catch (imageError) {
          console.warn('Erreur lors de l\'upload de l\'image:', imageError);
          // Continuer sans l'image si l'upload échoue (Storage non activé ou erreur CORS)
          imageUrl = null;
          toast.error('L\'upload de l\'image a échoué. Le signalement sera soumis sans photo.');
          // On continue quand même la soumission
        }
      }

      // Créer le document dans Firestore
      const reportDoc = {
        type: reportData.type,
        title: reportData.title,
        description: reportData.description || '',
        location: reportData.location,
        coordinates: reportData.coordinates || null,
        imageUrl: imageUrl,
        status: 'pending',
        userId: userId || null, // null si pas connecté
        userName: userInfo.name || null,
        userEmail: userInfo.email || null,
        isAnonymous: !userId, // Indique si c'est un signalement anonyme
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'roadReports'), reportDoc);
      
      toast.success('Signalement soumis avec succès ! Il sera validé par l\'administration.');
      return { id: docRef.id, ...reportDoc };
    } catch (error) {
      console.error('Erreur lors de la soumission du signalement:', error);
      
      // Messages d'erreur plus spécifiques
      let errorMessage = 'Erreur lors de la soumission du signalement';
      if (error.message) {
        if (error.message.includes('permission')) {
          errorMessage = 'Erreur de permissions. Vérifiez les règles Firestore.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet.';
        } else {
          errorMessage = `Erreur: ${error.message}`;
        }
      }
      
      toast.error(errorMessage);
      throw error;
    }
  };

  // Approuver un signalement (admin seulement)
  const approveReport = async (reportId) => {
    try {
      const reportRef = doc(db, 'roadReports', reportId);
      await updateDoc(reportRef, {
        status: 'approved',
        approvedAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      toast.success('Signalement approuvé avec succès !');
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error);
      toast.error('Erreur lors de l\'approbation du signalement');
      return false;
    }
  };

  // Rejeter un signalement (admin seulement)
  const rejectReport = async (reportId) => {
    try {
      const reportRef = doc(db, 'roadReports', reportId);
      await updateDoc(reportRef, {
        status: 'rejected',
        rejectedAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      toast.success('Signalement rejeté');
      return true;
    } catch (error) {
      console.error('Erreur lors du rejet:', error);
      toast.error('Erreur lors du rejet du signalement');
      return false;
    }
  };

  // Obtenir les signalements par type
  const getReportsByType = (type) => {
    return approvedReports.filter(report => report.type === type);
  };

  // Obtenir un signalement par ID
  const getReportById = (reportId) => {
    const allReports = [...pendingReports, ...approvedReports];
    return allReports.find(r => r.id === reportId);
  };

  const value = {
    reports,
    pendingReports,
    approvedReports,
    loading,
    reportTypes,
    submitReport,
    approveReport,
    rejectReport,
    getReportsByType,
    getReportById
  };

  return (
    <RoadReportContext.Provider value={value}>
      {children}
    </RoadReportContext.Provider>
  );
};

