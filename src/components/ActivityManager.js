import React, { useState } from 'react';
import { useActivity } from '../contexts/ActivityContext';
import MediaUpload from './MediaUpload';
import toast from 'react-hot-toast';

const ActivityManager = () => {
  const { activities, createActivity, updateActivity, deleteActivity, toggleActivity, loading } = useActivity();
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    category: '',
    organizer: '',
    contact: '',
    email: '',
    media: null
  });
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'inactive', 'upcoming'

  const categories = [
    { id: 'culture', name: 'Culture', icon: '🎭' },
    { id: 'musique', name: 'Musique', icon: '🎵' },
    { id: 'sport', name: 'Sport', icon: '⚽' },
    { id: 'art', name: 'Art', icon: '🎨' },
    { id: 'education', name: 'Éducation', icon: '📚' },
    { id: 'sante', name: 'Santé', icon: '🏥' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'religion', name: 'Religion', icon: '⛪' },
    { id: 'autre', name: 'Autre', icon: '📋' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.location || !formData.date) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const activityData = {
      ...formData,
      // Conversion de la date et heure en format ISO si nécessaire
      date: formData.date,
      time: formData.time
    };

    let success;
    if (editingActivity) {
      success = await updateActivity(editingActivity.id, activityData);
    } else {
      success = await createActivity(activityData);
    }

    if (success) {
      resetForm();
      setShowForm(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      date: '',
      time: '',
      category: '',
      organizer: '',
      contact: '',
      email: '',
      media: null
    });
    setEditingActivity(null);
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setFormData({
      title: activity.title,
      description: activity.description,
      location: activity.location,
      date: activity.date,
      time: activity.time,
      category: activity.category,
      organizer: activity.organizer,
      contact: activity.contact,
      email: activity.email,
      media: activity.media || null
    });
    setShowForm(true);
  };

  const handleDelete = async (activityId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
      await deleteActivity(activityId);
    }
  };

  const handleToggle = async (activityId) => {
    await toggleActivity(activityId);
  };

  // Filtrer les activités selon le filtre sélectionné
  const filteredActivities = activities.filter(activity => {
    const now = new Date();
    switch (filter) {
      case 'active':
        return activity.isActive;
      case 'inactive':
        return !activity.isActive;
      case 'upcoming':
        return activity.isActive && new Date(activity.date) >= now;
      default:
        return true;
    }
  });

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : '📋';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#374151', margin: '0 0 0.5rem 0' }}>
            📅 Gestion des Activités
          </h2>
          <div style={{
            display: 'flex',
            gap: '1rem',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            <span>✅ {activities.filter(activity => activity.isActive).length} Actives</span>
            <span>❌ {activities.filter(activity => !activity.isActive).length} Inactives</span>
            <span>📅 {activities.filter(activity => activity.isActive && new Date(activity.date) >= new Date()).length} À venir</span>
            <span>📊 {activities.length} Total</span>
          </div>
        </div>
        <button
          onClick={() => { setShowForm(true); resetForm(); }}
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
        >
          + Nouvelle Activité
        </button>
      </div>

      {showForm && (
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151', marginBottom: '1.5rem' }}>
            {editingActivity ? 'Modifier l\'Activité' : 'Créer une Nouvelle Activité'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Titre <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Catégorie <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                Description <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows="4"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              ></textarea>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Lieu <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Date <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Heure
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Organisateur
                </label>
                <input
                  type="text"
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Contact
                </label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                Média (Photo ou Vidéo)
              </label>
              <MediaUpload
                onMediaChange={(media) => setFormData({ ...formData, media })}
                initialMedia={formData.media}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'background-color 0.2s',
                  flex: 1
                }}
              >
                {loading ? 'Chargement...' : (editingActivity ? 'Mettre à jour' : 'Créer Activité')}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); resetForm(); }}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'background-color 0.2s',
                  flex: 1
                }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filtres */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.75rem',
        marginBottom: '1.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
          🔍 Filtrer les Activités
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: '📊 Toutes', count: activities.length },
            { key: 'active', label: '✅ Actives', count: activities.filter(activity => activity.isActive).length },
            { key: 'inactive', label: '❌ Inactives', count: activities.filter(activity => !activity.isActive).length },
            { key: 'upcoming', label: '📅 À venir', count: activities.filter(activity => activity.isActive && new Date(activity.date) >= new Date()).length }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: filter === key ? '#3b82f6' : '#f3f4f6',
                color: filter === key ? 'white' : '#374151',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Liste des activités */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredActivities.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '3rem',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Aucune activité trouvée
            </h3>
            <p>Créez votre première activité ou ajustez les filtres.</p>
          </div>
        ) : (
          filteredActivities.map(activity => (
            <div
              key={activity.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: `2px solid ${activity.isActive ? '#10b981' : '#ef4444'}`
              }}
            >
              {/* Header avec toggle */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '1.5rem 1.5rem 1rem 1.5rem'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{getCategoryIcon(activity.category)}</span>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: '#374151',
                      margin: 0
                    }}>
                      {activity.title}
                    </h3>
                  </div>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    margin: 0,
                    textTransform: 'capitalize'
                  }}>
                    {categories.find(cat => cat.id === activity.category)?.name || activity.category}
                  </p>
                </div>
                
                {/* Toggle Switch */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: activity.isActive ? '#059669' : '#6b7280',
                    fontWeight: '600'
                  }}>
                    {activity.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => handleToggle(activity.id)}
                    style={{
                      width: '50px',
                      height: '25px',
                      backgroundColor: activity.isActive ? '#10b981' : '#e5e7eb',
                      borderRadius: '25px',
                      border: 'none',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      width: '21px',
                      height: '21px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '2px',
                      left: activity.isActive ? '27px' : '2px',
                      transition: 'left 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}></div>
                  </button>
                </div>
              </div>

              {/* Média */}
              {activity.media && (
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  {activity.media.type?.startsWith('video/') ? (
                    <video
                      src={activity.media.data}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      muted
                      loop
                      controls
                    />
                  ) : (
                    <img
                      src={activity.media.data}
                      alt={activity.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
              )}

              {/* Contenu */}
              <div style={{ padding: '1.5rem' }}>
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  marginBottom: '1rem',
                  lineHeight: '1.5'
                }}>
                  {activity.description}
                </p>

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1rem' }}>📍</span>
                    <span style={{ fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>
                      {activity.location}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1rem' }}>📅</span>
                    <span style={{ fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>
                      {formatDate(activity.date)}
                      {activity.time && ` à ${activity.time}`}
                    </span>
                  </div>
                  {activity.organizer && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1rem' }}>👤</span>
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                        {activity.organizer}
                      </span>
                    </div>
                  )}
                </div>

                {/* Statistiques */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  marginBottom: '1rem'
                }}>
                  <span>👁️ {activity.views} vues</span>
                  <span>📅 {new Date(activity.createdAt).toLocaleDateString('fr-FR')}</span>
                </div>

                {/* Boutons d'action */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleEdit(activity)}
                    style={{
                      flex: 1,
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    style={{
                      flex: 1,
                      backgroundColor: '#ef4444',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityManager;










