import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Edit, Save, X, Building } from 'lucide-react';

const ProfilePage = () => {
  const { currentUser, userProfile, loadUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: userProfile?.name || '',
    phone: userProfile?.phone || '',
    email: currentUser?.email || ''
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({
      name: userProfile?.name || '',
      phone: userProfile?.phone || '',
      email: currentUser?.email || ''
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({
      name: userProfile?.name || '',
      phone: userProfile?.phone || '',
      email: currentUser?.email || ''
    });
  };

  const handleSave = async () => {
    try {
      // Ici, vous mettriez à jour le profil dans Firestore
      // await updateProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (date) => {
    if (!date) return 'Non disponible';
    return new Date(date.seconds ? date.seconds * 1000 : date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Mon Profil
            </h1>
            <p className="text-xl text-gray-600">
              Gérez vos informations personnelles et vos préférences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations personnelles */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Informations Personnelles
                    </h2>
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="btn btn-outline flex items-center space-x-2"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Modifier</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleCancel}
                          className="btn btn-outline flex items-center space-x-2"
                        >
                          <X className="h-4 w-4" />
                          <span>Annuler</span>
                        </button>
                        <button
                          onClick={handleSave}
                          className="btn btn-primary flex items-center space-x-2"
                        >
                          <Save className="h-4 w-4" />
                          <span>Enregistrer</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Nom */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="input"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <User className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-800">{userProfile?.name || 'Non renseigné'}</span>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="input"
                          disabled
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Mail className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-800">{currentUser?.email}</span>
                        </div>
                      )}
                      {isEditing && (
                        <p className="text-sm text-gray-500 mt-1">
                          L'email ne peut pas être modifié
                        </p>
                      )}
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de téléphone
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedProfile.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="input"
                          placeholder="+224 612 34 56 78"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Phone className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-800">{userProfile?.phone || 'Non renseigné'}</span>
                        </div>
                      )}
                    </div>

                    {/* Date d'inscription */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Membre depuis
                      </label>
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-800">{formatDate(userProfile?.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Statistiques */}
              <div className="card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Statistiques
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Entreprises soumises</span>
                      <span className="font-semibold text-gray-800">0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Entreprises approuvées</span>
                      <span className="font-semibold text-gray-800">0</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Dernière activité</span>
                      <span className="font-semibold text-gray-800">Aujourd'hui</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions rapides */}
              <div className="card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Actions Rapides
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full btn btn-outline flex items-center justify-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>Ajouter une entreprise</span>
                    </button>
                    <button className="w-full btn btn-outline flex items-center justify-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Changer le mot de passe</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Préférences */}
              <div className="card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Préférences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Notifications email</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Newsletter</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;















