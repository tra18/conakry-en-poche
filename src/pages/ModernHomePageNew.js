import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBusiness } from '../contexts/BusinessContext';
import { useActivity } from '../contexts/ActivityContext';
import { useEvent } from '../contexts/EventContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';
import WeatherWidget from '../components/WeatherWidget';
import { 
  Search, 
  MapPin, 
  Star, 
  ArrowRight, 
  Building2, 
  Calendar,
  Clock,
  Phone,
  Mail,
  TrendingUp,
  Users,
  Award,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  List
} from 'lucide-react';

const ModernHomePageNew = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const { categories, validatedBusinesses } = useBusiness();
  const { getActiveActivities } = useActivity();
  const { getUpcomingEvents } = useEvent();
  const { language } = useLanguage();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const topBusinesses = validatedBusinesses
    .filter(b => b.rating && b.rating >= 4)
    .slice(0, 6);

  const activeActivities = getActiveActivities().slice(0, 3);
  const upcomingEvents = getUpcomingEvents().slice(0, 3);
  const featuredCategories = categories.slice(0, 8);

  const stats = [
    { icon: Building2, value: validatedBusinesses.length || 500, labelKey: 'home.statistics.businesses', color: '#667eea' },
    { icon: Users, value: '10K+', labelKey: 'home.statistics.users', color: '#10b981' },
    { icon: Star, value: '4.8', labelKey: 'home.statistics.averageRating', color: '#f59e0b' },
    { icon: TrendingUp, value: '15', labelKey: 'home.statistics.categories', color: '#ef4444' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{
        backgroundImage: 'url(/img.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: isMobile ? '4rem 1.5rem' : '6rem 1.5rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        minHeight: isMobile ? '500px' : '600px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Overlay sombre pour la lisibilité */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%)',
          zIndex: 0
        }} />
        
        {/* Pattern overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1), transparent 50%)',
          opacity: 0.5,
          zIndex: 1
        }} />

        {/* Météo Widget - Position en haut à gauche (desktop) ou en haut à droite (mobile) */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            position: 'absolute',
            top: isMobile ? '1rem' : '2rem',
            left: isMobile ? 'auto' : '2rem',
            right: isMobile ? '1rem' : 'auto',
            zIndex: 10
          }}
        >
          <WeatherWidget compact={isMobile} />
        </motion.div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          width: '100%',
          paddingTop: isMobile ? '4rem' : '0'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              <Sparkles size={16} />
              <span>{t(language, 'home.subtitle')}</span>
            </div>

            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '4rem',
              fontWeight: '800',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              margin: '0 auto 1.5rem',
              maxWidth: '800px'
            }}>
              {t(language, 'home.title')}
            </h1>

            <p style={{
              fontSize: isMobile ? '1.125rem' : '1.5rem',
              marginBottom: '2.5rem',
              opacity: 0.95,
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6
            }}>
              {t(language, 'home.subtitle')}
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                maxWidth: '600px',
                margin: '0 auto 2rem'
              }}
            >
              <div style={{
                display: 'flex',
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '0.5rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                gap: '0.5rem'
              }}>
                <Search size={24} color="#6b7280" style={{ margin: '0.75rem' }} />
                <input
                  type="text"
                  placeholder={t(language, 'home.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearch}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '1rem',
                    padding: '0.75rem 0',
                    color: '#1f2937',
                    backgroundColor: 'transparent'
                  }}
                />
                <button
                  onClick={() => {
                    if (searchQuery.trim()) {
                      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                    }
                  }}
                  style={{
                    backgroundColor: '#667eea',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '12px',
                    border: 'none',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#5568d3';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#667eea';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {t(language, 'common.search')}
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: '1px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {t(language, 'home.categories.viewAll')}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/traffic-map"
                style={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {t(language, 'header.trafficMap')}
                <MapPin size={18} />
              </Link>
            </motion.div>

            {/* Signalements Routiers Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                marginTop: '2rem',
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
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
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.5)';
                  e.currentTarget.style.backgroundColor = '#d97706';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.4)';
                  e.currentTarget.style.backgroundColor = '#f59e0b';
                }}
              >
                <AlertTriangle size={20} />
                {t(language, 'home.reportRoadIssue')}
              </Link>
              <Link
                to="/road-reports"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <List size={20} />
                {t(language, 'home.viewRoadReports')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        backgroundColor: '#f9fafb',
        padding: isMobile ? '3rem 1.5rem' : '4rem 1.5rem',
        marginTop: '-2rem',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '2rem'
          }}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  padding: '1rem',
                  borderRadius: '12px',
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
                  {t(language, stat.labelKey)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{
        padding: isMobile ? '4rem 1.5rem' : '5rem 1.5rem',
        backgroundColor: '#ffffff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h2 style={{
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                {t(language, 'home.categories.title')}
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: '#6b7280'
              }}>
                {t(language, 'home.subtitle')}
              </p>
            </div>
            <Link
              to="/all-categories"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                border: '2px solid #667eea',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#667eea';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#667eea';
              }}
            >
              {t(language, 'home.categories.viewAll')}
              <ArrowRight size={20} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category.id}`}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '2rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderColor = '#667eea';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
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
                      {t(language, 'home.subtitle')}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1rem',
                      borderTop: '1px solid #e5e7eb'
                    }}>
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#667eea',
                        fontWeight: '600'
                      }}>
                        {t(language, 'common.search')}
                      </span>
                      <ChevronRight size={20} color="#667eea" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Businesses Section */}
      {topBusinesses.length > 0 && (
        <section style={{
          padding: isMobile ? '4rem 1.5rem' : '5rem 1.5rem',
          backgroundColor: '#f9fafb'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '3rem',
              textAlign: 'center'
            }}>
              {t(language, 'home.topBusinesses.title')}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {topBusinesses.map((business, index) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: '#1f2937',
                        margin: 0,
                        marginBottom: '0.5rem'
                      }}>
                        {business.name}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        <Star size={16} color="#f59e0b" fill="#f59e0b" />
                        <span style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          {business.rating?.toFixed(1) || '4.5'}
                        </span>
                      </div>
                    </div>
                    <div style={{
                      fontSize: '2rem'
                    }}>
                      {categories.find(c => c.id === business.category)?.icon || '📍'}
                    </div>
                  </div>

                  {business.address && (
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      margin: '0 0 0.75rem 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <MapPin size={16} color="#6b7280" />
                      {business.address}
                    </p>
                  )}

                  {business.phone && (
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#059669',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Phone size={16} color="#059669" />
                      {business.phone}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: isMobile ? '4rem 1.5rem' : '5rem 1.5rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
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
              {t(language, 'home.title')}
            </h2>
            <p style={{
              fontSize: '1.25rem',
              opacity: 0.95,
              marginBottom: '2.5rem',
              lineHeight: 1.6
            }}>
              {t(language, 'home.subtitle')}
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
                  // Laisser React Router gérer la navigation
                  e.stopPropagation();
                }}
                style={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '1.125rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s',
                  position: 'relative',
                  zIndex: 10,
                  pointerEvents: 'auto',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {t(language, 'home.registerBusiness')}
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/all-categories"
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
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
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {t(language, 'home.categories.viewAll')}
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ModernHomePageNew;

