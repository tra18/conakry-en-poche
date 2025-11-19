import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageCircle, Image, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const RatingSystem = ({ businessId, businessName, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Veuillez donner une note', {
        icon: '⭐',
        duration: 3000
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const reviewData = {
        businessId,
        businessName,
        rating,
        review,
        images: images.map(img => img.file),
        timestamp: new Date().toISOString(),
        userId: 'current-user' // Replace with actual user ID
      };

      if (onReviewSubmit) {
        await onReviewSubmit(reviewData);
      }

      // Reset form
      setRating(0);
      setReview('');
      setImages([]);
      
      toast.success('Avis soumis avec succès !', {
        icon: '✅',
        duration: 4000,
        style: {
          borderRadius: '10px',
          background: '#10b981',
          color: '#fff',
        },
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Erreur lors de la soumission de l\'avis', {
        icon: '❌',
        duration: 4000,
        style: {
          borderRadius: '10px',
          background: '#ef4444',
          color: '#fff',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-4">
        Donnez votre avis sur {businessName}
      </h3>
      
      {/* Rating Stars */}
      <div className="mb-4">
        <label className="block text-white/80 text-sm mb-2">Note</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleRatingClick(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`w-8 h-8 transition-colors duration-200 ${
                  value <= (hoveredRating || rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-400'
                }`}
              />
            </button>
          ))}
        </div>
        <p className="text-white/60 text-sm mt-1">
          {rating === 0 ? 'Sélectionnez une note' : 
           rating === 1 ? 'Très mauvais' :
           rating === 2 ? 'Mauvais' :
           rating === 3 ? 'Moyen' :
           rating === 4 ? 'Bon' : 'Excellent'}
        </p>
      </div>

      {/* Review Text */}
      <div className="mb-4">
        <label className="block text-white/80 text-sm mb-2">Votre avis</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Partagez votre expérience..."
          className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300 resize-none"
          rows={4}
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-white/80 text-sm mb-2">Photos (optionnel)</label>
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-xl cursor-pointer hover:bg-blue-500/30 transition-colors duration-200">
            <Image className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 text-sm">Ajouter des photos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
        
        {images.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || rating === 0}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
            <span>Envoi en cours...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Publier l'avis</span>
          </>
        )}
      </button>
    </div>
  );
};

export default RatingSystem;
