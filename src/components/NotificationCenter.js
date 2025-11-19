import React, { useState } from 'react';
import { usePushNotification } from '../contexts/PushNotificationContext';
import { Bell, BellOff, X, Settings, Check, Trash2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import NotificationSettings from './NotificationSettings';

const NotificationCenter = () => {
  const {
    notifications,
    unreadCount,
    permission,
    requestPermission,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = usePushNotification();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }

    // Naviguer selon le type de notification
    if (notification.data?.action === 'view_business') {
      window.location.href = `/category/${notification.data.category}`;
    } else if (notification.data?.action === 'view_booking') {
      window.location.href = '/bookings';
    } else if (notification.data?.action === 'view_traffic') {
      window.location.href = '/traffic-map';
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      newBusinesses: '🏢',
      promotions: '🎁',
      bookingReminders: '📅',
      trafficAlerts: '🚦',
      eventAlerts: '🎉',
      weeklyDigest: '📰'
    };
    return icons[type] || '🔔';
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'relative',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.75rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.5rem',
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                width: '380px',
                maxHeight: '500px',
                overflow: 'hidden',
                zIndex: 1000,
                border: '1px solid #e5e7eb'
              }}
            >
              <div
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
                  Notifications
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => {
                        markAllAsRead();
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        color: '#6b7280',
                        fontSize: '0.75rem'
                      }}
                      title="Tout marquer comme lu"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => setShowSettings(true)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      color: '#6b7280'
                    }}
                    title="Paramètres"
                  >
                    <Settings size={16} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      color: '#6b7280'
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {permission !== 'granted' && (
                  <div
                    style={{
                      padding: '1rem',
                      backgroundColor: '#fef3c7',
                      borderBottom: '1px solid #fbbf24',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <BellOff size={20} color="#f59e0b" />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#92400e', marginBottom: '0.25rem' }}>
                        Notifications désactivées
                      </p>
                      <button
                        onClick={requestPermission}
                        style={{
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          padding: '0.375rem 0.75rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Activer
                      </button>
                    </div>
                  </div>
                )}

                {notifications.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                    <Bell size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                    <p>Aucune notification</p>
                  </div>
                ) : (
                  notifications.slice(0, 10).map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      style={{
                        padding: '1rem',
                        borderBottom: '1px solid #e5e7eb',
                        cursor: 'pointer',
                        backgroundColor: notification.read ? 'white' : '#eff6ff',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = notification.read ? 'white' : '#eff6ff';
                      }}
                    >
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <div style={{ fontSize: '1.5rem' }}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              fontSize: '0.875rem',
                              fontWeight: notification.read ? '400' : '600',
                              color: '#1f2937',
                              marginBottom: '0.25rem'
                            }}
                          >
                            {notification.title}
                          </p>
                          <p
                            style={{
                              fontSize: '0.75rem',
                              color: '#6b7280',
                              marginBottom: '0.5rem'
                            }}
                          >
                            {notification.body}
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.625rem', color: '#9ca3af' }}>
                              {new Date(notification.createdAt).toLocaleDateString('fr-FR')}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.25rem',
                                color: '#9ca3af'
                              }}
                              title="Supprimer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showSettings && (
        <NotificationSettings onClose={() => setShowSettings(false)} />
      )}
    </>
  );
};

export default NotificationCenter;






