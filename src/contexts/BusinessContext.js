import React, { createContext, useContext, useState, useEffect } from 'react';

const BusinessContext = createContext();

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};

export const BusinessProvider = ({ children }) => {
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
      status: 'pending'
    },
    {
      id: 2,
      name: 'Hôtel Palm Camayenne',
      address: 'Corniche Nord, Conakry',
      phone: '620987654',
      email: 'palm@example.com',
      category: 'hotels',
      description: 'Hôtel 4 étoiles avec vue sur l\'océan',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Pharmacie Centrale',
      address: 'Avenue de la République, Conakry',
      phone: '620555123',
      email: 'pharmacie@example.com',
      category: 'pharmacies',
      description: 'Pharmacie ouverte 24h/24',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Hôpital Ignace Deen',
      address: 'Quartier Almamya, Conakry',
      phone: '620444789',
      email: 'hopital@example.com',
      category: 'hopitaux',
      description: 'Hôpital public principal de Conakry',
      status: 'pending'
    }
  ]);

  // Charger les données depuis le localStorage au démarrage
  useEffect(() => {
    const savedValidated = localStorage.getItem('validatedBusinesses');
    const savedPending = localStorage.getItem('pendingBusinesses');
    
    if (savedValidated) {
      setValidatedBusinesses(JSON.parse(savedValidated));
    }
    
    if (savedPending) {
      setPendingBusinesses(JSON.parse(savedPending));
    }
  }, []);

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('validatedBusinesses', JSON.stringify(validatedBusinesses));
  }, [validatedBusinesses]);

  useEffect(() => {
    localStorage.setItem('pendingBusinesses', JSON.stringify(pendingBusinesses));
  }, [pendingBusinesses]);

  const approveBusiness = (businessId) => {
    const business = pendingBusinesses.find(b => b.id === businessId);
    if (business) {
      const validatedBusiness = {
        ...business,
        status: 'validated',
        validatedAt: new Date().toISOString()
      };
      
      setValidatedBusinesses(prev => [...prev, validatedBusiness]);
      setPendingBusinesses(prev => prev.filter(b => b.id !== businessId));
      
      return validatedBusiness;
    }
    return null;
  };

  const rejectBusiness = (businessId) => {
    setPendingBusinesses(prev => prev.filter(b => b.id !== businessId));
  };

  const getBusinessesByCategory = (category) => {
    return validatedBusinesses.filter(business => business.category === category);
  };

  const addNewBusiness = (businessData) => {
    const newBusiness = {
      id: Date.now(),
      ...businessData,
      status: 'pending'
    };
    setPendingBusinesses(prev => [...prev, newBusiness]);
    return newBusiness;
  };

  const removeValidatedBusiness = (businessId) => {
    setValidatedBusinesses(prev => prev.filter(b => b.id !== businessId));
  };

  const value = {
    validatedBusinesses,
    pendingBusinesses,
    approveBusiness,
    rejectBusiness,
    getBusinessesByCategory,
    addNewBusiness,
    removeValidatedBusiness
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};