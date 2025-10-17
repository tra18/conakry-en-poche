import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MapPin, 
  Star, 
  Phone, 
  Clock, 
  Trash2, 
  Share2,
  Filter,
  Search
} from 'lucide-react';

const FavoritesManager = () => {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    filterAndSortFavorites();
  }, [favorites, searchQuery, filterCategory, sortBy]);

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  };

  const saveFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const addToFavorites = (business) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === business.id);
    if (!isAlreadyFavorite) {
      const newFavorites = [...favorites, { ...business, addedAt: new Date().toISOString() }];
      saveFavorites(newFavorites);
    }
  };

  const removeFromFavorites = (businessId) => {
    const newFavorites = favorites.filter(fav => fav.id !== businessId);
    saveFavorites(newFavorites);
  };

  const isFavorite = (businessId) => {
    return favorites.some(fav => fav.id === businessId);
  };

  const filterAndSortFavorites = () => {
    let filtered = [...favorites];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(fav =>
        fav.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fav.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fav.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(fav => fav.category === filterCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'added':
          return new Date(b.addedAt) - new Date(a.addedAt);
        case 'distance':
          return (a.distance || 0) - (b.distance || 0);
        default:
          return 0;
      }
    });

    setFilteredFavorites(filtered);
  };

  const getCategories = () => {
    const categories = [...new Set(favorites.map(fav => fav.category))];
    return categories;
  };

  const shareFavorite = (favorite) => {
    if (navigator.share) {
      navigator.share({
        title: favorite.name,
        text: `Découvrez ${favorite.name} sur Conakry en Poche`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${favorite.name} - ${favorite.address}`);
      alert('Informations copiées dans le presse-papiers !');
    }
  };

  const clearAllFavorites = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tous vos favoris ?')) {
      saveFavorites([]);
    }
  };

  const getStatusColor = (isOpen) => {
    return isOpen ? 'text-green-400' : 'text-red-400';
  };

  const getStatusText = (isOpen) => {
    return isOpen ? 'Ouvert' : 'Fermé';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Heart className="w-8 h-8 mr-3 text-red-400" />
          Mes Favoris
        </h2>
        {favorites.length > 0 && (
          <button
            onClick={clearAllFavorites}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/30 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Tout supprimer</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      {favorites.length > 0 && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher dans les favoris..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">Toutes les catégories</option>
              {getCategories().map(category => (
                <option key={category} value={category} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500"
            >
              <option value="name" className="bg-gray-800">Nom</option>
              <option value="rating" className="bg-gray-800">Note</option>
              <option value="added" className="bg-gray-800">Date d'ajout</option>
              <option value="distance" className="bg-gray-800">Distance</option>
            </select>
          </div>
        </div>
      )}

      {/* Favorites List */}
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Aucun favori</h3>
          <p className="text-white/70 mb-6">
            Ajoutez des entreprises à vos favoris pour les retrouver facilement
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
          >
            Découvrir des entreprises
          </button>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Aucun résultat</h3>
          <p className="text-white/70">
            Aucun favori ne correspond à votre recherche
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((favorite) => (
            <div
              key={favorite.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {favorite.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-2">{favorite.category}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (favorite.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white/60 text-sm">
                      {favorite.rating || 'N/A'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromFavorites(favorite.id)}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>

              {/* Address */}
              <div className="flex items-start mb-4">
                <MapPin className="w-4 h-4 mr-2 mt-1 text-blue-400" />
                <p className="text-white/70 text-sm">{favorite.address}</p>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center ${getStatusColor(favorite.isOpen)}`}>
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{getStatusText(favorite.isOpen)}</span>
                </div>
                {favorite.distance && (
                  <span className="text-white/60 text-sm">
                    {favorite.distance < 1 
                      ? `${(favorite.distance * 1000).toFixed(0)} m`
                      : `${favorite.distance.toFixed(1)} km`
                    }
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                {favorite.phone && (
                  <a
                    href={`tel:${favorite.phone}`}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">Appeler</span>
                  </a>
                )}
                <button
                  onClick={() => shareFavorite(favorite)}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Partager</span>
                </button>
              </div>

              {/* Added Date */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/50 text-xs">
                  Ajouté le {new Date(favorite.addedAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {favorites.length > 0 && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Statistiques</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{favorites.length}</p>
              <p className="text-white/70 text-sm">Total favoris</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{getCategories().length}</p>
              <p className="text-white/70 text-sm">Catégories</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {favorites.filter(fav => fav.isOpen).length}
              </p>
              <p className="text-white/70 text-sm">Ouverts maintenant</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {favorites.length > 0 
                  ? (favorites.reduce((sum, fav) => sum + (fav.rating || 0), 0) / favorites.length).toFixed(1)
                  : '0'
                }
              </p>
              <p className="text-white/70 text-sm">Note moyenne</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesManager;
