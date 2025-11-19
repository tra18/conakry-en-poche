import React, { useState } from 'react';
import { usePushNotification } from '../contexts/PushNotificationContext';
import { Bell, BellOff, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

const NotificationSettings = ({ onClose }) => {
  const { settings, saveSettings, permission, requestPermission } = usePushNotification();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleToggle = (key) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    saveSettings(localSettings);
    onClose();
  };

  const notificationTypes = [
    {
      key: 'newBusinesses',
      label: 'Alertes sur les nouvelles entreprises',
      description: 'Recevoir des notifications quand de nouvelles entreprises sont validées',
      icon: '🏢'
    },
    {
      key: 'promotions',
      label: 'Promotions et offres spéciales',
      description: 'Être informé des promotions et offres spéciales des entreprises',
      icon: '🎁'
    },
    {
      key: 'bookingReminders',
      label: 'Rappels de réservations',
      description: 'Recevoir des rappels 24h et 2h avant vos réservations',
      icon: '📅'
    },
    {
      key: 'trafficAlerts',
      label: 'Alertes trafic personnalisées',
      description: 'Notifications sur les conditions de trafic dans vos zones favorites',
      icon: '🚦'
    },
    {
      key: 'eventAlerts',
      label: 'Alertes d\'événements',
      description: 'Notifications sur les événements à venir',
      icon: '🎉'
    },
    {
      key: 'weeklyDigest',
      label: 'Résumé hebdomadaire',
      description: 'Recevoir un résumé hebdomadaire des nouveautés',
      icon: '📰'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
            Paramètres de notifications
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={24} color="#6b7280" />
          </button>
        </div>

        {permission !== 'granted' && (
          <div
            style={{
              backgroundColor: '#fef3c7',
              border: '1px solid #fbbf24',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <BellOff size={24} color="#f59e0b" />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: '600', color: '#92400e', marginBottom: '0.25rem' }}>
                Notifications désactivées
              </p>
              <p style={{ fontSize: '0.875rem', color: '#78350f' }}>
                Activez les notifications du navigateur pour recevoir les alertes
              </p>
            </div>
            <button
              onClick={requestPermission}
              style={{
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Activer
            </button>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notificationTypes.map((type) => (
            <div
              key={type.key}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                padding: '1rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}
            >
              <div style={{ fontSize: '2rem' }}>{type.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                    {type.label}
                  </h3>
                  <label
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '48px',
                      height: '24px'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={localSettings[type.key] || false}
                      onChange={() => handleToggle(type.key)}
                      style={{
                        opacity: 0,
                        width: 0,
                        height: 0
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: localSettings[type.key] ? '#10b981' : '#d1d5db',
                        borderRadius: '24px',
                        transition: 'background-color 0.3s'
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          content: '""',
                          height: '18px',
                          width: '18px',
                          left: '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: 'transform 0.3s',
                          transform: localSettings[type.key] ? 'translateX(24px)' : 'translateX(0)'
                        }}
                      />
                    </span>
                  </label>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {type.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              backgroundColor: 'white',
              color: '#374151',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            style={{
              flex: 1,
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '0.5rem',
              backgroundColor: '#0066FF',
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <Save size={20} />
            Enregistrer
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NotificationSettings;






