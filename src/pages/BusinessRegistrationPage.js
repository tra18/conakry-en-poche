import React, { useState } from 'react';
import { useBusiness } from '../contexts/BusinessContext';
import { useNotification } from '../contexts/NotificationContext';

const BusinessRegistrationPage = () => {
  const { addNewBusiness } = useBusiness();
  const { showSuccess, showError, showInfo } = useNotification();
  
  const [formData, setFormData] = useState({
    // Informations de base
    businessName: '',
    category: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    
    // Informations du responsable
    managerName: '',
    managerPhone: '',
    managerEmail: '',
    
    // Horaires de travail
    workingHours: {
      monday: { open: '', close: '', closed: false },
      tuesday: { open: '', close: '', closed: false },
      wednesday: { open: '', close: '', closed: false },
      thursday: { open: '', close: '', closed: false },
      friday: { open: '', close: '', closed: false },
      saturday: { open: '', close: '', closed: false },
      sunday: { open: '', close: '', closed: false }
    },
    
    // Documents
    businessDocument: null,
    identityDocument: null,
    
    // Statut
    status: 'pending',
    submittedAt: new Date().toISOString()
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('workingHours.')) {
      const [day, field] = name.split('.').slice(1);
      setFormData(prev => ({
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [day]: {
            ...prev.workingHours[day],
            [field]: type === 'checkbox' ? checked : value
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0] || null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation des champs obligatoires
      if (!formData.businessName || !formData.category || !formData.managerName) {
        showError('Veuillez remplir tous les champs obligatoires.');
        return;
      }

      // Validation des documents
      if (!formData.businessDocument || !formData.identityDocument) {
        showError('Veuillez joindre les documents requis (document officiel de l\'entreprise et pièce d\'identité).');
        return;
      }

      // Créer l'objet entreprise avec toutes les informations
      const businessData = {
        ...formData,
        id: Date.now(),
        submittedAt: new Date().toISOString()
      };

      // Ajouter l'entreprise à la liste d'attente
      addNewBusiness(businessData);
      
      showSuccess('Votre demande d\'inscription a été soumise avec succès ! Elle sera examinée par notre équipe dans les plus brefs délais.');
      
      // Réinitialiser le formulaire
      setFormData({
        businessName: '',
        category: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        description: '',
        managerName: '',
        managerPhone: '',
        managerEmail: '',
        workingHours: {
          monday: { open: '', close: '', closed: false },
          tuesday: { open: '', close: '', closed: false },
          wednesday: { open: '', close: '', closed: false },
          thursday: { open: '', close: '', closed: false },
          friday: { open: '', close: '', closed: false },
          saturday: { open: '', close: '', closed: false },
          sunday: { open: '', close: '', closed: false }
        },
        businessDocument: null,
        identityDocument: null,
        status: 'pending',
        submittedAt: new Date().toISOString()
      });

    } catch (error) {
      showError('Une erreur est survenue lors de la soumission de votre demande.');
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const days = [
    { key: 'monday', label: 'Lundi' },
    { key: 'tuesday', label: 'Mardi' },
    { key: 'wednesday', label: 'Mercredi' },
    { key: 'thursday', label: 'Jeudi' },
    { key: 'friday', label: 'Vendredi' },
    { key: 'saturday', label: 'Samedi' },
    { key: 'sunday', label: 'Dimanche' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '2rem 0',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            🏢 Inscription d'Entreprise
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '1.125rem'
          }}>
            Rejoignez Conakry en Poche et faites découvrir votre entreprise aux habitants de Conakry
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '2rem'
        }}>
          {/* Informations de l'entreprise */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '1rem',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '0.5rem'
            }}>
              📋 Informations de l'Entreprise
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Nom de l'entreprise *
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Catégorie *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="restaurants">🍽️ Restaurants</option>
                  <option value="hotels">🏨 Hôtels</option>
                  <option value="pharmacies">💊 Pharmacies</option>
                  <option value="hopitaux">🏥 Hôpitaux</option>
                  <option value="banques">🏦 Banques</option>
                  <option value="ecoles">🎓 Écoles</option>
                  <option value="universites">🏛️ Universités</option>
                  <option value="transport">🚌 Transport</option>
                  <option value="shopping">🛍️ Shopping</option>
                  <option value="loisirs">🎮 Loisirs</option>
                  <option value="sport">⚽ Sport</option>
                  <option value="beaute">💄 Beauté</option>
                  <option value="automobile">🚗 Automobile</option>
                  <option value="administration">🏛️ Administration</option>
                  <option value="services">🔧 Services</option>
                  <option value="autre">📋 Autre</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Adresse
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Site web
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://www.monsite.com (optionnel)"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Description de l'entreprise
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* Informations du responsable */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '1rem',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '0.5rem'
            }}>
              👤 Informations du Responsable
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="managerName"
                  value={formData.managerName}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="managerPhone"
                  value={formData.managerPhone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="managerEmail"
                  value={formData.managerEmail}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

            </div>
          </div>

          {/* Horaires de travail */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '1rem',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '0.5rem'
            }}>
              🕒 Horaires de Travail
            </h2>
            
            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              {days.map(day => (
                <div key={day.key} style={{
                  display: 'grid',
                  gridTemplateColumns: '150px 1fr 1fr 100px',
                  gap: '1rem',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e7eb'
                }}>
                  <label style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    {day.label}
                  </label>
                  
                  <input
                    type="time"
                    name={`workingHours.${day.key}.open`}
                    value={formData.workingHours[day.key].open}
                    onChange={handleInputChange}
                    disabled={formData.workingHours[day.key].closed}
                    style={{
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      opacity: formData.workingHours[day.key].closed ? 0.5 : 1
                    }}
                  />
                  
                  <input
                    type="time"
                    name={`workingHours.${day.key}.close`}
                    value={formData.workingHours[day.key].close}
                    onChange={handleInputChange}
                    disabled={formData.workingHours[day.key].closed}
                    style={{
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      opacity: formData.workingHours[day.key].closed ? 0.5 : 1
                    }}
                  />
                  
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>
                    <input
                      type="checkbox"
                      name={`workingHours.${day.key}.closed`}
                      checked={formData.workingHours[day.key].closed}
                      onChange={handleInputChange}
                    />
                    Fermé
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '1rem',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '0.5rem'
            }}>
              📄 Documents Requis
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Document officiel de l'entreprise *
                  <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                    (PDF, JPG, PNG - Max 5MB)
                  </span>
                </label>
                <input
                  type="file"
                  name="businessDocument"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
                {formData.businessDocument && (
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#10b981',
                    marginTop: '0.25rem'
                  }}>
                    ✅ {formData.businessDocument.name}
                  </p>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Pièce d'identité du responsable *
                  <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                    (PDF, JPG, PNG - Max 5MB)
                  </span>
                </label>
                <input
                  type="file"
                  name="identityDocument"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
                {formData.identityDocument && (
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#10b981',
                    marginTop: '0.25rem'
                  }}>
                    ✅ {formData.identityDocument.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bouton de soumission */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting ? '#9ca3af' : '#4b5563',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s',
                minWidth: '200px'
              }}
            >
              {isSubmitting ? '⏳ Envoi en cours...' : '📤 Soumettre la demande'}
            </button>
          </div>
        </form>

        {/* Informations supplémentaires */}
        <div style={{
          backgroundColor: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          marginTop: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#0369a1',
            marginBottom: '0.75rem'
          }}>
            ℹ️ Informations importantes
          </h3>
          <ul style={{
            color: '#0369a1',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            margin: 0,
            paddingLeft: '1.5rem'
          }}>
            <li>Votre demande sera examinée dans les 48 heures</li>
            <li>Vous recevrez une notification par email une fois validée</li>
            <li>Les documents doivent être clairs et lisibles</li>
            <li>L'inscription est gratuite pour toutes les entreprises</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistrationPage;
