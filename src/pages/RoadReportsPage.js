import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRoadReport } from '../contexts/RoadReportContext';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../utils/translations';
import { 
  AlertTriangle, 
  MapPin, 
  Calendar,
  Filter,
  Image as ImageIcon,
  Loader
} from 'lucide-react';

const RoadReportsPage = () => {
  const { reports, reportTypes, loading } = useRoadReport();
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { language } = useLanguage();
  const translate = (key, params) => t(language, key, params);

  // Filtrer les signalements
  const filteredReports = selectedType === 'all' 
    ? reports 
    : reports.filter(report => report.type === selectedType);

  const pluralSuffix = filteredReports.length !== 1 ? 's' : '';
  const countTextKey = selectedType !== 'all' ? 'roadReports.countFiltered' : 'roadReports.countTotal';
  const countText = translate(countTextKey, { count: filteredReports.length, plural: pluralSuffix });

  // Formater la date
  const locale = language === 'fr' ? 'fr-FR' : 'en-US';

  const formatDate = (timestamp) => {
    if (!timestamp) return translate('roadReports.time.unknown');
    
    let date;
    if (timestamp.toDate) {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    }

    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return translate('roadReports.time.justNow');
    if (minutes < 60) return translate('roadReports.time.minutes', { count: minutes });
    if (hours < 24) return translate('roadReports.time.hours', { count: hours });
    if (days < 7) return translate('roadReports.time.days', { count: days });
    
    return date.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Loader size={48} color="#3b82f6" style={{ margin: '0 auto 1rem', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: '#6b7280' }}>{translate('roadReports.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginBottom: '2rem'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                {translate('roadReports.title')}
              </h1>
              <p style={{
                color: '#6b7280',
                fontSize: '1rem'
              }}>
                {countText}
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                backgroundColor: showFilters ? '#3b82f6' : 'white',
                color: showFilters ? 'white' : '#374151',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!showFilters) {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (!showFilters) {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              <Filter size={18} />
              {translate('roadReports.filterButton')}
            </button>
          </div>

          {/* Filtres */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '1rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                marginBottom: '1rem'
              }}
            >
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => setSelectedType('all')}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: selectedType === 'all' ? '#3b82f6' : 'white',
                    color: selectedType === 'all' ? 'white' : '#374151',
                    border: `1px solid ${selectedType === 'all' ? '#3b82f6' : '#e5e7eb'}`,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {translate('roadReports.filters.all')}
                </button>
                {reportTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: selectedType === type.id ? type.color : 'white',
                      color: selectedType === type.id ? 'white' : '#374151',
                      border: `1px solid ${selectedType === type.id ? type.color : '#e5e7eb'}`,
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{type.icon}</span>
                    {type.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Liste des signalements */}
        {filteredReports.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              padding: '3rem',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <AlertTriangle size={64} color="#9ca3af" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              {translate('roadReports.noReportsTitle')}
            </h3>
            <p style={{ color: '#6b7280' }}>
              {selectedType !== 'all' 
                ? translate('roadReports.noReportsFiltered')
                : translate('roadReports.noReportsDescription')}
            </p>
          </motion.div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '1.5rem'
          }}>
            {filteredReports.map((report, index) => {
              const reportType = reportTypes.find(t => t.id === report.type);
              
              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb',
                    borderLeft: `4px solid ${reportType?.color || '#3b82f6'}`
                  }}
                >
                  <div style={{
                    display: 'flex',
                    gap: '1rem'
                  }}>
                    {/* Image */}
                    {report.imageUrl && (
                      <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '0.75rem',
                        overflow: 'hidden',
                        flexShrink: 0,
                        backgroundColor: '#f3f4f6'
                      }}>
                        <img
                          src={report.imageUrl}
                          alt={report.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `
                              <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
                                <span style="color: #9ca3af;">${reportType?.icon || '📷'}</span>
                              </div>
                            `;
                          }}
                        />
                      </div>
                    )}

                    {/* Contenu */}
                    <div style={{ flex: 1 }}>
                      {/* En-tête */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: '0.75rem',
                        gap: '1rem'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem'
                          }}>
                            <span style={{ fontSize: '1.5rem' }}>
                              {reportType?.icon || '🚧'}
                            </span>
                            <h3 style={{
                              margin: 0,
                              fontSize: '1.125rem',
                              fontWeight: '700',
                              color: '#1f2937'
                            }}>
                              {report.title}
                            </h3>
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            marginBottom: '0.5rem'
                          }}>
                            <MapPin size={16} />
                            <span>{report.location}</span>
                          </div>
                        </div>
                        <div style={{
                          padding: '0.5rem 0.75rem',
                          backgroundColor: `${reportType?.color || '#3b82f6'}15`,
                          color: reportType?.color || '#3b82f6',
                          borderRadius: '0.5rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          whiteSpace: 'nowrap'
                        }}>
                          {reportType?.name || translate('roadReports.defaultType')}
                        </div>
                      </div>

                      {/* Description */}
                      {report.description && (
                        <p style={{
                          margin: 0,
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          lineHeight: 1.6,
                          marginBottom: '0.75rem'
                        }}>
                          {report.description}
                        </p>
                      )}

                      {/* Footer */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        fontSize: '0.75rem',
                        color: '#9ca3af'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}>
                          <Calendar size={14} />
                          <span>{formatDate(report.createdAt)}</span>
                        </div>
                        {report.imageUrl && (
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <ImageIcon size={14} />
                            <span>{translate('roadReports.photoIncluded')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadReportsPage;

