import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBusiness } from '../contexts/BusinessContext';
import { motion } from 'framer-motion';
import { Building, MapPin, Phone, Clock, Upload, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const BusinessForm = () => {
  const { currentUser } = useAuth();
  const { submitBusiness, categories } = useBusiness();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const onSubmit = async (data) => {
    if (!currentUser) {
      toast.error('Vous devez être connecté pour soumettre une entreprise');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const businessData = {
        ...data,
        imageUrls: uploadedImages,
        services: data.services ? data.services.split(',').map(s => s.trim()).filter(s => s) : [],
        createdAt: new Date()
      };

      const success = await submitBusiness(businessData, currentUser.uid);
      
      if (success) {
        setIsSubmitted(true);
        reset();
        setUploadedImages([]);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast.error('Erreur lors de la soumission de votre entreprise');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    
    setUploadedImages(prev => [...prev, ...newImages].slice(0, 5)); // Limite à 5 images
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Entreprise Soumise avec Succès !
          </h2>
          <p className="text-gray-600 mb-6">
            Votre entreprise a été soumise et sera examinée par notre équipe. 
            Vous recevrez une notification une fois qu'elle sera approuvée.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="btn btn-primary w-full"
          >
            Ajouter une Autre Entreprise
          </button>
        </motion.div>
      </div>
    );
  }

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
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Ajouter Votre Entreprise
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Partagez votre entreprise avec la communauté de Conakry et augmentez votre visibilité.
            </p>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Informations de base */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Informations de Base
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'entreprise *
                    </label>
                    <input
                      {...register('name', { required: 'Le nom est requis' })}
                      className="input"
                      placeholder="Ex: Restaurant Le Délicieux"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sous-titre (optionnel)
                    </label>
                    <input
                      {...register('subtitle')}
                      className="input"
                      placeholder="Ex: Spécialités guinéennes"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    {...register('category', { required: 'La catégorie est requise' })}
                    className="input"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register('description', { 
                      required: 'La description est requise',
                      minLength: { value: 50, message: 'Minimum 50 caractères' }
                    })}
                    className="textarea"
                    placeholder="Décrivez votre entreprise, ses services, son histoire..."
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>
              </div>

              {/* Contact et localisation */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Contact et Localisation
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse complète *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      {...register('address', { required: 'L\'adresse est requise' })}
                      className="input pl-10"
                      placeholder="Ex: Quartier Sandervalia, Commune de Kaloum, Conakry"
                    />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        {...register('phone', { 
                          required: 'Le téléphone est requis',
                          pattern: {
                            value: /^(\+224|224)?[0-9\s-]+$/,
                            message: 'Format de téléphone invalide'
                          }
                        })}
                        className="input pl-10"
                        placeholder="Ex: +224 612 34 56 78"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (optionnel)
                    </label>
                    <input
                      {...register('email', {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Format d\'email invalide'
                        }
                      })}
                      className="input"
                      placeholder="Ex: contact@monentreprise.gn"
                      type="email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horaires d'ouverture
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      {...register('schedule')}
                      className="input pl-10"
                      placeholder="Ex: Lun-Ven: 8h-18h, Sam: 8h-14h"
                    />
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Services et Spécialités
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Services proposés (séparés par des virgules)
                  </label>
                  <textarea
                    {...register('services')}
                    className="textarea"
                    placeholder="Ex: Restauration, Livraison, Événements privés, Wi-Fi gratuit"
                    rows={3}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Listez vos services principaux, séparés par des virgules
                  </p>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Photos de votre entreprise
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ajouter des photos (maximum 5)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-red-600 hover:text-red-700 font-medium"
                    >
                      Cliquez pour sélectionner des images
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      JPG, PNG jusqu'à 10MB par image
                    </p>
                  </div>
                </div>

                {/* Aperçu des images */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.preview}
                          alt={image.name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bouton de soumission */}
              <div className="flex justify-center pt-8 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary px-12 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="spinner"></div>
                      <span>Soumission en cours...</span>
                    </div>
                  ) : (
                    'Soumettre Mon Entreprise'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessForm;


