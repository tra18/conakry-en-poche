import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, MessageCircle, Globe, Volume2, VolumeX } from 'lucide-react';
import toast from 'react-hot-toast';

const AIAssistantContext = createContext();

export function useAIAssistant() {
  return useContext(AIAssistantContext);
}

export function AIAssistantProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Base de connaissances sur Conakry
  const knowledgeBase = {
    fr: {
      categories: {
        general: {
          name: "Informations Générales",
          responses: [
            "Conakry est la capitale de la Guinée, située sur la côte atlantique. C'est la plus grande ville du pays avec environ 2 millions d'habitants.",
            "La ville est divisée en 5 communes : Kaloum (centre-ville), Dixinn, Matam, Matoto et Ratoma.",
            "Conakry est le centre économique et politique de la Guinée, abritant le port principal et l'aéroport international."
          ]
        },
        transport: {
          name: "Transport",
          responses: [
            "Les taxis rouges sont le moyen de transport le plus populaire. Prix : 5000-15000 GNF selon la distance.",
            "L'aéroport international Gbessia se trouve à 15km du centre-ville.",
            "Des bus publics relient les différentes communes de Conakry.",
            "Le port autonome de Conakry est le principal port de commerce du pays."
          ]
        },
        tourisme: {
          name: "Tourisme",
          responses: [
            "Les sites incontournables : Musée national, Palais du peuple, Marché de Madina, Îles de Loos.",
            "Les plages populaires : Bel Air, Rogbané, et les îles de Loos accessibles en bateau.",
            "Le Jardin botanique de Conakry abrite une flore tropicale exceptionnelle.",
            "Le Centre culturel franco-guinéen propose des événements culturels réguliers."
          ]
        },
        gastronomie: {
          name: "Gastronomie",
          responses: [
            "Plats typiques : Riz au gras, Poulet Yassa, Mafé, Fou fou, Sauce graine.",
            "Marchés alimentaires : Marché de Madina (le plus grand), Marché de Matam.",
            "Restaurants recommandés : Restaurant Le Damier, La Paillote, Le Petit Bateau.",
            "Boissons locales : Jus de gingembre, Bissap, Dabileni (jus de tamarin)."
          ]
        },
        shopping: {
          name: "Shopping",
          responses: [
            "Marchés principaux : Madina (vêtements, artisanat), Matam (électronique), Marché Niger (alimentaire).",
            "Centres commerciaux : Palm Camayenne, Kipé Centre Commercial.",
            "Artisanat local : Masques, sculptures en bois, bijoux en or, tissus traditionnels.",
            "Horaires : Les marchés sont ouverts de 7h à 19h, fermés le dimanche pour certains."
          ]
        },
        sante: {
          name: "Santé",
          responses: [
            "Hôpitaux principaux : CHU de Donka, Hôpital Ignace Deen, Clinique Pasteur.",
            "Pharmacies : Réparties dans tous les quartiers, ouvertes généralement de 8h à 20h.",
            "Urgences : Appelez le 117 pour les urgences médicales.",
            "Vaccins recommandés : Fièvre jaune, Hépatite A et B, Typhoïde."
          ]
        },
        securite: {
          name: "Sécurité",
          responses: [
            "Conakry est généralement sûre, mais évitez de circuler seul la nuit dans certains quartiers.",
            "Gardez vos documents d'identité sur vous en permanence.",
            "Numéros d'urgence : Police 117, Pompiers 18.",
            "Évitez de montrer de l'argent ou des objets de valeur dans les lieux publics."
          ]
        },
        culture: {
          name: "Culture",
          responses: [
            "Langues parlées : Français (officiel), Sousou, Peul, Malinké, Kissi.",
            "Fêtes nationales : Fête de l'indépendance (2 octobre), Jour de la République (3 avril).",
            "Musique : Conakry est le berceau de la musique guinéenne moderne.",
            "Religions : Islam (majoritaire), Christianisme, Animisme."
          ]
        },
        economie: {
          name: "Économie",
          responses: [
            "Monnaie : Franc guinéen (GNF). 1 USD ≈ 8600 GNF (2024).",
            "Secteurs clés : Mines (bauxite), Agriculture, Pêche, Commerce.",
            "Banques principales : BICIGUI, Ecobank, UGB, Orabank.",
            "Heures de bureau : 8h-16h30 du lundi au vendredi."
          ]
        },
        education: {
          name: "Éducation",
          responses: [
            "Universités : Université Gamal Abdel Nasser, Université Général Lansana Conté.",
            "Écoles internationales : École française, American School of Conakry.",
            "Centres de formation : Institut Supérieur de Technologie, École Nationale d'Administration.",
            "Bibliothèques : Bibliothèque nationale, Centre culturel franco-guinéen."
          ]
        }
      },
      greetings: [
        "Bonjour ! Je suis Nimba, votre assistant virtuel pour Conakry. Comment puis-je vous aider aujourd'hui ?",
        "Salut ! Bienvenue sur Conakry en Poche. Je suis Nimba, votre guide intelligent de la capitale guinéenne. Que souhaitez-vous savoir ?",
        "Bonjour ! Je suis Nimba, votre assistant personnel pour Conakry. Avez-vous des questions sur notre belle ville ?",
        "Salut ! Je suis Nimba, l'assistant IA de Conakry en Poche. Je connais tous les secrets de la capitale guinéenne !"
      ],
      fallbacks: [
        "Je ne suis pas sûr de comprendre votre question. Pouvez-vous la reformuler ?",
        "Je n'ai pas d'informations précises sur ce sujet. Essayez de poser votre question différemment.",
        "Pardon, je n'ai pas la réponse à cette question. Voulez-vous que je vous aide avec autre chose ?"
      ]
    },
    en: {
      categories: {
        general: {
          name: "General Information",
          responses: [
            "Conakry is the capital of Guinea, located on the Atlantic coast. It's the largest city in the country with about 2 million inhabitants.",
            "The city is divided into 5 communes: Kaloum (downtown), Dixinn, Matam, Matoto and Ratoma.",
            "Conakry is the economic and political center of Guinea, housing the main port and international airport."
          ]
        },
        transport: {
          name: "Transportation",
          responses: [
            "Red taxis are the most popular means of transport. Price: 5000-15000 GNF depending on distance.",
            "Gbessia International Airport is located 15km from downtown.",
            "Public buses connect the different communes of Conakry.",
            "The Autonomous Port of Conakry is the country's main commercial port."
          ]
        },
        tourisme: {
          name: "Tourism",
          responses: [
            "Must-see sites: National Museum, People's Palace, Madina Market, Loos Islands.",
            "Popular beaches: Bel Air, Rogbané, and the Loos Islands accessible by boat.",
            "The Conakry Botanical Garden houses exceptional tropical flora.",
            "The Franco-Guinean Cultural Center offers regular cultural events."
          ]
        },
        gastronomie: {
          name: "Gastronomy",
          responses: [
            "Typical dishes: Rice with sauce, Chicken Yassa, Mafé, Fou fou, Graine sauce.",
            "Food markets: Madina Market (largest), Matam Market.",
            "Recommended restaurants: Restaurant Le Damier, La Paillote, Le Petit Bateau.",
            "Local drinks: Ginger juice, Bissap, Dabileni (tamarind juice)."
          ]
        },
        shopping: {
          name: "Shopping",
          responses: [
            "Main markets: Madina (clothing, crafts), Matam (electronics), Niger Market (food).",
            "Shopping centers: Palm Camayenne, Kipé Commercial Center.",
            "Local crafts: Masks, wood carvings, gold jewelry, traditional fabrics.",
            "Hours: Markets are open from 7am to 7pm, closed on Sundays for some."
          ]
        },
        sante: {
          name: "Health",
          responses: [
            "Main hospitals: CHU de Donka, Ignace Deen Hospital, Pasteur Clinic.",
            "Pharmacies: Distributed in all neighborhoods, generally open from 8am to 8pm.",
            "Emergencies: Call 117 for medical emergencies.",
            "Recommended vaccines: Yellow fever, Hepatitis A and B, Typhoid."
          ]
        },
        securite: {
          name: "Security",
          responses: [
            "Conakry is generally safe, but avoid walking alone at night in some neighborhoods.",
            "Keep your identity documents with you at all times.",
            "Emergency numbers: Police 117, Firefighters 18.",
            "Avoid showing money or valuables in public places."
          ]
        },
        culture: {
          name: "Culture",
          responses: [
            "Spoken languages: French (official), Susu, Fulani, Mandinka, Kissi.",
            "National holidays: Independence Day (October 2), Republic Day (April 3).",
            "Music: Conakry is the cradle of modern Guinean music.",
            "Religions: Islam (majority), Christianity, Animism."
          ]
        },
        economie: {
          name: "Economy",
          responses: [
            "Currency: Guinean Franc (GNF). 1 USD ≈ 8600 GNF (2024).",
            "Key sectors: Mining (bauxite), Agriculture, Fishing, Trade.",
            "Main banks: BICIGUI, Ecobank, UGB, Orabank.",
            "Office hours: 8am-4:30pm Monday to Friday."
          ]
        },
        education: {
          name: "Education",
          responses: [
            "Universities: Gamal Abdel Nasser University, General Lansana Conté University.",
            "International schools: French School, American School of Conakry.",
            "Training centers: Higher Institute of Technology, National School of Administration.",
            "Libraries: National Library, Franco-Guinean Cultural Center."
          ]
        }
      },
      greetings: [
        "Hello! I'm Nimba, your virtual assistant for Conakry. How can I help you today?",
        "Hi! Welcome to Conakry en Poche. I'm Nimba, your intelligent guide to the Guinean capital. What would you like to know?",
        "Hello! I'm Nimba, your personal assistant for Conakry. Do you have any questions about our beautiful city?",
        "Hi! I'm Nimba, the AI assistant of Conakry en Poche. I know all the secrets of the Guinean capital!"
      ],
      fallbacks: [
        "I'm not sure I understand your question. Could you rephrase it?",
        "I don't have specific information on this topic. Try asking your question differently.",
        "Sorry, I don't have the answer to this question. Would you like me to help you with something else?"
      ]
    }
  };

  // Mots-clés pour détecter les catégories
  const keywords = {
    fr: {
      transport: ['taxi', 'transport', 'bus', 'aéroport', 'port', 'déplacement', 'voyage'],
      tourisme: ['tourisme', 'visite', 'plage', 'musée', 'monument', 'site', 'loos', 'bel air'],
      gastronomie: ['restaurant', 'manger', 'cuisine', 'plat', 'boisson', 'marché', 'aliment'],
      shopping: ['magasin', 'marché', 'achat', 'shopping', 'artisanat', 'souvenir'],
      sante: ['hôpital', 'médecin', 'pharmacie', 'santé', 'urgences', 'maladie'],
      securite: ['sécurité', 'danger', 'police', 'urgence', 'sûr', 'risque'],
      culture: ['culture', 'langue', 'religion', 'musique', 'tradition', 'fête'],
      economie: ['argent', 'banque', 'prix', 'coût', 'monnaie', 'échange'],
      education: ['école', 'université', 'étudier', 'formation', 'bibliothèque']
    },
    en: {
      transport: ['taxi', 'transport', 'bus', 'airport', 'port', 'travel', 'journey'],
      tourisme: ['tourism', 'visit', 'beach', 'museum', 'monument', 'site', 'loos', 'bel air'],
      gastronomie: ['restaurant', 'eat', 'food', 'dish', 'drink', 'market', 'meal'],
      shopping: ['shop', 'market', 'buy', 'shopping', 'craft', 'souvenir'],
      sante: ['hospital', 'doctor', 'pharmacy', 'health', 'emergency', 'sick'],
      securite: ['security', 'danger', 'police', 'emergency', 'safe', 'risk'],
      culture: ['culture', 'language', 'religion', 'music', 'tradition', 'festival'],
      economie: ['money', 'bank', 'price', 'cost', 'currency', 'exchange'],
      education: ['school', 'university', 'study', 'training', 'library']
    }
  };

  // Détecter la langue de la question
  const detectLanguage = (text) => {
    const englishWords = ['hello', 'hi', 'how', 'what', 'where', 'when', 'why', 'the', 'and', 'or'];
    const frenchWords = ['bonjour', 'salut', 'comment', 'que', 'quoi', 'où', 'quand', 'pourquoi', 'le', 'la', 'et', 'ou'];
    
    const words = text.toLowerCase().split(' ');
    const englishCount = words.filter(word => englishWords.includes(word)).length;
    const frenchCount = words.filter(word => frenchWords.includes(word)).length;
    
    return englishCount > frenchCount ? 'en' : 'fr';
  };

  // Détecter la catégorie de la question
  const detectCategory = (text, lang) => {
    const textLower = text.toLowerCase();
    const categoryKeywords = keywords[lang] || keywords.fr;
    
    for (const [category, words] of Object.entries(categoryKeywords)) {
      if (words.some(word => textLower.includes(word))) {
        return category;
      }
    }
    
    return 'general';
  };

  // Générer une réponse intelligente
  const generateResponse = (question, detectedLang = null) => {
    const lang = detectedLang || detectLanguage(question);
    const category = detectCategory(question, lang);
    
    const categoryData = knowledgeBase[lang]?.categories[category];
    
    if (categoryData && categoryData.responses.length > 0) {
      // Choisir une réponse aléatoire de la catégorie
      const randomResponse = categoryData.responses[
        Math.floor(Math.random() * categoryData.responses.length)
      ];
      
      return {
        text: randomResponse,
        category: categoryData.name,
        language: lang
      };
    }
    
    // Réponse de fallback
    const fallbacks = knowledgeBase[lang]?.fallbacks || knowledgeBase.fr.fallbacks;
    const fallbackResponse = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    
    return {
      text: fallbackResponse,
      category: 'Général',
      language: lang
    };
  };

  // Envoyer un message
  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simuler le délai de traitement
    setTimeout(() => {
      const response = generateResponse(message);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: response.text,
        category: response.category,
        language: response.language,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Parler la réponse si la voix est activée
      if (isVoiceEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response.text);
        utterance.lang = response.language === 'fr' ? 'fr-FR' : 'en-US';
        speechSynthesis.speak(utterance);
      }
    }, 1500);
  };

  // Afficher le message de bienvenue professionnel
  const showWelcome = () => {
    if (hasShownWelcome) return;
    
    const welcomeMessage = language === 'fr' 
      ? "🇬🇳 **Bonjour ! Je suis Nimba, votre assistant IA professionnel pour Conakry.**\n\nJe connais parfaitement la capitale guinéenne et peux vous aider avec :\n\n• 🏨 **Hôtels et hébergements**\n• 🍽️ **Restaurants et gastronomie**\n• 🚕 **Transport et déplacements**\n• 🏛️ **Administrations et services**\n• 🎭 **Loisirs et culture**\n• 📍 **Adresses et localisations**\n\nComment puis-je vous assister aujourd'hui ?"
      : "🇬🇳 **Hello! I'm Nimba, your professional AI assistant for Conakry.**\n\nI have comprehensive knowledge of the Guinean capital and can help you with:\n\n• 🏨 **Hotels and accommodations**\n• 🍽️ **Restaurants and gastronomy**\n• 🚕 **Transportation and travel**\n• 🏛️ **Administrations and services**\n• 🎭 **Entertainment and culture**\n• 📍 **Addresses and locations**\n\nHow can I assist you today?";
    
    const welcomeBotMessage = {
      id: Date.now(),
      type: 'bot',
      text: welcomeMessage,
      category: 'Bienvenue',
      language: language,
      timestamp: new Date(),
      isWelcome: true
    };

    setMessages([welcomeBotMessage]);
    setHasShownWelcome(true);
  };

  // Ouvrir l'assistant
  const openAssistant = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(showWelcome, 500);
    }
  };

  // Fermer l'assistant
  const closeAssistant = () => {
    setIsOpen(false);
  };

  // Changer de langue
  const toggleLanguage = () => {
    const newLang = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
    toast.success(`Langue changée en ${newLang === 'fr' ? 'Français' : 'English'}`);
  };

  // Basculer la voix
  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    toast.success(`Voix ${!isVoiceEnabled ? 'activée' : 'désactivée'}`);
  };

  // Afficher l'info-bulle automatiquement au lancement
  useEffect(() => {
    if (!hasShownWelcome) {
      // Afficher l'info-bulle après 2 secondes
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 2000);

      // Masquer l'info-bulle après 5 secondes
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);

      return () => {
        clearTimeout(tooltipTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [hasShownWelcome]);

  // Suggestions rapides
  const quickSuggestions = {
    fr: [
      "Où manger à Conakry ?",
      "Comment se déplacer ?",
      "Quels sont les sites à visiter ?",
      "Où faire du shopping ?",
      "Informations sur la sécurité"
    ],
    en: [
      "Where to eat in Conakry?",
      "How to get around?",
      "What sites to visit?",
      "Where to shop?",
      "Security information"
    ]
  };

  const value = {
    isOpen,
    messages,
    currentMessage,
    setCurrentMessage,
    isTyping,
    language,
    isVoiceEnabled,
    sendMessage,
    openAssistant,
    closeAssistant,
    toggleLanguage,
    toggleVoice,
    quickSuggestions: quickSuggestions[language],
    showTooltip,
    setShowTooltip
  };

  return (
    <AIAssistantContext.Provider value={value}>
      {children}
      <AIAssistantWidget />
    </AIAssistantContext.Provider>
  );
}

// Composant Widget de l'assistant
function AIAssistantWidget() {
  const {
    isOpen,
    messages,
    currentMessage,
    setCurrentMessage,
    isTyping,
    language,
    isVoiceEnabled,
    sendMessage,
    openAssistant,
    closeAssistant,
    toggleLanguage,
    toggleVoice,
    quickSuggestions,
    showTooltip,
    setShowTooltip
  } = useAIAssistant();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(currentMessage);
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={openAssistant}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-50 flex items-center justify-center"
        >
          <Bot className="h-8 w-8" />
        </motion.button>
      )}

      {/* Widget de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-96 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Nimba</h3>
                  <p className="text-xs opacity-90">Assistant IA Conakry</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleVoice}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  title={isVoiceEnabled ? 'Désactiver la voix' : 'Activer la voix'}
                >
                  {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
                <button
                  onClick={toggleLanguage}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  title="Changer de langue"
                >
                  <Globe className="h-4 w-4" />
                </button>
                <button
                  onClick={closeAssistant}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    {message.category && message.type === 'bot' && (
                      <p className="text-xs opacity-70 mt-1">
                        {message.category}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggestions rapides */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Suggestions rapides :</p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder={language === 'fr' ? 'Posez votre question...' : 'Ask your question...'}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  disabled={!currentMessage.trim()}
                  className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info-bulle professionnelle */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-20 right-4 z-50 max-w-sm"
        >
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 relative">
            {/* Flèche pointant vers le bouton */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm mb-1">
                  🇬🇳 Assistant Nimba
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {language === 'fr' 
                    ? "Votre guide IA professionnel pour Conakry. Cliquez pour commencer !"
                    : "Your professional AI guide for Conakry. Click to start!"
                  }
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setShowTooltip(false);
                      openAssistant();
                    }}
                    className="bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700 transition-colors"
                  >
                    {language === 'fr' ? 'Commencer' : 'Start'}
                  </button>
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="text-gray-500 text-xs px-3 py-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {language === 'fr' ? 'Plus tard' : 'Later'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default AIAssistantWidget;
