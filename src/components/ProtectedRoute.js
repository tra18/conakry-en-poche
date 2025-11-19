import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, AlertCircle, RefreshCw } from 'lucide-react';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, isAdmin, loading, userProfile, loadUserProfile } = useAuth();
  const location = useLocation();
  const [retryCount, setRetryCount] = useState(0);

  // Recharger le profil si nécessaire
  useEffect(() => {
    if (currentUser && !userProfile && retryCount < 3) {
      const timer = setTimeout(() => {
        loadUserProfile(currentUser.uid);
        setRetryCount(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentUser, userProfile, retryCount, loadUserProfile]);

  // Afficher un loader pendant le chargement
  if (loading || (currentUser && !userProfile && retryCount < 3)) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        gap: '1rem'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#6b7280' }}>Chargement de vos permissions...</p>
      </div>
    );
  }

  // Rediriger vers login si pas connecté
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Vérifier les droits admin si requis
  if (adminOnly && !isAdmin()) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '3rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 1.5rem',
            backgroundColor: '#fee2e2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Shield size={32} color="#ef4444" />
          </div>
          
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            Accès Refusé
          </h1>
          
          <p style={{
            color: '#6b7280',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            Vous n'avez pas les permissions administrateur nécessaires pour accéder à cette page.
          </p>

          {userProfile && (
            <div style={{
              backgroundColor: '#f3f4f6',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              textAlign: 'left'
            }}>
              <p style={{ fontSize: '0.875rem', color: '#374151', margin: '0 0 0.5rem' }}>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p style={{ fontSize: '0.875rem', color: '#374151', margin: '0' }}>
                <strong>Rôle actuel:</strong> {userProfile.role || 'Non défini'}
              </p>
            </div>
          )}

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignItems: 'stretch'
          }}>
            <Link
              to="/admin-fix"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.875rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
              }}
            >
              <RefreshCw size={18} />
              Corriger le rôle admin
            </Link>
            
            <button
              onClick={() => window.history.back()}
              style={{
                backgroundColor: 'white',
                color: '#374151',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb',
                fontWeight: '600',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;











