import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Star, Car, Navigation, DollarSign, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const AlloPage = () => {
  const [selectedTaxi, setSelectedTaxi] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Données des compagnies de taxi (en réalité, ceci viendrait de Firebase)
  const taxiCompanies = [
    {
      id: 1,
      name: "Taxi Conakry Express",
      phone: "+224 612 34 56 78",
      rating: 4.8,
      priceRange: "5000-15000 GNF",
      available: true,
      vehicles: 25,
      description: "Service rapide et fiable dans toute la ville",
      specialties: ["Aéroport", "Hôpitaux", "Marchés", "Administrations"],
      estimatedTime: "5-10 min"
    },
    {
      id: 2,
      name: "Taxi Rouge Rapide",
      phone: "+224 655 12 34 56",
      rating: 4.6,
      priceRange: "4000-12000 GNF",
      available: true,
      vehicles: 18,
      description: "Taxi traditionnel rouge, prix abordables",
      specialties: ["Centre-ville", "Quartiers populaires", "Marchés"],
      estimatedTime: "10-15 min"
    },
    {
      id: 3,
      name: "Taxi VIP Conakry",
      phone: "+224 624 78 90 12",
      rating: 4.9,
      priceRange: "8000-25000 GNF",
      available: true,
      vehicles: 12,
      description: "Service premium avec véhicules climatisés",
      specialties: ["Aéroport", "Hôtels 4-5 étoiles", "Événements"],
      estimatedTime: "3-8 min"
    },
    {
      id: 4,
      name: "Taxi Communauté",
      phone: "+224 664 56 78 90",
      rating: 4.4,
      priceRange: "3000-10000 GNF",
      available: false,
      vehicles: 35,
      description: "Service communautaire, prix très abordables",
      specialties: ["Tous quartiers", "Transport en commun"],
      estimatedTime: "15-20 min"
    },
    {
      id: 5,
      name: "Taxi Express Matam",
      phone: "+224 612 98 76 54",
      rating: 4.7,
      priceRange: "5000-13000 GNF",
      available: true,
      vehicles: 20,
      description: "Spécialisé dans le transport express",
      specialties: ["Urgences", "Express", "Livraisons"],
      estimatedTime: "5-12 min"
    },
    {
      id: 6,
      name: "Taxi Nuit Conakry",
      phone: "+224 655 34 56 78",
      rating: 4.5,
      priceRange: "6000-18000 GNF",
      available: true,
      vehicles: 15,
      description: "Service de nuit, disponible 24h/24",
      specialties: ["Service de nuit", "Sécurité", "24h/24"],
      estimatedTime: "8-15 min"
    }
  ];

  useEffect(() => {
    // Obtenir la localisation de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
        }
      );
    }
  }, []);

  const handleCallTaxi = (taxi) => {
    setSelectedTaxi(taxi);
    setIsCalling(true);
    
    // Simuler un appel
    setTimeout(() => {
      setIsCalling(false);
      toast.success(`Appel vers ${taxi.name} en cours...`);
    }, 2000);
  };

  const openPhoneApp = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const availableTaxis = taxiCompanies.filter(taxi => taxi.available);
  const unavailableTaxis = taxiCompanies.filter(taxi => !taxi.available);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-yellow-500 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="h-10 w-10" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              ALLO Taxi
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto">
              Trouvez et appelez rapidement un taxi à Conakry. 
              Service disponible 24h/24 pour tous vos déplacements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Informations rapides */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Car className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Taxis Disponibles</h3>
              <p className="text-2xl font-bold text-green-600">{availableTaxis.length}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Temps Moyen</h3>
              <p className="text-2xl font-bold text-blue-600">8 min</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Prix Moyen</h3>
              <p className="text-2xl font-bold text-yellow-600">8,000 GNF</p>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des taxis */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Compagnies de Taxi à Conakry
            </h2>
            <p className="text-gray-600">
              Choisissez la compagnie qui correspond le mieux à vos besoins
            </p>
          </motion.div>

          {/* Taxis disponibles */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              Taxis Disponibles ({availableTaxis.length})
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableTaxis.map((taxi) => (
                <motion.div
                  key={taxi.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">
                          {taxi.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          {taxi.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-500 ml-4">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{taxi.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Phone className="h-4 w-4 mr-2 text-red-500" />
                        <span className="font-mono">{taxi.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <span>{taxi.estimatedTime}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                        <span>{taxi.priceRange}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Users className="h-4 w-4 mr-2 text-purple-500" />
                        <span>{taxi.vehicles} véhicules</span>
                      </div>
                    </div>

                    {/* Spécialités */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {taxi.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleCallTaxi(taxi)}
                        disabled={isCalling}
                        className="flex-1 btn btn-primary flex items-center justify-center space-x-2"
                      >
                        {isCalling && selectedTaxi?.id === taxi.id ? (
                          <>
                            <div className="spinner"></div>
                            <span>Appel en cours...</span>
                          </>
                        ) : (
                          <>
                            <Phone className="h-4 w-4" />
                            <span>Appeler</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => openPhoneApp(taxi.phone)}
                        className="btn btn-outline flex items-center justify-center space-x-2"
                      >
                        <Navigation className="h-4 w-4" />
                        <span>Numéro</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Taxis non disponibles */}
          {unavailableTaxis.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                Temporairement Indisponibles ({unavailableTaxis.length})
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {unavailableTaxis.map((taxi) => (
                  <motion.div
                    key={taxi.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card opacity-60"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-800 mb-2">
                            {taxi.name}
                          </h4>
                          <p className="text-gray-600 text-sm mb-3">
                            {taxi.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 text-yellow-500 ml-4">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">{taxi.rating}</span>
                        </div>
                      </div>

                      <div className="text-center py-4">
                        <div className="text-gray-500 mb-2">
                          <Clock className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm">Service temporairement suspendu</p>
                        </div>
                        <button
                          disabled
                          className="btn btn-outline opacity-50 cursor-not-allowed"
                        >
                          Indisponible
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Conseils et informations */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Conseils pour vos déplacements
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quelques conseils pratiques pour bien utiliser les taxis à Conakry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Appelez à l'avance
              </h3>
              <p className="text-gray-600 text-sm">
                Contactez le taxi quelques minutes avant votre départ pour garantir la disponibilité.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Négociez le prix
              </h3>
              <p className="text-gray-600 text-sm">
                Le prix peut être négocié, surtout pour les trajets longs. Demandez un devis avant de partir.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Précisez l'adresse
              </h3>
              <p className="text-gray-600 text-sm">
                Donnez des points de repère clairs et précis pour faciliter la localisation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AlloPage;


