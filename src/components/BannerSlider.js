import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useBanner } from '../contexts/BannerContext';

const BannerSlider = ({ banners = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { recordBannerClick } = useBanner();

  // Auto-rotation des bannières
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleBannerClick = (banner) => {
    if (banner.url) {
      recordBannerClick(banner.id);
      window.open(banner.url, '_blank');
    }
  };

  if (banners.length === 0) {
    return (
      <div className="w-full h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">🇬🇳</div>
          <p className="text-lg font-medium">Conakry en Poche</p>
          <p className="text-sm">Votre guide de la capitale</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 cursor-pointer"
          onClick={() => handleBannerClick(banners[currentIndex])}
        >
          {banners[currentIndex].imageUrl ? (
            <img
              src={banners[currentIndex].imageUrl}
              alt={banners[currentIndex].title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl mb-2">🇬🇳</div>
                <h3 className="text-2xl font-bold">{banners[currentIndex].title}</h3>
                <p className="text-lg opacity-90">{banners[currentIndex].description}</p>
              </div>
            </div>
          )}
          
          {/* Overlay avec texte */}
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
            <div className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{banners[currentIndex].title}</h3>
              <p className="text-lg opacity-90 mb-2">{banners[currentIndex].description}</p>
              {banners[currentIndex].url && (
                <div className="flex items-center text-sm opacity-80">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  <span>Cliquer pour en savoir plus</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Indicateurs */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BannerSlider;


