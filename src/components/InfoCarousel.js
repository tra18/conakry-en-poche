import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, MapPin, Phone, Globe, Star } from 'lucide-react';

const InfoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Informations sur Conakry
  const infoItems = [
    {
      id: 1,
      title: "🏛️ Administrations Publiques",
      description: "Toutes les administrations de Conakry en un clic",
      details: [
        "Préfecture de Conakry - Centre-ville",
        "Ministères et services publics",
        "Ambassades et consulats",
        "Services municipaux"
      ],
      icon: "🏛️",
      color: "from-blue-500 to-blue-700"
    },
    {
      id: 2,
      title: "🏨 Hôtels et Hébergements",
      description: "Les meilleurs hôtels de Conakry",
      details: [
        "Hôtels 5 étoiles au centre-ville",
        "Auberges économiques",
        "Résidences de standing",
        "Hôtels d'affaires"
      ],
      icon: "🏨",
      color: "from-green-500 to-green-700"
    },
    {
      id: 3,
      title: "🍽️ Restaurants et Gastronomie",
      description: "Découvrez la cuisine guinéenne",
      details: [
        "Restaurants traditionnels",
        "Cuisine internationale",
        "Marchés alimentaires",
        "Spécialités locales"
      ],
      icon: "🍽️",
      color: "from-orange-500 to-orange-700"
    },
    {
      id: 4,
      title: "🚕 Transport et Mobilité",
      description: "Se déplacer facilement à Conakry",
      details: [
        "Taxis rouges traditionnels",
        "Services de transport moderne",
        "Location de véhicules",
        "Transport public"
      ],
      icon: "🚕",
      color: "from-red-500 to-red-700"
    },
    {
      id: 5,
      title: "🎭 Culture et Loisirs",
      description: "Vie culturelle et divertissements",
      details: [
        "Centres culturels",
        "Théâtres et cinémas",
        "Musées et galeries",
        "Événements culturels"
      ],
      icon: "🎭",
      color: "from-purple-500 to-purple-700"
    },
    {
      id: 6,
      title: "🏥 Santé et Services",
      description: "Services de santé et bien-être",
      details: [
        "Hôpitaux et cliniques",
        "Pharmacies",
        "Centres de santé",
        "Services d'urgence"
      ],
      icon: "🏥",
      color: "from-pink-500 to-pink-700"
    }
  ];

  // Auto-play du carrousel
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === infoItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [isAutoPlay, infoItems.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === infoItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? infoItems.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentItem = infoItems[currentIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Carrousel principal */}
      <div 
        className="relative overflow-hidden rounded-2xl shadow-2xl"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-to-br ${currentItem.color} text-white p-8 md:p-12`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Contenu principal */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">{currentItem.icon}</div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                      {currentItem.title}
                    </h2>
                    <p className="text-xl text-white/90">
                      {currentItem.description}
                    </p>
                  </div>
                </div>

                {/* Détails */}
                <div className="space-y-3">
                  {currentItem.details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-white/90">{detail}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Bouton d'action */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <span>Découvrir</span>
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Image ou illustration */}
              <div className="hidden lg:block">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-center">
                  <div className="text-8xl mb-4">{currentItem.icon}</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-white/90">
                      <MapPin className="h-5 w-5" />
                      <span>Conakry, Guinée</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-white/90">
                      <Star className="h-5 w-5" />
                      <span>Service de qualité</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Indicateurs */}
      <div className="flex justify-center mt-6 space-x-2">
        {infoItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-red-600 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Informations supplémentaires */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-md text-center">
          <Clock className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800">Disponible 24/7</h3>
          <p className="text-sm text-gray-600">Informations en temps réel</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md text-center">
          <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800">Localisation précise</h3>
          <p className="text-sm text-gray-600">Adresses exactes</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md text-center">
          <Phone className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800">Contact direct</h3>
          <p className="text-sm text-gray-600">Numéros de téléphone</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCarousel;
