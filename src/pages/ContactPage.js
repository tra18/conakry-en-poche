import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Building, User, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    category: '',
    message: '',
    documents: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Catégories disponibles
  const categories = [
    { id: 'hotels', name: 'Hôtels', icon: '🏨', description: 'Hébergements et services hôteliers' },
    { id: 'restaurants', name: 'Restaurants', icon: '🍽️', description: 'Restauration et gastronomie' },
    { id: 'loisirs', name: 'Loisirs', icon: '🎭', description: 'Divertissements et activités' },
    { id: 'administrations', name: 'Administrations', icon: '🏛️', description: 'Services publics et administratifs' },
    { id: 'ecoles', name: 'Écoles', icon: '🎓', description: 'Éducation et formation' },
    { id: 'universites', name: 'Universités', icon: '🎓', description: 'Enseignement supérieur' },
    { id: 'entreprises', name: 'Entreprises', icon: '🏢', description: 'Commerce et services privés' },
    { id: 'enfants', name: 'Loisirs Enfants', icon: '🎠', description: 'Activités pour les enfants' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    setFormData({
      ...formData,
      documents: [...formData.documents, ...newFiles]
    });
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    setFormData({
      ...formData,
      documents: formData.documents.filter(file => file.id !== fileId)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulation d'envoi (remplacer par l'API réelle)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Votre demande a été envoyée avec succès !');
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        category: '',
        message: '',
        documents: []
      });
      setUploadedFiles([]);
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de la demande');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* En-tête */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Contactez l'Administrateur
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Soumettez votre demande pour être ajouté à notre annuaire. 
              Joignez vos documents officiels pour validation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire principal */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="space-y-6">
                  {/* Informations personnelles */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-red-600" />
                      Informations Personnelles
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Votre nom complet"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="votre@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="+224 XXX XX XX XX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organisation *
                        </label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Nom de votre organisation"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sélection de catégorie */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Building className="h-5 w-5 mr-2 text-red-600" />
                      Catégorie d'Activité *
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categories.map((category) => (
                        <label
                          key={category.id}
                          className={`relative cursor-pointer p-4 border-2 rounded-lg transition-all ${
                            formData.category === category.id
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="category"
                            value={category.id}
                            checked={formData.category === category.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{category.icon}</div>
                            <div>
                              <div className="font-semibold text-gray-800">
                                {category.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {category.description}
                              </div>
                            </div>
                          </div>
                          {formData.category === category.id && (
                            <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-red-500" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message (optionnel)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Décrivez votre activité, services offerts, etc."
                    />
                  </div>

                  {/* Upload de documents */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-red-600" />
                      Documents Officiels *
                    </h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-500 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Glissez-déposez vos documents ou cliquez pour sélectionner
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Formats acceptés: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer inline-block"
                      >
                        Sélectionner des fichiers
                      </label>
                    </div>

                    {/* Liste des fichiers uploadés */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-gray-500" />
                              <div>
                                <div className="font-medium text-gray-800">
                                  {file.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {formatFileSize(file.size)}
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(file.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bouton de soumission */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.category || uploadedFiles.length === 0}
                      className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Envoyer la demande</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Informations de contact */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Informations de Contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <div>
                      <div className="font-medium text-gray-800">Adresse</div>
                      <div className="text-sm text-gray-600">
                        Conakry, Guinée
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-red-600" />
                    <div>
                      <div className="font-medium text-gray-800">Téléphone</div>
                      <div className="text-sm text-gray-600">
                        +224 612 34 56 78
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-red-600" />
                    <div>
                      <div className="font-medium text-gray-800">Email</div>
                      <div className="text-sm text-gray-600">
                        contact@conakryenpoche.gn
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-600 to-yellow-500 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">
                  Pourquoi nous contacter ?
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Visibilité accrue dans l'annuaire</li>
                  <li>• Validation professionnelle</li>
                  <li>• Support client dédié</li>
                  <li>• Mise à jour des informations</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
