import React, { useState } from 'react';
import { useAdvertisement } from '../contexts/AdvertisementContext';
import { useBusiness } from '../contexts/BusinessContext';
import MediaUpload from './MediaUpload';
import toast from 'react-hot-toast';

const AdvertisementManager = () => {
  const { advertisements, createAdvertisement, updateAdvertisement, deleteAdvertisement, toggleAdvertisement, loading } = useAdvertisement();
  const { validatedBusinesses } = useBusiness();
  const [showForm, setShowForm] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    businessId: '',
    startDate: '',
    endDate: '',
    media: null
  });
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'inactive'

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.businessId) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const selectedBusiness = validatedBusinesses.find(b => b.id === parseInt(formData.businessId));
    
    const adData = {
      ...formData,
      businessName: selectedBusiness?.name || 'Entreprise inconnue',
      category: selectedBusiness?.category || 'autre',
      businessId: parseInt(formData.businessId)
    };

    if (editingAd) {
      await updateAdvertisement(editingAd.id, adData);
      setEditingAd(null);
    } else {
      await createAdvertisement(adData);
    }

    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      businessId: '',
      startDate: '',
      endDate: '',
      media: null
    });
  };

  const handleEdit = (ad) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      description: ad.description,
      businessId: ad.businessId.toString(),
      startDate: ad.startDate.split('T')[0],
      endDate: ad.endDate.split('T')[0],
      media: ad.media || (ad.imageUrl ? { url: ad.imageUrl, type: 'image' } : null)
    });
    setShowForm(true);
  };

  const handleDelete = async (adId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette publicité ?')) {
      await deleteAdvertisement(adId);
    }
  };

  const handleToggle = async (adId) => {
    await toggleAdvertisement(adId);
  };

  // Filtrer les publicités selon le filtre sélectionné
  const filteredAdvertisements = advertisements.filter(ad => {
    switch (filter) {
      case 'active':
        return ad.isActive;
      case 'inactive':
        return !ad.isActive;
      default:
        return true;
    }
  });

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#374151', margin: '0 0 0.5rem 0' }}>
            📢 Gestion des Publicités
          </h2>
          <div style={{
            display: 'flex',
            gap: '1rem',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            <span>✅ {advertisements.filter(ad => ad.isActive).length} Actives</span>
            <span>❌ {advertisements.filter(ad => !ad.isActive).length} Inactives</span>
            <span>📊 {advertisements.length} Total</span>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          + Nouvelle Publicité
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#374151' }}>
            {editingAd ? 'Modifier la Publicité' : 'Créer une Nouvelle Publicité'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Titre *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                  placeholder="Titre de la publicité"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Entreprise *
                </label>
                <select
                  value={formData.businessId}
                  onChange={(e) => setFormData({ ...formData, businessId: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Sélectionner une entreprise</option>
                  {validatedBusinesses.map(business => (
                    <option key={business.id} value={business.id}>
                      {business.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
                placeholder="Description de la publicité"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Date de début
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Date de fin
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                Média (Image ou Vidéo)
              </label>
              <MediaUpload
                onMediaChange={(media) => setFormData({ ...formData, media })}
                initialMedia={formData.media}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1
                }}
              >
                {loading ? 'En cours...' : (editingAd ? 'Modifier' : 'Créer')}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingAd(null);
                  resetForm();
                }}
                style={{
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filtres */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.75rem',
        marginBottom: '1.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
          🔍 Filtrer les Publicités
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: '📊 Toutes', count: advertisements.length },
            { key: 'active', label: '✅ Actives', count: advertisements.filter(ad => ad.isActive).length },
            { key: 'inactive', label: '❌ Inactives', count: advertisements.filter(ad => !ad.isActive).length }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: filter === key ? '#3b82f6' : '#f3f4f6',
                color: filter === key ? 'white' : '#374151',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
              onMouseEnter={(e) => {
                if (filter !== key) {
                  e.target.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== key) {
                  e.target.style.backgroundColor = '#f3f4f6';
                }
              }}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Liste des publicités */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredAdvertisements.map(ad => (
          <div
            key={ad.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: `2px solid ${ad.isActive ? '#10b981' : '#ef4444'}`
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <h4 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#374151',
                margin: 0,
                flex: 1
              }}>
                {ad.title}
              </h4>
              
              {/* Toggle Switch pour Activer/Désactiver */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  color: ad.isActive ? '#059669' : '#6b7280',
                  fontWeight: '600'
                }}>
                  {ad.isActive ? 'Actif' : 'Inactif'}
                </span>
                <button
                  onClick={() => handleToggle(ad.id)}
                  style={{
                    width: '50px',
                    height: '25px',
                    backgroundColor: ad.isActive ? '#10b981' : '#e5e7eb',
                    borderRadius: '25px',
                    border: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <div style={{
                    width: '21px',
                    height: '21px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: ad.isActive ? '27px' : '2px',
                    transition: 'left 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}></div>
                </button>
              </div>
            </div>

            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              marginBottom: '1rem',
              lineHeight: '1.5'
            }}>
              {ad.description}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.5rem',
              marginBottom: '1rem',
              fontSize: '0.75rem',
              color: '#6b7280'
            }}>
              <div>👁️ {ad.views} vues</div>
              <div>👆 {ad.clicks} clics</div>
              <div>📅 {new Date(ad.startDate).toLocaleDateString('fr-FR')}</div>
              <div>📅 {new Date(ad.endDate).toLocaleDateString('fr-FR')}</div>
            </div>

            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => handleEdit(ad)}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                ✏️ Modifier
              </button>
              
              
              <button
                onClick={() => handleDelete(ad.id)}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {advertisements.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#6b7280'
        }}>
          <p style={{ fontSize: '1.125rem' }}>Aucune publicité créée</p>
          <p>Cliquez sur "Nouvelle Publicité" pour commencer</p>
        </div>
      )}
    </div>
  );
};

export default AdvertisementManager;
