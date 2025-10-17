import React, { useState } from 'react';
import { 
  Play, 
  Code, 
  Smartphone, 
  Globe, 
  Zap,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

// Import all the new components
import GlobalSearch from '../components/GlobalSearch';
import RatingSystem from '../components/RatingSystem';
import BookingSystem from '../components/BookingSystem';
import LocationServices from '../components/LocationServices';
import PaymentSystem from '../components/PaymentSystem';
import BusinessAnalytics from '../components/BusinessAnalytics';
import NotificationSystem from '../components/NotificationSystem';
import ThemeToggle from '../components/ThemeToggle';
import FavoritesManager from '../components/FavoritesManager';
import ChatInterface from '../components/ChatInterface';

const DemoPage = () => {
  const [activeDemo, setActiveDemo] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const demos = [
    {
      id: 'search',
      title: 'Recherche Globale',
      description: 'Recherche intelligente avec autocomplétion et suggestions',
      icon: <Globe className="w-8 h-8" />,
      component: <GlobalSearch onBusinessSelect={(business) => console.log('Selected:', business)} />
    },
    {
      id: 'rating',
      title: 'Système de Notation',
      description: 'Avis et évaluations avec photos et commentaires',
      icon: <CheckCircle className="w-8 h-8" />,
      component: <RatingSystem 
        businessId="demo-business" 
        businessName="Restaurant Le Bistrot"
        onReviewSubmit={(review) => console.log('Review submitted:', review)}
      />
    },
    {
      id: 'booking',
      title: 'Réservation en Ligne',
      description: 'Système de réservation avec calendrier et disponibilités',
      icon: <Calendar className="w-8 h-8" />,
      component: <BookingSystem 
        business={{
          id: 'demo-business',
          name: 'Restaurant Le Bistrot',
          type: 'restaurant'
        }}
        onBookingSubmit={(booking) => console.log('Booking submitted:', booking)}
      />
    },
    {
      id: 'location',
      title: 'Services de Localisation',
      description: 'Géolocalisation, distance et navigation',
      icon: <MapPin className="w-8 h-8" />,
      component: <LocationServices 
        business={{
          id: 'demo-business',
          name: 'Restaurant Le Bistrot',
          address: 'Rue de la République, Conakry',
          phone: '+224 123 456 789',
          website: 'https://lebistrot.com',
          rating: 4.5,
          capacity: 50
        }}
      />
    },
    {
      id: 'payment',
      title: 'Paiement Intégré',
      description: 'Mobile Money, cartes bancaires et paiements sécurisés',
      icon: <CreditCard className="w-8 h-8" />,
      component: <PaymentSystem 
        amount={50000}
        businessName="Restaurant Le Bistrot"
        onPaymentSuccess={(payment) => console.log('Payment successful:', payment)}
        onPaymentError={(error) => console.log('Payment error:', error)}
      />
    },
    {
      id: 'analytics',
      title: 'Analytics Avancés',
      description: 'Tableau de bord avec statistiques et graphiques',
      icon: <BarChart3 className="w-8 h-8" />,
      component: <BusinessAnalytics businessId="demo-business" />
    },
    {
      id: 'notifications',
      title: 'Notifications Push',
      description: 'Notifications en temps réel et géofencing',
      icon: <Bell className="w-8 h-8" />,
      component: <NotificationSystem />
    },
    {
      id: 'favorites',
      title: 'Gestion des Favoris',
      description: 'Sauvegarde et organisation des entreprises préférées',
      icon: <Heart className="w-8 h-8" />,
      component: <FavoritesManager />
    },
    {
      id: 'chat',
      title: 'Assistant IA',
      description: 'Chat intelligent avec reconnaissance vocale',
      icon: <MessageCircle className="w-8 h-8" />,
      component: null // Special case - opens modal
    }
  ];

  const features = [
    {
      title: 'Progressive Web App',
      description: 'Installable sur mobile et desktop',
      benefits: ['Installation native', 'Fonctionnement hors-ligne', 'Notifications push']
    },
    {
      title: 'Recherche Intelligente',
      description: 'Recherche avancée avec IA',
      benefits: ['Autocomplétion', 'Recherche vocale', 'Suggestions contextuelles']
    },
    {
      title: 'Système de Réservation',
      description: 'Réservations en temps réel',
      benefits: ['Calendrier intégré', 'Disponibilités', 'Confirmations automatiques']
    },
    {
      title: 'Paiement Mobile',
      description: 'Mobile Money intégré',
      benefits: ['Orange Money', 'MTN Money', 'Cartes bancaires']
    },
    {
      title: 'Géolocalisation',
      description: 'Services basés sur la position',
      benefits: ['Navigation GPS', 'Distance calculée', 'Géofencing']
    },
    {
      title: 'Analytics Avancés',
      description: 'Tableau de bord complet',
      benefits: ['Statistiques détaillées', 'Graphiques', 'Export de données']
    }
  ];

  const handleDemoClick = (demo) => {
    if (demo.id === 'chat') {
      setShowChat(true);
    } else {
      setActiveDemo(activeDemo === demo.id ? null : demo.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                🚀 Démonstration des Améliorations
              </h1>
              <p className="text-white/70">
                Découvrez toutes les nouvelles fonctionnalités de Conakry en Poche
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setShowChat(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Tester Nimba IA
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Features Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">✨ Nouvelles Fonctionnalités</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-white/60 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Demos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">🎮 Démonstrations Interactives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demos.map((demo) => (
              <div key={demo.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    {demo.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{demo.title}</h3>
                    <p className="text-white/70 text-sm">{demo.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDemoClick(demo)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-500/30 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>Essayer</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Active Demo Display */}
        {activeDemo && (
          <section className="mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  {demos.find(d => d.id === activeDemo)?.title}
                </h3>
                <button
                  onClick={() => setActiveDemo(null)}
                  className="p-2 bg-white/10 text-white/70 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="demo-container">
                {demos.find(d => d.id === activeDemo)?.component}
              </div>
            </div>
          </section>
        )}

        {/* Technical Details */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">🔧 Détails Techniques</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-blue-400" />
                Technologies Utilisées
              </h3>
              <div className="space-y-3">
                {[
                  'React 18 avec Hooks',
                  'PWA (Progressive Web App)',
                  'Service Workers',
                  'Web Speech API',
                  'Geolocation API',
                  'Push Notifications',
                  'IndexedDB',
                  'WebRTC',
                  'Canvas API',
                  'Intersection Observer'
                ].map((tech, index) => (
                  <div key={index} className="flex items-center text-white/70 text-sm">
                    <ArrowRight className="w-4 h-4 text-blue-400 mr-2" />
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Performances
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-white/70 text-sm mb-1">
                    <span>Vitesse de chargement</span>
                    <span>95%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-white/70 text-sm mb-1">
                    <span>Accessibilité</span>
                    <span>98%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-white/70 text-sm mb-1">
                    <span>SEO</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-white/70 text-sm mb-1">
                    <span>PWA</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">📱 Installation</h2>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-green-400" />
                  Sur Mobile
                </h3>
                <ol className="space-y-3 text-white/70 text-sm">
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                    Ouvrez l'application dans votre navigateur
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                    Appuyez sur "Installer l'app" ou "Ajouter à l'écran d'accueil"
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                    Confirmez l'installation
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                    L'application apparaît sur votre écran d'accueil
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-400" />
                  Sur Desktop
                </h3>
                <ol className="space-y-3 text-white/70 text-sm">
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                    Ouvrez l'application dans Chrome/Edge
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                    Cliquez sur l'icône d'installation dans la barre d'adresse
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                    Confirmez l'installation
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                    L'application s'ouvre dans une fenêtre dédiée
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Chat Interface */}
      <ChatInterface 
        isOpen={showChat} 
        onClose={() => setShowChat(false)} 
      />
    </div>
  );
};

export default DemoPage;
