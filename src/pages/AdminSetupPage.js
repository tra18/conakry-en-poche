import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Shield, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db, auth } from '../firebase/config';

const AdminSetupPage = () => {
  const navigate = useNavigate();
  const { currentUser, signup, login } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: 'Administrateur',
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createAdminAccount = async (e) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      // Créer l'utilisateur
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      const user = userCredential.user;

      // Mettre à jour le profil
      await updateProfile(user, {
        displayName: formData.name
      });

      // Créer le profil dans Firestore avec le rôle admin
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: formData.email,
        name: formData.name,
        phone: formData.phone || '',
        role: 'admin', // Rôle admin directement
        createdAt: new Date(),
        isActive: true
      });

      toast.success('✅ Compte administrateur créé avec succès !');
      
      // Optionnel : connecter automatiquement
      setTimeout(() => {
        navigate('/admin');
      }, 2000);

    } catch (error) {
      console.error('Erreur:', error);
      
      let errorMessage = 'Erreur lors de la création du compte.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Cet email est déjà utilisé. Utilisez un autre email ou connectez-vous.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Le mot de passe est trop faible. Utilisez au moins 6 caractères.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'L\'email n\'est pas valide.';
      } else {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '1.5rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          padding: '3rem',
          maxWidth: '500px',
          width: '100%'
        }}
      >
        {/* Header */}
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
            Créer un Compte Admin
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '0.875rem'
          }}>
            Configurez votre premier compte administrateur
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={createAdminAccount}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: '#374151',
              fontWeight: '600',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="admin@conakryenpoche.com"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: '#374151',
              fontWeight: '600',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              <Lock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Mot de passe * (min 6 caractères)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Votre mot de passe"
                minLength={6}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  paddingRight: '3rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: '#374151',
              fontWeight: '600',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              <User size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Nom complet *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Administrateur"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              color: '#374151',
              fontWeight: '600',
              marginBottom: '0.5rem',
              fontSize: '0.875rem'
            }}>
              <Phone size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Téléphone (optionnel)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+224 XXX XXX XXX"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isCreating}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: isCreating 
                ? '#9ca3af' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isCreating ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (!isCreating) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {isCreating ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Création en cours...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Créer le compte admin
              </>
            )}
          </button>
        </form>

        {/* Instructions */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem'
          }}>
            <AlertCircle size={20} color="#f59e0b" />
            <h3 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1f2937',
              margin: 0
            }}>
              Note importante
            </h3>
          </div>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: 0,
            lineHeight: 1.6
          }}>
            Ce compte sera créé avec les privilèges administrateur. 
            Assurez-vous de choisir un mot de passe fort et de le garder en sécurité.
          </p>
        </div>

        {/* Lien vers connexion */}
        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center'
        }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#667eea',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Déjà un compte ? Se connecter
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSetupPage;

