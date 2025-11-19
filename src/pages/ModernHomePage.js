import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdvertisementBanner from '../components/AdvertisementBanner';
import { useActivity } from '../contexts/ActivityContext';
import { useBusiness } from '../contexts/BusinessContext';
import { 
  MapPin, 
  Clock, 
  Users, 
  TrendingUp, 
  Star, 
  ArrowRight, 
  Play, 
  ChevronRight, 
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
  ThumbsUp
} from 'lucide-react';

const ModernHomePage = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getActiveActivities } = useActivity();
  const { categories, validatedBusinesses } = useBusiness();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Données des actualités
  const newsItems = [
    {
      id: 1,
      title: 'Nouveau marché artisanal ouvre ses portes à Conakry',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzRiNTU2MyIvPjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TcOpcmNow6kgQXJ0aXNhbmFsPC90ZXh0Pjwvc3ZnPg==',
      date: '15 Octobre 2025',
      link: '/news/1',
      category: 'Économie'
    },
    {
      id: 2,
      title: 'Festival des arts de Conakry : Un succès retentissant',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzZiNzI4MCIvPjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RmVzdGl2YWwgQXJ0czwvdGV4dD48L3N2Zz4=',
      date: '10 Octobre 2025',
      link: '/news/2',
      category: 'Culture'
    },
    {
      id: 3,
      title: 'Amélioration du réseau de transport public à Conakry',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzljYTNhZiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VHJhbnNwb3J0IFB1YmxpYzwvdGV4dD48L3N2Zz4=',
      date: '05 Octobre 2025',
      link: '/news/3',
      category: 'Transport'
    },
  ];

  const activeActivities = getActiveActivities();
  const combinedItems = [
    ...newsItems,
    ...activeActivities.slice(0, 3).map(activity => ({
      id: `activity-${activity.id}`,
      title: activity.title,
      image: activity.media?.data || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzNiODJmNiIvPjx0ZXh0IHg9IjIwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QWN0aXZpdMOpPC90ZXh0Pjwvc3ZnPg==',
      date: new Date(activity.date).toLocaleDateString('fr-FR'),
      link: `/activity/${activity.id}`,
      type: 'activity',
      location: activity.location,
      category: 'Activité'
    }))
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % combinedItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [combinedItems.length]);

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

  // Statistiques de l'application
  const stats = [
    { icon: Building2, value: validatedBusinesses.length || 500, label: 'Entreprises', color: '#3b82f6' },
    { icon: Users, value: '10K+', label: 'Utilisateurs', color: '#10b981' },
    { icon: MapPin, value: '15', label: 'Catégories', color: '#f59e0b' },
    { icon: Star, value: '4.8', label: 'Note moyenne', color: '#ef4444' }
  ];

  // Fonctionnalités principales
  const features = [
    {
      icon: Search,
      title: 'Recherche Avancée',
      description: 'Trouvez rapidement ce que vous cherchez avec notre moteur de recherche intelligent.',
      color: '#3b82f6'
    },
    {
      icon: Navigation,
      title: 'Navigation GPS',
      description: 'Obtenez des directions précises vers n\'importe quelle destination.',
      color: '#10b981'
    },
    {
      icon: Award,
      title: 'Recommandations',
      description: 'Découvrez les meilleures adresses recommandées par la communauté.',
      color: '#f59e0b'
    },
    {
      icon: Shield,
      title: 'Informations Vérifiées',
      description: 'Toutes les entreprises sont vérifiées pour vous garantir des informations fiables.',
      color: '#8b5cf6'
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Hero Section Amélioré */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '80px'
      }}>
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1), transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite'
        }} />

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem',
          position: 'relative',
          zIndex: 1,
          width: '100%'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', color: 'white' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              marginBottom: '2rem',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              <Sparkles size={16} />
              <span>Votre guide de Conakry</span>
            </div>

            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '4rem',
              fontWeight: '800',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              background: 'linear-gradient(to right, #ffffff, #f0f0f0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Découvrez Conakry
              <br />
              <span style={{ fontSize: isMobile ? '2rem' : '3rem' }}>En Poche</span>
            </h1>

            <p style={{
              fontSize: isMobile ? '1.125rem' : '1.5rem',
              marginBottom: '2.5rem',
              opacity: 0.95,
              maxWidth: '700px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6
            }}>
              Trouvez les meilleures adresses, restaurants, hôtels et services de Conakry en quelques clics.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                maxWidth: '600px',
                margin: '0 auto 2rem',
                position: 'relative'
              }}
            >
              <div style={{
                display: 'flex',
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '0.5rem',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
              }}>
                <Search size={24} color="#6b7280" style={{ margin: '0.75rem' }} />
                <input
                  type="text"
                  placeholder="Rechercher une entreprise, un service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '1rem',
                    padding: '0.75rem'
                  }}
                />
                <Link
                  to={`/all-categories${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                >
                  Rechercher
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>

            {/* Quick Actions */}
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
              <Link
                to="/all-categories"
                style={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Explorer
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>Découvrir</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronRight size={24} style={{ transform: 'rotate(90deg)' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* Statistiques */}
      <section style={{
        backgroundColor: 'white',
        padding: '4rem 0',
        marginTop: '-2rem',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
                  backgroundColor: '#f9fafb',
                  padding: '2rem',
                  borderRadius: '1rem',
                  textAlign: 'center',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  backgroundColor: `${stat.color}15`,
                  marginBottom: '1rem'
                }}>
                  <stat.icon size={32} color={stat.color} />
                </div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '600'
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section style={{
        backgroundColor: '#f9fafb',
        padding: '5rem 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Pourquoi choisir Conakry en Poche ?
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Tout ce dont vous avez besoin pour explorer Conakry en un seul endroit
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
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
                  borderRadius: '1.25rem',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  backgroundColor: `${feature.color}15`,
                  marginBottom: '1.5rem'
                }}>
                  <feature.icon size={32} color={feature.color} />
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '0.75rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  lineHeight: 1.6
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Catégories */}
      <section style={{
        backgroundColor: 'white',
        padding: '5rem 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <h2 style={{
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Explorez par Catégorie
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: '#6b7280'
              }}>
                Découvrez les meilleures adresses de Conakry
              </p>
            </div>
            <Link
              to="/all-categories"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#3b82f6',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                border: '2px solid #3b82f6',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#3b82f6';
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
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
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
                    position: 'relative',
                    zIndex: 5,
                    pointerEvents: 'auto'
                  }}
                >
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '1.25rem',
                    padding: '2rem',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e5e7eb',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                  }}
                  >
                    {/* Gradient Top Bar */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'][index % 6]} 0%, ${['#1d4ed8', '#059669', '#d97706', '#dc2626', '#7c3aed', '#0891b2'][index % 6]} 100%)`
                    }} />

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        fontSize: '3rem',
                        lineHeight: 1
                      }}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: '#1f2937',
                          margin: 0,
                          marginBottom: '0.25rem'
                        }}>
                          {category.name}
                        </h3>
                      </div>
                    </div>

                    <p style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      margin: 0,
                      marginBottom: '1.5rem',
                      lineHeight: 1.6
                    }}>
                      {getCategoryDescription(category.id)}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                      paddingTop: '1rem',
                      borderTop: '1px solid #e5e7eb'
                    }}>
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#3b82f6',
                        fontWeight: '600'
                      }}>
                        Découvrir
                      </span>
                      <ChevronRight size={20} color="#3b82f6" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Actualités & Activités */}
      {combinedItems.length > 0 && (
        <section style={{
          backgroundColor: '#f9fafb',
          padding: '5rem 0'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
              <h2 style={{
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Actualités & Activités
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: '#6b7280'
              }}>
                Restez informé de ce qui se passe à Conakry
              </p>
            </motion.div>

            <div style={{
              position: 'relative',
              maxWidth: '800px',
              margin: '0 auto',
              borderRadius: '1.25rem',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
            }}>
              {combinedItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    display: index === currentNewsIndex ? 'block' : 'none',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    height: '400px',
                    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0, 0, 0, 0.4)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '3rem',
                      color: 'white'
                    }}>
                      <div>
                        <div style={{
                          display: 'inline-block',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.875rem',
                          marginBottom: '1rem',
                          fontWeight: '600'
                        }}>
                          {item.category}
                        </div>
                        <h3 style={{
                          fontSize: '2rem',
                          fontWeight: '800',
                          marginBottom: '1rem',
                          lineHeight: 1.2
                        }}>
                          {item.title}
                        </h3>
                        <p style={{
                          fontSize: '1rem',
                          opacity: 0.9,
                          marginBottom: '1.5rem'
                        }}>
                          {item.date}
                        </p>
                        <Link
                          to={item.link || '#'}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backgroundColor: 'white',
                            color: '#667eea',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.75rem',
                            textDecoration: 'none',
                            fontWeight: '600',
                            transition: 'all 0.3s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          Lire la suite
                          <ArrowRight size={20} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Dots Navigation */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '0.5rem',
                zIndex: 10
              }}>
                {combinedItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNewsIndex(index)}
                    style={{
                      width: index === currentNewsIndex ? '2rem' : '0.5rem',
                      height: '0.5rem',
                      borderRadius: '0.25rem',
                      border: 'none',
                      backgroundColor: index === currentNewsIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '5rem 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: '800',
              marginBottom: '1rem'
            }}>
              Rejoignez des milliers d'habitants
            </h2>
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.95,
              marginBottom: '2.5rem',
              lineHeight: 1.6
            }}>
              Utilisez Conakry en Poche pour découvrir les meilleures adresses de votre ville
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                to="/register-business"
                style={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '1.125rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Ajouter mon entreprise
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/all-categories"
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '1.125rem',
                  border: '2px solid white',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Explorer maintenant
                <Globe size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <AdvertisementBanner />
    </div>
  );
};

export default ModernHomePage;
