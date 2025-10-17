import React, { useState, useEffect } from 'react';

const Notification = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: '#f0f9ff',
          border: '#10b981',
          text: '#065f46',
          icon: '#10b981'
        };
      case 'error':
        return {
          bg: '#fef2f2',
          border: '#ef4444',
          text: '#991b1b',
          icon: '#ef4444'
        };
      case 'warning':
        return {
          bg: '#fffbeb',
          border: '#f59e0b',
          text: '#92400e',
          icon: '#f59e0b'
        };
      case 'info':
        return {
          bg: '#f0f9ff',
          border: '#3b82f6',
          text: '#1e40af',
          icon: '#3b82f6'
        };
      default:
        return {
          bg: '#f9fafb',
          border: '#6b7280',
          text: '#374151',
          icon: '#6b7280'
        };
    }
  };

  const colors = getColors();

  return (
    <div
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 9999,
        backgroundColor: colors.bg,
        border: `2px solid ${colors.border}`,
        borderRadius: '0.75rem',
        padding: '1rem 1.5rem',
        maxWidth: '400px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
        opacity: isExiting ? 0 : 1,
        transition: 'all 0.3s ease-in-out',
        animation: 'slideInRight 0.3s ease-out'
      }}
    >
      <div style={{
        fontSize: '1.25rem',
        color: colors.icon,
        flexShrink: 0
      }}>
        {getIcon()}
      </div>
      
      <div style={{ flex: 1 }}>
        <p style={{
          margin: 0,
          color: colors.text,
          fontSize: '0.875rem',
          fontWeight: '500',
          lineHeight: '1.4'
        }}>
          {message}
        </p>
      </div>

      <button
        onClick={handleClose}
        style={{
          background: 'none',
          border: 'none',
          color: colors.icon,
          cursor: 'pointer',
          padding: '0.25rem',
          borderRadius: '0.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          transition: 'background-color 0.2s',
          flexShrink: 0
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
        }}
      >
        ✕
      </button>

      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

// Hook pour utiliser les notifications
export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);
    
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const showSuccess = (message, duration = 3000) => {
    return showNotification(message, 'success', duration);
  };

  const showError = (message, duration = 5000) => {
    return showNotification(message, 'error', duration);
  };

  const showWarning = (message, duration = 4000) => {
    return showNotification(message, 'warning', duration);
  };

  const showInfo = (message, duration = 3000) => {
    return showNotification(message, 'info', duration);
  };

  const NotificationContainer = () => (
    <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );

  return {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeNotification,
    NotificationContainer
  };
};

export default Notification;
