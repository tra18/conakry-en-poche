import React, { useState, useEffect } from 'react';
import GPSNavigation from './GPSNavigation';
import BusinessHours from './BusinessHours';
import BusinessReviews from './BusinessReviews';
import BookingSystem from './BookingSystem';
import EnhancedShareButton from './EnhancedShareButton';
import { useFavorites } from '../contexts/FavoritesContext';
import { useReview } from '../contexts/ReviewContext';
import { Heart, Star, List, Plus, Calendar } from 'lucide-react';
import CustomListsManager from './CustomListsManager';

const BusinessCard = ({ business, showAdminActions = false, onApprove, onReject }) => {
  const [showGPS, setShowGPS] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showListsManager, setShowListsManager] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites, lists, addBusinessToList } = useFavorites();
  const { getAverageRating, getReviewCount, loadReviews } = useReview();
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const isInFavorites = isFavorite(business.id);

  useEffect(() => {
    if (business.id) {
      loadReviews(business.id).then(() => {
        setAverageRating(getAverageRating(business.id));
        setReviewCount(getReviewCount(business.id));
      });
    }
  }, [business.id]);

  const getCategoryIcon = (category) => {
    const icons = {
      restaurants: '🍽️',
      hotels: '🏨',
      pharmacies: '💊',
      hopitaux: '🏥',
      ecoles: '🏫',
      administrations: '🏛️',
      banques: '🏦',
      loisirs: '🎯',
      transport: '🚌',
      shopping: '🛍️',
      default: '📍'
    };
    return icons[category] || icons.default;
  };

  const getCategoryColor = (category) => {
    const colors = {
      restaurants: '#ef4444',
      hotels: '#3b82f6',
      pharmacies: '#10b981',
      hopitaux: '#f59e0b',
      ecoles: '#8b5cf6',
      administrations: '#6366f1',
      banques: '#059669',
      loisirs: '#ec4899',
      transport: '#f97316',
      shopping: '#84cc16',
      default: '#6b7280'
    };
    return colors[category] || colors.default;
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)} m`;
    }
    return `${distance.toFixed(1)} km`;
  };

  return (
    <>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: `2px solid ${getCategoryColor(business.category)}20`,
        transition: 'all 0.3s ease',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      }}>
        {/* Header avec icône et nom */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{
            fontSize: '2rem',
            backgroundColor: `${getCategoryColor(business.category)}20`,
            padding: '0.75rem',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {getCategoryIcon(business.category)}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{
              margin: '0 0 0.25rem 0',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#374151'
            }}>
              {business.name}
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap'
            }}>
              <p style={{
                margin: 0,
                fontSize: '0.875rem',
                color: '#6b7280',
                textTransform: 'capitalize'
              }}>
                {business.category}
              </p>
              {averageRating > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.875rem'
                }}>
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <span style={{ color: '#374151', fontWeight: '600' }}>
                    {averageRating.toFixed(1)}
                  </span>
                  {reviewCount > 0 && (
                    <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                      ({reviewCount})
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Bouton favoris */}
          <button
            onClick={() => {
              if (isInFavorites) {
                removeFromFavorites(business.id);
              } else {
                addToFavorites(business);
              }
            }}
            style={{
              padding: '0.5rem',
              backgroundColor: isInFavorites ? '#ef4444' : 'transparent',
              border: `2px solid ${isInFavorites ? '#ef4444' : '#e5e7eb'}`,
              borderRadius: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: isInFavorites ? 'white' : '#6b7280',
              transition: 'all 0.2s'
            }}
            title={isInFavorites ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart size={20} fill={isInFavorites ? 'white' : 'none'} />
          </button>
          {/* Bouton listes */}
          <button
            onClick={() => setShowListsManager(true)}
            style={{
              padding: '0.5rem',
              backgroundColor: 'transparent',
              border: '2px solid #3b82f6',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: '#3b82f6',
              transition: 'all 0.2s'
            }}
            title="Ajouter à une liste"
          >
            <List size={20} />
          </button>
          {business.coordinates && (
            <button
              onClick={() => setShowGPS(true)}
              style={{
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#047857';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#059669';
                e.target.style.transform = 'scale(1)';
              }}
            >
              🗺️ GPS
            </button>
          )}
        </div>

        {/* Informations de contact */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div>
            <p style={{
              margin: '0 0 0.25rem 0',
              fontSize: '0.875rem',
              color: '#6b7280',
              fontWeight: '600'
            }}>
              📍 Adresse
            </p>
            <p style={{
              margin: 0,
              fontSize: '0.875rem',
              color: '#374151'
            }}>
              {business.address}
            </p>
          </div>
          
          <div>
            <p style={{
              margin: '0 0 0.25rem 0',
              fontSize: '0.875rem',
              color: '#6b7280',
              fontWeight: '600'
            }}>
              📞 Téléphone
            </p>
            <p style={{
              margin: 0,
              fontSize: '0.875rem',
              color: '#374151'
            }}>
              {business.phone}
            </p>
          </div>

          {business.email && (
            <div>
              <p style={{
                margin: '0 0 0.25rem 0',
                fontSize: '0.875rem',
                color: '#6b7280',
                fontWeight: '600'
              }}>
                📧 Email
              </p>
              <p style={{
                margin: 0,
                fontSize: '0.875rem',
                color: '#374151'
              }}>
                {business.email}
              </p>
            </div>
          )}
        </div>

        {/* Horaires */}
        {business.schedule && (
          <BusinessHours hours={{ schedule: business.schedule }} />
        )}

        {/* Description */}
        {business.description && (
          <div style={{ marginBottom: '1rem' }}>
            <p style={{
              margin: '0 0 0.25rem 0',
              fontSize: '0.875rem',
              color: '#6b7280',
              fontWeight: '600'
            }}>
              📝 Description
            </p>
            <p style={{
              margin: 0,
              fontSize: '0.875rem',
              color: '#374151',
              lineHeight: '1.5'
            }}>
              {business.description}
            </p>
          </div>
        )}

        {/* Informations GPS */}
        {business.coordinates && (
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            marginBottom: '1rem'
          }}>
            <p style={{
              margin: '0 0 0.25rem 0',
              fontSize: '0.75rem',
              color: '#059669',
              fontWeight: '600'
            }}>
              📍 Coordonnées GPS disponibles
            </p>
            <p style={{
              margin: 0,
              fontSize: '0.75rem',
              color: '#047857'
            }}>
              Précision: {business.coordinates.precision === 'high' ? 'Élevée' : 'Moyenne'}
            </p>
          </div>
        )}

        {/* Boutons d'action */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '0.75rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e5e7eb',
          marginTop: '1rem'
        }}>
          <button
            onClick={() => setShowReviews(!showReviews)}
            style={{
              padding: '0.75rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#2563eb';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#3b82f6';
            }}
          >
            <Star size={18} />
            {showReviews ? 'Masquer' : 'Avis'}
          </button>
          {(business.category === 'restaurants' || business.category === 'hotels') && (
            <button
              onClick={() => setShowBooking(!showBooking)}
              style={{
                padding: '0.75rem',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#059669';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#10b981';
              }}
            >
              <Calendar size={18} />
              {showBooking ? 'Annuler' : 'Réserver'}
            </button>
          )}
          <EnhancedShareButton
            variant="default"
            title={business.name}
            text={`${business.name} - ${business.address}`}
            url={`${window.location.origin}/business/${business.id}`}
          />
        </div>

        {/* Avis */}
        {showReviews && (
          <BusinessReviews
            businessId={business.id}
            businessName={business.name}
          />
        )}

        {/* Système de réservation */}
        {showBooking && (
          <div style={{ marginTop: '1rem' }}>
            <BookingSystem
              business={business}
            />
          </div>
        )}

        {/* Actions administrateur */}
        {showAdminActions && (
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <button
              onClick={() => onApprove(business.id)}
              style={{
                flex: 1,
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#059669';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#10b981';
              }}
            >
              ✅ Approuver
            </button>
            <button
              onClick={() => onReject(business.id)}
              style={{
                flex: 1,
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#dc2626';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ef4444';
              }}
            >
              ❌ Rejeter
            </button>
          </div>
        )}

      </div>

      {/* Modal GPS Navigation */}
      {showGPS && (
        <GPSNavigation
          business={business}
          onClose={() => setShowGPS(false)}
        />
      )}

      {/* Modal Listes personnalisées */}
      {showListsManager && (
        <CustomListsManager
          onClose={() => setShowListsManager(false)}
          businessToAdd={business}
          onAddToList={(listId) => {
            setShowListsManager(false);
          }}
        />
      )}
    </>
  );
};

export default BusinessCard;