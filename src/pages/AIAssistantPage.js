import React, { useState, useEffect } from 'react';
import { useAIAssistant } from '../contexts/AIAssistantContext';
import { motion } from 'framer-motion';
import { 
  Bot, 
  MessageCircle, 
  Globe, 
  Volume2, 
  VolumeX, 
  Send, 
  Lightbulb,
  MapPin,
  Phone,
  Clock,
  Star,
  Heart
} from 'lucide-react';

const AIAssistantPage = () => {
  const {
    messages,
    currentMessage,
    setCurrentMessage,
    isTyping,
    language,
    isVoiceEnabled,
    sendMessage,
    toggleLanguage,
    toggleVoice,
    quickSuggestions
  } = useAIAssistant();

  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      sendMessage(currentMessage);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
    setShowSuggestions(false);
  };

  const categories = [
    {
      icon: MapPin,
      title: "Lieux & Adresses",
      questions: [
        "Où se trouve l'aéroport ?",
        "Quels sont les meilleurs restaurants ?",
        "Où faire du shopping ?",
        "Sites touristiques à visiter"
      ],
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Phone,
      title: "Transport",
      questions: [
        "Comment se déplacer en taxi ?",
        "Prix des transports",
        "Horaires des bus",
        "Numéros de taxi"
      ],
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Clock,
      title: "Horaires & Services",
      questions: [
        "Horaires des administrations",
        "Quand sont ouverts les marchés ?",
        "Heures de bureau des banques",
        "Services d'urgence"
      ],
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Star,
      title: "Culture & Loisirs",
      questions: [
        "Événements culturels",
        "Festivals à Conakry",
        "Musées et monuments",
        "Plages et loisirs"
      ],
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const tips = [
    {
      icon: Lightbulb,
      title: "Conseil",
      content: "Posez des questions spécifiques pour obtenir des réponses plus précises."
    },
    {
      icon: Globe,
      title: "Multilingue",
      content: "L'assistant comprend le français et l'anglais. Changez de langue à tout moment."
    },
    {
      icon: Volume2,
      title: "Audio",
      content: "Activez la synthèse vocale pour écouter les réponses de l'assistant."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bot className="h-10 w-10" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Nimba - Assistant IA
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Votre guide intelligent pour découvrir Conakry. Posez vos questions et obtenez des réponses instantanées sur tous les aspects de la capitale guinéenne.
            </p>
            
            {/* Contrôles */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={toggleLanguage}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'fr' ? 'English' : 'Français'}</span>
              </button>
              <button
                onClick={toggleVoice}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
              >
                {isVoiceEnabled ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                <span>{isVoiceEnabled ? 'Voix OFF' : 'Voix ON'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Nimba</h2>
                    <p className="text-blue-100 text-sm">
                      {language === 'fr' ? 'Assistant IA Conakry - Prêt à vous aider' : 'Conakry AI Assistant - Ready to help'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      {language === 'fr' ? 'Bienvenue !' : 'Welcome!'}
                    </h3>
                    <p className="text-gray-500">
                      {language === 'fr' 
                        ? 'Posez votre première question sur Conakry' 
                        : 'Ask your first question about Conakry'
                      }
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md p-4 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        {message.category && message.type === 'bot' && (
                          <p className="text-xs opacity-70 mt-2 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            {message.category}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder={language === 'fr' ? 'Posez votre question sur Conakry...' : 'Ask your question about Conakry...'}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={!currentMessage.trim()}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {language === 'fr' ? 'Envoyer' : 'Send'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Suggestions rapides */}
            {showSuggestions && messages.length <= 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                  {language === 'fr' ? 'Questions Populaires' : 'Popular Questions'}
                </h3>
                <div className="space-y-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Catégories de questions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {language === 'fr' ? 'Explorez par Thème' : 'Explore by Theme'}
              </h3>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center mr-3`}>
                        <category.icon className="h-4 w-4" />
                      </div>
                      <h4 className="font-medium text-gray-800">{category.title}</h4>
                    </div>
                    <div className="space-y-2">
                      {category.questions.slice(0, 2).map((question, qIndex) => (
                        <button
                          key={qIndex}
                          onClick={() => handleSuggestionClick(question)}
                          className="w-full text-left text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          • {question}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conseils */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {language === 'fr' ? 'Conseils d\'Utilisation' : 'Usage Tips'}
              </h3>
              <div className="space-y-4">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <tip.icon className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm">{tip.title}</h4>
                      <p className="text-gray-600 text-xs mt-1">{tip.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistiques */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                {language === 'fr' ? 'Nimba - Assistant IA' : 'Nimba - AI Assistant'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Base de connaissances</span>
                  <span className="font-semibold">10+ catégories</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Langues</span>
                  <span className="font-semibold">FR / EN</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Disponibilité</span>
                  <span className="font-semibold">24/7</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-500">
                <p className="text-blue-100 text-sm">
                  {language === 'fr' 
                    ? 'Développé avec ❤️ pour Conakry' 
                    : 'Developed with ❤️ for Conakry'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
