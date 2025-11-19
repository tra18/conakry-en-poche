import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCoordinatesFromAddress } from '../services/geolocationService';

// Note: On ne peut pas utiliser usePushNotification ici directement car il serait dans un autre provider
// Les notifications seront déclenchées via un callback ou un événement personnalisé

const BusinessContext = createContext();

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};

export const BusinessProvider = ({ children }) => {
  // Catégories d'entreprises disponibles
  const categories = [
    { id: 'restaurants', name: 'Restaurants', icon: '🍽️' },
    { id: 'hotels', name: 'Hôtels', icon: '🏨' },
    { id: 'pharmacies', name: 'Pharmacies', icon: '💊' },
    { id: 'hopitaux', name: 'Hôpitaux', icon: '🏥' },
    { id: 'banques', name: 'Banques', icon: '🏦' },
    { id: 'ecoles', name: 'Écoles', icon: '🎓' },
    { id: 'universites', name: 'Universités', icon: '🏛️' },
    { id: 'transport', name: 'Transport', icon: '🚌' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'loisirs', name: 'Loisirs', icon: '🎮' },
    { id: 'sport', name: 'Sport', icon: '⚽' },
    { id: 'beaute', name: 'Beauté', icon: '💄' },
    { id: 'automobile', name: 'Automobile', icon: '🚗' },
    { id: 'administration', name: 'Administration', icon: '🏛️' },
    { id: 'services', name: 'Services', icon: '🔧' },
    { id: 'autre', name: 'Autre', icon: '📋' }
  ];

  const [validatedBusinesses, setValidatedBusinesses] = useState([]);
  const [pendingBusinesses, setPendingBusinesses] = useState([
    {
      id: 1,
      name: 'Restaurant Le Patio',
      address: 'Rue du Commerce, Conakry',
      phone: '620123456',
      email: 'patio@example.com',
      category: 'restaurants',
      description: 'Restaurant de cuisine guinéenne traditionnelle',
      schedule: 'Lun-Dim: 7h-22h',
      status: 'pending',
      coordinates: getCoordinatesFromAddress('Rue du Commerce, Conakry')
    },
    {
      id: 2,
      name: 'Hôtel Palm Camayenne',
      address: 'Corniche Nord, Conakry',
      phone: '620987654',
      email: 'palm@example.com',
      category: 'hotels',
      description: 'Hôtel 4 étoiles avec vue sur l\'océan',
      schedule: 'Réception 24h/24',
      status: 'pending',
      coordinates: getCoordinatesFromAddress('Corniche Nord, Conakry')
    },
    {
      id: 3,
      name: 'Pharmacie Centrale',
      address: 'Avenue de la République, Conakry',
      phone: '620555123',
      email: 'pharmacie@example.com',
      category: 'pharmacies',
      description: 'Pharmacie ouverte 24h/24',
      schedule: 'Lun-Dim: 24h/24',
      status: 'pending',
      coordinates: getCoordinatesFromAddress('Avenue de la République, Conakry')
    },
    {
      id: 4,
      name: 'Hôpital Ignace Deen',
      address: 'Quartier Almamya, Conakry',
      phone: '620444789',
      email: 'hopital@example.com',
      category: 'hopitaux',
      description: 'Hôpital public principal de Conakry',
      schedule: 'Urgences 24h/24, Consultation: Lun-Ven 8h-17h',
      status: 'pending',
      coordinates: getCoordinatesFromAddress('Quartier Almamya, Conakry')
    }
  ]);

  // Charger les données depuis le localStorage au démarrage
  useEffect(() => {
    const savedValidated = localStorage.getItem('validatedBusinesses');
    const savedPending = localStorage.getItem('pendingBusinesses');
    
    try {
      if (savedValidated) {
        const parsed = JSON.parse(savedValidated);
        if (Array.isArray(parsed)) {
          setValidatedBusinesses(parsed);
        }
      }
      
      if (savedPending) {
        const parsed = JSON.parse(savedPending);
        if (Array.isArray(parsed)) {
          setPendingBusinesses(parsed);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement depuis localStorage:', error);
      // En cas d'erreur, réinitialiser localStorage
      localStorage.removeItem('validatedBusinesses');
      localStorage.removeItem('pendingBusinesses');
    }
  }, []);

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('validatedBusinesses', JSON.stringify(validatedBusinesses));
  }, [validatedBusinesses]);

  useEffect(() => {
    localStorage.setItem('pendingBusinesses', JSON.stringify(pendingBusinesses));
  }, [pendingBusinesses]);


  const getBusinessesByCategory = (category) => {
    return validatedBusinesses.filter(business => business.category === category);
  };

  const addNewBusiness = (businessData) => {
    const newBusiness = {
      id: Date.now(),
      ...businessData,
      // Mapper businessName vers name pour la cohérence
      name: businessData.businessName || businessData.name,
      // Mapper workingHours vers schedule pour la cohérence
      schedule: businessData.workingHours || businessData.schedule,
      status: 'pending',
      createdAt: new Date().toISOString(),
      coordinates: getCoordinatesFromAddress(businessData.address)
    };
    setPendingBusinesses(prev => [...prev, newBusiness]);
    return newBusiness;
  };

  const approveBusiness = (businessId) => {
    // Utiliser les fonctions de callback pour obtenir l'état actuel
    setPendingBusinesses(prevPending => {
      const business = prevPending.find(b => b.id === businessId);
      
      if (business) {
        // Ajouter à validatedBusinesses avec l'état actuel
        const approvedBusiness = {
          ...business,
          status: 'approved',
          isActive: true, // Par défaut actif
          approvedAt: new Date().toISOString()
        };
        
        // Mettre à jour validatedBusinesses en utilisant l'état actuel
        setValidatedBusinesses(prevValidated => {
          const newValidated = [...prevValidated, approvedBusiness];
          // Sauvegarder immédiatement dans localStorage
          localStorage.setItem('validatedBusinesses', JSON.stringify(newValidated));
          return newValidated;
        });
        
        // Supprimer de pendingBusinesses
        const newPending = prevPending.filter(b => b.id !== businessId);
        // Sauvegarder immédiatement dans localStorage
        localStorage.setItem('pendingBusinesses', JSON.stringify(newPending));
        return newPending;
      }
      
      return prevPending;
    });
  };

  const rejectBusiness = (businessId) => {
    // Supprimer de pendingBusinesses
    setPendingBusinesses(prev => prev.filter(b => b.id !== businessId));
    
    // Sauvegarder dans localStorage
    const updatedPending = pendingBusinesses.filter(b => b.id !== businessId);
    localStorage.setItem('pendingBusinesses', JSON.stringify(updatedPending));
  };

  const removeValidatedBusiness = (businessId) => {
    setValidatedBusinesses(prev => prev.filter(b => b.id !== businessId));
    localStorage.setItem('validatedBusinesses', JSON.stringify(validatedBusinesses.filter(b => b.id !== businessId)));
  };

  const toggleBusinessStatus = (businessId) => {
    setValidatedBusinesses(prev => {
      const updatedBusinesses = prev.map(business => {
        if (business.id === businessId) {
          return {
            ...business,
            isActive: !business.isActive,
            statusUpdatedAt: new Date().toISOString()
          };
        }
        return business;
      });
      
      // Sauvegarder dans localStorage
      localStorage.setItem('validatedBusinesses', JSON.stringify(updatedBusinesses));
      return updatedBusinesses;
    });
  };

  // Obtenir une entreprise par ID
  const getBusinessById = (businessId) => {
    const allBusinesses = [...validatedBusinesses, ...pendingBusinesses];
    return allBusinesses.find(b => b.id === businessId || b.id === parseInt(businessId));
  };

  // Fonction pour soumettre une nouvelle entreprise
  const submitBusiness = async (businessData, userId) => {
    try {
      const newBusiness = {
        ...businessData,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        userId: userId,
        coordinates: getCoordinatesFromAddress(businessData.address)
      };
      
      setPendingBusinesses(prev => [...prev, newBusiness]);
      
      // Sauvegarder dans localStorage
      const updatedPending = [...pendingBusinesses, newBusiness];
      localStorage.setItem('pendingBusinesses', JSON.stringify(updatedPending));
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      return false;
    }
  };

  const value = {
    validatedBusinesses,
    pendingBusinesses,
    approveBusiness,
    rejectBusiness,
    getBusinessesByCategory,
    getBusinessById,
    addNewBusiness,
    removeValidatedBusiness,
    submitBusiness,
    toggleBusinessStatus,
    categories
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};