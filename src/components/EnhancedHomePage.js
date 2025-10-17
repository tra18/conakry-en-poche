import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Phone, 
  Clock, 
  Heart,
  Bell,
  Settings,
  User,
  Menu,
  X
} from 'lucide-react';

// Import all the new components
import GlobalSearch from './GlobalSearch';
import RatingSystem from './RatingSystem';
import BookingSystem from './BookingSystem';
import LocationServices from './LocationServices';
import PaymentSystem from './PaymentSystem';
import BusinessAnalytics from './BusinessAnalytics';
import NotificationSystem from './NotificationSystem';
import ThemeToggle from './ThemeToggle';
import FavoritesManager from './FavoritesManager';
import ChatInterface from './ChatInterface';

const EnhancedHomePage = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  };

  const handleBusinessSelect = (business) => {
    setSelectedBusiness(business);
    setCurrentView('business-detail');
  };

  const handleBookingSubmit = async (bookingData) => {
    console.log('Booking submitted:', bookingData);
    // Handle booking submission
  };

  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment successful:', paymentData);
    // Handle successful payment
  };

  const handleReviewSubmit = async (reviewData) => {
    console.log('Review submitted:', reviewData);
    // Handle review submission
  };

  const mockBusinesses = [
    {
      id: 1,
      name: "Restaurant Le Bistrot",
      category: "Restaurant",
      address: "Rue de la République, Conakry",
      rating: 4.5,
      isOpen: true,
      type: "restaurant",
      phone: "+224 123 456 789",
      website: "https://lebistrot.com",
      capacity: 50,
      distance: 0.5
    },
    {
      id: 2,
      name: "Hôtel Mariador Palace",
      category: "Hôtel",
      address: "Boulevard du Commerce, Conakry",
      rating: 4.8,
      isOpen: true,
      type: "hotel",
      phone: "+224 987 654 321",
      website: "https://mariador.com",
      capacity: 200,
      distance: 1.2
    }
  ];

  const renderHomeView = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Découvrez <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Conakry</span>
        </h1>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Votre guide complet pour explorer Conakry - Restaurants, hôtels, services et plus encore
        </p>
        
        {/* Global Search */}
        <div className="max-w-4xl mx-auto mb-8">
          <GlobalSearch onBusinessSelect={handleBusinessSelect} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-white/70 text-sm">Entreprises</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">4.8</div>
            <div className="text-white/70 text-sm">Note moyenne</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">10K+</div>
            <div className="text-white/70 text-sm">Utilisateurs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/70 text-sm">Support</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { name: 'Restaurants', icon: '🍽️', color: 'from-red-500 to-pink-600' },
          { name: 'Hôtels', icon: '🏨', color: 'from-blue-500 to-cyan-600' },
          { name: 'Pharmacies', icon: '💊', color: 'from-green-500 to-emerald-600' },
          { name: 'Banques', icon: '🏦', color: 'from-yellow-500 to-orange-600' },
          { name: 'Transport', icon: '🚗', color: 'from-purple-500 to-violet-600' },
          { name: 'Shopping', icon: '🛍️', color: 'from-pink-500 to-rose-600' }
        ].map((category, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
              {category.icon}
            </div>
            <h3 className="text-white font-semibold text-center">{category.name}</h3>
          </div>
        ))}
      </div>

      {/* Featured Businesses */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Entreprises populaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBusinesses.map((business) => (
            <div
              key={business.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
              onClick={() => handleBusinessSelect(business)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{business.name}</h3>
                  <p className="text-white/70 text-sm">{business.category}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white/80 text-sm">{business.rating}</span>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <MapPin className="w-4 h-4 mr-2 mt-1 text-blue-400" />
                <p className="text-white/70 text-sm">{business.address}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className={`flex items-center ${business.isOpen ? 'text-green-400' : 'text-red-400'}`}>
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{business.isOpen ? 'Ouvert' : 'Fermé'}</span>
                </div>
                {business.distance && (
                  <span className="text-white/60 text-sm">
                    {business.distance < 1 
                      ? `${(business.distance * 1000).toFixed(0)} m`
                      : `${business.distance.toFixed(1)} km`
                    }
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBusinessDetail = () => (
    <div className="space-y-6">
      {selectedBusiness && (
        <>
          {/* Business Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{selectedBusiness.name}</h1>
                <p className="text-white/70 text-lg">{selectedBusiness.category}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white/80">{selectedBusiness.rating}</span>
                  </div>
                  <div className={`flex items-center ${selectedBusiness.isOpen ? 'text-green-400' : 'text-red-400'}`}>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{selectedBusiness.isOpen ? 'Ouvert' : 'Fermé'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('home')}
                className="p-2 bg-white/10 text-white/70 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Business Services */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LocationServices business={selectedBusiness} />
            <BookingSystem 
              business={selectedBusiness} 
              onBookingSubmit={handleBookingSubmit}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RatingSystem 
              businessId={selectedBusiness.id}
              businessName={selectedBusiness.name}
              onReviewSubmit={handleReviewSubmit}
            />
            <PaymentSystem 
              amount={50000}
              businessName={selectedBusiness.name}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        </>
      )}
    </div>
  );

  const renderFavorites = () => (
    <FavoritesManager />
  );

  const renderAnalytics = () => (
    <BusinessAnalytics businessId="current-business" />
  );

  const renderNotifications = () => (
    <NotificationSystem />
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">Paramètres</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Thème</h3>
            <ThemeToggle />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
            <NotificationSystem />
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home': return renderHomeView();
      case 'business-detail': return renderBusinessDetail();
      case 'favorites': return renderFavorites();
      case 'analytics': return renderAnalytics();
      case 'notifications': return renderNotifications();
      case 'settings': return renderSettings();
      default: return renderHomeView();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <h1 className="text-xl font-bold text-white">Conakry en Poche</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'home' 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Accueil
              </button>
              <button
                onClick={() => setCurrentView('favorites')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'favorites' 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Favoris
              </button>
              <button
                onClick={() => setCurrentView('analytics')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'analytics' 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                Analytics
              </button>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 bg-white/10 text-white/70 hover:bg-white/20 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {showNotifications && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                )}
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-white/10 text-white/70 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowChat(true)}
                className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                <span className="text-sm font-medium">Nimba</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 bg-white/10 text-white/70 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20">
            <div className="px-4 py-2 space-y-1">
              <button
                onClick={() => {
                  setCurrentView('home');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                Accueil
              </button>
              <button
                onClick={() => {
                  setCurrentView('favorites');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                Favoris
              </button>
              <button
                onClick={() => {
                  setCurrentView('analytics');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                Analytics
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>

      {/* Chat Interface */}
      <ChatInterface 
        isOpen={showChat} 
        onClose={() => setShowChat(false)} 
      />

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-20 right-4 w-80 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
            <button
              onClick={() => setShowNotifications(false)}
              className="p-1 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/80 text-sm">Nouveau restaurant ajouté près de vous</p>
              <p className="text-white/60 text-xs mt-1">Il y a 2 heures</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/80 text-sm">Promotion spéciale chez Hôtel Mariador</p>
              <p className="text-white/60 text-xs mt-1">Il y a 5 heures</p>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed top-20 right-4 w-80 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Paramètres</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="p-1 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Thème</label>
              <ThemeToggle />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Notifications</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-white/70 text-sm">Nouvelles entreprises</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-white/70 text-sm">Promotions</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedHomePage;
