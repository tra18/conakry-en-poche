import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  List, 
  Plus, 
  Trash2, 
  Edit, 
  Share2, 
  Download, 
  X, 
  Heart,
  MapPin,
  Star
} from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import toast from 'react-hot-toast';

const CustomListsManager = ({ onClose, onAddToList, businessToAdd = null }) => {
  const { lists, createList, deleteList, addBusinessToList, removeBusinessFromList, exportList } = useFavorites();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const [selectedList, setSelectedList] = useState(null);
  const [editingList, setEditingList] = useState(null);

  const handleCreateList = async () => {
    if (!newListName.trim()) {
      toast.error('Veuillez entrer un nom de liste');
      return;
    }

    try {
      await createList(newListName.trim(), newListDescription.trim());
      setNewListName('');
      setNewListDescription('');
      setShowCreateForm(false);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    }
  };

  const handleDeleteList = async (listId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette liste ?')) {
      await deleteList(listId);
      if (selectedList?.id === listId) {
        setSelectedList(null);
      }
    }
  };

  const handleShareList = async (list) => {
    const listData = {
      name: list.name,
      description: list.description,
      businesses: list.businesses.map(b => ({
        name: b.name,
        address: b.address,
        category: b.category
      }))
    };

    const text = `Liste: ${list.name}\n\n${list.businesses.map(b => `- ${b.name} (${b.address})`).join('\n')}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: list.name,
          text: text,
          url: window.location.href
        });
        toast.success('Liste partagée !');
      } catch (error) {
        if (error.name !== 'AbortError') {
          // Fallback vers copie
          navigator.clipboard.writeText(text);
          toast.success('Liste copiée dans le presse-papiers !');
        }
      }
    } else {
      navigator.clipboard.writeText(text);
      toast.success('Liste copiée dans le presse-papiers !');
    }
  };

  return (
    <div style={{
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
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          width: '100%',
          maxWidth: '800px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <List size={24} color="#3b82f6" />
            <h2 style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937'
            }}>
              Mes Listes Personnalisées
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              color: '#6b7280'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem'
        }}>
          {/* Bouton créer */}
          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
              }}
            >
              <Plus size={20} />
              Créer une nouvelle liste
            </button>
          )}

          {/* Formulaire de création */}
          <AnimatePresence>
            {showCreateForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.75rem',
                  marginBottom: '1.5rem',
                  border: '1px solid #e5e7eb'
                }}
              >
                <h3 style={{
                  margin: 0,
                  marginBottom: '1rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Nouvelle liste
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Nom de la liste (ex: Restaurants à essayer)"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                  <textarea
                    placeholder="Description (optionnel)"
                    value={newListDescription}
                    onChange={(e) => setNewListDescription(e.target.value)}
                    style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '80px'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={handleCreateList}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                    >
                      Créer
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateForm(false);
                        setNewListName('');
                        setNewListDescription('');
                      }}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Liste des listes */}
          {lists.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#6b7280'
            }}>
              <List size={64} color="#d1d5db" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{
                margin: 0,
                marginBottom: '0.5rem',
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Aucune liste
              </h3>
              <p style={{ margin: 0 }}>
                Créez votre première liste pour organiser vos entreprises favorites
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {lists.map(list => (
                <div
                  key={list.id}
                  style={{
                    padding: '1.5rem',
                    backgroundColor: selectedList?.id === list.id ? '#eff6ff' : 'white',
                    borderRadius: '0.75rem',
                    border: '2px solid',
                    borderColor: selectedList?.id === list.id ? '#3b82f6' : '#e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setSelectedList(list)}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        margin: 0,
                        marginBottom: '0.25rem',
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        {list.name}
                      </h4>
                      {list.description && (
                        <p style={{
                          margin: 0,
                          fontSize: '0.875rem',
                          color: '#6b7280'
                        }}>
                          {list.description}
                        </p>
                      )}
                      <p style={{
                        margin: '0.5rem 0 0 0',
                        fontSize: '0.875rem',
                        color: '#9ca3af'
                      }}>
                        {list.businesses.length} entreprise{list.businesses.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShareList(list);
                        }}
                        style={{
                          padding: '0.5rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: '0.375rem',
                          color: '#3b82f6'
                        }}
                        title="Partager"
                      >
                        <Share2 size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          exportList(list.id);
                        }}
                        style={{
                          padding: '0.5rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: '0.375rem',
                          color: '#10b981'
                        }}
                        title="Exporter"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteList(list.id);
                        }}
                        style={{
                          padding: '0.5rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: '0.375rem',
                          color: '#ef4444'
                        }}
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Aperçu des entreprises */}
                      {list.businesses.length > 0 && (
                        <div style={{
                          marginTop: '1rem',
                          paddingTop: '1rem',
                          borderTop: '1px solid #e5e7eb'
                        }}>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '0.75rem'
                          }}>
                            {list.businesses.slice(0, 3).map(business => (
                              <div
                                key={business.id}
                                style={{
                                  padding: '0.75rem',
                                  backgroundColor: '#f9fafb',
                                  borderRadius: '0.5rem',
                                  fontSize: '0.875rem'
                                }}
                              >
                                <div style={{
                                  fontWeight: '600',
                                  color: '#374151',
                                  marginBottom: '0.25rem'
                                }}>
                                  {business.name}
                                </div>
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  color: '#6b7280',
                                  fontSize: '0.75rem'
                                }}>
                                  <MapPin size={12} />
                                  {business.category}
                                </div>
                              </div>
                            ))}
                            {list.businesses.length > 3 && (
                              <div style={{
                                padding: '0.75rem',
                                backgroundColor: '#f3f4f6',
                                borderRadius: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.875rem',
                                color: '#6b7280',
                                fontWeight: '600'
                              }}>
                                +{list.businesses.length - 3} autres
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {businessToAdd && !list.businesses.some(b => b.id === businessToAdd.id) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addBusinessToList(list.id, businessToAdd);
                            if (onAddToList) {
                              onAddToList(list.id);
                            }
                          }}
                          style={{
                            marginTop: '1rem',
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                        >
                          <Plus size={18} />
                          Ajouter {businessToAdd.name}
                        </button>
                      )}
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CustomListsManager;

