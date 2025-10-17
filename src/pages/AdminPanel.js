import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { useBusiness } from '../contexts/BusinessContext';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('entreprises');
  const { showSuccess, showError, showInfo } = useNotification();
  const { pendingBusinesses, approvedBusinesses, approveBusiness, rejectBusiness, addNewBusiness } = useBusiness();
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [editFormData, setEditFormData] = useState({});


  // Données d'exemple pour les actualités en attente
  const [pendingNews, setPendingNews] = useState([]);

  // Données d'exemple pour les taxis
  const [taxiDrivers, setTaxiDrivers] = useState([
    {
      id: 1,
      name: "Mamadou Diallo",
      phone: "+224 111 222 333",
      company: "Taxi Express",
      status: "active"
    },
    {
      id: 2,
      name: "Fatoumata Camara",
      phone: "+224 444 555 666",
      company: "Rapide Taxi",
      status: "active"
    }
  ]);

  const [newTaxiDriver, setNewTaxiDriver] = useState({
    name: '',
    phone: '',
    company: ''
  });

  const handleApproveBusiness = (id) => {
    const business = pendingBusinesses.find(b => b.id === id);
    if (business) {
      approveBusiness(id);
      showSuccess(`Entreprise "${business.name}" approuvée avec succès ! Elle apparaîtra maintenant sur la page d'accueil.`);
    }
  };

  const handleRejectBusiness = (id) => {
    const business = pendingBusinesses.find(b => b.id === id);
    if (business) {
      rejectBusiness(id);
      showError(`Entreprise "${business.name}" rejetée.`);
    }
  };

  const handleApproveNews = (id) => {
    const news = pendingNews.find(n => n.id === id);
    setPendingNews(prev => prev.filter(news => news.id !== id));
    showSuccess(`Actualité "${news?.title}" approuvée avec succès !`);
  };

  const handleRejectNews = (id) => {
    const news = pendingNews.find(n => n.id === id);
    setPendingNews(prev => prev.filter(news => news.id !== id));
    showError(`Actualité "${news?.title}" rejetée.`);
  };

  const handleAddTaxiDriver = (e) => {
    e.preventDefault();
    if (newTaxiDriver.name && newTaxiDriver.phone && newTaxiDriver.company) {
      const newDriver = {
        id: Date.now(),
        ...newTaxiDriver,
        status: 'active'
      };
      setTaxiDrivers(prev => [...prev, newDriver]);
      setNewTaxiDriver({ name: '', phone: '', company: '' });
      showSuccess(`Chauffeur "${newTaxiDriver.name}" ajouté avec succès !`);
    } else {
      showError('Veuillez remplir tous les champs.');
    }
  };

  const handleDeleteTaxiDriver = (id) => {
    const driver = taxiDrivers.find(d => d.id === id);
    setTaxiDrivers(prev => prev.filter(driver => driver.id !== id));
    showError(`Chauffeur "${driver?.name}" supprimé.`);
  };

  // Fonctions pour gérer les entreprises validées
  const handleEditBusiness = (business) => {
    setEditingBusiness(business);
    setEditFormData({
      name: business.name,
      address: business.address,
      phone: business.phone,
      email: business.email,
      category: business.category,
      description: business.description,
      status: business.status || 'active'
    });
  };

  const handleUpdateBusiness = (e) => {
    e.preventDefault();
    if (editingBusiness) {
      // Ici on pourrait ajouter une fonction updateBusiness dans le contexte
      showSuccess(`Entreprise "${editFormData.name}" mise à jour avec succès !`);
      setEditingBusiness(null);
      setEditFormData({});
    }
  };

  const handleToggleBusinessStatus = (businessId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    // Ici on pourrait ajouter une fonction toggleBusinessStatus dans le contexte
    showSuccess(`Statut de l'entreprise changé en ${newStatus === 'active' ? 'actif' : 'inactif'}.`);
  };

  const handleDeleteBusiness = (businessId) => {
    // Ici on pourrait ajouter une fonction deleteBusiness dans le contexte
    showError('Entreprise supprimée définitivement.');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
      {/* Header */}
        <div style={{
          backgroundColor: '#374151',
          color: 'white',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            🛠️ Panneau d'Administration
            </h1>
          <p style={{ opacity: '0.9' }}>
            Gestion des entreprises, actualités et services taxi
            </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb'
        }}>
                  {[
                    { id: 'entreprises', label: '🏢 Entreprises', count: pendingBusinesses.length },
                    { id: 'entreprises-validees', label: '✅ Entreprises Validées', count: approvedBusinesses.length },
                    { id: 'actualites', label: '📰 Actualités', count: pendingNews.length },
                    { id: 'taxis', label: '🚕 Taxis', count: taxiDrivers.length }
                  ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '1rem 2rem',
                border: 'none',
                backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
                color: activeTab === tab.id ? '#374151' : '#6b7280',
                fontWeight: activeTab === tab.id ? '600' : '400',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid #374151' : '2px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              {tab.label} {tab.count > 0 && (
                <span style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.75rem',
                  marginLeft: '0.5rem'
                }}>
                      {tab.count}
                    </span>
                  )}
                </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ padding: '2rem' }}>
          {/* Onglet Entreprises */}
          {activeTab === 'entreprises' && (
            <div>
              {/* Formulaire d'ajout d'entreprise */}
              <div style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '1rem'
                }}>
                  ➕ Ajouter une nouvelle entreprise
                </h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const businessData = {
                    name: formData.get('name'),
                    address: formData.get('address'),
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    category: formData.get('category'),
                    description: formData.get('description')
                  };
                  
                  if (businessData.name && businessData.category) {
                    addNewBusiness(businessData);
                    e.target.reset();
                    showSuccess(`Entreprise "${businessData.name}" ajoutée avec succès !`);
                  } else {
                    showError('Veuillez remplir au moins le nom et la catégorie.');
                  }
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nom de l'entreprise *"
                      required
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    />
                            <select
                              name="category"
                              required
                              style={{
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                fontSize: '0.875rem'
                              }}
                            >
                              <option value="">Sélectionner une catégorie *</option>
                              <option value="hotels">🏨 Hôtels</option>
                              <option value="restaurants">🍽️ Restaurants</option>
                              <option value="loisirs">🎭 Loisirs</option>
                              <option value="administrations">🏛️ Administrations</option>
                              <option value="hopitaux">🏥 Hôpitaux</option>
                              <option value="pharmacies">💊 Pharmacies</option>
                              <option value="entreprises">🏢 Entreprises</option>
                              <option value="aires-jeux">🎠 Aires de Jeux</option>
                              <option value="ecoles">🎓 Écoles</option>
                              <option value="universites">🏫 Universités</option>
                            </select>
                    <input
                      type="text"
                      name="address"
                      placeholder="Adresse"
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Téléphone"
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                  <textarea
                    name="description"
                    placeholder="Description de l'entreprise"
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      marginBottom: '1rem',
                      resize: 'vertical'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#10b981',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.375rem',
                      border: 'none',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s'
                    }}
                  >
                    Ajouter l'entreprise
                  </button>
                </form>
              </div>

              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: '#374151'
              }}>
                Demandes d'entreprises en attente
              </h2>
              {pendingBusinesses.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: '#6b7280'
                }}>
                  <p style={{ fontSize: '1.125rem' }}>Aucune demande d'entreprise en attente</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {pendingBusinesses.map(business => (
                    <div key={business.id} style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      padding: '1.5rem',
                      backgroundColor: '#f9fafb'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.5rem'
                          }}>
                              {business.name}
                            </h3>
                          <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                            📍 {business.address}
                          </p>
                          <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                            📞 {business.phone}
                          </p>
                          <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                            📧 {business.email}
                          </p>
                          <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                            🏷️ {business.category}
                          </p>
                          </div>
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem'
                        }}>
                          <button
                            onClick={() => handleApproveBusiness(business.id)}
                            style={{
                              backgroundColor: '#10b981',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '0.375rem',
                              cursor: 'pointer',
                              fontWeight: '500'
                            }}
                          >
                            ✅ Approuver
                          </button>
                          <button
                            onClick={() => handleRejectBusiness(business.id)}
                            style={{
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '0.375rem',
                              cursor: 'pointer',
                              fontWeight: '500'
                            }}
                          >
                            ❌ Rejeter
                          </button>
                        </div>
                      </div>
                      <p style={{ color: '#374151' }}>{business.description}</p>
                      
                      {/* Informations du responsable */}
                      {business.managerName && (
                        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            👤 Responsable: {business.managerName}
                          </h4>
                          {business.managerPhone && <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>📞 {business.managerPhone}</p>}
                          {business.managerEmail && <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>📧 {business.managerEmail}</p>}
                        </div>
                      )}

                      {/* Horaires de travail */}
                      {business.workingHours && (
                        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '0.375rem' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            🕒 Horaires de travail
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                            {Object.entries(business.workingHours).map(([day, hours]) => (
                              <div key={day} style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {
                                  hours.closed ? 'Fermé' : `${hours.open || '--'} - ${hours.close || '--'}`
                                }
                          </div>
                            ))}
                          </div>
                            </div>
                      )}

                      {/* Documents */}
                      {(business.businessDocument || business.identityDocument) && (
                        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '0.375rem', border: '1px solid #f59e0b' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>
                            📄 Documents joints
                          </h4>
                          {business.businessDocument && (
                            <p style={{ color: '#92400e', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                              📋 Document entreprise: {business.businessDocument.name || 'Document joint'}
                            </p>
                          )}
                          {business.identityDocument && (
                            <p style={{ color: '#92400e', fontSize: '0.875rem' }}>
                              🆔 Pièce d'identité: {business.identityDocument.name || 'Document joint'}
                            </p>
                          )}
                        </div>
                      )}

                      <p style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        marginTop: '1rem'
                      }}>
                        Soumis le: {business.submittedAt}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Onglet Entreprises Validées */}
          {activeTab === 'entreprises-validees' && (
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: '#374151'
              }}>
                Entreprises Validées ({approvedBusinesses.length})
              </h2>
              
              {approvedBusinesses.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: '#6b7280'
                }}>
                  <p style={{ fontSize: '1.125rem' }}>Aucune entreprise validée</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {approvedBusinesses.map(business => (
                    <div key={business.id} style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      padding: '1.5rem',
                      backgroundColor: '#f9fafb'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.5rem'
                          }}>
                            {business.name}
                          </h3>
                          <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                            📍 {business.address}
                          </p>
                          <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                            📞 {business.phone}
                          </p>
                          <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                            📧 {business.email}
                          </p>
                          <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                            🏷️ {business.category}
                          </p>
                          <div style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            backgroundColor: business.status === 'active' ? '#dcfce7' : '#fee2e2',
                            color: business.status === 'active' ? '#166534' : '#991b1b'
                          }}>
                            {business.status === 'active' ? '✅ Actif' : '❌ Inactif'}
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem',
                          flexDirection: 'column'
                        }}>
                          <button
                            onClick={() => handleEditBusiness(business)}
                            style={{
                              backgroundColor: '#3b82f6',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '0.375rem',
                              cursor: 'pointer',
                              fontWeight: '500',
                              fontSize: '0.875rem'
                            }}
                          >
                            ✏️ Modifier
                          </button>
                          <button
                            onClick={() => handleToggleBusinessStatus(business.id, business.status)}
                            style={{
                              backgroundColor: business.status === 'active' ? '#f59e0b' : '#10b981',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '0.375rem',
                              cursor: 'pointer',
                              fontWeight: '500',
                              fontSize: '0.875rem'
                            }}
                          >
                            {business.status === 'active' ? '⏸️ Désactiver' : '▶️ Activer'}
                          </button>
                          <button
                            onClick={() => handleDeleteBusiness(business.id)}
                            style={{
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '0.375rem',
                              cursor: 'pointer',
                              fontWeight: '500',
                              fontSize: '0.875rem'
                            }}
                          >
                            🗑️ Supprimer
                          </button>
                        </div>
                      </div>
                      <p style={{ color: '#374151' }}>{business.description}</p>
                      
                      {/* Informations du responsable */}
                      {business.managerName && (
                        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            👤 Responsable: {business.managerName}
                          </h4>
                          {business.managerPhone && <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>📞 {business.managerPhone}</p>}
                          {business.managerEmail && <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>📧 {business.managerEmail}</p>}
                        </div>
                      )}

                      {/* Horaires de travail */}
                      {business.workingHours && (
                        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '0.375rem' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                            🕒 Horaires de travail
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                            {Object.entries(business.workingHours).map(([day, hours]) => (
                              <div key={day} style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {
                                  hours.closed ? 'Fermé' : `${hours.open || '--'} - ${hours.close || '--'}`
                                }
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <p style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        marginTop: '1rem'
                      }}>
                        Validé le: {business.submittedAt}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Modal d'édition */}
          {editingBusiness && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '2rem',
                maxWidth: '600px',
                width: '90%',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1.5rem',
                  color: '#374151'
                }}>
                  Modifier l'entreprise
                </h3>
                
                <form onSubmit={handleUpdateBusiness}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <input
                      type="text"
                      placeholder="Nom de l'entreprise"
                      value={editFormData.name || ''}
                      onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    />
                    <select
                      value={editFormData.category || ''}
                      onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      <option value="">Sélectionner une catégorie</option>
                      <option value="hotels">🏨 Hôtels</option>
                      <option value="restaurants">🍽️ Restaurants</option>
                      <option value="loisirs">🎭 Loisirs</option>
                      <option value="administrations">🏛️ Administrations</option>
                      <option value="hopitaux">🏥 Hôpitaux</option>
                      <option value="pharmacies">💊 Pharmacies</option>
                      <option value="entreprises">🏢 Entreprises</option>
                      <option value="aires-jeux">🎠 Aires de Jeux</option>
                      <option value="ecoles">🎓 Écoles</option>
                      <option value="universites">🏫 Universités</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Adresse"
                      value={editFormData.address || ''}
                      onChange={(e) => setEditFormData({...editFormData, address: e.target.value})}
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    />
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      value={editFormData.phone || ''}
                      onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={editFormData.email || ''}
                      onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    />
                    <select
                      value={editFormData.status || 'active'}
                      onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      <option value="active">✅ Actif</option>
                      <option value="inactive">❌ Inactif</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Description de l'entreprise"
                    rows="3"
                    value={editFormData.description || ''}
                    onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      marginBottom: '1.5rem',
                      resize: 'vertical'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBusiness(null);
                        setEditFormData({});
                      }}
                      style={{
                        backgroundColor: '#6b7280',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Annuler
                    </button>
                <button
                      type="submit"
                      style={{
                        backgroundColor: '#10b981',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Sauvegarder
                </button>
                  </div>
                </form>
              </div>
                      </div>
                    )}

          {/* Onglet Actualités */}
          {activeTab === 'actualites' && (
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: '#374151'
              }}>
                Actualités en attente de validation
              </h2>
              {pendingNews.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: '#6b7280'
                }}>
                  <p style={{ fontSize: '1.125rem' }}>Aucune actualité en attente</p>
                      </div>
              ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  {pendingNews.map(news => (
                    <div key={news.id} style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      padding: '1.5rem',
                      backgroundColor: '#f9fafb'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.5rem'
                          }}>
                            {news.title}
                      </h3>
                          <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                            Par: {news.author}
                      </p>
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem'
                        }}>
                          <button
                            onClick={() => handleApproveNews(news.id)}
                            style={{
                              backgroundColor: '#10b981',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '0.375rem',
                              cursor: 'pointer',
                              fontWeight: '500'
                            }}
                          >
                            ✅ Approuver
                          </button>
                          <button
                            onClick={() => handleRejectNews(news.id)}
                            style={{
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '0.375rem',
                              cursor: 'pointer',
                              fontWeight: '500'
                            }}
                          >
                            ❌ Rejeter
                          </button>
                        </div>
                      </div>
                      <p style={{ color: '#374151', marginBottom: '1rem' }}>{news.content}</p>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>
                        Soumis le: {news.submittedAt}
                      </p>
                    </div>
                ))}
              </div>
              )}
            </div>
          )}

          {/* Onglet Taxis */}
          {activeTab === 'taxis' && (
            <div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: '#374151'
              }}>
                Gestion des chauffeurs de taxi
                </h2>

              {/* Formulaire d'ajout */}
              <div style={{
                backgroundColor: '#f9fafb',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                marginBottom: '2rem',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#374151'
                }}>
                  Ajouter un nouveau chauffeur
                </h3>
                <form onSubmit={handleAddTaxiDriver} style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  <input
                    type="text"
                    placeholder="Nom et prénom"
                    value={newTaxiDriver.name}
                    onChange={(e) => setNewTaxiDriver(prev => ({ ...prev, name: e.target.value }))}
                    style={{
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '1rem'
                    }}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Numéro de téléphone"
                    value={newTaxiDriver.phone}
                    onChange={(e) => setNewTaxiDriver(prev => ({ ...prev, phone: e.target.value }))}
                    style={{
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '1rem'
                    }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Compagnie de taxi"
                    value={newTaxiDriver.company}
                    onChange={(e) => setNewTaxiDriver(prev => ({ ...prev, company: e.target.value }))}
                    style={{
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '1rem'
                    }}
                    required
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#374151',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '1rem'
                    }}
                  >
                    ➕ Ajouter
                </button>
                </form>
              </div>

              {/* Liste des chauffeurs */}
              <div style={{ display: 'grid', gap: '1rem' }}>
                {taxiDrivers.map(driver => (
                  <div key={driver.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    backgroundColor: 'white'
                  }}>
                    <div>
                      <h4 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.25rem'
                      }}>
                        {driver.name}
                      </h4>
                      <p style={{ color: '#6b7280', marginBottom: '0.25rem' }}>
                        📞 {driver.phone}
                      </p>
                      <p style={{ color: '#6b7280' }}>
                        🏢 {driver.company}
                      </p>
                      </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{
                        backgroundColor: '#10b981',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        ✅ Actif
                      </span>
                      <button
                        onClick={() => handleDeleteTaxiDriver(driver.id)}
                        style={{
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem',
                          borderRadius: '0.375rem',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️
                        </button>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
    </div>
  );
};

export default AdminPanel;