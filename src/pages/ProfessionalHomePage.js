import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdvertisementBanner from '../components/AdvertisementBanner';
import { useActivity } from '../contexts/ActivityContext';
import { useBusiness } from '../contexts/BusinessContext';
import { useEvent } from '../contexts/EventContext';
import { usePartner } from '../contexts/PartnerContext';
import { 
  MapPin, 
  Clock, 
  Users, 
  TrendingUp, 
  Star, 
  ArrowRight, 
  ChevronRight,
  ChevronLeft,
  Sparkles, 
  Globe, 
  Heart,
  Search,
  Building2,
  Map,
  Navigation,
  Award,
  Zap,
  Shield,
  ThumbsUp,
  CheckCircle,
  BarChart3,
  Target,
  Lightbulb,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

const ProfessionalHomePage = () => {
  const navigate = useNavigate();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getActiveActivities } = useActivity();
  const { categories, validatedBusinesses } = useBusiness();
  const { events, getUpcomingEvents } = useEvent();
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [autoScrollEvents, setAutoScrollEvents] = useState(true);
  const { partners: allPartners = [], getActivePartners } = usePartner();

  // Gérer la recherche avec Entrée
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      e.preventDefault();
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const activeActivities = getActiveActivities();
  const topBusinesses = validatedBusinesses
    .filter(b => b.rating && b.rating >= 4)
    .slice(0, 6);
  
  const upcomingEvents = getUpcomingEvents();
  
  // Auto-scroll des événements
  useEffect(() => {
    if (upcomingEvents.length > 0 && autoScrollEvents) {
      const interval = setInterval(() => {
        setCurrentEventIndex((prev) => (prev + 1) % upcomingEvents.length);
      }, 5000); // Change toutes les 5 secondes
      return () => clearInterval(interval);
    }
  }, [upcomingEvents.length, autoScrollEvents]);
  
  // Partenaires (chargés depuis le contexte)
  const partnerCompanies = getActivePartners();
  const partnersToDisplay = partnerCompanies.length > 0 ? partnerCompanies : allPartners;

  // Statistiques
  const stats = [
    { 
      icon: Building2, 
      value: validatedBusinesses.length || 500, 
      label: 'Entreprises Référencées',
      subLabel: 'Professionnels vérifiés',
      color: '#0066FF'
    },
    { 
      icon: Users, 
      value: '15K+', 
      label: 'Utilisateurs Actifs',
      subLabel: 'Chaque mois',
      color: '#00C853'
    },
    { 
      icon: MapPin, 
      value: '15', 
      label: 'Catégories',
      subLabel: 'Services disponibles',
      color: '#FF6B00'
    },
    { 
      icon: Star, 
      value: '4.8/5', 
      label: 'Satisfaction',
      subLabel: 'Note moyenne',
      color: '#D32F2F'
    }
  ];

  // Valeurs/Fonctionnalités
  const features = [
    {
      icon: Shield,
      title: 'Données Vérifiées',
      description: 'Toutes les entreprises sont vérifiées et validées pour garantir la fiabilité des informations.',
      color: '#0066FF'
    },
    {
      icon: Map,
      title: 'Navigation GPS',
      description: 'Accès direct à la carte trafic en temps réel avec les signalements routiers validés.',
      color: '#00C853'
    },
    {
      icon: Search,
      title: 'Recherche Intelligente',
      description: 'Moteur de recherche avancé pour trouver rapidement les services dont vous avez besoin.',
      color: '#FF6B00'
    },
    {
      icon: Clock,
      title: 'Informations Actualisées',
      description: 'Horaires, contacts et disponibilités mis à jour régulièrement pour vous offrir des données précises.',
      color: '#9C27B0'
    },
    {
      icon: Star,
      title: 'Avis & Recommandations',
      description: 'Consultez les avis authentiques des utilisateurs pour faire les meilleurs choix.',
      color: '#D32F2F'
    },
    {
      icon: Zap,
      title: 'Rapide & Efficace',
      description: 'Interface intuitive et performances optimisées pour une expérience utilisateur fluide.',
      color: '#FBC02D'
    }
  ];

  // Processus d'utilisation
  const steps = [
    {
      number: '01',
      title: 'Recherchez',
      description: 'Trouvez le service ou l\'entreprise que vous recherchez',
      icon: Search
    },
    {
      number: '02',
      title: 'Explorez',
      description: 'Consultez les détails, photos et avis',
      icon: Map
    },
    {
      number: '03',
      title: 'Contactez',
      description: 'Appelez directement ou utilisez la navigation GPS',
      icon: Phone
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#FFFFFF',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Hero Section Professionnel */}
      <section style={{
        position: 'relative',
        backgroundImage: 'url(/conakry-background.jpg), linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '100px',
        paddingBottom: '80px'
      }}>
        {/* Overlay sombre pour améliorer la lisibilité du texte */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.6) 0%, rgba(22, 33, 62, 0.55) 50%, rgba(15, 52, 96, 0.6) 100%)',
          zIndex: 0
        }} />
        
        {/* Pattern Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.4,
          zIndex: 1
        }} />

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 2,
          width: '100%'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', color: 'white' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(0, 102, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                marginBottom: '2rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                border: '1px solid rgba(0, 102, 255, 0.3)'
              }}
            >
              <Award size={16} />
              <span>Plateforme Officielle de Référence</span>
            </motion.div>

            {/* Titre Principal */}
            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '4.5rem',
              fontWeight: '800',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}>
              Votre Guide Complet
              <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #0066FF 0%, #00C853 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                de Conakry
              </span>
            </h1>

            {/* Sous-titre */}
            <p style={{
              fontSize: isMobile ? '1.125rem' : '1.5rem',
              marginBottom: '3rem',
              opacity: 0.9,
              maxWidth: '700px',
              margin: '0 auto 3rem',
              lineHeight: 1.7,
              fontWeight: '300'
            }}>
              Découvrez, explorez et profitez de tous les services de la capitale guinéenne. 
              Une plateforme professionnelle pour tous vos besoins.
            </p>

            {/* Barre de Recherche Améliorée */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                maxWidth: '700px',
                margin: '0 auto 2.5rem',
                position: 'relative'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: isMobile ? '0.75rem' : '0.5rem',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                gap: isMobile ? '0.5rem' : '0',
                width: '100%'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: isMobile ? '0.75rem 1rem' : '0 1rem',
                  color: '#6b7280',
                  flex: isMobile ? '1' : 'none',
                  width: isMobile ? '100%' : 'auto'
                }}>
                  <Search size={isMobile ? 20 : 24} />
                  {isMobile && (
                    <input
                      type="text"
                      placeholder="Rechercher... (Appuyez sur Entrée)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearch}
                      style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        fontSize: '1rem',
                        padding: '0.5rem 0.75rem',
                        color: '#1f2937',
                        marginLeft: '0.5rem',
                        width: '100%'
                      }}
                    />
                  )}
                </div>
                {!isMobile && (
                  <input
                    type="text"
                    placeholder="Rechercher une entreprise, un service, une adresse... (Appuyez sur Entrée)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      fontSize: '1.125rem',
                      padding: '1rem 0',
                      color: '#1f2937'
                    }}
                  />
                )}
              </div>
            </motion.div>

            {/* Actions Rapides */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/traffic-map');
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s',
                  fontSize: isMobile ? '0.9375rem' : '1rem',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  touchAction: 'manipulation',
                  minHeight: '44px',
                  minWidth: '44px',
                  WebkitTapHighlightColor: 'transparent',
                  WebkitTouchCallout: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  position: 'relative',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <Map size={20} />
                Carte Trafic
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/all-categories');
                }}
                style={{
                  backgroundColor: '#0066FF',
                  color: 'white',
                  padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s',
                  fontSize: isMobile ? '0.9375rem' : '1rem',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  touchAction: 'manipulation',
                  minHeight: '44px',
                  minWidth: '44px',
                  WebkitTapHighlightColor: 'transparent',
                  WebkitTouchCallout: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  position: 'relative',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = '#0052CC';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 102, 255, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = '#0066FF';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                Explorer les Catégories
                <ArrowRight size={20} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/report-road-issue');
                }}
                style={{
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s',
                  fontSize: isMobile ? '0.9375rem' : '1rem',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  touchAction: 'manipulation',
                  minHeight: '44px',
                  minWidth: '44px',
                  WebkitTapHighlightColor: 'transparent',
                  WebkitTouchCallout: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  position: 'relative',
                  zIndex: 10,
                  boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = '#d97706';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(245, 158, 11, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = '#f59e0b';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.3)';
                  }
                }}
              >
                <AlertTriangle size={20} />
                Signaler un problème routier
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/road-reports');
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s',
                  fontSize: isMobile ? '0.9375rem' : '1rem',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  touchAction: 'manipulation',
                  minHeight: '44px',
                  minWidth: '44px',
                  WebkitTapHighlightColor: 'transparent',
                  WebkitTouchCallout: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  position: 'relative',
                  zIndex: 10,
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <Navigation size={20} />
                Voir les signalements routiers
                <ArrowRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            pointerEvents: 'auto',
            touchAction: 'manipulation',
            padding: '0.5rem',
            zIndex: 10
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.opacity = '0.7';
          }}
          onTouchEnd={(e) => {
            setTimeout(() => {
              e.currentTarget.style.opacity = '1';
            }, 150);
          }}
        >
          <span style={{ fontSize: '0.875rem', opacity: 0.7, fontWeight: '500' }}>Découvrir</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* Statistiques Professionnelles */}
      <section style={{
        backgroundColor: '#FFFFFF',
        padding: '5rem 0',
        marginTop: '-4rem',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '2rem'
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{
                  backgroundColor: '#F8F9FA',
                  padding: '2.5rem 2rem',
                  borderRadius: '20px',
                  textAlign: 'center',
                  border: '1px solid #E9ECEF',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = stat.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#E9ECEF';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${stat.color} 0%, ${stat.color}CC 100%)`
                }} />
                <div style={{
                  display: 'inline-flex',
                  padding: '1rem',
                  borderRadius: '16px',
                  backgroundColor: `${stat.color}15`,
                  marginBottom: '1.5rem'
                }}>
                  <stat.icon size={32} color={stat.color} />
                </div>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '800',
                  color: '#1a1a2e',
                  marginBottom: '0.5rem',
                  lineHeight: 1
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '1.125rem',
                  color: '#1a1a2e',
                  fontWeight: '700',
                  marginBottom: '0.25rem'
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  {stat.subLabel}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fonctionnalités Professionnelles */}
      <section style={{
        backgroundColor: '#F8F9FA',
        padding: '6rem 0'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#0066FF15',
              color: '#0066FF',
              padding: '0.5rem 1.25rem',
              borderRadius: '50px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              <Lightbulb size={16} />
              <span>Fonctionnalités</span>
            </div>
            <h2 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: '800',
              color: '#1a1a2e',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              Tout ce dont vous avez besoin
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.7
            }}>
              Une plateforme complète et professionnelle pour explorer Conakry
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '2rem'
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={{
                  backgroundColor: 'white',
                  padding: '2.5rem',
                  borderRadius: '24px',
                  border: '1px solid #E9ECEF',
                  transition: 'all 0.3s',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#E9ECEF';
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  backgroundColor: `${feature.color}15`,
                  marginBottom: '1.5rem'
                }}>
                  <feature.icon size={32} color={feature.color} />
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1a1a2e',
                  marginBottom: '1rem',
                  lineHeight: 1.3
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  lineHeight: 1.7
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section style={{
        backgroundColor: '#FFFFFF',
        padding: '6rem 0'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#00C85315',
              color: '#00C853',
              padding: '0.5rem 1.25rem',
              borderRadius: '50px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              <Target size={16} />
              <span>Simple & Rapide</span>
            </div>
            <h2 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: '800',
              color: '#1a1a2e',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              Comment ça marche ?
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.7
            }}>
              Trois étapes simples pour trouver ce que vous cherchez
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '3rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  backgroundColor: '#0066FF15',
                  color: '#0066FF',
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: '800'
                }}>
                  <step.icon size={40} />
                </div>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '800',
                  color: '#E9ECEF',
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: -1
                }}>
                  {step.number}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1a1a2e',
                  marginBottom: '0.75rem'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  lineHeight: 1.7
                }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catégories Professionnelles */}
      <section style={{
        backgroundColor: '#F8F9FA',
        padding: '6rem 0'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4rem',
              flexWrap: 'wrap',
              gap: '2rem'
            }}
          >
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#FF6B0015',
                color: '#FF6B00',
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                <Building2 size={16} />
                <span>Catégories</span>
              </div>
              <h2 style={{
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                fontWeight: '800',
                color: '#1a1a2e',
                marginBottom: '0.5rem',
                letterSpacing: '-0.02em'
              }}>
                Explorez par Catégorie
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: '#6b7280',
                lineHeight: 1.7
              }}>
                Découvrez les meilleures adresses de Conakry par secteur d'activité
              </p>
            </div>
            <Link
              to="/all-categories"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#0066FF',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: isMobile ? '0.9375rem' : '1rem',
                padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem',
                borderRadius: '12px',
                border: '2px solid #0066FF',
                backgroundColor: 'white',
                transition: 'all 0.3s',
                cursor: 'pointer',
                pointerEvents: 'auto',
                touchAction: 'manipulation',
                minHeight: '44px',
                minWidth: '44px',
                WebkitTapHighlightColor: 'transparent',
                position: 'relative',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = '#0066FF';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#0066FF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.backgroundColor = '#0066FF';
                e.currentTarget.style.color = 'white';
              }}
              onTouchEnd={(e) => {
                setTimeout(() => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#0066FF';
                }, 150);
              }}
            >
              Voir toutes les catégories
              <ArrowRight size={20} />
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem'
            }}
          >
            {categories.slice(0, 6).map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
              >
                <Link
                  to={`/category/${category.id}`}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    position: 'relative',
                    zIndex: 10
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '24px',
                    padding: isMobile ? '2rem' : '2.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                    border: '1px solid #E9ECEF',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    minHeight: isMobile ? '200px' : 'auto'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                    }
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.transform = 'scale(0.98)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                  }}
                  onTouchEnd={(e) => {
                    setTimeout(() => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                    }, 150);
                  }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${['#0066FF', '#00C853', '#FF6B00', '#D32F2F', '#9C27B0', '#FBC02D'][index % 6]} 0%, ${['#0052CC', '#00B248', '#E65100', '#B71C1C', '#7B1FA2', '#F9A825'][index % 6]} 100%)`
                    }} />

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{
                        fontSize: '3.5rem',
                        lineHeight: 1
                      }}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: '#1a1a2e',
                          margin: 0,
                          marginBottom: '0.25rem'
                        }}>
                          {category.name}
                        </h3>
                      </div>
                    </div>

                    <p style={{
                      fontSize: '0.9375rem',
                      color: '#6b7280',
                      margin: 0,
                      marginBottom: '1.5rem',
                      lineHeight: 1.7
                    }}>
                      {getCategoryDescription(category.id)}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                      paddingTop: '1.5rem',
                      borderTop: '1px solid #E9ECEF'
                    }}>
                      <span style={{
                        fontSize: '0.9375rem',
                        color: '#0066FF',
                        fontWeight: '600'
                      }}>
                        Découvrir
                      </span>
                      <ChevronRight size={20} color="#0066FF" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section Signalements Routiers */}
      <section style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)',
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(245, 158, 11, 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 0
        }} />
        
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 10
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '3rem',
              alignItems: 'center'
            }}
          >
            {/* Contenu */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: '#92400e'
              }}>
                <AlertTriangle size={16} />
                <span>Service Communautaire</span>
              </div>
              
              <h2 style={{
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '800',
                marginBottom: '1.5rem',
                color: '#1a1a2e',
                lineHeight: 1.2
              }}>
                🚧 Signalez les problèmes routiers
              </h2>
              
              <p style={{
                fontSize: '1.125rem',
                color: '#374151',
                marginBottom: '2rem',
                lineHeight: 1.7
              }}>
                Aidez la communauté en signalant les travaux, accidents ou embouteillages.
              </p>

              <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <Link
                  to="/report-road-issue"
                  style={{
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.backgroundColor = '#d97706';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(245, 158, 11, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.backgroundColor = '#f59e0b';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.4)';
                    }
                  }}
                >
                  <AlertTriangle size={20} />
                  Signaler un problème routier
                </Link>
                <Link
                  to="/road-reports"
                  style={{
                    backgroundColor: 'white',
                    color: '#f59e0b',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s',
                    border: '2px solid #f59e0b',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.backgroundColor = '#fef3c7';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  Voir les signalements
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                fontSize: '8rem',
                lineHeight: 1,
                marginBottom: '1rem'
              }}>
                🚧
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                width: '100%',
                maxWidth: '300px'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚨</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>Accidents</div>
                </div>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚗</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>Embouteillages</div>
                </div>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚧</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>Travaux</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final Professionnel */}
      <section style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: '6rem 0',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: 0
        }} />
        
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 10
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(0, 102, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 1.25rem',
              borderRadius: '50px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '2rem',
              border: '1px solid rgba(0, 102, 255, 0.3)'
            }}>
              <CheckCircle size={16} />
              <span>Rejoignez-nous aujourd'hui</span>
            </div>
            <h2 style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: '800',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}>
              Prêt à explorer Conakry ?
            </h2>
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.9,
              marginBottom: '3rem',
              lineHeight: 1.7,
              fontWeight: '300'
            }}>
              Découvrez tous les services et entreprises de la capitale guinéenne. 
              Une expérience complète et professionnelle à portée de clic.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                to="/register-business"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                style={{
                  backgroundColor: '#0066FF',
                  color: 'white',
                  padding: isMobile ? '1rem 1.75rem' : '1.25rem 2.5rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: isMobile ? '1rem' : '1.125rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s',
                  border: '2px solid #0066FF',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  touchAction: 'manipulation',
                  minHeight: '44px',
                  minWidth: '44px',
                  WebkitTapHighlightColor: 'transparent',
                  position: 'relative',
                  zIndex: 1000,
                  outline: 'none',
                  userSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = '#0052CC';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 102, 255, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = '#0066FF';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.backgroundColor = '#0052CC';
                }}
                onTouchEnd={(e) => {
                  setTimeout(() => {
                    e.currentTarget.style.backgroundColor = '#0066FF';
                  }, 150);
                }}
              >
                🏢 Inscrire mon entreprise
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/all-categories"
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: isMobile ? '1rem 1.75rem' : '1.25rem 2.5rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: isMobile ? '1rem' : '1.125rem',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.3s',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  touchAction: 'manipulation',
                  minHeight: '44px',
                  minWidth: '44px',
                  WebkitTapHighlightColor: 'transparent',
                  position: 'relative',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }}
                onTouchEnd={(e) => {
                  setTimeout(() => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }, 150);
                }}
              >
                Commencer l'exploration
                <Globe size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Événements */}
      {upcomingEvents.length > 0 && (
        <section style={{
          padding: '4rem 0',
          backgroundColor: '#f8fafc',
          position: 'relative'
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 2rem'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '50px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#6366f1'
                  }}>
                    <Calendar size={16} />
                    <span>Événements à venir</span>
                  </div>
                  <h2 style={{
                    fontSize: isMobile ? '2rem' : '2.5rem',
                    fontWeight: '800',
                    color: '#1a1a2e',
                    marginBottom: '0.5rem'
                  }}>
                    Découvrez les événements
                  </h2>
                  <p style={{
                    fontSize: '1.125rem',
                    color: '#6b7280'
                  }}>
                    Ne manquez pas les événements importants à Conakry
                  </p>
                </div>
                <Link
                  to="/events"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#6366f1',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem'
                  }}
                >
                  Voir tous les événements
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Carrousel d'événements */}
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '1rem',
                backgroundColor: 'white',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  transition: 'transform 0.5s ease-in-out',
                  transform: `translateX(-${currentEventIndex * 100}%)`
                }}>
                  {upcomingEvents.map((event, index) => {
                    const eventDate = new Date(event.startDate);
                    const formattedDate = eventDate.toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    });
                    const formattedTime = eventDate.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    });

                    return (
                      <div
                        key={event.id || index}
                        style={{
                          minWidth: '100%',
                          padding: '2rem',
                          display: 'flex',
                          flexDirection: isMobile ? 'column' : 'row',
                          gap: '2rem',
                          cursor: 'pointer',
                          WebkitTapHighlightColor: 'transparent',
                          touchAction: 'manipulation',
                          WebkitTouchCallout: 'none',
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          pointerEvents: 'auto'
                        }}
                        onClick={() => navigate('/events')}
                        onMouseEnter={() => setAutoScrollEvents(false)}
                        onMouseLeave={() => setAutoScrollEvents(true)}
                      >
                        {/* Image/Icon */}
                        <div style={{
                          width: isMobile ? '100%' : '300px',
                          height: isMobile ? '200px' : '250px',
                          borderRadius: '0.75rem',
                          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          background: event.imageUrl 
                            ? `url(${event.imageUrl}) center/cover`
                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '4rem',
                          flexShrink: 0
                        }}>
                          {!event.imageUrl && '📅'}
                        </div>

                        {/* Contenu */}
                        <div style={{ flex: 1 }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '1rem',
                            flexWrap: 'wrap'
                          }}>
                            <span style={{
                              backgroundColor: '#6366f1',
                              color: 'white',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '0.375rem',
                              fontSize: '0.875rem',
                              fontWeight: '600'
                            }}>
                              {event.category || 'Événement'}
                            </span>
                            {event.isFree && (
                              <span style={{
                                backgroundColor: '#10b981',
                                color: 'white',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '0.375rem',
                                fontSize: '0.875rem',
                                fontWeight: '600'
                              }}>
                                Gratuit
                              </span>
                            )}
                          </div>

                          <h3 style={{
                            fontSize: '1.75rem',
                            fontWeight: '700',
                            color: '#1a1a2e',
                            marginBottom: '1rem',
                            lineHeight: 1.3
                          }}>
                            {event.title}
                          </h3>

                          <p style={{
                            fontSize: '1rem',
                            color: '#6b7280',
                            marginBottom: '1.5rem',
                            lineHeight: 1.6,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {event.description || 'Découvrez cet événement exceptionnel à Conakry.'}
                          </p>

                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            marginBottom: '1.5rem'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              color: '#374151',
                              fontSize: '0.9375rem'
                            }}>
                              <Calendar size={18} color="#6366f1" />
                              <span>{formattedDate}</span>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              color: '#374151',
                              fontSize: '0.9375rem'
                            }}>
                              <Clock size={18} color="#6366f1" />
                              <span>{formattedTime}</span>
                            </div>
                            {event.location && (
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: '#374151',
                                fontSize: '0.9375rem'
                              }}>
                                <MapPin size={18} color="#6366f1" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>

                          <div style={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center'
                          }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate('/events');
                              }}
                              style={{
                                backgroundColor: '#6366f1',
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                fontWeight: '600',
                                fontSize: '0.9375rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#4f46e5';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#6366f1';
                                e.currentTarget.style.transform = 'translateY(0)';
                              }}
                            >
                              Voir les détails
                              <ExternalLink size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Contrôles du carrousel */}
                {upcomingEvents.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentEventIndex((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length);
                        setAutoScrollEvents(false);
                        setTimeout(() => setAutoScrollEvents(true), 10000);
                      }}
                      style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        zIndex: 10
                      }}
                    >
                      <ChevronLeft size={24} color="#374151" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentEventIndex((prev) => (prev + 1) % upcomingEvents.length);
                        setAutoScrollEvents(false);
                        setTimeout(() => setAutoScrollEvents(true), 10000);
                      }}
                      style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        zIndex: 10
                      }}
                    >
                      <ChevronRight size={24} color="#374151" />
                    </button>

                    {/* Indicateurs */}
                    <div style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      gap: '0.5rem',
                      zIndex: 10
                    }}>
                      {upcomingEvents.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentEventIndex(index);
                            setAutoScrollEvents(false);
                            setTimeout(() => setAutoScrollEvents(true), 10000);
                          }}
                          style={{
                            width: currentEventIndex === index ? '24px' : '8px',
                            height: '8px',
                            borderRadius: '4px',
                            backgroundColor: currentEventIndex === index ? '#6366f1' : '#d1d5db',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Bannière des partenaires */}
      <section style={{
        padding: '3rem 0',
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '2rem' }}
          >
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1a1a2e',
              marginBottom: '0.5rem'
            }}>
              Nos Partenaires
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280'
            }}>
              Des entreprises de confiance qui nous font confiance
            </p>
          </motion.div>

          {/* Bannière de défilement */}
          <div style={{
            overflow: 'hidden',
            position: 'relative',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}>
            <div
              style={{
                display: 'flex',
                gap: '3rem',
                animation: 'scrollPartners 30s linear infinite',
                width: 'fit-content'
              }}
            >
              {/* Dupliquer les logos pour un défilement continu */}
              {[...partnersToDisplay, ...partnersToDisplay].map((partner, index) => (
                <div
                  key={`${partner?.id || index}-${index}`}
                  style={{
                    minWidth: '150px',
                    height: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    padding: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={() => {
                    if (partner.url && partner.url !== '#') {
                      window.open(partner.url, '_blank');
                    }
                  }}
                >
                  <div
                    style={{
                      fontSize: '3rem',
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '80px',
                      height: '80px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      boxShadow: '0 8px 20px rgba(15, 23, 42, 0.1)',
                      overflow: 'hidden'
                    }}
                  >
                    {partner?.logo ? (
                      typeof partner.logo === 'string' && partner.logo.startsWith('data:') ? (
                        <img
                          src={partner.logo}
                          alt={partner.name || 'Partenaire'}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : typeof partner.logo === 'string' && partner.logo.startsWith('http') ? (
                        <img
                          src={partner.logo}
                          alt={partner.name || 'Partenaire'}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <span style={{ fontSize: '2.5rem' }}>{partner.logo}</span>
                      )
                    ) : (
                      <span style={{ fontSize: '1.5rem', color: '#1f2937', fontWeight: '700' }}>
                        {(partner?.name || '?').slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    textAlign: 'center'
                  }}>
                    {partner?.name || 'Partenaire'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AdvertisementBanner />
    </div>
  );

  function getCategoryDescription(categoryId) {
    const descriptions = {
      restaurants: 'Découvrez des saveurs uniques de la cuisine guinéenne et internationale.',
      hotels: 'Trouvez les meilleurs hôtels pour votre séjour à Conakry.',
      pharmacies: 'Pharmacies et médicaments disponibles dans toute la ville.',
      hopitaux: 'Centres de santé et hôpitaux pour vos besoins médicaux.',
      banques: 'Services bancaires et financiers dans toute la capitale.',
      ecoles: 'Établissements scolaires et centres éducatifs.',
      universites: 'Enseignement supérieur et universités.',
      transport: 'Services de transport et déplacements.',
      shopping: 'Boutiques et centres commerciaux pour vos achats.',
      loisirs: 'Divertissement et loisirs pour toute la famille.',
      sport: 'Activités sportives et centres de fitness.',
      beaute: 'Salons et centres de beauté.',
      automobile: 'Services automobiles et réparations.',
      administration: 'Services administratifs et publics.',
      services: 'Services divers et professionnels.',
      autre: 'Autres services et entreprises.'
    };
    return descriptions[categoryId] || 'Découvrez les meilleures adresses de Conakry.';
  }
};

export default ProfessionalHomePage;

