import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const PartnerContext = createContext();

export const usePartner = () => {
  const context = useContext(PartnerContext);
  if (!context) {
    throw new Error('usePartner must be used within a PartnerProvider');
  }
  return context;
};

const STORAGE_KEY = 'partners';

const defaultPartners = [
  {
    id: 1,
    name: 'Orange Guinée',
    url: 'https://www.orange-guinee.com',
    logo: '🟠',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'MTN Guinée',
    url: 'https://mtn.gn',
    logo: '🟡',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Ecobank Guinée',
    url: 'https://www.ecobank.com/gn',
    logo: '🟢',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export const PartnerProvider = ({ children }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const storedPartners = localStorage.getItem(STORAGE_KEY);
      if (storedPartners) {
        setPartners(JSON.parse(storedPartners));
      } else {
        setPartners(defaultPartners);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPartners));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des partenaires:', error);
      setPartners(defaultPartners);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(partners));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des partenaires:', error);
    }
  }, [partners]);

  const createPartner = async ({ name, url, logo }) => {
    if (!name?.trim()) {
      toast.error('Le nom du partenaire est requis');
      return null;
    }

    const newPartner = {
      id: Date.now(),
      name: name.trim(),
      url: url?.trim() || '',
      logo: logo || '',
      isActive: true,
      createdAt: new Date().toISOString()
    };

    setPartners((prev) => [...prev, newPartner]);
    toast.success('Partenaire ajouté avec succès !');
    return newPartner;
  };

  const updatePartner = async (partnerId, updateData) => {
    setPartners((prev) =>
      prev.map((partner) =>
        partner.id === partnerId ? { ...partner, ...updateData, updatedAt: new Date().toISOString() } : partner
      )
    );
    toast.success('Partenaire mis à jour !');
    return true;
  };

  const deletePartner = async (partnerId) => {
    setPartners((prev) => prev.filter((partner) => partner.id !== partnerId));
    toast.success('Partenaire supprimé.');
    return true;
  };

  const togglePartnerActive = async (partnerId) => {
    setPartners((prev) =>
      prev.map((partner) =>
        partner.id === partnerId ? { ...partner, isActive: !partner.isActive, updatedAt: new Date().toISOString() } : partner
      )
    );
    return true;
  };

  const getActivePartners = () => partners.filter((partner) => partner.isActive);

  const value = useMemo(
    () => ({
      partners,
      loading,
      createPartner,
      updatePartner,
      deletePartner,
      togglePartnerActive,
      getActivePartners
    }),
    [partners, loading]
  );

  return <PartnerContext.Provider value={value}>{children}</PartnerContext.Provider>;
};
