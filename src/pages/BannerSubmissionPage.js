import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, Link, Calendar, DollarSign, Eye, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const BannerSubmissionPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    position: 'hero',
    startDate: '',
    endDate: '',
    budget: '',
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const positions = [
    { id: 'hero', name: 'Bannière Principale', description: 'Position en haut de page (1200x400px)', price: '50,000 GNF/jour' },
    { id: 'sidebar', name: 'Barre Latérale', description: 'Position sur le côté (300x600px)', price: '25,000 GNF/jour' },
    { id: 'footer', name: 'Pied de Page', description: 'Position en bas de page (1200x200px)', price: '30,000 GNF/jour' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('L\'image ne doit pas dépasser 5MB');
        return;
      }
      
      setFormData({
        ...formData,
        image: file
      });

      // Créer un aperçu
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      image: null
    });
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulation d'envoi (remplacer par l'API réelle)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Votre bannière publicitaire a été soumise avec succès !');
      setFormData({
        title: '',
        description: '',
        url: '',
        position: 'hero',
        startDate: '',
        endDate: '',
        budget: '',
        image: null
      });
      setPreviewImage(null);
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de la bannière');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPositionPrice = (positionId) => {
    const position = positions.find(p => p.id === positionId);
    return position ? position.price : '0 GNF/jour';
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
              Bannières Publicitaires
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Augmentez votre visibilité avec nos bannières publicitaires professionnelles. 
              Choisissez votre position et votre durée.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire principal */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="space-y-6">
                  {/* Informations de base */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Image className="h-5 w-5 mr-2 text-red-600" />
                      Informations de la Bannière
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Titre de la bannière *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Titre accrocheur pour votre bannière"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Description de votre offre ou service"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          URL de destination *
                        </label>
                        <input
                          type="url"
                          name="url"
                          value={formData.url}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="https://votre-site.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Position et tarifs */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Eye className="h-5 w-5 mr-2 text-red-600" />
                      Position et Tarifs
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {positions.map((position) => (
                        <label
                          key={position.id}
                          className={`relative cursor-pointer p-4 border-2 rounded-lg transition-all ${
                            formData.position === position.id
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="position"
                            value={position.id}
                            checked={formData.position === position.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <div className="text-2xl mb-2">{position.name}</div>
                            <div className="text-sm text-gray-600 mb-2">
                              {position.description}
                            </div>
                            <div className="font-semibold text-red-600">
                              {position.price}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Dates et budget */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-red-600" />
                      Planification
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date de début *
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date de fin *
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          required
                          min={formData.startDate || new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Budget estimé (GNF)
                        </label>
                        <input
                          type="number"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Montant en GNF"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Upload d'image */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Upload className="h-5 w-5 mr-2 text-red-600" />
                      Image de la Bannière *
                    </h3>
                    <div className="space-y-4">
                      {!previewImage ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-500 transition-colors">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">
                            Glissez-déposez votre image ou cliquez pour sélectionner
                          </p>
                          <p className="text-sm text-gray-500 mb-4">
                            Formats acceptés: JPG, PNG, GIF (Max 5MB)
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer inline-block"
                          >
                            Sélectionner une image
                          </label>
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            src={previewImage}
                            alt="Aperçu de la bannière"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bouton de soumission */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.image}
                      className="w-full bg-red-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Soumission en cours...</span>
                        </>
                      ) : (
                        <>
                          <DollarSign className="h-5 w-5" />
                          <span>Soumettre la bannière</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Informations et tarifs */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Tarifs Publicitaires
                </h3>
                <div className="space-y-4">
                  {positions.map((position) => (
                    <div key={position.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-800">{position.name}</div>
                          <div className="text-sm text-gray-600">{position.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-red-600">{position.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-600 to-yellow-500 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">
                  Avantages Publicitaires
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Visibilité maximale sur le site</li>
                  <li>• Ciblage géographique précis</li>
                  <li>• Statistiques détaillées</li>
                  <li>• Support technique inclus</li>
                  <li>• Modification gratuite</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Processus de Validation
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">1</div>
                    <span>Soumission de votre bannière</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-semibold">2</div>
                    <span>Révision par notre équipe</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold">3</div>
                    <span>Publication et suivi</span>
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

export default BannerSubmissionPage;
