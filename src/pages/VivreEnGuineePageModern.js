import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, ChevronRight, Star, Users, TrendingUp, Shield,
  Home, Heart, BookOpen, GraduationCap, Building2, Car, UtensilsCrossed, 
  Stethoscope, Plane, Wallet, Globe, Search, Calendar, AlertCircle, 
  CheckCircle, Info, Award, Sparkles, ArrowRight
} from 'lucide-react';
import { useBusiness } from '../contexts/BusinessContext';
import { useLanguage } from '../contexts/LanguageContext';
import vivreContent from '../data/vivreContent';
import WeatherWidget from '../components/WeatherWidget';

const VivreEnGuineePageModern = () => {
  const { language } = useLanguage();
  const localizedContent = vivreContent[language] || vivreContent.fr;
  const defaultSectionId = localizedContent.sections[0]?.id || 'culture';
  const [activeSection, setActiveSection] = useState(defaultSectionId);
  const [isMobile, setIsMobile] = useState(false);
  const { validatedBusinesses, categories } = useBusiness();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!localizedContent.sections.some(section => section.id === activeSection)) {
      setActiveSection(localizedContent.sections[0]?.id || defaultSectionId);
    }
  }, [language]);

  const getBusinessesByCategory = (categorySlug) => {
    const category = categories.find(c => c.id === categorySlug);
    if (!category) return [];
    return validatedBusinesses
      .filter(b => b.category === categorySlug)
      .slice(0, 3);
  };

  const buildSectionBusinesses = (section) => {
    if (!section.businessCategories?.length) {
      return [];
    }
    return section.businessCategories.flatMap((categorySlug) =>
      getBusinessesByCategory(categorySlug)
    );
  };

  const sectionsWithBusinesses = localizedContent.sections.map((section) => ({
    ...section,
    businesses: buildSectionBusinesses(section)
  }));

  const currentSectionData =
    sectionsWithBusinesses.find((section) => section.id === activeSection) ||
    sectionsWithBusinesses[0] || {
      icon: '🌍',
      color: '#667eea',
      content: [],
      businesses: []
    };

  const heroColor = currentSectionData.color || '#667eea';
  const heroGradientEnd = `${heroColor}dd`;
  const heroIcon = currentSectionData.icon || '🌍';

  const firstBusinessCategory = currentSectionData.businesses?.[0]?.category;
  const quickGuideItems = localizedContent.quickGuide?.items || [];
  const usefulNumberItems = localizedContent.usefulNumbers?.items || [];
  const practicalTips = localizedContent.practicalTips?.tips || [];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ffffff',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(135deg, ${heroColor} 0%, ${heroGradientEnd} 100%)`,
        padding: isMobile ? '4rem 1.5rem' : '6rem 1.5rem',
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
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1), transparent 50%)',
          opacity: 0.5
        }} />

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              {heroIcon}
            </div>
            <h1 style={{
              fontSize: isMobile ? '2.5rem' : '4rem',
              fontWeight: '800',
              margin: 0,
              marginBottom: '1rem',
              lineHeight: 1.1
            }}>
              {localizedContent.hero.title}
            </h1>
            <p style={{
              fontSize: isMobile ? '1.125rem' : '1.5rem',
              margin: 0,
              maxWidth: '700px',
              margin: '0 auto',
              opacity: 0.95,
              lineHeight: 1.6
            }}>
              {currentSectionData.description || localizedContent.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation des sections */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 0',
        position: 'sticky',
        top: '70px',
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem'
        }}>
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'thin'
          }}>
            {sectionsWithBusinesses.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  padding: isMobile ? '0.75rem 1rem' : '0.875rem 1.5rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeSection === section.id
                    ? `linear-gradient(135deg, ${section.color} 0%, ${section.color}dd 100%)`
                    : '#f3f4f6',
                  color: activeSection === section.id ? 'white' : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  whiteSpace: 'nowrap',
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  fontWeight: activeSection === section.id ? '600' : '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: activeSection === section.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{section.icon}</span>
                <span>{isMobile ? section.short : section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div style={{ padding: isMobile ? '2rem 1.5rem' : '4rem 1.5rem' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) 380px',
          gap: '2rem'
        }}>
          {/* Contenu principal */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: isMobile ? '2rem' : '3rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2.5rem',
              paddingBottom: '2rem',
              borderBottom: '2px solid #e5e7eb'
            }}>
              <div style={{
                fontSize: '3rem',
                lineHeight: 1
              }}>
                {heroIcon}
              </div>
              <div>
                <h2 style={{
                  fontSize: isMobile ? '1.75rem' : '2.5rem',
                  fontWeight: '800',
                  color: '#1f2937',
                  margin: 0,
                  marginBottom: '0.5rem'
                }}>
                  {currentSectionData.title || currentSectionData.name}
                </h2>
                <p style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {localizedContent.sectionIntro}
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {(currentSectionData.content || []).map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    backgroundColor: '#f9fafb',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderColor = heroColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ fontSize: '1.75rem' }}>{section.icon}</div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#374151',
                      margin: 0
                    }}>
                      {section.title}
                    </h3>
                  </div>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}>
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        style={{
                          color: '#4b5563',
                          fontSize: '0.95rem',
                          lineHeight: 1.6,
                          fontWeight: item.highlight ? '600' : '400',
                          listStyleType: 'disc'
                        }}
                      >
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Entreprises liées */}
            {currentSectionData.businesses && currentSectionData.businesses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '2rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '2rem',
                  backgroundColor: '#eff6ff'
                }}
              >
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1e40af',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Building2 size={24} color="#1e40af" />
                  {localizedContent.recommendedBusinessesTitle}
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem'
                }}>
                  {currentSectionData.businesses.map((business) => (
                    <Link
                      key={business.id}
                      to={`/category/${business.category}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: '#374151',
                        transition: 'all 0.2s',
                        border: '1px solid #dbeafe'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#dbeafe';
                        e.currentTarget.style.transform = 'translateX(4px)';
                        e.currentTarget.style.borderColor = '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.borderColor = '#dbeafe';
                      }}
                    >
                      <div>
                        <div style={{
                          fontWeight: '600',
                          fontSize: '0.875rem',
                          marginBottom: '0.25rem'
                        }}>
                          {business.name}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#6b7280'
                        }}>
                          {business.address}
                        </div>
                      </div>
                      <ChevronRight size={18} color="#3b82f6" />
                    </Link>
                  ))}
                </div>
                {firstBusinessCategory && (
                  <Link
                    to={`/category/${firstBusinessCategory}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '1.5rem',
                      color: '#3b82f6',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    {localizedContent.recommendedBusinessesCta}
                    <ArrowRight size={16} />
                  </Link>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Sidebar */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {/* Météo Widget */}
            <WeatherWidget />

            {/* Guide rapide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid #e5e7eb'
              }}
            >
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <BookOpen size={20} color="#3b82f6" />
                {localizedContent.quickGuide.title}
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {quickGuideItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link || '#'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.875rem',
                      color: '#4b5563',
                      textDecoration: 'none',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.color = '#3b82f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#4b5563';
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Numéros utiles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid #e5e7eb'
              }}
            >
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Phone size={20} color="#ef4444" />
                {localizedContent.usefulNumbers.title}
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {usefulNumberItems.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      backgroundColor: '#f9fafb',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }}
                  >
                    <span style={{ color: '#4b5563', fontWeight: '500' }}>{item.label}</span>
                    <a
                      href={`tel:${item.number}`}
                      style={{
                        fontWeight: '700',
                        color: item.color,
                        textDecoration: 'none'
                      }}
                    >
                      {item.number}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Conseils pratiques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid #e5e7eb'
              }}
            >
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <CheckCircle size={20} color="#10b981" />
                {localizedContent.practicalTips.title}
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.875rem',
                color: '#4b5563'
              }}>
                {practicalTips.map((tip, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0fdf4';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <CheckCircle size={16} color="#10b981" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                padding: '2rem',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                marginBottom: '0.75rem'
              }}>
                {localizedContent.cta.title}
              </h3>
              <p style={{
                fontSize: '0.875rem',
                opacity: 0.95,
                marginBottom: '1.5rem',
                lineHeight: 1.6
              }}>
                {localizedContent.cta.description}
              </p>
              <Link
                to="/all-categories"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'white',
                  color: '#667eea',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {localizedContent.cta.button}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VivreEnGuineePageModern;

