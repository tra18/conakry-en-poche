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

  // Base de connaissances sur Conakry (FR/EN)
  const knowledgeBase = {
    fr: {
      categories: {
        general: {
          name: 'Informations générales',
          responses: [
            'Conakry est la capitale de la Guinée et compte plus de 2 millions d’habitants répartis sur 5 communes : Kaloum, Dixinn, Matam, Matoto et Ratoma.',
            'Le climat est tropical avec une saison sèche d’octobre à mai et une saison des pluies de juin à septembre.',
            'Les codes utiles : indicatif téléphonique +224, tension électrique 220V, circulation à droite.',
            'Le port autonome et l’aéroport international Ahmed Sékou Touré sont les portes d’entrée principales.'
          ]
        },
        transport: {
          name: 'Transports et déplacements',
          responses: [
            'Les taxis rouges partagés sont le moyen le plus courant. Prévoir 5 000 à 20 000 GNF selon la distance.',
            'Pour se déplacer rapidement, utilisez les applications locales « Gozem » ou « Yango » (motos et voitures).',
            'L’aéroport international se situe à Gbessia (commune de Matoto), comptez 30 à 45 minutes vers Kaloum selon le trafic.',
            'Des bateaux relient le port de Boulbinet aux îles de Loos plusieurs fois par jour.'
          ]
        },
        tourism: {
          name: 'Tourisme et découvertes',
          responses: [
            'Incontournables : îles de Loos, plage de Bel-Air, Musée national, Palais du peuple, marché de Madina.',
            'Pour une escapade nature : les cascades de la Soumba et le massif du Fouta Djalon (5h de route).',
            'Le Centre culturel franco-guinéen propose concerts, expositions et projections toute l’année.',
            'Pour les couchers de soleil, rendez-vous sur la corniche de Camayenne ou à la plage de Rogbané.'
          ]
        },
        gastronomy: {
          name: 'Gastronomie',
          responses: [
            'Spécialités à goûter : riz au gras, soupe kandia, poulet DG, poisson braisé, brochettes de cœur.',
            'Les marchés de Madina et de Bonfi regorgent de poissons frais, fruits tropicaux et épices.',
            'Restaurants recommandés : Le Damier (Kaloum), La Paillote (Corniche), La Porte du Soleil (Ratoma).',
            'Boissons locales : bissap, jus de gingembre, palm wine, smoothies de fruits tropicaux.'
          ]
        },
        shopping: {
          name: 'Shopping & artisanat',
          responses: [
            'Le marché de Madina est le plus vaste pour les tissus, wax, perles et objets artisanaux.',
            'Pour des produits haut de gamme : centre commercial Prima Center à Kipé ou esplanade de la Paillote.',
            'Pensez à négocier, c’est une pratique courante ; commencez autour de 60 % du prix proposé.',
            'Articles typiques : masques baga, djembés, panier en raphia, bijoux en or de Siguiri.'
          ]
        },
        health: {
          name: 'Santé & urgences',
          responses: [
            'Hôpitaux de référence : CHU de Donka (Kaloum), Hôpital Ignace Deen, Clinique Pasteur.',
            'Numéros utiles : SAMU 119, Police 117, Pompiers 118.',
            'Prévoyez une assurance santé couvrant l’évacuation médicale vers Dakar ou Casablanca.',
            'Apportez une trousse avec antipaludéens, pansements, gels hydroalcooliques et répulsif anti-moustiques.'
          ]
        },
        safety: {
          name: 'Sécurité',
          responses: [
            'Évitez de circuler seul tard le soir dans les zones peu éclairées et préférez les taxis connus.',
            'Gardez une photocopie de votre passeport et les originaux dans un endroit sécurisé.',
            'Soyez vigilants dans les embouteillages : gardez vitres fermées et portes verrouillées.',
            'Les manifestations peuvent survenir : suivez l’actualité locale et éloignez-vous des regroupements.'
          ]
        },
        culture: {
          name: 'Culture & traditions',
          responses: [
            'Langues nationales : soussou autour de Conakry, peul en Moyenne-Guinée, malinké en Haute-Guinée.',
            'La musique mandingue et les ballets africains sont omniprésents lors des cérémonies.',
            'Respectez les coutumes : salutations chaleureuses, main droite pour donner/recevoir, tenue décente.',
            'Calendrier : concerts urbains à Taouyah, spectacles au Centre culturel franco-guinéen, matchs au Stade GLC.'
          ]
        },
        economy: {
          name: 'Économie & affaires',
          responses: [
            'Monnaie : Franc guinéen (GNF). Retraits possibles aux banques BICIGUI, Ecobank, UBA.',
            'Secteurs porteurs : mines (bauxite), télécoms, énergie solaire, agro-transformation.',
            'Formalités : prévoir un Registre du Commerce et du Crédit Mobilier (RCCM) et s’inscrire au guichet unique de l’APIP.',
            'Espèces largement utilisées ; les cartes Visa fonctionnent dans les hôtels et supermarchés principaux.'
          ]
        },
        education: {
          name: 'Éducation',
          responses: [
            'Établissements supérieurs : Université Gamal Abdel Nasser (sciences), Université Sonfonia (économie), ENAM (administration).',
            'Écoles internationales : Lycée français Albert Camus, American International School, École Bilingue de Conakry.',
            'Centres linguistiques : Institut français, British Council, centres privés à Kipé et Ratoma.',
            'Pour les jeunes enfants : nombreuses crèches bilingues à Kipé, Lambanyi et Taouyah.'
          ]
        },
        housing: {
          name: 'Logement & vie pratique',
          responses: [
            'Quartiers résidentiels prisés : Kaporo, Nongo, Lambanyi pour les villas et appartements modernes.',
            'Pour une colocation abordable, explorez Ratoma et Kobayah (accès aux universités).',
            'Contrats de location : prévoir 3 mois de caution + 1 mois frais d’agence, vérifier inclusions eau/électricité.',
            'Électricité : coupes fréquentes, privilégiez les logements avec groupe électrogène ou panneaux solaires.'
          ]
        },
        administration: {
          name: 'Démarches administratives',
          responses: [
            'Visa touristique délivré par les ambassades de Guinée ou en ligne via guineevisa.com, durée 30 à 90 jours.',
            'Pour un long séjour : carte de résidence délivrée à la Direction Centrale de la Police (quartier Coléah).',
            'Documents utiles : passeport valable 6 mois, carnet de vaccination, lettre d’invitation si nécessaire.',
            'L’APIP (Agence de Promotion des Investissements Privés) propose un guichet unique pour créer une entreprise en 72h.'
          ]
        },
        weather: {
          name: 'Climat & météo',
          responses: [
            'Saison sèche : octobre à mai, températures 25‑32 °C, idéale pour les excursions.',
            'Saison des pluies : juin à septembre, pluies abondantes et routes parfois inondées ; prévoyez des trajets plus longs.',
            'Humidité élevée toute l’année, privilégiez des vêtements légers en coton et hydratez-vous.',
            'Consultez la météo locale ou des apps comme Windy/Open-Meteo avant les déplacements interurbains.'
          ]
        }
      },
      greetings: [
        'Bonjour ! Je suis Nimba, votre assistant IA pour Conakry. Comment puis-je vous aider aujourd’hui ?',
        'Salut ! Je suis Nimba, guide virtuel de Conakry en Poche. Besoin d’un itinéraire, d’un resto ou d’une astuce locale ?',
        'Bienvenue sur Conakry en Poche ! Je connais les transports, les administrations, les sorties et plus encore.',
        'Hello ! Ici Nimba. Vous pouvez me parler en français ou en anglais, je réponds aux deux.'
      ],
      fallbacks: [
        'Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ou préciser votre demande ?',
        'Je n’ai pas encore cette information en base. Voulez-vous que je vous oriente vers une catégorie générale ?',
        'Désolé, je n’ai pas la réponse exacte. Essayez de poser votre question différemment.'
      ]
    },
    en: {
      categories: {
        general: {
          name: 'General information',
          responses: [
            'Conakry is Guinea’s capital with over 2 million residents spread across Kaloum, Dixinn, Matam, Matoto and Ratoma.',
            'Tropical climate: dry season (Oct‑May) / rainy season (Jun‑Sep). Average temperatures 25‑32 °C.',
            'Useful codes: country dial +224, power 220 V, right-hand traffic.',
            'Main gateways are the Autonomous Port of Conakry and Ahmed Sékou Touré International Airport.'
          ]
        },
        transport: {
          name: 'Transportation',
          responses: [
            'Red shared taxis are the most common option. Budget 5,000‑20,000 GNF depending on distance.',
            'Use local ride-hailing apps like Gozem or Yango for safer rides (motorbikes & cars).',
            'Airport transfers to downtown take 30‑45 minutes depending on traffic; negotiate fares before boarding.',
            'Boats depart daily from Boulbinet pier to the Loos Islands (20‑30 min crossing).'
          ]
        },
        tourism: {
          name: 'Tourism & sightseeing',
          responses: [
            'Must-see spots: Loos Islands, Bel-Air beach, National Museum, People’s Palace, Madina Market.',
            'Nature escapes: Soumba waterfalls, Fouta Djalon highlands (5h road trip).',
            'The Franco-Guinean Cultural Center hosts concerts, exhibitions and film screenings all year.',
            'Best sunset spots: Camayenne corniche, Rogbané beach, panoramic bars in Kipé.'
          ]
        },
        gastronomy: {
          name: 'Food & gastronomy',
          responses: [
            'Signature dishes: riz au gras, soup kandia, chicken DG, grilled fish, peanut stew.',
            'Madina and Bonfi markets are perfect for fresh seafood, spices and tropical fruits.',
            'Recommended restaurants: Le Damier (Kaloum), La Paillote (seafront), La Porte du Soleil (Ratoma).',
            'Try local drinks: ginger juice, hibiscus (bissap), palm wine, fresh tropical smoothies.'
          ]
        },
        shopping: {
          name: 'Shopping & crafts',
          responses: [
            'Madina market is the go-to for wax fabrics, jewelry and handicrafts; go early to avoid crowds.',
            'Modern malls: Prima Center (Kipé), Casino supermarket, Taouyah plaza.',
            'Always negotiate politely; starting at 60% of the price is common practice.',
            'Typical souvenirs: Baga masks, djembe drums, gold jewelry from Siguiri, raffia baskets.'
          ]
        },
        health: {
          name: 'Health & emergencies',
          responses: [
            'Reference facilities: Donka Teaching Hospital, Ignace Deen Hospital, Clinique Pasteur.',
            'Emergency numbers: SAMU 119, Police 117, Fire brigade 118.',
            'Make sure your travel insurance covers medical evacuation to Dakar or Casablanca.',
            'Pack anti-malarials, rehydration salts, mosquito repellent and a basic first-aid kit.'
          ]
        },
        safety: {
          name: 'Safety tips',
          responses: [
            'Avoid isolated areas late at night and prefer trusted taxis or ride-hailing apps.',
            'Keep photocopies of passport/visa and store originals safely.',
            'During heavy traffic jams keep windows up and doors locked.',
            'Monitor local news: demonstrations can happen; steer clear of large gatherings.'
          ]
        },
        culture: {
          name: 'Culture & customs',
          responses: [
            'Local languages: Susu in Conakry, Peul/Fula in Middle Guinea, Malinké in Upper Guinea.',
            'Music and dance are central; you’ll often see live performances at weddings and community events.',
            'Dress modestly when visiting administrative offices or religious sites.',
            'Popular yearly events: Jazz in Ratoma, Independence Day parade, football matches at GLC Stadium.'
          ]
        },
        economy: {
          name: 'Economy & business',
          responses: [
            'Currency: Guinean Franc (GNF). ATMs available at BICIGUI, Ecobank, UBA, Orabank branches.',
            'High-potential sectors: bauxite mining, renewable energy, fintech, agro-processing.',
            'Business formalities handled at APIP (one-stop shop) in Kaloum within 72 hours.',
            'Cash is king; Visa cards accepted in major hotels, supermarkets and airlines only.'
          ]
        },
        education: {
          name: 'Education',
          responses: [
            'Higher education: Gamal Abdel Nasser University (science), Sonfonia University (economics), ENAM (public administration).',
            'International schools: Lycée Français Albert Camus, American International School, bilingual nurseries in Kipé/Lambanyi.',
            'Language centers: Institut Français, British Council, private academies in Taouyah and Koloma.',
            'For research, visit the National Library or campus libraries in Donka and Sonfonia.'
          ]
        },
        housing: {
          name: 'Housing & living',
          responses: [
            'Expat-friendly neighborhoods: Kaporo, Nongo, Lambanyi, Kipé (modern villas, sea view).',
            'For shared housing on a budget, check listings in Ratoma, Kobaya and Sonfonia.',
            'Standard leases require 3 months deposit + 1 month agency fees; clarify what utilities are included.',
            'Power outages occur frequently; choose accommodations with backup generators or solar panels.'
          ]
        },
        administration: {
          name: 'Administrative support',
          responses: [
            'Apply for tourist e-visas via guineevisa.com, processing within 3‑5 working days.',
            'Residence cards are issued by the Central Police HQ in Coléah; bring passport, photos, proof of address.',
            'APIP in Kaloum handles company creation, tax ID and social registration in a single visit.',
            'Keep digital copies of documents (passport, visa, residence card) in secure cloud storage.'
          ]
        },
        weather: {
          name: 'Weather & seasons',
          responses: [
            'Dry season (Nov‑May) offers sunny skies and cooler evenings—ideal for beach trips and upcountry travel.',
            'Rainy season (Jun‑Oct) brings heavy showers, especially in July/August; plan extra time for traffic.',
            'Humidity stays high year-round, so hydrate often and wear breathable fabrics.',
            'Check local forecasts (Windy, Open-Meteo) before intercity travel or boat excursions.'
          ]
        }
      },
      greetings: [
        'Hello! I’m Nimba, your bilingual AI assistant for Conakry. Feel free to ask me anything.',
        'Hi there! Need a restaurant, a taxi tip or administrative advice? Nimba is here to help.',
        'Welcome to Conakry en Poche! I speak English and French—just type your question.',
        'Hey! I know the city’s best beaches, hospitals, offices and shortcuts. What are you looking for?'
      ],
      fallbacks: [
        'I’m not sure I got that. Could you rephrase or add a few details?',
        'I don’t have that info yet, but I can guide you to a general category. Want to try?',
        'Sorry, I can’t answer this one. Ask me something about transport, food, safety or daily life!'
      ]
    }
  };

  // Mots-clés pour détecter les catégories (mêmes clés que knowledgeBase)
  const keywords = {
    fr: {
      transport: ['taxi', 'transport', 'bus', 'aéroport', 'port', 'déplacement', 'trajet', 'voyage'],
      tourism: ['tourisme', 'visite', 'plage', 'musée', 'monument', 'site', 'loos', 'bel air', 'excursion'],
      gastronomy: ['restaurant', 'manger', 'cuisine', 'plat', 'boisson', 'marché', 'aliment', 'bar'],
      shopping: ['magasin', 'marché', 'achat', 'shopping', 'artisanat', 'souvenir', 'boutique'],
      health: ['hôpital', 'médecin', 'pharmacie', 'santé', 'urgence', 'vaccin', 'clinique'],
      safety: ['sécurité', 'danger', 'police', 'urgence', 'sûr', 'risque', 'manifestation'],
      culture: ['culture', 'langue', 'religion', 'musique', 'tradition', 'festival', 'coutume'],
      economy: ['argent', 'banque', 'prix', 'coût', 'monnaie', 'change', 'investissement', 'entreprise'],
      education: ['école', 'université', 'études', 'formation', 'bibliothèque', 'cours'],
      housing: ['logement', 'appartement', 'villa', 'colocation', 'quartier', 'loyer'],
      administration: ['visa', 'résidence', 'passeport', 'démarche', 'document', 'ambassade', 'rccm'],
      weather: ['météo', 'pluie', 'saison', 'chaleur', 'climat', 'humidité']
    },
    en: {
      transport: ['taxi', 'transport', 'bus', 'airport', 'port', 'ride', 'journey', 'traffic'],
      tourism: ['tourism', 'visit', 'beach', 'museum', 'monument', 'site', 'loos', 'trip'],
      gastronomy: ['restaurant', 'eat', 'food', 'dish', 'drink', 'market', 'bar', 'meal'],
      shopping: ['shop', 'market', 'buy', 'shopping', 'craft', 'souvenir', 'mall'],
      health: ['hospital', 'doctor', 'clinic', 'pharmacy', 'health', 'emergency', 'vaccine'],
      safety: ['safety', 'security', 'danger', 'police', 'emergency', 'protest', 'risk'],
      culture: ['culture', 'language', 'religion', 'music', 'tradition', 'festival', 'custom'],
      economy: ['money', 'bank', 'price', 'cost', 'currency', 'exchange', 'business', 'investment'],
      education: ['school', 'university', 'study', 'training', 'library', 'course'],
      housing: ['housing', 'apartment', 'villa', 'rent', 'neighborhood', 'lease'],
      administration: ['visa', 'residence', 'passport', 'paperwork', 'document', 'embassy', 'registration'],
      weather: ['weather', 'rain', 'season', 'heat', 'humidity', 'forecast', 'climate']
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
    const defaultCategoryName =
      knowledgeBase[lang]?.categories?.general?.name ||
      knowledgeBase.fr.categories.general.name;
    const fallbackResponse = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    
    return {
      text: fallbackResponse,
      category: defaultCategoryName,
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
      "Quels quartiers pour se loger ?",
      "Comment obtenir un visa de séjour ?",
      "Où manger du bon poisson ?",
      "Quelles plages recommandes-tu ?",
      "Comment se déplacer depuis l'aéroport ?",
      "Quels numéros appeler en cas d'urgence ?"
    ],
    en: [
      "Best neighborhoods to live in?",
      "How to get a residence visa?",
      "Where to eat fresh seafood?",
      "Which beaches should I visit?",
      "How to go from airport to downtown?",
      "Emergency numbers in Conakry?"
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
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            width: '4rem',
            height: '4rem',
            background: 'linear-gradient(180deg, #CE1126 0%, #CE1126 33.33%, #FCD116 33.33%, #FCD116 66.66%, #009639 66.66%, #009639 100%)',
            color: 'white',
            borderRadius: '50%',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          className="flex items-center justify-center"
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
