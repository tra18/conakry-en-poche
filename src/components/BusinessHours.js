import React, { useState } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

const BusinessHours = ({ hours, timezone = 'Africa/Conakry' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fonction pour gérer les horaires de type workingHours (objet)
  const getStatusFromWorkingHours = (workingHours, currentDay, currentTime) => {
    const dayMap = {
      'lundi': 'monday',
      'mardi': 'tuesday',
      'mercredi': 'wednesday',
      'jeudi': 'thursday',
      'vendredi': 'friday',
      'samedi': 'saturday',
      'dimanche': 'sunday'
    };
    
    const dayKey = dayMap[currentDay];
    if (!dayKey || !workingHours[dayKey]) {
      return { status: 'unknown', message: 'Horaires non disponibles' };
    }
    
    const daySchedule = workingHours[dayKey];
    if (daySchedule.closed) {
      return { status: 'closed', message: 'Fermé', color: '#ef4444' };
    }
    
    if (!daySchedule.open || !daySchedule.close) {
      return { status: 'unknown', message: 'Horaires non disponibles' };
    }
    
    // Convertir les heures en minutes
    const [openHour, openMin] = daySchedule.open.split(':').map(Number);
    const [closeHour, closeMin] = daySchedule.close.split(':').map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;
    
    if (currentTime >= openTime && currentTime < closeTime) {
      const minutesToClose = closeTime - currentTime;
      if (minutesToClose <= 30) {
        return { 
          status: 'closing-soon', 
          message: `Ferme dans ${minutesToClose} min`,
          color: '#f59e0b'
        };
      }
      return { 
        status: 'open', 
        message: 'Ouvert',
        color: '#10b981'
      };
    }
    
    return { 
      status: 'closed', 
      message: 'Fermé',
      color: '#ef4444'
    };
  };

  // Fonction pour parser les horaires et créer un tableau pour tous les jours
  const parseAllDaysSchedule = () => {
    const days = [
      { key: 'monday', label: 'Lundi', short: 'Lun' },
      { key: 'tuesday', label: 'Mardi', short: 'Mar' },
      { key: 'wednesday', label: 'Mercredi', short: 'Mer' },
      { key: 'thursday', label: 'Jeudi', short: 'Jeu' },
      { key: 'friday', label: 'Vendredi', short: 'Ven' },
      { key: 'saturday', label: 'Samedi', short: 'Sam' },
      { key: 'sunday', label: 'Dimanche', short: 'Dim' }
    ];

    if (!hours || !hours.schedule) {
      return days.map(day => ({ ...day, hours: 'Horaires non renseignés', closed: false }));
    }

    const schedule = hours.schedule;

    // Si c'est un objet workingHours
    if (typeof schedule === 'object' && schedule !== null) {
      return days.map(day => {
        const daySchedule = schedule[day.key];
        if (!daySchedule || daySchedule.closed) {
          return { ...day, hours: 'Fermé', closed: true };
        }
        if (daySchedule.open && daySchedule.close) {
          return { 
            ...day, 
            hours: `${daySchedule.open} - ${daySchedule.close}`, 
            closed: false,
            openTime: daySchedule.open,
            closeTime: daySchedule.close
          };
        }
        return { ...day, hours: 'Horaires non renseignés', closed: false };
      });
    }

    // Si c'est une chaîne, parser le format
    const scheduleStr = String(schedule);
    const result = days.map(day => {
      // Chercher les horaires pour ce jour
      const patterns = [
        new RegExp(`${day.short}[^:]*:?\\s*(\\d{1,2})h?[:-]?(\\d{1,2})h?`, 'i'),
        new RegExp(`${day.label.toLowerCase()}[^:]*:?\\s*(\\d{1,2})h?[:-]?(\\d{1,2})h?`, 'i')
      ];

      for (const pattern of patterns) {
        const match = scheduleStr.match(pattern);
        if (match) {
          const open = match[1].padStart(2, '0');
          const close = match[2].padStart(2, '0');
          return { 
            ...day, 
            hours: `${open}:00 - ${close}:00`, 
            closed: false,
            openTime: `${open}:00`,
            closeTime: `${close}:00`
          };
        }
      }

      // Vérifier les plages de jours (ex: Lun-Ven)
      const rangePattern = /(lun|mar|mer|jeu|ven|sam|dim)\s*-\s*(lun|mar|mer|jeu|ven|sam|dim)[^:]*:?\s*(\d{1,2})h?[:-]?(\d{1,2})h?/i;
      const rangeMatch = scheduleStr.match(rangePattern);
      if (rangeMatch) {
        const startDay = rangeMatch[1].toLowerCase();
        const endDay = rangeMatch[2].toLowerCase();
        const dayIndex = days.findIndex(d => d.short.toLowerCase() === day.short.toLowerCase());
        const startIndex = days.findIndex(d => d.short.toLowerCase() === startDay);
        const endIndex = days.findIndex(d => d.short.toLowerCase() === endDay);
        
        if (dayIndex >= startIndex && dayIndex <= endIndex) {
          const open = rangeMatch[3].padStart(2, '0');
          const close = rangeMatch[4].padStart(2, '0');
          return { 
            ...day, 
            hours: `${open}:00 - ${close}:00`, 
            closed: false,
            openTime: `${open}:00`,
            closeTime: `${close}:00`
          };
        }
      }

      // Format simple pour tous les jours (ex: "8h-18h")
      const simplePattern = /(\d{1,2})h?\s*-\s*(\d{1,2})h?/;
      const simpleMatch = scheduleStr.match(simplePattern);
      if (simpleMatch && !scheduleStr.match(/(lun|mar|mer|jeu|ven|sam|dim)/i)) {
        const open = simpleMatch[1].padStart(2, '0');
        const close = simpleMatch[2].padStart(2, '0');
        return { 
          ...day, 
          hours: `${open}:00 - ${close}:00`, 
          closed: false,
          openTime: `${open}:00`,
          closeTime: `${close}:00`
        };
      }

      return { ...day, hours: 'Horaires non renseignés', closed: false };
    });

    return result;
  };

  // Fonction pour obtenir le statut actuel (ouvert/fermé/ferme bientôt)
  const getBusinessStatus = () => {
    if (!hours || !hours.schedule) return { status: 'unknown', message: 'Horaires non disponibles' };

    const now = new Date();
    const currentDay = now.toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Minutes depuis minuit

    // Parser les horaires (format: "Lun-Ven: 8h-18h, Sam: 8h-14h")
    const schedule = hours.schedule;
    
    // Vérifier si schedule est un objet (workingHours) ou une chaîne
    if (typeof schedule === 'object' && schedule !== null) {
      return getStatusFromWorkingHours(schedule, currentDay, currentTime);
    }
    
    // Si c'est une chaîne, vérifier qu'elle existe et est valide
    if (typeof schedule !== 'string' || !schedule.trim()) {
      return { status: 'unknown', message: 'Horaires non disponibles' };
    }
    
    // Si c'est un format simple (ex: "8h-18h")
    if (schedule.includes(':') && !schedule.includes('h-')) {
      const timeMatch = schedule.match(/(\d{1,2})h-(\d{1,2})h/);
      if (timeMatch) {
        const openTime = parseInt(timeMatch[1]) * 60;
        const closeTime = parseInt(timeMatch[2]) * 60;
        
        if (currentTime >= openTime && currentTime < closeTime) {
          const minutesToClose = closeTime - currentTime;
          if (minutesToClose <= 30) {
            return { 
              status: 'closing-soon', 
              message: `Ferme dans ${minutesToClose} min`,
              color: '#f59e0b'
            };
          }
          return { 
            status: 'open', 
            message: 'Ouvert',
            color: '#10b981'
          };
        }
        return { 
          status: 'closed', 
          message: 'Fermé',
          color: '#ef4444'
        };
      }
    }

    // Format plus complexe avec jours de la semaine
    const dayMapping = {
      'lundi': 'lun',
      'mardi': 'mar', 
      'mercredi': 'mer',
      'jeudi': 'jeu',
      'vendredi': 'ven',
      'samedi': 'sam',
      'dimanche': 'dim'
    };

    // Chercher les horaires pour le jour actuel
    const currentDayShort = dayMapping[currentDay];
    if (currentDayShort) {
      const dayPattern = new RegExp(`${currentDayShort}[^:]*:?\\s*(\\d{1,2})h-(\\d{1,2})h`, 'i');
      const match = schedule.match(dayPattern);
      
      if (match) {
        const openTime = parseInt(match[1]) * 60;
        const closeTime = parseInt(match[2]) * 60;
        
        if (currentTime >= openTime && currentTime < closeTime) {
          const minutesToClose = closeTime - currentTime;
          if (minutesToClose <= 30) {
            return { 
              status: 'closing-soon', 
              message: `Ferme dans ${minutesToClose} min`,
              color: '#f59e0b'
            };
          }
          return { 
            status: 'open', 
            message: 'Ouvert',
            color: '#10b981'
          };
        }
        return { 
          status: 'closed', 
          message: 'Fermé',
          color: '#ef4444'
        };
      }
    }

    return { 
      status: 'unknown', 
      message: 'Horaires non disponibles',
      color: '#6b7280'
    };
  };

  // Fonction pour formater les horaires pour l'affichage
  const formatSchedule = () => {
    if (!hours || !hours.schedule) return 'Horaires non renseignés';
    
    // Convertir en chaîne si c'est un objet
    const scheduleStr = typeof hours.schedule === 'string' ? hours.schedule : String(hours.schedule);
    
    // Si c'est un format simple, le retourner tel quel
    if (!scheduleStr.includes(',')) {
      return scheduleStr;
    }
    
    // Pour les formats complexes, on peut les formater plus joliment
    return scheduleStr
      .replace(/lun/gi, 'Lun')
      .replace(/mar/gi, 'Mar')
      .replace(/mer/gi, 'Mer')
      .replace(/jeu/gi, 'Jeu')
      .replace(/ven/gi, 'Ven')
      .replace(/sam/gi, 'Sam')
      .replace(/dim/gi, 'Dim');
  };

  const status = getBusinessStatus();
  const allDaysSchedule = parseAllDaysSchedule();
  const now = new Date();
  const currentDayIndex = (now.getDay() + 6) % 7; // Lundi = 0, Dimanche = 6

  return (
    <div style={{ marginTop: '0.75rem' }}>
      {/* Statut dynamique */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.75rem',
        padding: '0.75rem',
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
        border: `1px solid ${status.color}40`
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: status.color
          }}></div>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: status.color
          }}>
            {status.message}
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            fontSize: '0.75rem',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Clock size={14} />
          {isExpanded ? 'Masquer' : 'Voir horaires'}
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Horaires détaillés - Style Google Maps */}
      {isExpanded && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          marginTop: '0.5rem'
        }}>
          <div style={{
            padding: '0.75rem',
            backgroundColor: '#f9fafb',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Clock size={16} color="#6b7280" />
            <span style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151'
            }}>
              Horaires d'ouverture
            </span>
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            {allDaysSchedule.map((day, index) => {
              const isToday = index === currentDayIndex;
              return (
                <div
                  key={day.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: isToday ? '#eff6ff' : 'transparent',
                    borderLeft: isToday ? '3px solid #3b82f6' : '3px solid transparent',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <div style={{
                    width: '80px',
                    fontSize: '0.875rem',
                    fontWeight: isToday ? '600' : '400',
                    color: isToday ? '#3b82f6' : '#374151'
                  }}>
                    {day.label}
                  </div>
                  <div style={{
                    flex: 1,
                    fontSize: '0.875rem',
                    color: day.closed ? '#ef4444' : '#6b7280',
                    fontWeight: isToday ? '600' : '400'
                  }}>
                    {day.hours}
                  </div>
                  {isToday && (
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#3b82f6',
                      fontWeight: '600',
                      marginLeft: '0.5rem'
                    }}>
                      Aujourd'hui
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Affichage compact (quand non expansé) */}
      {!isExpanded && (
        <div style={{
          fontSize: '0.8rem',
          color: '#6b7280',
          lineHeight: '1.4',
          padding: '0.5rem 0.75rem',
          backgroundColor: '#f9fafb',
          borderRadius: '0.375rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={14} color="#6b7280" />
            <span>{formatSchedule()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessHours;
