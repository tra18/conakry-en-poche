import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Star, Clock } from 'lucide-react';

const GlobalSearch = ({ onBusinessSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  // Mock data - replace with actual API call
  const mockBusinesses = [
    {
      id: 1,
      name: "Restaurant Le Bistrot",
      category: "Restaurant",
      address: "Rue de la République, Conakry",
      rating: 4.5,
      isOpen: true,
      type: "restaurant"
    },
    {
      id: 2,
      name: "Hôtel Mariador Palace",
      category: "Hôtel",
      address: "Boulevard du Commerce, Conakry",
      rating: 4.8,
      isOpen: true,
      type: "hotel"
    },
    {
      id: 3,
      name: "Pharmacie Centrale",
      category: "Pharmacie",
      address: "Avenue de la Paix, Conakry",
      rating: 4.2,
      isOpen: false,
      type: "pharmacy"
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery) => {
    if (searchQuery.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filteredResults = mockBusinesses.filter(business =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(filteredResults);
      setIsOpen(true);
      setLoading(false);
    }, 300);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleBusinessSelect = (business) => {
    setQuery('');
    setIsOpen(false);
    if (onBusinessSelect) {
      onBusinessSelect(business);
    }
  };

  const getStatusColor = (isOpen) => {
    return isOpen ? 'text-green-500' : 'text-red-500';
  };

  const getStatusText = (isOpen) => {
    return isOpen ? 'Ouvert' : 'Fermé';
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher restaurants, hôtels, services..."
          value={query}
          onChange={handleInputChange}
          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 max-h-96 overflow-y-auto z-50"
        >
          {results.map((business) => (
            <div
              key={business.id}
              onClick={() => handleBusinessSelect(business)}
              className="p-4 hover:bg-blue-50/50 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {business.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{business.category}</p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {business.address}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium text-gray-700">
                      {business.rating}
                    </span>
                  </div>
                  <div className={`flex items-center text-xs ${getStatusColor(business.isOpen)}`}>
                    <Clock className="w-3 h-3 mr-1" />
                    {getStatusText(business.isOpen)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && results.length === 0 && query.length >= 2 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-4 z-50">
          <p className="text-gray-600 text-center">Aucun résultat trouvé</p>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
