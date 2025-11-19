import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Heart, Share2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEvent } from '../contexts/EventContext';
import EnhancedShareButton from './EnhancedShareButton';
import toast from 'react-hot-toast';

const EventCalendar = ({ onEventSelect, showAddButton = false }) => {
  const { events, favoriteEvents, addToFavorites, removeFromFavorites, isFavorite, getUpcomingEvents, getTodayEvents, getWeekEvents } = useEvent();
  const [viewMode, setViewMode] = useState('month'); // month, week, list
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const upcomingEvents = getUpcomingEvents();
  const todayEvents = getTodayEvents();
  const weekEvents = getWeekEvents();

  // Navigation du calendrier
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Obtenir les événements d'une date spécifique
  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      const eventDateStr = eventDate.toISOString().split('T')[0];
      return eventDateStr === dateStr;
    });
  };

  // Générer les jours du mois
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Jours du mois précédent
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false
      });
    }

    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true
      });
    }

    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false
      });
    }

    return days;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    if (onEventSelect) {
      onEventSelect(event);
    }
  };

  const toggleFavorite = (eventId) => {
    if (isFavorite(eventId)) {
      removeFromFavorites(eventId);
    } else {
      addToFavorites(eventId);
    }
  };

  const days = getDaysInMonth();
  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem'
      }}>
        <div>
          <h2 style={{
            margin: 0,
            marginBottom: '0.5rem',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1f2937'
          }}>
            Agenda des Événements
          </h2>
          <p style={{
            margin: 0,
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            {upcomingEvents.length} événement{upcomingEvents.length > 1 ? 's' : ''} à venir
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['month', 'week', 'list'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: viewMode === mode ? '#3b82f6' : '#f3f4f6',
                color: viewMode === mode ? 'white' : '#374151',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600',
                textTransform: 'capitalize',
                transition: 'all 0.2s'
              }}
            >
              {mode === 'month' ? 'Mois' : mode === 'week' ? 'Semaine' : 'Liste'}
            </button>
          ))}
        </div>
      </div>

      {/* Vue Calendrier Mois */}
      {viewMode === 'month' && (
        <div>
          {/* Navigation du mois */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem'
          }}>
            <button
              onClick={goToPreviousMonth}
              style={{
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ChevronLeft size={20} color="#374151" />
            </button>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1f2937'
            }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            <button
              onClick={goToNextMonth}
              style={{
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <ChevronRight size={20} color="#374151" />
            </button>
          </div>

          {/* Grille du calendrier */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            {weekDays.map(day => (
              <div
                key={day}
                style={{
                  padding: '0.75rem',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#6b7280'
                }}
              >
                {day}
              </div>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '0.5rem'
          }}>
            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day.date);
              const isToday = day.date.toDateString() === new Date().toDateString();
              const isSelected = day.date.toDateString() === selectedDate.toDateString();

              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(day.date)}
                  style={{
                    minHeight: '80px',
                    padding: '0.5rem',
                    backgroundColor: isSelected ? '#eff6ff' : isToday ? '#fef3c7' : 'white',
                    border: isToday ? '2px solid #fbbf24' : isSelected ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    opacity: day.isCurrentMonth ? 1 : 0.4
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected && !isToday) {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected && !isToday) {
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }}
                >
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: isToday ? '700' : '600',
                    color: isToday ? '#f59e0b' : '#374151',
                    marginBottom: '0.25rem'
                  }}>
                    {day.date.getDate()}
                  </div>
                  {dayEvents.length > 0 && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem'
                    }}>
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(event);
                          }}
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.25rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            borderRadius: '0.25rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer'
                          }}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          textAlign: 'center'
                        }}>
                          +{dayEvents.length - 2}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={goToToday}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            Aujourd'hui
          </button>
        </div>
      )}

      {/* Vue Semaine */}
      {viewMode === 'week' && (
        <div>
          <h3 style={{
            margin: 0,
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#374151'
          }}>
            Événements de la semaine
          </h3>
          {weekEvents.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {weekEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  style={{
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.75rem',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        margin: 0,
                        marginBottom: '0.5rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        {event.title}
                      </h4>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Calendar size={14} />
                          {formatDate(new Date(event.startDate))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={14} />
                          {formatTime(event.startDate)}
                        </div>
                        {event.location && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MapPin size={14} />
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(event.id);
                      }}
                      style={{
                        padding: '0.5rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: isFavorite(event.id) ? '#ef4444' : '#9ca3af',
                        transition: 'color 0.2s'
                      }}
                    >
                      <Heart size={20} fill={isFavorite(event.id) ? '#ef4444' : 'none'} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
              Aucun événement cette semaine
            </p>
          )}
        </div>
      )}

      {/* Vue Liste */}
      {viewMode === 'list' && (
        <div>
          <h3 style={{
            margin: 0,
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#374151'
          }}>
            Tous les événements à venir
          </h3>
          {upcomingEvents.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcomingEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.75rem',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    gap: '1rem'
                  }}>
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        style={{
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '0.5rem'
                        }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                      }}>
                        <h4 style={{
                          margin: 0,
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          color: '#374151'
                        }}>
                          {event.title}
                        </h4>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(event.id);
                            }}
                            style={{
                              padding: '0.5rem',
                              backgroundColor: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              color: isFavorite(event.id) ? '#ef4444' : '#9ca3af'
                            }}
                          >
                            <Heart size={20} fill={isFavorite(event.id) ? '#ef4444' : 'none'} />
                          </button>
                          <EnhancedShareButton
                            variant="icon"
                            title={event.title}
                            text={event.description}
                            url={`${window.location.origin}/event/${event.id}`}
                            image={event.image}
                          />
                        </div>
                      </div>
                      {event.description && (
                        <p style={{
                          margin: '0 0 0.75rem 0',
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          lineHeight: '1.5'
                        }}>
                          {event.description}
                        </p>
                      )}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Calendar size={14} />
                          {formatDate(new Date(event.startDate))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={14} />
                          {formatTime(event.startDate)}
                          {event.endDate && ` - ${formatTime(event.endDate)}`}
                        </div>
                        {event.location && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MapPin size={14} />
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
              Aucun événement à venir
            </p>
          )}
        </div>
      )}

      {/* Modal détails événement */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              padding: '1rem'
            }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'space-between',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  flex: 1
                }}>
                  {selectedEvent.title}
                </h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <X size={24} color="#6b7280" />
                </button>
              </div>

              {selectedEvent.image && (
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '0.75rem',
                    marginBottom: '1.5rem'
                  }}
                />
              )}

              {selectedEvent.description && (
                <p style={{
                  margin: '0 0 1.5rem 0',
                  fontSize: '1rem',
                  color: '#374151',
                  lineHeight: '1.6'
                }}>
                  {selectedEvent.description}
                </p>
              )}

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '1.5rem',
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Calendar size={20} color="#3b82f6" />
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Date</div>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>
                      {formatDate(new Date(selectedEvent.startDate))}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Clock size={20} color="#3b82f6" />
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Heure</div>
                    <div style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>
                      {formatTime(selectedEvent.startDate)}
                      {selectedEvent.endDate && ` - ${formatTime(selectedEvent.endDate)}`}
                    </div>
                  </div>
                </div>
                {selectedEvent.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <MapPin size={20} color="#3b82f6" />
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Lieu</div>
                      <div style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>
                        {selectedEvent.location}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex',
                gap: '0.75rem'
              }}>
                <button
                  onClick={() => toggleFavorite(selectedEvent.id)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: isFavorite(selectedEvent.id) ? '#fee2e2' : '#f3f4f6',
                    color: isFavorite(selectedEvent.id) ? '#dc2626' : '#374151',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <Heart size={18} fill={isFavorite(selectedEvent.id) ? '#dc2626' : 'none'} />
                  {isFavorite(selectedEvent.id) ? 'Retiré des favoris' : 'Ajouter aux favoris'}
                </button>
                <EnhancedShareButton
                  title={selectedEvent.title}
                  text={selectedEvent.description}
                  url={`${window.location.origin}/event/${selectedEvent.id}`}
                  image={selectedEvent.image}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventCalendar;

