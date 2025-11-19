import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Star, MapPin, Clock, DollarSign, SlidersHorizontal } from 'lucide-react';
import { useBusiness } from '../contexts/BusinessContext';
import { motion, AnimatePresence } from 'framer-motion';

const BusinessAdvancedSearch = ({ onBusinessSelect, className = '' }) => {
  const { businesses } = useBusiness();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    minRating: 0,
    maxPrice: null,
    openNow: false,
    hasPhone: false,
    hasEmail: false
  });

  // Effectuer la recherche avec filtres
  useEffect(() => {
    if (searchQuery.trim().length < 2 && Object.values(filters).every(v => 
      v === 'all' || v === 0 || v === false || v === null
    )) {
      setSearchResults([]);
      return;
    }

    let results = [...businesses];

    // Filtre par texte
    if (searchQuery.trim().length >= 2) {
      const query = searchQuery.toLowerCase();
      results = results.filter(business =>
        business.name?.toLowerCase().includes(query) ||
        business.address?.toLowerCase().includes(query) ||
        business.description?.toLowerCase().includes(query) ||
        business.category?.toLowerCase().includes(query)
      );
    }

    // Filtre par catégorie
    if (filters.category !== 'all') {
      results = results.filter(business => business.category === filters.category);
    }

    // Filtre par note minimum
    if (filters.minRating > 0) {
      results = results.filter(business => {
        const rating = business.rating || business.averageRating || 0;
        return rating >= filters.minRating;
      });
    }

    // Filtre prix maximum (si disponible)
    if (filters.maxPrice) {
      results = results.filter(business => {
        const price = business.priceRange || business.price;
        if (!price) return true;
        // Simple parsing pour "5000-15000 GNF"
        const match = price.match(/\d+/);
        if (match) {
          return parseInt(match[0]) <= filters.maxPrice;
        }
        return true;
      });
    }

    // Filtre ouvert maintenant
    if (filters.openNow) {
      results = results.filter(business => business.isOpen !== false);
    }

    // Filtre avec téléphone
    if (filters.hasPhone) {
      results = results.filter(business => business.phone);
    }

    // Filtre avec email
    if (filters.hasEmail) {
      results = results.filter(business => business.email);
    }

    setSearchResults(results);
  }, [searchQuery, filters, businesses]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      minRating: 0,
      maxPrice: null,
      openNow: false,
      hasPhone: false,
      hasEmail: false
    });
    setSearchQuery('');
  };

  const hasActiveFilters = Object.values(filters).some(v => 
    v !== 'all' && v !== 0 && v !== false && v !== null
  ) || searchQuery.length >= 2;

  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'restaurants', name: 'Restaurants' },
    { id: 'hotels', name: 'Hôtels' },
    { id: 'pharmacies', name: 'Pharmacies' },
    { id: 'hopitaux', name: 'Hôpitaux' },
    { id: 'banques', name: 'Banques' },
    { id: 'ecoles', name: 'Écoles' },
    { id: 'universites', name: 'Universités' },
    { id: 'transport', name: 'Transport' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'loisirs', name: 'Loisirs' },
    { id: 'sport', name: 'Sport' },
    { id: 'beaute', name: 'Beauté' },
    { id: 'automobile', name: 'Automobile' },
    { id: 'administration', name: 'Administration' },
    { id: 'services', name: 'Services' }
  ];

  return (
    <div className={`business-advanced-search ${className}`} style={{ position: 'relative' }}>
      {/* Barre de recherche */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        padding: '0.75rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <Search size={20} color="#6b7280" />
        <input
          type="text"
          placeholder="Rechercher une entreprise, un service..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '1rem',
            color: '#374151'
          }}
        />
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              color: '#6b7280'
            }}
            title="Réinitialiser les filtres"
          >
            <X size={18} />
          </button>
        )}
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            background: showFilters ? '#3b82f6' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            color: showFilters ? 'white' : '#6b7280',
            transition: 'all 0.2s'
          }}
          title="Filtres avancés"
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Panneau de filtres */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '0.5rem',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              border: '1px solid #e5e7eb',
              zIndex: 1000
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {/* Catégorie */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Catégorie
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Note minimum */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Note minimum: {filters.minRating} ⭐
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    background: '#e5e7eb',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                />
              </div>

              {/* Prix maximum */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Prix max (GNF)
                </label>
                <input
                  type="number"
                  placeholder="Ex: 15000"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseInt(e.target.value) : null)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}
                />
              </div>

              {/* Cases à cocher */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  <input
                    type="checkbox"
                    checked={filters.openNow}
                    onChange={(e) => handleFilterChange('openNow', e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <Clock size={16} />
                  Ouvert maintenant
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  <input
                    type="checkbox"
                    checked={filters.hasPhone}
                    onChange={(e) => handleFilterChange('hasPhone', e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span>📞</span>
                  Avec téléphone
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  <input
                    type="checkbox"
                    checked={filters.hasEmail}
                    onChange={(e) => handleFilterChange('hasEmail', e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span>✉️</span>
                  Avec email
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Résultats de recherche */}
      {searchResults.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.5rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: '1px solid #e5e7eb',
          zIndex: 999,
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          <div style={{
            padding: '0.75rem',
            borderBottom: '1px solid #e5e7eb',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#6b7280'
          }}>
            {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
          </div>
          {searchResults.map((business, index) => (
            <div
              key={business.id}
              onClick={() => {
                if (onBusinessSelect) {
                  onBusinessSelect(business);
                }
                setSearchQuery('');
                setSearchResults([]);
              }}
              style={{
                padding: '1rem',
                borderBottom: index < searchResults.length - 1 ? '1px solid #e5e7eb' : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    margin: 0,
                    marginBottom: '0.25rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    {business.name}
                  </h4>
                  <p style={{
                    margin: 0,
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    textTransform: 'capitalize'
                  }}>
                    {business.category}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    {business.rating && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Star size={14} color="#fbbf24" fill="#fbbf24" />
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {business.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                    {business.address && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={14} color="#6b7280" />
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {business.address}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessAdvancedSearch;

