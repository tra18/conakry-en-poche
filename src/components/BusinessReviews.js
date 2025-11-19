import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, Flag, MessageCircle, User } from 'lucide-react';
import { useReview } from '../contexts/ReviewContext';
import RatingSystem from './RatingSystem';
import { motion, AnimatePresence } from 'framer-motion';

const BusinessReviews = ({ businessId, businessName }) => {
  const { reviews, loadReviews, getAverageRating, getReviewCount, markHelpful, reportReview } = useReview();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [businessReviews, setBusinessReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (businessId) {
      loadBusinessReviews();
    }
  }, [businessId]);

  const loadBusinessReviews = async () => {
    setLoading(true);
    try {
      const loadedReviews = await loadReviews(businessId);
      setBusinessReviews(loadedReviews || []);
      setAverageRating(getAverageRating(businessId));
      setReviewCount(getReviewCount(businessId));
    } catch (error) {
      console.error('Erreur lors du chargement des avis:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      await loadBusinessReviews();
      setShowReviewForm(false);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        style={{
          color: i < Math.round(rating) ? '#fbbf24' : '#d1d5db',
          fill: i < Math.round(rating) ? '#fbbf24' : 'transparent'
        }}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      marginTop: '1rem',
      border: '1px solid #e5e7eb'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}>
        <div>
          <h3 style={{
            margin: 0,
            marginBottom: '0.5rem',
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1f2937'
          }}>
            Avis et Notes
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {getRatingStars(averageRating)}
              </div>
              <span style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#374151',
                marginLeft: '0.5rem'
              }}>
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span style={{
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              ({reviewCount} avis)
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#3b82f6';
          }}
        >
          <MessageCircle size={18} />
          {showReviewForm ? 'Annuler' : 'Donner un avis'}
        </button>
      </div>

      {/* Formulaire d'avis */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb'
            }}
          >
            <RatingSystem
              businessId={businessId}
              businessName={businessName}
              onReviewSubmit={handleReviewSubmit}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Liste des avis */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }} />
        </div>
      ) : businessReviews.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#6b7280'
        }}>
          <MessageCircle size={48} color="#d1d5db" style={{ margin: '0 auto 1rem' }} />
          <p style={{ margin: 0 }}>
            Aucun avis pour le moment. Soyez le premier à donner votre avis !
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {businessReviews.map((review) => (
            <div
              key={review.id}
              style={{
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'space-between',
                marginBottom: '0.75rem'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '0.875rem'
                    }}>
                      {review.userName?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div style={{
                        fontWeight: '600',
                        color: '#374151',
                        fontSize: '0.875rem'
                      }}>
                        {review.userName || 'Utilisateur anonyme'}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280'
                      }}>
                        {formatDate(review.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
                    {getRatingStars(review.rating)}
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginLeft: '0.5rem'
                    }}>
                      {review.rating}/5
                    </span>
                  </div>
                </div>
              </div>

              {review.comment && (
                <p style={{
                  margin: '0 0 0.75rem 0',
                  fontSize: '0.875rem',
                  color: '#374151',
                  lineHeight: '1.6'
                }}>
                  {review.comment}
                </p>
              )}

              {/* Images */}
              {review.images && review.images.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                  gap: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                      alt={`Review ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '0.5rem'
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Actions */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid #e5e7eb'
              }}>
                <button
                  onClick={() => markHelpful(review.id, businessId)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.5rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#6b7280';
                  }}
                >
                  <ThumbsUp size={14} />
                  Utile ({review.helpfulCount || 0})
                </button>
                <button
                  onClick={() => reportReview(review.id, businessId)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.5rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#ef4444';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#6b7280';
                  }}
                >
                  <Flag size={14} />
                  Signaler
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessReviews;

