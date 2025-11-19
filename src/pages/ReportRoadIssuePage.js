import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useRoadReport } from '../contexts/RoadReportContext';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';
import { 
  AlertTriangle, 
  Upload, 
  MapPin, 
  Camera, 
  X,
  CheckCircle,
  Loader,
  Mic,
  MicOff
} from 'lucide-react';
import toast from 'react-hot-toast';

const ReportRoadIssuePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { submitReport, reportTypes } = useRoadReport();
  const { language } = useLanguage();
  const translate = (key, params) => t(language, key, params);
  
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    location: '',
    userName: '',
    userEmail: ''
  });
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  
  // Reconnaissance vocale
  const [activeVoiceField, setActiveVoiceField] = useState(null); // 'title', 'description', 'location'
  const { 
    isListening, 
    transcript, 
    error: voiceError, 
    isSupported: isVoiceSupported,
    startListening, 
    stopListening, 
    resetTranscript 
  } = useSpeechRecognition('fr-FR');

  // Stocker la valeur initiale du champ quand on démarre l'enregistrement
  const [fieldStartValue, setFieldStartValue] = useState('');

  // Mettre à jour le champ actif avec la transcription
  useEffect(() => {
    if (transcript && activeVoiceField) {
      // Utiliser la valeur de départ + la nouvelle transcription
      setFormData(prev => ({
        ...prev,
        [activeVoiceField]: fieldStartValue + (fieldStartValue ? ' ' : '') + transcript
      }));
    }
  }, [transcript, activeVoiceField, fieldStartValue]);

  // Afficher les erreurs vocales
  useEffect(() => {
    if (voiceError) {
      toast.error(voiceError);
    }
  }, [voiceError]);

  // Gérer le démarrage/arrêt de la reconnaissance vocale pour un champ
  const handleVoiceToggle = (fieldName) => {
    if (activeVoiceField === fieldName && isListening) {
      // Arrêter l'enregistrement pour ce champ
      stopListening();
      setActiveVoiceField(null);
      setFieldStartValue('');
      // Réinitialiser après un court délai pour permettre la dernière transcription
      setTimeout(() => {
        resetTranscript();
      }, 200);
    } else {
      // Arrêter l'enregistrement précédent s'il y en a un
      if (isListening) {
        stopListening();
        setTimeout(() => {
          resetTranscript();
        }, 200);
      }
      // Sauvegarder la valeur actuelle du champ comme point de départ
      setFieldStartValue(formData[fieldName] || '');
      // Démarrer l'enregistrement pour le nouveau champ
      setActiveVoiceField(fieldName);
      resetTranscript();
      startListening();
    }
  };

  // Obtenir la géolocalisation de l'utilisateur
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error(translate('reportIssue.toasts.geoNotSupported'));
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setFormData(prev => ({
          ...prev,
          location: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
        }));
        setLoadingLocation(false);
        toast.success(translate('reportIssue.status.geoSuccess'));
      },
      (error) => {
        console.error('Erreur de géolocalisation:', error);
        toast.error(translate('reportIssue.status.geoFailed'));
        setLoadingLocation(false);
      }
    );
  };

  // Gérer la sélection d'image
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      toast.error(translate('reportIssue.toasts.imageType'));
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(translate('reportIssue.toasts.imageSize'));
      return;
    }

    setSelectedImage(file);
    
    // Créer un aperçu
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Supprimer l'image sélectionnée
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('handleSubmit appelé', { formData, selectedImage: !!selectedImage, currentUser: !!currentUser });

    if (!formData.type) {
      toast.error(translate('reportIssue.errors.selectType'));
      return;
    }

    if (!formData.title.trim()) {
      toast.error(translate('reportIssue.errors.titleRequired'));
      return;
    }

    if (!formData.location.trim()) {
      toast.error(translate('reportIssue.errors.locationRequired'));
      return;
    }

    setIsSubmitting(true);

    try {
      const coordinates = userLocation || null;
      const userId = currentUser ? currentUser.uid : null;
      const userInfo = currentUser 
        ? { name: currentUser.displayName || currentUser.email, email: currentUser.email }
        : { name: formData.userName || null, email: formData.userEmail || null };
      
      console.log('Données à soumettre:', {
        type: formData.type,
        title: formData.title,
        location: formData.location,
        userId,
        userInfo,
        hasImage: !!selectedImage
      });

      await submitReport(
        {
          type: formData.type,
          title: formData.title,
          description: formData.description,
          location: formData.location,
          coordinates
        },
        userId,
        selectedImage,
        userInfo
      );

      console.log('Signalement soumis avec succès');
      setIsSubmitted(true);
      
      // Réinitialiser le formulaire
      setTimeout(() => {
        setFormData({
          type: '',
          title: '',
          description: '',
          location: '',
          userName: '',
          userEmail: ''
        });
        setSelectedImage(null);
        setImagePreview(null);
        setUserLocation(null);
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      console.error('Détails de l\'erreur:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      // Le toast d'erreur est déjà géré dans submitReport
      // Mais on peut ajouter un message supplémentaire si nécessaire
      if (error.message && error.message.includes('permission')) {
        toast.error(translate('reportIssue.errors.permission'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedType = reportTypes.find(t => t.id === formData.type);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}
        >
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            {translate('reportIssue.title')}
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '1rem'
          }}>
            {translate('reportIssue.subtitle')}
          </p>
          {!currentUser && (
            <p style={{
              color: '#f59e0b',
              fontSize: '0.875rem',
              marginTop: '0.5rem',
              fontWeight: '600'
            }}>
              {translate('reportIssue.anonymous')}
            </p>
          )}
        </motion.div>

        {/* Message de succès */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              backgroundColor: '#d1fae5',
              border: '2px solid #10b981',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <CheckCircle size={32} color="#10b981" />
            <div>
              <h3 style={{
                margin: 0,
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#065f46',
                marginBottom: '0.25rem'
              }}>
                {translate('reportIssue.successTitle')}
              </h3>
              <p style={{
                margin: 0,
                color: '#047857',
                fontSize: '0.875rem'
              }}>
                {translate('reportIssue.successDescription')}
              </p>
            </div>
          </motion.div>
        )}

        {/* Formulaire */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}
        >
          {/* Type de signalement */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.75rem'
            }}>
              {translate('reportIssue.form.typeLabel')}
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
                  style={{
                    padding: '1rem',
                    border: `2px solid ${formData.type === type.id ? type.color : '#e5e7eb'}`,
                    borderRadius: '0.75rem',
                    backgroundColor: formData.type === type.id ? `${type.color}10` : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={(e) => {
                    if (formData.type !== type.id) {
                      e.currentTarget.style.borderColor = type.color;
                      e.currentTarget.style.backgroundColor = `${type.color}05`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.type !== type.id) {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{type.icon}</span>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: formData.type === type.id ? '600' : '500',
                    color: formData.type === type.id ? type.color : '#374151'
                  }}>
                    {type.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Titre */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              {translate('reportIssue.form.titleLabel')}
              {isVoiceSupported && (
                <button
                  type="button"
                  onClick={() => handleVoiceToggle('title')}
                  style={{
                    marginLeft: '0.5rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: activeVoiceField === 'title' && isListening ? '#ef4444' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.2s'
                  }}
                  title={activeVoiceField === 'title' && isListening
                    ? translate('reportIssue.form.voiceStopTooltip')
                    : translate('reportIssue.form.voiceStartTooltip')}
                >
                  {activeVoiceField === 'title' && isListening ? (
                    <>
                      <MicOff size={14} />
                      {translate('reportIssue.form.voiceStop')}
                    </>
                  ) : (
                    <>
                      <Mic size={14} />
                      {translate('reportIssue.form.voiceStart')}
                    </>
                  )}
                </button>
              )}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder={translate('reportIssue.form.titlePlaceholder')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  paddingRight: activeVoiceField === 'title' && isListening ? '3rem' : '0.75rem',
                  border: activeVoiceField === 'title' && isListening ? '2px solid #ef4444' : '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  backgroundColor: activeVoiceField === 'title' && isListening ? '#fef2f2' : 'white'
                }}
                onFocus={(e) => {
                  if (activeVoiceField !== 'title' || !isListening) {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (activeVoiceField !== 'title' || !isListening) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              />
              {activeVoiceField === 'title' && isListening && (
                <div style={{
                  position: 'absolute',
                  right: '0.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: '#ef4444',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  pointerEvents: 'none'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#ef4444',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }} />
                  {translate('reportIssue.voice.recording')}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              {translate('reportIssue.form.descriptionLabel')}
              {isVoiceSupported && (
                <button
                  type="button"
                  onClick={() => handleVoiceToggle('description')}
                  style={{
                    marginLeft: '0.5rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: activeVoiceField === 'description' && isListening ? '#ef4444' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.2s'
                  }}
                  title={activeVoiceField === 'description' && isListening
                    ? translate('reportIssue.form.voiceStopTooltip')
                    : translate('reportIssue.form.voiceStartTooltip')}
                >
                  {activeVoiceField === 'description' && isListening ? (
                    <>
                      <MicOff size={14} />
                      {translate('reportIssue.form.voiceStop')}
                    </>
                  ) : (
                    <>
                      <Mic size={14} />
                      {translate('reportIssue.form.voiceStart')}
                    </>
                  )}
                </button>
              )}
            </label>
            <div style={{ position: 'relative' }}>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder={translate('reportIssue.form.descriptionPlaceholder')}
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  paddingBottom: activeVoiceField === 'description' && isListening ? '2.5rem' : '0.75rem',
                  border: activeVoiceField === 'description' && isListening ? '2px solid #ef4444' : '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                  backgroundColor: activeVoiceField === 'description' && isListening ? '#fef2f2' : 'white'
                }}
                onFocus={(e) => {
                  if (activeVoiceField !== 'description' || !isListening) {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (activeVoiceField !== 'description' || !isListening) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              />
              {activeVoiceField === 'description' && isListening && (
                <div style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  right: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: '#ef4444',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  pointerEvents: 'none'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#ef4444',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }} />
                  {translate('reportIssue.voice.recording')}
                </div>
              )}
            </div>
          </div>

          {/* Informations utilisateur (si non connecté) */}
          {!currentUser && (
            <div style={{ 
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: '#fef3c7',
              borderRadius: '0.75rem',
              border: '1px solid #fcd34d'
            }}>
              <p style={{
                margin: 0,
                marginBottom: '1rem',
                fontSize: '0.875rem',
                color: '#92400e',
                fontWeight: '600'
              }}>
                {translate('reportIssue.form.userInfoNotice')}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    {translate('reportIssue.form.userNameLabel')}
                  </label>
                  <input
                    type="text"
                    value={formData.userName}
                    onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
                    placeholder={translate('reportIssue.form.namePlaceholder')}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
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
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    {translate('reportIssue.form.userEmailLabel')}
                  </label>
                  <input
                    type="email"
                    value={formData.userEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, userEmail: e.target.value }))}
                    placeholder={translate('reportIssue.form.emailPlaceholder')}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
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
              </div>
            </div>
          )}

          {/* Localisation */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              {translate('reportIssue.form.locationLabel')}
              {isVoiceSupported && (
                <button
                  type="button"
                  onClick={() => handleVoiceToggle('location')}
                  style={{
                    marginLeft: '0.5rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: activeVoiceField === 'location' && isListening ? '#ef4444' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.2s'
                  }}
                  title={activeVoiceField === 'location' && isListening
                    ? translate('reportIssue.form.voiceStopTooltip')
                    : translate('reportIssue.form.voiceStartTooltip')}
                >
                  {activeVoiceField === 'location' && isListening ? (
                    <>
                      <MicOff size={14} />
                      {translate('reportIssue.form.voiceStop')}
                    </>
                  ) : (
                    <>
                      <Mic size={14} />
                      {translate('reportIssue.form.voiceStart')}
                    </>
                  )}
                </button>
              )}
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder={translate('reportIssue.form.locationPlaceholder')}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    paddingRight: activeVoiceField === 'location' && isListening ? '3rem' : '0.75rem',
                    border: activeVoiceField === 'location' && isListening ? '2px solid #ef4444' : '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'all 0.2s',
                    backgroundColor: activeVoiceField === 'location' && isListening ? '#fef2f2' : 'white'
                  }}
                  onFocus={(e) => {
                    if (activeVoiceField !== 'location' || !isListening) {
                      e.currentTarget.style.borderColor = '#3b82f6';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    }
                  }}
                  onBlur={(e) => {
                    if (activeVoiceField !== 'location' || !isListening) {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
                {activeVoiceField === 'location' && isListening && (
                  <div style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: '#ef4444',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    pointerEvents: 'none'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#ef4444',
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }} />
                    {translate('reportIssue.voice.recording')}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={loadingLocation}
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: loadingLocation ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  opacity: loadingLocation ? 0.6 : 1,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!loadingLocation) {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loadingLocation) {
                    e.currentTarget.style.backgroundColor = '#3b82f6';
                  }
                }}
              >
                {loadingLocation ? (
                  <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <MapPin size={18} />
                )}
                {loadingLocation ? translate('reportIssue.form.gpsLoading') : translate('reportIssue.form.gpsButton')}
              </button>
            </div>
            <p style={{
              margin: '0.5rem 0 0 0',
              fontSize: '0.75rem',
              color: '#6b7280'
            }}>
              {translate('reportIssue.form.locationHint')}
            </p>
          </div>

          {/* Upload d'image */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              {translate('reportIssue.form.photoLabel')}
            </label>
            {imagePreview ? (
              <div style={{
                position: 'relative',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                border: '1px solid #e5e7eb'
              }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  aria-label={translate('reportIssue.form.photoRemove')}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <label
                style={{
                  display: 'block',
                  border: '2px dashed #d1d5db',
                  borderRadius: '0.75rem',
                  padding: '2rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: '#f9fafb'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.backgroundColor = '#eff6ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />
                <Camera size={32} color="#6b7280" style={{ margin: '0 auto 0.75rem' }} />
                <p style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.25rem'
                }}>
                  {translate('reportIssue.form.photoCTA')}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '0.75rem',
                  color: '#6b7280'
                }}>
                  {translate('reportIssue.form.photoHelp')}
                </p>
              </label>
            )}
          </div>

          {/* Boutons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'white',
                color: '#374151',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
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
              {translate('reportIssue.buttons.cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: isSubmitting ? '#9ca3af' : (selectedType?.color || '#3b82f6'),
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting && selectedType) {
                  e.currentTarget.style.opacity = '0.9';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.opacity = '1';
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  {translate('reportIssue.buttons.submitting')}
                </>
              ) : (
                <>
                  <AlertTriangle size={18} />
                  {translate('reportIssue.buttons.submit')}
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default ReportRoadIssuePage;

