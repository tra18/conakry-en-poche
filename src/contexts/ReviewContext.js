import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const ReviewContext = createContext();

export function useReview() {
  return useContext(ReviewContext);
}

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState({}); // { businessId: [reviews] }
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  // Charger les avis pour une entreprise
  const loadReviews = async (businessId) => {
    try {
      setLoading(true);
      const reviewsRef = collection(db, 'reviews');
      const q = query(
        reviewsRef,
        where('businessId', '==', businessId),
        where('isApproved', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const reviewsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setReviews(prev => ({
        ...prev,
        [businessId]: reviewsData
      }));

      return reviewsData;
    } catch (error) {
      console.error('Erreur lors du chargement des avis:', error);
      // Fallback vers localStorage si Firebase échoue
      const savedReviews = localStorage.getItem(`reviews_${businessId}`);
      if (savedReviews) {
        const localReviews = JSON.parse(savedReviews);
        setReviews(prev => ({
          ...prev,
          [businessId]: localReviews
        }));
        return localReviews;
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Calculer la note moyenne d'une entreprise
  const getAverageRating = (businessId) => {
    const businessReviews = reviews[businessId] || [];
    if (businessReviews.length === 0) return 0;
    
    const sum = businessReviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return sum / businessReviews.length;
  };

  // Obtenir le nombre d'avis
  const getReviewCount = (businessId) => {
    return reviews[businessId]?.length || 0;
  };

  // Soumettre un avis
  const submitReview = async (reviewData) => {
    try {
      setLoading(true);
      
      const review = {
        businessId: reviewData.businessId,
        businessName: reviewData.businessName,
        userId: currentUser?.uid || 'anonymous',
        userName: currentUser?.displayName || currentUser?.email || 'Utilisateur',
        userEmail: currentUser?.email || '',
        rating: reviewData.rating,
        comment: reviewData.comment || '',
        images: reviewData.images || [],
        createdAt: new Date().toISOString(),
        isApproved: false, // Nécessite validation admin
        helpfulCount: 0,
        reportedCount: 0
      };

      // Ajouter à Firebase
      try {
        const docRef = await addDoc(collection(db, 'reviews'), review);
        review.id = docRef.id;
      } catch (firebaseError) {
        console.warn('Erreur Firebase, utilisation du stockage local:', firebaseError);
        // Fallback vers localStorage
        const savedReviews = JSON.parse(localStorage.getItem(`reviews_${reviewData.businessId}`) || '[]');
        review.id = `local_${Date.now()}`;
        savedReviews.push(review);
        localStorage.setItem(`reviews_${reviewData.businessId}`, JSON.stringify(savedReviews));
      }

      // Mettre à jour l'état local
      setReviews(prev => ({
        ...prev,
        [reviewData.businessId]: [
          review,
          ...(prev[reviewData.businessId] || [])
        ]
      }));

      toast.success('Avis soumis avec succès ! Il sera publié après validation.');
      return review;
    } catch (error) {
      console.error('Erreur lors de la soumission de l\'avis:', error);
      toast.error('Erreur lors de la soumission de l\'avis');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Marquer un avis comme utile
  const markHelpful = async (reviewId, businessId) => {
    try {
      const review = reviews[businessId]?.find(r => r.id === reviewId);
      if (!review) return;

      const updatedReview = {
        ...review,
        helpfulCount: (review.helpfulCount || 0) + 1
      };

      try {
        await updateDoc(doc(db, 'reviews', reviewId), {
          helpfulCount: updatedReview.helpfulCount
        });
      } catch (error) {
        // Fallback localStorage
        const savedReviews = JSON.parse(localStorage.getItem(`reviews_${businessId}`) || '[]');
        const index = savedReviews.findIndex(r => r.id === reviewId);
        if (index !== -1) {
          savedReviews[index] = updatedReview;
          localStorage.setItem(`reviews_${businessId}`, JSON.stringify(savedReviews));
        }
      }

      setReviews(prev => ({
        ...prev,
        [businessId]: prev[businessId].map(r => 
          r.id === reviewId ? updatedReview : r
        )
      }));
    } catch (error) {
      console.error('Erreur lors du marquage comme utile:', error);
    }
  };

  // Signaler un avis
  const reportReview = async (reviewId, businessId) => {
    try {
      const review = reviews[businessId]?.find(r => r.id === reviewId);
      if (!review) return;

      const updatedReview = {
        ...review,
        reportedCount: (review.reportedCount || 0) + 1
      };

      try {
        await updateDoc(doc(db, 'reviews', reviewId), {
          reportedCount: updatedReview.reportedCount
        });
      } catch (error) {
        // Fallback localStorage
        const savedReviews = JSON.parse(localStorage.getItem(`reviews_${businessId}`) || '[]');
        const index = savedReviews.findIndex(r => r.id === reviewId);
        if (index !== -1) {
          savedReviews[index] = updatedReview;
          localStorage.setItem(`reviews_${businessId}`, JSON.stringify(savedReviews));
        }
      }

      toast.success('Avis signalé. Merci pour votre retour.');
    } catch (error) {
      console.error('Erreur lors du signalement:', error);
      toast.error('Erreur lors du signalement');
    }
  };

  // Supprimer un avis (pour l'admin)
  const deleteReview = async (reviewId, businessId) => {
    try {
      try {
        await deleteDoc(doc(db, 'reviews', reviewId));
      } catch (error) {
        // Fallback localStorage
        const savedReviews = JSON.parse(localStorage.getItem(`reviews_${businessId}`) || '[]');
        const filtered = savedReviews.filter(r => r.id !== reviewId);
        localStorage.setItem(`reviews_${businessId}`, JSON.stringify(filtered));
      }

      setReviews(prev => ({
        ...prev,
        [businessId]: prev[businessId].filter(r => r.id !== reviewId)
      }));

      toast.success('Avis supprimé');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  // Distribution des notes (pour afficher les statistiques)
  const getRatingDistribution = (businessId) => {
    const businessReviews = reviews[businessId] || [];
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    businessReviews.forEach(review => {
      const rating = Math.round(review.rating);
      if (distribution[rating] !== undefined) {
        distribution[rating]++;
      }
    });

    return distribution;
  };

  const value = {
    reviews,
    loading,
    loadReviews,
    submitReview,
    getAverageRating,
    getReviewCount,
    markHelpful,
    reportReview,
    deleteReview,
    getRatingDistribution
  };

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
}

