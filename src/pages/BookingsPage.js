import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Mail, X, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { useBusiness } from '../contexts/BusinessContext';
import EnhancedShareButton from '../components/EnhancedShareButton';

const BookingsPage = () => {
  const { bookings, getUpcomingBookings, getPastBookings, cancelBooking } = useBooking();
  const { getBusinessById, validatedBusinesses, pendingBusinesses } = useBusiness();
  
  // Fonction helper pour obtenir une entreprise
  const getBusiness = (businessId) => {
    return getBusinessById ? getBusinessById(businessId) : 
      [...validatedBusinesses, ...pendingBusinesses].find(b => 
        b.id === businessId || b.id === parseInt(businessId)
      );
  };
  const [activeTab, setActiveTab] = useState('upcoming'); // upcoming, past

  const upcomingBookings = getUpcomingBookings();
  const pastBookings = getPastBookings();

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      case 'completed': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={20} color="#10b981" />;
      case 'pending': return <AlertCircle size={20} color="#f59e0b" />;
      case 'cancelled': return <X size={20} color="#ef4444" />;
      case 'completed': return <CheckCircle size={20} color="#6b7280" />;
      default: return <AlertCircle size={20} color="#6b7280" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmée';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulée';
      case 'completed': return 'Terminée';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      await cancelBooking(bookingId);
    }
  };

  const renderBookingCard = (booking) => {
    const business = getBusiness(booking.businessId);

    return (
      <motion.div
        key={booking.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '1.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: `2px solid ${getStatusColor(booking.status)}20`,
          marginBottom: '1rem'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.5rem'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#374151'
              }}>
                {booking.businessName || business?.name || 'Entreprise'}
              </h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.25rem 0.75rem',
                backgroundColor: `${getStatusColor(booking.status)}20`,
                color: getStatusColor(booking.status),
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {getStatusIcon(booking.status)}
                {getStatusText(booking.status)}
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              fontSize: '0.875rem',
              color: '#6b7280',
              marginBottom: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar size={16} />
                {formatDate(booking.date)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={16} />
                {formatTime(booking.time)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span>👥</span>
                {booking.partySize} personne{booking.partySize > 1 ? 's' : ''}
              </div>
            </div>
            {business?.address && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                <MapPin size={16} />
                {business.address}
              </div>
            )}
          </div>
        </div>

        {/* Informations client */}
        {booking.customerInfo && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.75rem',
            marginBottom: '1rem'
          }}>
            <h4 style={{
              margin: 0,
              marginBottom: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151'
            }}>
              Vos informations
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.75rem',
              fontSize: '0.875rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280' }}>
                <span>👤</span>
                {booking.customerInfo.name}
              </div>
              {booking.customerInfo.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280' }}>
                  <Phone size={14} />
                  {booking.customerInfo.phone}
                </div>
              )}
              {booking.customerInfo.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6b7280' }}>
                  <Mail size={14} />
                  {booking.customerInfo.email}
                </div>
              )}
            </div>
            {booking.customerInfo.specialRequests && (
              <div style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                color: '#374151'
              }}>
                <strong>Demandes spéciales:</strong> {booking.customerInfo.specialRequests}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          {booking.status !== 'cancelled' && booking.status !== 'completed' && (
            <button
              onClick={() => handleCancelBooking(booking.id)}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: '#fee2e2',
                color: '#dc2626',
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
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fecaca'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
            >
              <Trash2 size={18} />
              Annuler
            </button>
          )}
          <EnhancedShareButton
            variant="default"
            title={`Réservation chez ${booking.businessName}`}
            text={`Réservation le ${formatDate(booking.date)} à ${formatTime(booking.time)}`}
            url={`${window.location.origin}/booking/${booking.id}`}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      fontFamily: 'Inter, sans-serif',
      padding: '2rem 0'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{
            margin: 0,
            marginBottom: '0.5rem',
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1f2937'
          }}>
            📅 Mes Réservations
          </h1>
          <p style={{
            margin: 0,
            fontSize: '1rem',
            color: '#6b7280'
          }}>
            Gérez toutes vos réservations
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          backgroundColor: 'white',
          padding: '0.5rem',
          borderRadius: '0.75rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}>
          <button
            onClick={() => setActiveTab('upcoming')}
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              backgroundColor: activeTab === 'upcoming' ? '#3b82f6' : 'transparent',
              color: activeTab === 'upcoming' ? 'white' : '#374151',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            À venir ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              backgroundColor: activeTab === 'past' ? '#3b82f6' : 'transparent',
              color: activeTab === 'past' ? 'white' : '#374151',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            Passées ({pastBookings.length})
          </button>
        </div>

        {/* Liste des réservations */}
        {activeTab === 'upcoming' ? (
          upcomingBookings.length > 0 ? (
            <div>
              {upcomingBookings.map(booking => renderBookingCard(booking))}
            </div>
          ) : (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '3rem',
              textAlign: 'center',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <Calendar size={64} color="#d1d5db" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{
                margin: 0,
                marginBottom: '0.5rem',
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Aucune réservation à venir
              </h3>
              <p style={{
                margin: 0,
                color: '#6b7280'
              }}>
                Vous n'avez pas de réservation à venir
              </p>
            </div>
          )
        ) : (
          pastBookings.length > 0 ? (
            <div>
              {pastBookings.map(booking => renderBookingCard(booking))}
            </div>
          ) : (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '3rem',
              textAlign: 'center',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <Calendar size={64} color="#d1d5db" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{
                margin: 0,
                marginBottom: '0.5rem',
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Aucune réservation passée
              </h3>
              <p style={{
                margin: 0,
                color: '#6b7280'
              }}>
                Vous n'avez pas encore de réservation passée
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BookingsPage;

