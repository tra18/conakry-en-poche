import React from 'react';

const BusinessCard = ({ business }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'hotels': '🏨',
      'restaurants': '🍽️',
      'loisirs': '🎭',
      'administrations': '🏛️',
      'hopitaux': '🏥',
      'pharmacies': '💊',
      'entreprises': '🏢',
      'aires-jeux': '🎠',
      'ecoles': '🎓',
      'universites': '🏫'
    };
    return icons[category] || '🏢';
  };

  const getOpeningStatus = (workingHours) => {
    if (!workingHours) return { status: 'unknown', text: 'Horaires non renseignés', color: '#6b7280' };
    
    const now = new Date();
    const currentDay = now.toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
    
    const todayHours = workingHours[currentDay];
    if (!todayHours || todayHours.closed) {
      return { status: 'closed', text: 'Fermé', color: '#ef4444' };
    }
    
    const openTime = todayHours.open;
    const closeTime = todayHours.close;
    
    if (!openTime || !closeTime) {
      return { status: 'unknown', text: 'Horaires non renseignés', color: '#6b7280' };
    }
    
    // Convertir les heures en minutes pour faciliter la comparaison
    const timeToMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };
    
    const currentMinutes = timeToMinutes(currentTime);
    const openMinutes = timeToMinutes(openTime);
    const closeMinutes = timeToMinutes(closeTime);
    
    // Vérifier si on est dans les 30 minutes avant la fermeture
    const thirtyMinutesBeforeClose = closeMinutes - 30;
    
    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      if (currentMinutes >= thirtyMinutesBeforeClose) {
        return { status: 'closing-soon', text: 'Ferme bientôt', color: '#f59e0b' };
      }
      return { status: 'open', text: 'Ouvert', color: '#10b981' };
    }
    
    return { status: 'closed', text: 'Fermé', color: '#ef4444' };
  };

  const getCategoryName = (category) => {
    const names = {
      'hotels': 'Hôtels',
      'restaurants': 'Restaurants',
      'loisirs': 'Loisirs',
      'administrations': 'Administrations',
      'hopitaux': 'Hôpitaux',
      'pharmacies': 'Pharmacies',
      'entreprises': 'Entreprises',
      'aires-jeux': 'Aires de Jeux',
      'ecoles': 'Écoles',
      'universites': 'Universités'
    };
    return names[category] || 'Entreprise';
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      border: '1px solid #e5e7eb',
      transition: 'box-shadow 0.3s, transform 0.3s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.target.style.boxShadow = '0 8px 15px rgba(0,0,0,0.15)';
      e.target.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      e.target.style.transform = 'translateY(0)';
    }}
    >
      {/* Header avec icône et nom */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <div style={{
          width: '3rem',
          height: '3rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '1rem',
          fontSize: '1.5rem'
        }}>
          {getCategoryIcon(business.category)}
        </div>
        <div>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0,
            marginBottom: '0.25rem'
          }}>
            {business.name}
          </h3>
          <span style={{
            fontSize: '0.75rem',
            color: '#6b7280',
            backgroundColor: '#f3f4f6',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem'
          }}>
            {getCategoryName(business.category)}
          </span>
        </div>
      </div>

      {/* Description */}
      {business.description && (
        <p style={{
          color: '#4b5563',
          fontSize: '0.875rem',
          lineHeight: '1.4',
          marginBottom: '1rem'
        }}>
          {business.description}
        </p>
      )}

      {/* Statut d'ouverture */}
      {business.workingHours && (
        <div style={{
          marginBottom: '1rem',
          padding: '0.75rem',
          backgroundColor: '#f9fafb',
          borderRadius: '0.5rem',
          border: '1px solid #e5e7eb'
        }}>
          {(() => {
            const status = getOpeningStatus(business.workingHours);
            return (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: status.color
                  }}></div>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: status.color
                  }}>
                    {status.text}
                  </span>
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#6b7280'
                }}>
                  {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })()}
          
          {/* Horaires d'aujourd'hui */}
          {(() => {
            const now = new Date();
            const currentDay = now.toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();
            const todayHours = business.workingHours[currentDay];
            
            if (todayHours) {
              if (todayHours.closed) {
                return (
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    textAlign: 'center'
                  }}>
                    Aujourd'hui: Fermé
                  </div>
                );
              } else if (todayHours.open && todayHours.close) {
                return (
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    textAlign: 'center'
                  }}>
                    Aujourd'hui: {todayHours.open} - {todayHours.close}
                  </div>
                );
              }
            }
            
            // Si pas d'horaires pour aujourd'hui, afficher les horaires de la semaine
            return (
              <div style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                textAlign: 'center'
              }}>
                Horaires non renseignés
              </div>
            );
          })()}
          
          {/* Horaires de la semaine */}
          <div style={{
            marginTop: '0.75rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              Horaires de la semaine:
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.25rem',
              fontSize: '0.7rem',
              color: '#6b7280'
            }}>
              {Object.entries(business.workingHours).map(([day, hours]) => {
                const dayName = day.charAt(0).toUpperCase() + day.slice(1);
                const isToday = new Date().toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase() === day;
                
                return (
                  <div key={day} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: isToday ? '600' : '400',
                    color: isToday ? '#374151' : '#6b7280'
                  }}>
                    <span>{dayName}:</span>
                    <span>
                      {hours.closed ? 'Fermé' : (hours.open && hours.close ? `${hours.open}-${hours.close}` : '--')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Informations de contact */}
      <div style={{
        borderTop: '1px solid #e5e7eb',
        paddingTop: '1rem'
      }}>
        {business.address && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            <span style={{ marginRight: '0.5rem' }}>📍</span>
            <span>{business.address}</span>
          </div>
        )}
        
        {business.phone && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            <span style={{ marginRight: '0.5rem' }}>📞</span>
            <span>{business.phone}</span>
          </div>
        )}
        
        {business.email && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            <span style={{ marginRight: '0.5rem' }}>📧</span>
            <span>{business.email}</span>
          </div>
        )}
      </div>

    </div>
  );
};

export default BusinessCard;
