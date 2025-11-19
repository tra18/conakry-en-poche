const vivreContent = {
  fr: {
    hero: {
      title: '🇬🇳 Vivre en Guinée',
      subtitle: 'Découvrez tout ce qu’il faut savoir pour vous installer sereinement à Conakry et dans le pays.'
    },
    sectionIntro: 'Informations essentielles pour bien vivre en Guinée',
    recommendedBusinessesTitle: 'Entreprises Recommandées',
    recommendedBusinessesCta: 'Voir toutes les entreprises',
    quickGuide: {
      title: 'Guide Rapide',
      items: [
        { icon: '🏛️', text: 'Ambassades', link: '/category/administration' },
        { icon: '🏥', text: 'Hôpitaux d’urgence', link: '/category/hopitaux' },
        { icon: '🏦', text: 'Banques et change', link: '/category/banques' },
        { icon: '🚌', text: 'Transport public', link: '/category/transport' },
        { icon: '🍽️', text: 'Restaurants', link: '/category/restaurants' }
      ]
    },
    usefulNumbers: {
      title: 'Numéros Utiles',
      items: [
        { label: '🚨 Urgences', number: '117', color: '#dc2626' },
        { label: '🚒 Pompiers', number: '118', color: '#dc2626' },
        { label: '🏥 SAMU', number: '119', color: '#dc2626' },
        { label: '📱 Orange', number: '+224 6xx', color: '#f97316' },
        { label: '📱 MTN', number: '+224 6xx', color: '#f97316' }
      ]
    },
    practicalTips: {
      title: 'Conseils Pratiques',
      tips: [
        'Respecter les coutumes locales',
        'Apprendre quelques mots en français',
        'Avoir toujours de la monnaie',
        'Se renseigner sur les horaires',
        'Garder ses documents sur soi',
        'Être patient et flexible'
      ]
    },
    cta: {
      title: 'Explorez Conakry',
      description: 'Découvrez les meilleures adresses de la capitale',
      button: 'Voir les catégories'
    },
    sections: [
      {
        id: 'culture',
        name: 'Culture',
        short: 'Culture & Traditions',
        icon: '🎭',
        color: '#8b5cf6',
        description: 'Découvrez la richesse culturelle et les traditions de la Guinée',
        businessCategories: ['loisirs'],
        content: [
          {
            title: 'Fêtes et Célébrations',
            icon: '🎉',
            items: [
              { text: "Fête de l'Indépendance (2 octobre)", highlight: true },
              { text: 'Fête du Travail (1er mai)' },
              { text: 'Ramadan et Tabaski (dates variables)' },
              { text: 'Noël et Nouvel An' },
              { text: 'Festivals culturels régionaux' }
            ]
          },
          {
            title: 'Arts et Artisanat',
            icon: '🎨',
            items: [
              { text: 'Musique traditionnelle (djembé, balafon)' },
              { text: 'Danse et théâtre' },
              { text: 'Artisanat (poterie, tissage, sculpture)' },
              { text: 'Littérature guinéenne' },
              { text: 'Cinéma et médias' }
            ]
          },
          {
            title: 'Vie Sociale',
            icon: '👥',
            items: [
              { text: 'Importance de la famille élargie' },
              { text: 'Respect des aînés' },
              { text: 'Solidarité communautaire' },
              { text: 'Hospitalité traditionnelle' },
              { text: 'Cérémonies de mariage et naissance' }
            ]
          }
        ]
      },
      {
        id: 'langues',
        name: 'Langues',
        short: 'Langues parlées',
        icon: '🗣️',
        color: '#3b82f6',
        description: 'Le français et les langues nationales guinéennes',
        businessCategories: ['ecoles'],
        content: [
          {
            title: 'Langues Officielles',
            icon: '📚',
            items: [
              { text: 'Français (langue officielle)', highlight: true },
              { text: 'Soussou (région de Conakry)' },
              { text: 'Malinké (Haute-Guinée)' },
              { text: 'Pular (Moyenne-Guinée)' },
              { text: 'Kissi, Toma, Guerzé (Forêt)' }
            ]
          },
          {
            title: 'Apprendre le Français',
            icon: '🎓',
            items: [
              { text: 'Cours de français pour débutants' },
              { text: 'Écoles de langues à Conakry' },
              { text: 'Centres culturels français' },
              { text: "Applications mobiles d'apprentissage" },
              { text: 'Conversation avec les locaux' }
            ]
          },
          {
            title: 'Expressions Utiles',
            icon: '💬',
            items: [
              { text: 'Bonjour : « Bonjour » ou « Salam »', highlight: true },
              { text: 'Merci : « Merci » ou « Baraka »' },
              { text: 'Comment allez-vous ? : « Comment ça va ? »' },
              { text: 'Au revoir : « Au revoir » ou « Allah ka baraka »' },
              { text: 'Excusez-moi : « Excusez-moi »' }
            ]
          }
        ]
      },
      {
        id: 'cuisine',
        name: 'Cuisine',
        short: 'Gastronomie',
        icon: '🍽️',
        color: '#ef4444',
        description: 'Savourez les délices de la gastronomie guinéenne',
        businessCategories: ['restaurants'],
        content: [
          {
            title: 'Plats Traditionnels',
            icon: '🍛',
            items: [
              { text: 'Riz au gras (riz avec sauce)', highlight: true },
              { text: 'Fouti (couscous de manioc)' },
              { text: 'Sauce arachide' },
              { text: 'Poulet Yassa' },
              { text: 'Poisson grillé' },
              { text: 'Ragoût de légumes' }
            ]
          },
          {
            title: 'Ingrédients Locaux',
            icon: '🥜',
            items: [
              { text: 'Riz (aliment de base)' },
              { text: 'Manioc et igname' },
              { text: 'Arachides et huile de palme' },
              { text: 'Légumes frais du marché' },
              { text: 'Épices et condiments' },
              { text: 'Fruits tropicaux' }
            ]
          },
          {
            title: 'Où Manger',
            icon: '🍴',
            items: [
              { text: 'Marchés locaux (cuisine de rue)' },
              { text: 'Restaurants traditionnels' },
              { text: 'Maquis (petits restaurants)' },
              { text: 'Hôtels et restaurants internationaux' },
              { text: 'Cuisine familiale (invitations)' }
            ]
          }
        ]
      },
      {
        id: 'transport',
        name: 'Transport',
        short: 'Déplacements',
        icon: '🚌',
        color: '#f59e0b',
        description: 'Se déplacer efficacement à Conakry et en Guinée',
        businessCategories: ['transport'],
        content: [
          {
            title: 'Transport Urbain',
            icon: '🚕',
            items: [
              { text: 'Taxis collectifs (taxi-brousse)', highlight: true },
              { text: 'Motos-taxis (zemidjan)' },
              { text: 'Bus urbains (limités)' },
              { text: 'Taxis privés' },
              { text: 'Location de véhicules' }
            ]
          },
          {
            title: 'Transport Interurbain',
            icon: '🚌',
            items: [
              { text: 'Bus interurbains' },
              { text: 'Taxis-brousse longue distance' },
              { text: 'Transport aérien domestique' },
              { text: 'Trains (ligne Conakry-Kankan)' },
              { text: 'Bateaux (fleuves et côtes)' }
            ]
          },
          {
            title: 'Conseils Pratiques',
            icon: '💡',
            items: [
              { text: 'Négocier les prix avant de monter', highlight: true },
              { text: 'Avoir de la monnaie pour les transports' },
              { text: 'Éviter les heures de pointe' },
              { text: 'Respecter les règles de sécurité' },
              { text: 'Utiliser les applications de transport' }
            ]
          }
        ]
      },
      {
        id: 'sante',
        name: 'Santé',
        short: 'Santé & Urgences',
        icon: '🏥',
        color: '#10b981',
        description: 'Système de santé et services médicaux disponibles',
        businessCategories: ['hopitaux', 'pharmacies'],
        content: [
          {
            title: 'Système de Santé',
            icon: '🏥',
            items: [
              { text: 'Hôpitaux publics et privés', highlight: true },
              { text: 'Centres de santé communautaires' },
              { text: 'Pharmacies (nombreuses)' },
              { text: 'Médecins généralistes et spécialistes' },
              { text: 'Services d’urgence 24h/24' }
            ]
          },
          {
            title: 'Prévention',
            icon: '💉',
            items: [
              { text: 'Vaccinations recommandées', highlight: true },
              { text: 'Prévention du paludisme' },
              { text: 'Hygiène alimentaire' },
              { text: 'Protection solaire' },
              { text: 'Eau potable et hygiène' }
            ]
          },
          {
            title: 'Urgences',
            icon: '🚨',
            items: [
              { text: "Numéros d'urgence : 117 (police), 118 (pompiers)" },
              { text: 'Hôpitaux d’urgence à Conakry' },
              { text: 'Ambulances privées' },
              { text: 'Centres de traumatologie' },
              { text: "Services d'évacuation médicale" }
            ]
          }
        ]
      },
      {
        id: 'education',
        name: 'Éducation',
        short: 'Écoles & Universités',
        icon: '🎓',
        color: '#06b6d4',
        description: "Système éducatif et établissements d'enseignement",
        businessCategories: ['ecoles', 'universites'],
        content: [
          {
            title: 'Système Éducatif',
            icon: '📚',
            items: [
              { text: 'École primaire (6-12 ans)' },
              { text: 'Collège (12-16 ans)' },
              { text: 'Lycée (16-19 ans)' },
              { text: 'Enseignement supérieur' },
              { text: 'Formation professionnelle' }
            ]
          },
          {
            title: 'Établissements',
            icon: '🏫',
            items: [
              { text: 'Écoles publiques et privées', highlight: true },
              { text: 'Universités (Conakry, Kankan)' },
              { text: 'Instituts techniques' },
              { text: 'Écoles internationales' },
              { text: 'Centres de formation' }
            ]
          },
          {
            title: "Langues d'Enseignement",
            icon: '🌍',
            items: [
              { text: 'Français (langue principale)' },
              { text: 'Langues nationales (début primaire)' },
              { text: 'Anglais (secondaire et supérieur)' },
              { text: 'Arabe (écoles coraniques)' },
              { text: 'Langues étrangères' }
            ]
          }
        ]
      },
      {
        id: 'logement',
        name: 'Logement',
        short: 'Hébergement',
        icon: '🏠',
        color: '#ec4899',
        description: 'Trouver un logement à Conakry',
        businessCategories: ['hotels'],
        content: [
          {
            title: 'Types de Logement',
            icon: '🏘️',
            items: [
              { text: 'Appartements (centre-ville)', highlight: true },
              { text: 'Maisons individuelles' },
              { text: 'Villas (quartiers résidentiels)' },
              { text: 'Studios et chambres' },
              { text: 'Colocations' }
            ]
          },
          {
            title: 'Quartiers Populaires',
            icon: '📍',
            items: [
              { text: 'Kaloum (centre-ville, cher)', highlight: true },
              { text: 'Dixinn (résidentiel, calme)' },
              { text: 'Ratoma (mixte, abordable)' },
              { text: 'Matam (commercial)' },
              { text: 'Matoto (résidentiel)' }
            ]
          },
          {
            title: 'Conseils',
            icon: '💡',
            items: [
              { text: 'Visiter plusieurs biens avant de décider' },
              { text: 'Négocier le loyer' },
              { text: 'Vérifier les charges (eau, électricité)' },
              { text: 'Lire attentivement le contrat' },
              { text: 'Se renseigner sur la sécurité du quartier' }
            ]
          }
        ]
      },
      {
        id: 'securite',
        name: 'Sécurité',
        short: 'Sécurité',
        icon: '🛡️',
        color: '#6366f1',
        description: 'Conseils de sécurité pour vivre en toute sérénité',
        content: [
          {
            title: 'Sécurité Générale',
            icon: '🔒',
            items: [
              { text: 'Éviter les zones isolées la nuit', highlight: true },
              { text: 'Garder ses documents en sécurité' },
              { text: 'Ne pas exhiber de valeurs' },
              { text: 'Rester vigilant dans les transports' },
              { text: 'Avoir les numéros d’urgence' }
            ]
          },
          {
            title: 'Numéros Urgences',
            icon: '📞',
            items: [
              { text: 'Police : 117', highlight: true },
              { text: 'Pompiers : 118' },
              { text: 'SAMU : 119' },
              { text: 'Gendarmerie : selon la zone' }
            ]
          },
          {
            title: 'Conseils Pratiques',
            icon: '✅',
            items: [
              { text: 'Respecter les coutumes locales' },
              { text: 'Éviter les discussions politiques sensibles' },
              { text: 'Se renseigner avant de voyager' },
              { text: 'Avoir une assurance voyage' },
              { text: 'Informer sa famille de ses déplacements' }
            ]
          }
        ]
      },
      {
        id: 'administratif',
        name: 'Démarches',
        short: 'Administration',
        icon: '📋',
        color: '#14b8a6',
        description: 'Papiers et formalités pour s’installer en Guinée',
        businessCategories: ['administration'],
        content: [
          {
            title: 'Visa et Séjour',
            icon: '🛂',
            items: [
              { text: 'Visa touristique (30 jours)', highlight: true },
              { text: 'Visa de séjour (renouvelable)' },
              { text: 'Carte de résident' },
              { text: 'Permis de travail (si applicable)' },
              { text: "Contacter l'ambassade de Guinée" }
            ]
          },
          {
            title: 'Documents Utiles',
            icon: '📄',
            items: [
              { text: 'Passeport valide 6 mois minimum', highlight: true },
              { text: 'Certificat de vaccination' },
              { text: 'Extrait de casier judiciaire' },
              { text: 'Photos d’identité' },
              { text: 'Justificatifs de ressources' }
            ]
          },
          {
            title: 'Services Administratifs',
            icon: '🏛️',
            items: [
              { text: 'Préfecture de Conakry' },
              { text: 'Mairies de communes' },
              { text: 'Direction de la Police' },
              { text: 'Ambassades et consulats' },
              { text: 'Services consulaires' }
            ]
          }
        ]
      },
      {
        id: 'economie',
        name: 'Économie',
        short: 'Économie',
        icon: '💰',
        color: '#f97316',
        description: "Comprendre l'économie et les opportunités d'affaires",
        businessCategories: ['banques'],
        content: [
          {
            title: 'Secteurs Clés',
            icon: '💎',
            items: [
              { text: 'Mines (bauxite, or, diamants)', highlight: true },
              { text: 'Agriculture (riz, café, cacao)' },
              { text: 'Services (commerce, transport)' },
              { text: 'Tourisme (potentiel)' },
              { text: 'Artisanat et petites entreprises' }
            ]
          },
          {
            title: 'Monnaie et Banques',
            icon: '💳',
            items: [
              { text: 'Franc guinéen (GNF)', highlight: true },
              { text: 'Banques commerciales' },
              { text: 'Distributeurs automatiques' },
              { text: "Services de transfert d'argent" },
              { text: 'Cartes de crédit (limitées)' }
            ]
          },
          {
            title: "Opportunités d'Affaires",
            icon: '🚀',
            items: [
              { text: 'Commerce et distribution' },
              { text: 'Services aux entreprises' },
              { text: 'Tourisme et hôtellerie' },
              { text: 'Agriculture et agroalimentaire' },
              { text: 'Technologies et innovation' }
            ]
          }
        ]
      },
      {
        id: 'tourisme',
        name: 'Tourisme',
        short: 'Tourisme',
        icon: '🏖️',
        color: '#22c55e',
        description: 'Découvrir les merveilles touristiques de la Guinée',
        content: [
          {
            title: 'Sites Touristiques',
            icon: '🗺️',
            items: [
              { text: 'Îles de Loos (Conakry)', highlight: true },
              { text: 'Chutes de la Soumba' },
              { text: 'Mont Nimba (UNESCO)' },
              { text: 'Fouta Djalon (montagnes)' },
              { text: 'Plages de la côte atlantique' }
            ]
          },
          {
            title: 'Activités',
            icon: '🎯',
            items: [
              { text: 'Randonnées et trekking' },
              { text: 'Observation de la faune' },
              { text: 'Plages et sports nautiques' },
              { text: 'Visites culturelles' },
              { text: 'Festivals et événements' }
            ]
          },
          {
            title: 'Conseils aux Voyageurs',
            icon: '✈️',
            items: [
              { text: 'Visa et documents requis', highlight: true },
              { text: 'Vaccinations recommandées' },
              { text: 'Assurance voyage' },
              { text: 'Sécurité et précautions' },
              { text: 'Respect des coutumes locales' }
            ]
          }
        ]
      }
    ]
  },
  en: {
    hero: {
      title: '🇬🇳 Living in Guinea',
      subtitle: 'Everything you need to settle comfortably in Conakry and across the country.'
    },
    sectionIntro: 'Essential information for thriving in Guinea',
    recommendedBusinessesTitle: 'Recommended Businesses',
    recommendedBusinessesCta: 'See all businesses',
    quickGuide: {
      title: 'Quick Guide',
      items: [
        { icon: '🏛️', text: 'Embassies', link: '/category/administration' },
        { icon: '🏥', text: 'Emergency hospitals', link: '/category/hopitaux' },
        { icon: '🏦', text: 'Banks & exchange', link: '/category/banques' },
        { icon: '🚌', text: 'Public transport', link: '/category/transport' },
        { icon: '🍽️', text: 'Restaurants', link: '/category/restaurants' }
      ]
    },
    usefulNumbers: {
      title: 'Useful Numbers',
      items: [
        { label: '🚨 Emergency', number: '117', color: '#dc2626' },
        { label: '🚒 Fire brigade', number: '118', color: '#dc2626' },
        { label: '🏥 SAMU', number: '119', color: '#dc2626' },
        { label: '📱 Orange', number: '+224 6xx', color: '#f97316' },
        { label: '📱 MTN', number: '+224 6xx', color: '#f97316' }
      ]
    },
    practicalTips: {
      title: 'Practical Tips',
      tips: [
        'Respect local customs',
        'Learn a few words in French',
        'Always keep small cash',
        'Check schedules ahead of time',
        'Keep your documents with you',
        'Stay patient and flexible'
      ]
    },
    cta: {
      title: 'Explore Conakry',
      description: 'Find the best spots in the capital',
      button: 'Browse categories'
    },
    sections: [
      {
        id: 'culture',
        name: 'Culture',
        short: 'Culture & Traditions',
        icon: '🎭',
        color: '#8b5cf6',
        description: 'Dive into Guinea’s cultural wealth and traditions',
        businessCategories: ['loisirs'],
        content: [
          {
            title: 'Festivals & Celebrations',
            icon: '🎉',
            items: [
              { text: 'Independence Day (October 2)', highlight: true },
              { text: 'Labour Day (May 1)' },
              { text: 'Ramadan and Tabaski (variable dates)' },
              { text: 'Christmas and New Year' },
              { text: 'Regional cultural festivals' }
            ]
          },
          {
            title: 'Arts & Crafts',
            icon: '🎨',
            items: [
              { text: 'Traditional music (djembe, balafon)' },
              { text: 'Dance and theatre' },
              { text: 'Handicrafts (pottery, weaving, sculpture)' },
              { text: 'Guinean literature' },
              { text: 'Cinema and media' }
            ]
          },
          {
            title: 'Social Life',
            icon: '👥',
            items: [
              { text: 'Importance of the extended family' },
              { text: 'Respect for elders' },
              { text: 'Community solidarity' },
              { text: 'Traditional hospitality' },
              { text: 'Weddings and birth ceremonies' }
            ]
          }
        ]
      },
      {
        id: 'langues',
        name: 'Languages',
        short: 'Spoken languages',
        icon: '🗣️',
        color: '#3b82f6',
        description: 'French plus Guinea’s national languages',
        businessCategories: ['ecoles'],
        content: [
          {
            title: 'Official Languages',
            icon: '📚',
            items: [
              { text: 'French (official language)', highlight: true },
              { text: 'Soussou (Conakry region)' },
              { text: 'Malinké (Upper Guinea)' },
              { text: 'Pular (Middle Guinea)' },
              { text: 'Kissi, Toma, Guerzé (Forest region)' }
            ]
          },
          {
            title: 'Learning French',
            icon: '🎓',
            items: [
              { text: 'Beginner French classes' },
              { text: 'Language schools in Conakry' },
              { text: 'French cultural centers' },
              { text: 'Language-learning apps' },
              { text: 'Practice with locals' }
            ]
          },
          {
            title: 'Useful Expressions',
            icon: '💬',
            items: [
              { text: 'Hello: “Bonjour” or “Salam”', highlight: true },
              { text: 'Thank you: “Merci” or “Baraka”' },
              { text: 'How are you?: “Comment ça va ?”' },
              { text: 'Goodbye: “Au revoir” or “Allah ka baraka”' },
              { text: 'Excuse me: “Excusez-moi”' }
            ]
          }
        ]
      },
      {
        id: 'cuisine',
        name: 'Cuisine',
        short: 'Gastronomy',
        icon: '🍽️',
        color: '#ef4444',
        description: 'Taste the flavors of Guinean gastronomy',
        businessCategories: ['restaurants'],
        content: [
          {
            title: 'Signature Dishes',
            icon: '🍛',
            items: [
              { text: 'Riz au gras (rice with rich sauce)', highlight: true },
              { text: 'Fouti (cassava couscous)' },
              { text: 'Peanut sauce' },
              { text: 'Poulet Yassa' },
              { text: 'Grilled fish' },
              { text: 'Vegetable stews' }
            ]
          },
          {
            title: 'Local Ingredients',
            icon: '🥜',
            items: [
              { text: 'Rice as staple food' },
              { text: 'Cassava and yam' },
              { text: 'Peanuts and palm oil' },
              { text: 'Fresh market vegetables' },
              { text: 'Spices and condiments' },
              { text: 'Tropical fruits' }
            ]
          },
          {
            title: 'Where to Eat',
            icon: '🍴',
            items: [
              { text: 'Local markets (street food)' },
              { text: 'Traditional restaurants' },
              { text: 'Maquis (small eateries)' },
              { text: 'Hotels and international venues' },
              { text: 'Home cooking (invitations)' }
            ]
          }
        ]
      },
      {
        id: 'transport',
        name: 'Transport',
        short: 'Getting around',
        icon: '🚌',
        color: '#f59e0b',
        description: 'Move efficiently in Conakry and throughout Guinea',
        businessCategories: ['transport'],
        content: [
          {
            title: 'Urban Transport',
            icon: '🚕',
            items: [
              { text: 'Shared taxis (taxi-brousse)', highlight: true },
              { text: 'Motorbike taxis' },
              { text: 'Limited city buses' },
              { text: 'Private taxis' },
              { text: 'Car rentals' }
            ]
          },
          {
            title: 'Intercity Transport',
            icon: '🚌',
            items: [
              { text: 'Intercity buses' },
              { text: 'Long-distance bush taxis' },
              { text: 'Domestic flights' },
              { text: 'Trains (Conakry–Kankan)' },
              { text: 'River and coastal boats' }
            ]
          },
          {
            title: 'Practical Advice',
            icon: '💡',
            items: [
              { text: 'Negotiate fares before boarding', highlight: true },
              { text: 'Carry small cash' },
              { text: 'Avoid rush hours' },
              { text: 'Follow safety rules' },
              { text: 'Use transport apps when possible' }
            ]
          }
        ]
      },
      {
        id: 'sante',
        name: 'Health',
        short: 'Health & emergencies',
        icon: '🏥',
        color: '#10b981',
        description: 'Healthcare system and available medical services',
        businessCategories: ['hopitaux', 'pharmacies'],
        content: [
          {
            title: 'Health System',
            icon: '🏥',
            items: [
              { text: 'Public and private hospitals', highlight: true },
              { text: 'Community health centers' },
              { text: 'Plenty of pharmacies' },
              { text: 'Generalists and specialists' },
              { text: '24/7 emergency services' }
            ]
          },
          {
            title: 'Prevention',
            icon: '💉',
            items: [
              { text: 'Recommended vaccinations', highlight: true },
              { text: 'Malaria prevention' },
              { text: 'Food hygiene' },
              { text: 'Sun protection' },
              { text: 'Safe water and sanitation' }
            ]
          },
          {
            title: 'Emergency Tips',
            icon: '🚨',
            items: [
              { text: 'Hotlines: 117 (police), 118 (fire)' },
              { text: 'Emergency hospitals in Conakry' },
              { text: 'Private ambulances' },
              { text: 'Trauma centers' },
              { text: 'Medical evacuation services' }
            ]
          }
        ]
      },
      {
        id: 'education',
        name: 'Education',
        short: 'Schools & universities',
        icon: '🎓',
        color: '#06b6d4',
        description: 'Education system and learning opportunities',
        businessCategories: ['ecoles', 'universites'],
        content: [
          {
            title: 'Education Path',
            icon: '📚',
            items: [
              { text: 'Primary school (ages 6‑12)' },
              { text: 'Middle school (12‑16)' },
              { text: 'High school (16‑19)' },
              { text: 'Higher education' },
              { text: 'Vocational training' }
            ]
          },
          {
            title: 'Institutions',
            icon: '🏫',
            items: [
              { text: 'Public and private schools', highlight: true },
              { text: 'Universities (Conakry, Kankan)' },
              { text: 'Technical institutes' },
              { text: 'International schools' },
              { text: 'Training centers' }
            ]
          },
          {
            title: 'Teaching Languages',
            icon: '🌍',
            items: [
              { text: 'French (primary medium)' },
              { text: 'National languages (early years)' },
              { text: 'English (secondary & higher ed)' },
              { text: 'Arabic (religious schools)' },
              { text: 'Other foreign languages' }
            ]
          }
        ]
      },
      {
        id: 'logement',
        name: 'Housing',
        short: 'Accommodation',
        icon: '🏠',
        color: '#ec4899',
        description: 'Finding a place to live in Conakry',
        businessCategories: ['hotels'],
        content: [
          {
            title: 'Housing Types',
            icon: '🏘️',
            items: [
              { text: 'Downtown apartments', highlight: true },
              { text: 'Single-family houses' },
              { text: 'Villas (residential areas)' },
              { text: 'Studios and rooms' },
              { text: 'Shared rentals' }
            ]
          },
          {
            title: 'Popular Districts',
            icon: '📍',
            items: [
              { text: 'Kaloum (downtown, premium)', highlight: true },
              { text: 'Dixinn (residential, calm)' },
              { text: 'Ratoma (mixed, affordable)' },
              { text: 'Matam (commercial)' },
              { text: 'Matoto (residential)' }
            ]
          },
          {
            title: 'Housing Tips',
            icon: '💡',
            items: [
              { text: 'Visit several places before deciding' },
              { text: 'Negotiate rent' },
              { text: 'Check utilities (water, power)' },
              { text: 'Read contracts carefully' },
              { text: 'Assess neighborhood safety' }
            ]
          }
        ]
      },
      {
        id: 'securite',
        name: 'Safety',
        short: 'Safety',
        icon: '🛡️',
        color: '#6366f1',
        description: 'Security advice for peace of mind',
        content: [
          {
            title: 'General Safety',
            icon: '🔒',
            items: [
              { text: 'Avoid isolated areas at night', highlight: true },
              { text: 'Keep documents safe' },
              { text: 'Avoid showing valuables' },
              { text: 'Stay alert in transport' },
              { text: 'Save emergency numbers' }
            ]
          },
          {
            title: 'Emergency Numbers',
            icon: '📞',
            items: [
              { text: 'Police: 117', highlight: true },
              { text: 'Fire brigade: 118' },
              { text: 'SAMU: 119' },
              { text: 'Gendarmerie: varies by area' }
            ]
          },
          {
            title: 'Practical Advice',
            icon: '✅',
            items: [
              { text: 'Respect local customs' },
              { text: 'Avoid sensitive political talks' },
              { text: 'Get informed before travelling' },
              { text: 'Have travel insurance' },
              { text: 'Tell family about your trips' }
            ]
          }
        ]
      },
      {
        id: 'administratif',
        name: 'Paperwork',
        short: 'Administration',
        icon: '📋',
        color: '#14b8a6',
        description: 'Documents and procedures to settle in Guinea',
        businessCategories: ['administration'],
        content: [
          {
            title: 'Visa & Stay',
            icon: '🛂',
            items: [
              { text: 'Tourist visa (30 days)', highlight: true },
              { text: 'Renewable residence visa' },
              { text: 'Resident card' },
              { text: 'Work permit (if needed)' },
              { text: 'Contact the Guinean embassy' }
            ]
          },
          {
            title: 'Useful Documents',
            icon: '📄',
            items: [
              { text: 'Passport valid 6+ months', highlight: true },
              { text: 'Vaccination certificate' },
              { text: 'Criminal record extract' },
              { text: 'ID photos' },
              { text: 'Proof of funds' }
            ]
          },
          {
            title: 'Administrative Services',
            icon: '🏛️',
            items: [
              { text: 'Conakry prefecture' },
              { text: 'Municipal town halls' },
              { text: 'Police headquarters' },
              { text: 'Embassies and consulates' },
              { text: 'Consular services' }
            ]
          }
        ]
      },
      {
        id: 'economie',
        name: 'Economy',
        short: 'Economy',
        icon: '💰',
        color: '#f97316',
        description: 'Understand the economy and business potential',
        businessCategories: ['banques'],
        content: [
          {
            title: 'Key Sectors',
            icon: '💎',
            items: [
              { text: 'Mining (bauxite, gold, diamonds)', highlight: true },
              { text: 'Agriculture (rice, coffee, cocoa)' },
              { text: 'Services (trade, transport)' },
              { text: 'Tourism (emerging)' },
              { text: 'Handicrafts and SMEs' }
            ]
          },
          {
            title: 'Currency & Banking',
            icon: '💳',
            items: [
              { text: 'Guinean franc (GNF)', highlight: true },
              { text: 'Commercial banks' },
              { text: 'ATMs in major cities' },
              { text: 'Money transfer services' },
              { text: 'Limited card acceptance' }
            ]
          },
          {
            title: 'Business Opportunities',
            icon: '🚀',
            items: [
              { text: 'Retail and distribution' },
              { text: 'Business services' },
              { text: 'Tourism and hospitality' },
              { text: 'Agriculture and agri-food' },
              { text: 'Tech and innovation' }
            ]
          }
        ]
      },
      {
        id: 'tourisme',
        name: 'Tourism',
        short: 'Tourism',
        icon: '🏖️',
        color: '#22c55e',
        description: 'Discover the highlights of Guinea',
        content: [
          {
            title: 'Top Attractions',
            icon: '🗺️',
            items: [
              { text: 'Loos Islands (Conakry)', highlight: true },
              { text: 'Soumba waterfalls' },
              { text: 'Mount Nimba (UNESCO)' },
              { text: 'Fouta Djalon highlands' },
              { text: 'Atlantic coastline beaches' }
            ]
          },
          {
            title: 'Activities',
            icon: '🎯',
            items: [
              { text: 'Hiking and trekking' },
              { text: 'Wildlife observation' },
              { text: 'Beaches and water sports' },
              { text: 'Cultural visits' },
              { text: 'Festivals and events' }
            ]
          },
          {
            title: 'Travel Advice',
            icon: '✈️',
            items: [
              { text: 'Visa and travel documents', highlight: true },
              { text: 'Recommended vaccinations' },
              { text: 'Travel insurance' },
              { text: 'Safety and precautions' },
              { text: 'Respect local customs' }
            ]
          }
        ]
      }
    ]
  }
};

export default vivreContent;
