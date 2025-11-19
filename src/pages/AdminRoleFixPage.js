import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminRoleFixPage = () => {
  const { currentUser, userProfile, loadUserProfile, updateUserRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (currentUser) {
      checkUserRole();
    }
  }, [currentUser]);

  const checkUserRole = async () => {
    if (!currentUser) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        setUserInfo(userDoc.data());
      } else {
        setUserInfo({ exists: false });
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la vérification');
    }
  };

  const fixAdminRole = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      
      if (userDoc.exists()) {
        // Mettre à jour le document existant
        await updateDoc(doc(db, 'users', currentUser.uid), {
          role: 'admin',
          updatedAt: new Date()
        });
        toast.success('Rôle admin ajouté avec succès !');
      } else {
        // Créer le document avec le rôle admin
        await setDoc(doc(db, 'users', currentUser.uid), {
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName || currentUser.email?.split('@')[0] || 'Administrateur',
          phone: '',
          role: 'admin',
          createdAt: new Date(),
          isActive: true
        });
        toast.success('Document utilisateur créé avec le rôle admin !');
      }
      
      // Recharger le profil
      await loadUserProfile(currentUser.uid);
      
      // Attendre un peu puis rediriger
      setTimeout(() => {
        window.location.href = '/admin';
      }, 2000);
      
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <AlertCircle size={48} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ marginBottom: '1rem', color: '#1f2937' }}>Vous devez être connecté</h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Veuillez vous connecter avec votre compte admin@conakryenpoche.com
          </p>
          <a
            href="/login"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Aller à la page de connexion
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Inter, sans-serif'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '1.5rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          padding: '3rem',
          maxWidth: '600px',
          width: '100%'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'white'
          }}>
            <Shield size={32} />
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            Correction du Rôle Admin
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            Vérifiez et corrigez votre rôle administrateur
          </p>
        </div>

        {/* Informations utilisateur */}
        <div style={{
          backgroundColor: '#f3f4f6',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Informations du compte
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Email:</span>
              <p style={{ margin: '0.25rem 0 0', fontWeight: '600', color: '#1f2937' }}>
                {currentUser.email}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>UID:</span>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#6b7280', fontFamily: 'monospace' }}>
                {currentUser.uid}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Rôle actuel dans Firestore:</span>
              <p style={{ margin: '0.25rem 0 0', fontWeight: '600', color: userInfo?.role === 'admin' ? '#10b981' : '#ef4444' }}>
                {userInfo?.role || (userInfo?.exists === false ? 'Document non trouvé' : 'Chargement...')}
              </p>
            </div>
            {userProfile && (
              <div>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Rôle dans le contexte:</span>
                <p style={{ margin: '0.25rem 0 0', fontWeight: '600', color: userProfile.role === 'admin' ? '#10b981' : '#ef4444' }}>
                  {userProfile.role || 'Non défini'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Statut */}
        {userInfo?.role === 'admin' ? (
          <div style={{
            backgroundColor: '#d1fae5',
            border: '2px solid #10b981',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <CheckCircle size={24} color="#10b981" />
            <div>
              <h3 style={{ margin: 0, color: '#065f46', fontWeight: '600' }}>
                Rôle admin configuré
              </h3>
              <p style={{ margin: '0.5rem 0 0', color: '#047857', fontSize: '0.875rem' }}>
                Votre compte a déjà le rôle administrateur. Vous pouvez accéder au panneau d'administration.
              </p>
            </div>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '2px solid #ef4444',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <AlertCircle size={24} color="#ef4444" />
            <div>
              <h3 style={{ margin: 0, color: '#991b1b', fontWeight: '600' }}>
                Rôle admin manquant
              </h3>
              <p style={{ margin: '0.5rem 0 0', color: '#b91c1c', fontSize: '0.875rem' }}>
                Votre compte n'a pas le rôle administrateur. Cliquez sur le bouton ci-dessous pour le corriger.
              </p>
            </div>
          </div>
        )}

        {/* Boutons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={checkUserRole}
            disabled={loading}
            style={{
              flex: 1,
              padding: '0.875rem',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <RefreshCw size={20} />
            Actualiser
          </button>
          {userInfo?.role !== 'admin' && (
            <button
              onClick={fixAdminRole}
              disabled={loading}
              style={{
                flex: 2,
                padding: '0.875rem',
                background: loading 
                  ? '#9ca3af' 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Correction en cours...
                </>
              ) : (
                <>
                  <Shield size={20} />
                  Corriger le rôle admin
                </>
              )}
            </button>
          )}
        </div>

        {userInfo?.role === 'admin' && (
          <div style={{ marginTop: '1.5rem' }}>
            <a
              href="/admin"
              style={{
                display: 'block',
                width: '100%',
                padding: '0.875rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                fontWeight: '600',
                textAlign: 'center',
                textDecoration: 'none'
              }}
            >
              Accéder au panneau d'administration
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminRoleFixPage;

