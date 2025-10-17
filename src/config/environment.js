// Environment configuration for Conakry en Poche
const config = {
  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'https://api.conakryenpoche.com',
    timeout: 10000,
    retryAttempts: 3
  },

  // Firebase Configuration
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "your-api-key",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "conakry-en-poche.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "conakry-en-poche",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "conakry-en-poche.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
  },

  // Payment Configuration
  payment: {
    orangeMoney: {
      merchantId: process.env.REACT_APP_ORANGE_MONEY_MERCHANT_ID,
      apiKey: process.env.REACT_APP_ORANGE_MONEY_API_KEY
    },
    mtnMoney: {
      merchantId: process.env.REACT_APP_MTN_MONEY_MERCHANT_ID,
      apiKey: process.env.REACT_APP_MTN_MONEY_API_KEY
    },
    stripe: {
      publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
    }
  },

  // Maps Configuration
  maps: {
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    defaultCenter: {
      lat: 9.6412,
      lng: -13.5784
    },
    defaultZoom: 13
  },

  // AI Assistant Configuration
  ai: {
    openaiApiKey: process.env.REACT_APP_OPENAI_API_KEY,
    model: 'gpt-3.5-turbo',
    maxTokens: 150,
    temperature: 0.7
  },

  // Notification Configuration
  notifications: {
    vapidPublicKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
    serverUrl: process.env.REACT_APP_NOTIFICATION_SERVER_URL
  },

  // Analytics Configuration
  analytics: {
    googleAnalyticsId: process.env.REACT_APP_GA_ID,
    mixpanelToken: process.env.REACT_APP_MIXPANEL_TOKEN
  },

  // Feature Flags
  features: {
    enablePWA: true,
    enablePushNotifications: true,
    enableVoiceSearch: true,
    enableOfflineMode: true,
    enableDarkMode: true,
    enableGeolocation: true,
    enablePayment: true,
    enableBooking: true,
    enableReviews: true,
    enableAnalytics: true
  },

  // App Configuration
  app: {
    name: 'Conakry en Poche',
    version: '2.0.0',
    description: 'Votre guide complet pour explorer Conakry',
    author: 'Conakry en Poche Team',
    supportEmail: 'support@conakryenpoche.com',
    website: 'https://conakryenpoche.com'
  },

  // Business Categories
  categories: [
    { id: 'restaurant', name: 'Restaurants', icon: '🍽️', color: 'from-red-500 to-pink-600' },
    { id: 'hotel', name: 'Hôtels', icon: '🏨', color: 'from-blue-500 to-cyan-600' },
    { id: 'pharmacy', name: 'Pharmacies', icon: '💊', color: 'from-green-500 to-emerald-600' },
    { id: 'bank', name: 'Banques', icon: '🏦', color: 'from-yellow-500 to-orange-600' },
    { id: 'transport', name: 'Transport', icon: '🚗', color: 'from-purple-500 to-violet-600' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: 'from-pink-500 to-rose-600' },
    { id: 'beauty', name: 'Beauté', icon: '💄', color: 'from-purple-500 to-pink-600' },
    { id: 'education', name: 'Éducation', icon: '🎓', icon: 'from-indigo-500 to-blue-600' },
    { id: 'health', name: 'Santé', icon: '🏥', color: 'from-green-500 to-teal-600' },
    { id: 'entertainment', name: 'Loisirs', icon: '🎭', color: 'from-orange-500 to-red-600' }
  ],

  // Emergency Numbers
  emergency: {
    police: '117',
    fire: '18',
    ambulance: '442',
    tourist: '442'
  },

  // Currency
  currency: {
    code: 'GNF',
    symbol: 'FG',
    locale: 'fr-GN'
  },

  // Timezone
  timezone: 'Africa/Conakry',

  // Language
  language: {
    default: 'fr',
    supported: ['fr', 'en']
  }
};

export default config;
