import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewsCarousel = ({ news = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Auto-rotation des actualités
  useEffect(() => {
    if (news.length <= itemsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, news.length - itemsPerView);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 6000); // Change toutes les 6 secondes

    return () => clearInterval(interval);
  }, [news.length, itemsPerView]);

  const nextSlide = () => {
    const maxIndex = Math.max(0, news.length - itemsPerView);
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, news.length - itemsPerView);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const formatDate = (date) => {
    return new Date(date.seconds ? date.seconds * 1000 : date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Calendar className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Aucune actualité disponible
        </h3>
        <p className="text-gray-500">
          Revenez bientôt pour découvrir les dernières nouvelles de Conakry.
        </p>
      </div>
    );
  }

  const visibleNews = news.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {news.map((article, index) => (
            <div
              key={article.id}
              className="flex-shrink-0 px-4"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card h-full group cursor-pointer hover:shadow-lg transition-all duration-300"
              >
                {article.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                      {article.author && (
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>{article.author}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center text-red-600 group-hover:text-red-700">
                      <span className="mr-1">Lire plus</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation */}
      {news.length > itemsPerView && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg text-gray-600 p-3 rounded-full hover:bg-gray-50 transition-all z-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg text-gray-600 p-3 rounded-full hover:bg-gray-50 transition-all z-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Indicateurs */}
      {news.length > itemsPerView && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(news.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerView)}
              className={`w-3 h-3 rounded-full transition-all ${
                Math.floor(currentIndex / itemsPerView) === index
                  ? 'bg-red-600' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* Lien vers toutes les actualités */}
      <div className="text-center mt-8">
        <Link
          to="/news"
          className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium transition-colors"
        >
          <span>Voir toutes les actualités</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default NewsCarousel;


