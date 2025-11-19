import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, ExternalLink, 
  ChevronRight, Star, Users, TrendingUp, Shield,
  Home, Heart, BookOpen, GraduationCap, Building2,
  Car, UtensilsCrossed, Stethoscope, Plane, Wallet,
  Globe, Search, Calendar, AlertCircle, CheckCircle
} from 'lucide-react';
import { useBusiness } from '../contexts/BusinessContext';

const VivreEnGuineePage = () => {
  const [activeSection, setActiveSection] = useState('culture');
  const [isMobile, setIsMobile] = useState(false);
  const { validatedBusinesses, categories } = useBusiness();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const sections = [
    { id: 'culture', name: 'Culture & Traditions', icon: '🎭', color: '#8b5cf6' },
    { id: 'langues', name: 'Langues', icon: '🗣️', color: '#3b82f6' },
    { id: 'cuisine', name: 'Cuisine', icon: '🍽️', color: '#ef4444' },
    { id: 'transport', name: 'Transport', icon: '🚌', color: '#f59e0b' },
    { id: 'sante', name: 'Santé', icon: '🏥', color: '#10b981' },
    { id: 'education', name: 'Éducation', icon: '🎓', color: '#06b6d4' },
    { id: 'logement', name: 'Logement', icon: '🏠', color: '#ec4899' },
    { id: 'securite', name: 'Sécurité', icon: '🛡️', color: '#6366f1' },
    { id: 'administratif', name: 'Démarches', icon: '📋', color: '#14b8a6' },
    { id: 'economie', name: 'Économie', icon: '💰', color: '#f97316' },
    { id: 'tourisme', name: 'Tourisme', icon: '🏖️', color: '#22c55e' }
  ];

  const getBusinessesByCategory = (categorySlug) => {
    const category = categories.find(c => c.id === categorySlug);
    if (!category) return [];
    return validatedBusinesses
      .filter(b => b.category === categorySlug)
      .slice(0, 3);
  };

  const cultureData = {
    culture: {
      title: 'Culture & Traditions',
      icon: '🎭',
      description: 'Découvrez la richesse culturelle et les traditions de la Guinée',
      content: [
        {
          title: 'Fêtes et Célébrations',
          icon: '🎉',
          items: [
            { text: 'Fête de l\'Indépendance (2 octobre)', highlight: true },
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
      ],
      businesses: getBusinessesByCategory('loisirs')
    },
    langues: {
      title: 'Langues en Guinée',
      icon: '🗣️',
      description: 'Le français et les langues nationales guinéennes',
      content: [
        {
          title: 'Langues Officielles',
          icon: '📚',
          items: [
            { text: 'Français (langue officielle)' },
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
            { text: 'Applications mobiles d\'apprentissage' },
            { text: 'Conversation avec les locaux' }
          ]
        },
        {
          title: 'Expressions Utiles',
          icon: '💬',
          items: [
            { text: 'Bonjour : "Bonjour" ou "Salam"', highlight: true },
            { text: 'Merci : "Merci" ou "Baraka"' },
            { text: 'Comment allez-vous ? : "Comment ça va ?"' },
            { text: 'Au revoir : "Au revoir" ou "Allah ka baraka"' },
            { text: 'Excusez-moi : "Excusez-moi"' }
          ]
        }
      ],
      businesses: getBusinessesByCategory('ecoles')
    },
    cuisine: {
      title: 'Cuisine Guinéenne',
      icon: '🍽️',
      description: 'Savourez les délices de la gastronomie guinéenne',
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
      ],
      businesses: getBusinessesByCategory('restaurants')
    },
    transport: {
      title: 'Transport en Guinée',
      icon: '🚌',
      description: 'Se déplacer efficacement à Conakry et en Guinée',
      content: [
        {
          title: 'Transport Urbain',
          icon: '🚕',
          items: [
            { text: 'Taxis collectifs (taxi-brousse)' },
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
      ],
      businesses: getBusinessesByCategory('transport')
    },
    sante: {
      title: 'Santé en Guinée',
      icon: '🏥',
      description: 'Système de santé et services médicaux disponibles',
      content: [
        {
          title: 'Système de Santé',
          icon: '🏥',
          items: [
            { text: 'Hôpitaux publics et privés' },
            { text: 'Centres de santé communautaires' },
            { text: 'Pharmacies (nombreuses)' },
            { text: 'Médecins généralistes et spécialistes' },
            { text: 'Services d\'urgence 24h/24' }
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
            { text: 'Numéros d\'urgence : 117 (police), 118 (pompiers)' },
            { text: 'Hôpitaux d\'urgence à Conakry' },
            { text: 'Ambulances privées' },
            { text: 'Centres de traumatologie' },
            { text: 'Services d\'évacuation médicale' }
          ]
        }
      ],
      businesses: [...getBusinessesByCategory('hopitaux'), ...getBusinessesByCategory('pharmacies')]
    },
    education: {
      title: 'Éducation en Guinée',
      icon: '🎓',
      description: 'Système éducatif et établissements d\'enseignement',
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
            { text: 'Écoles publiques et privées' },
            { text: 'Universités (Conakry, Kankan)' },
            { text: 'Instituts techniques' },
            { text: 'Écoles internationales' },
            { text: 'Centres de formation' }
          ]
        },
        {
          title: 'Langues d\'Enseignement',
          icon: '🌍',
          items: [
            { text: 'Français (langue principale)' },
            { text: 'Langues nationales (début primaire)' },
            { text: 'Anglais (secondaire et supérieur)' },
            { text: 'Arabe (écoles coraniques)' },
            { text: 'Langues étrangères' }
          ]
        }
      ],
      businesses: [...getBusinessesByCategory('ecoles'), ...getBusinessesByCategory('universites')]
    },
    logement: {
      title: 'Logement en Guinée',
      icon: '🏠',
      description: 'Trouver un logement à Conakry',
      content: [
        {
          title: 'Types de Logement',
          icon: '🏘️',
          items: [
            { text: 'Appartements (centre-ville)' },
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
      ],
      businesses: getBusinessesByCategory('hotels')
    },
    securite: {
      title: 'Sécurité en Guinée',
      icon: '🛡️',
      description: 'Conseils de sécurité pour vivre en toute sérénité',
      content: [
        {
          title: 'Sécurité Générale',
          icon: '🔒',
          items: [
            { text: 'Éviter les zones isolées la nuit' },
            { text: 'Garder ses documents en sécurité' },
            { text: 'Ne pas exhiber de valeurs' },
            { text: 'Rester vigilant dans les transports' },
            { text: 'Avoir les numéros d\'urgence' }
          ]
        },
        {
          title: 'Numéros Urgences',
          icon: '📞',
          items: [
            { text: 'Police : 117', highlight: true },
            { text: 'Pompiers : 118' },
            { text: 'SAMU : 119' },
            { text: 'Gendarmerie : variable selon région' }
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
      ],
      businesses: []
    },
    administratif: {
      title: 'Démarches Administratives',
      icon: '📋',
      description: 'Papiers et formalités pour s\'installer en Guinée',
      content: [
        {
          title: 'Visa et Séjour',
          icon: '🛂',
          items: [
            { text: 'Visa touristique (30 jours)' },
            { text: 'Visa de séjour (renouvelable)' },
            { text: 'Carte de résident' },
            { text: 'Permis de travail (si applicable)' },
            { text: 'Contacter l\'ambassade de Guinée' }
          ]
        },
        {
          title: 'Documents Utiles',
          icon: '📄',
          items: [
            { text: 'Passeport valide 6 mois minimum', highlight: true },
            { text: 'Certificat de vaccination' },
            { text: 'Extrait de casier judiciaire' },
            { text: 'Photos d\'identité' },
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
      ],
      businesses: getBusinessesByCategory('administration')
    },
    economie: {
      title: 'Économie Guinéenne',
      icon: '💰',
      description: 'Comprendre l\'économie et les opportunités d\'affaires',
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
            { text: 'Franc guinéen (GNF)' },
            { text: 'Banques commerciales' },
            { text: 'Distributeurs automatiques' },
            { text: 'Services de transfert d\'argent' },
            { text: 'Cartes de crédit (limitées)' }
          ]
        },
        {
          title: 'Opportunités d\'Affaires',
          icon: '🚀',
          items: [
            { text: 'Commerce et distribution' },
            { text: 'Services aux entreprises' },
            { text: 'Tourisme et hôtellerie' },
            { text: 'Agriculture et agroalimentaire' },
            { text: 'Technologies et innovation' }
          ]
        }
      ],
      businesses: getBusinessesByCategory('banques')
    },
    tourisme: {
      title: 'Tourisme en Guinée',
      icon: '🏖️',
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
            { text: 'Visa et documents requis' },
            { text: 'Vaccinations recommandées' },
            { text: 'Assurance voyage' },
            { text: 'Sécurité et précautions' },
            { text: 'Respect des coutumes locales' }
          ]
        }
      ],
      businesses: []
    }
  };

  const getCurrentData = () => {
    return cultureData[activeSection] || cultureData.culture;
  };

  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'relative',
          backgroundImage: 'url(/vivre-guinee-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: isMobile ? '2rem 0' : '4rem 0',
          color: 'white',
          overflow: 'hidden'
        }}
      >
        {/* Overlay couleur dynamique */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${currentSection?.color || '#3b82f6'}e6 0%, ${currentSection?.color || '#3b82f6'}d6 60%, rgba(17,24,39,0.75) 100%)`,
            zIndex: 0
          }}
        />
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          right: '-10%',
          bottom: '-10%',
          background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              {getCurrentData().icon}
            </div>
            <h1 style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: 'bold', margin: 0, marginBottom: '1rem' }}>
              🇬🇳 Vivre en Guinée
            </h1>
            <p style={{ fontSize: isMobile ? '1.125rem' : '1.5rem', margin: 0, maxWidth: '700px', margin: '0 auto', opacity: 0.95, padding: isMobile ? '0 1rem' : '0' }}>
              {getCurrentData().description}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation des sections */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'thin'
          }}>
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            style={{
              padding: isMobile ? '0.75rem 1rem' : '0.875rem 1.25rem',
              borderRadius: '0.75rem',
              border: 'none',
              background: activeSection === section.id 
                ? `linear-gradient(135deg, ${section.color} 0%, ${section.color}dd 100%)`
                : '#f3f4f6',
              color: activeSection === section.id ? 'white' : '#374151',
              cursor: 'pointer',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              fontWeight: activeSection === section.id ? '600' : '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: activeSection === section.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
              minWidth: isMobile ? 'auto' : 'fit-content'
            }}
              >
                <span style={{ fontSize: '1.25rem' }}>{section.icon}</span>
                <span>{section.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div style={{ padding: '3rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) 350px', gap: '2rem' }}>
            
            {/* Contenu principal */}
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              style={{ 
                backgroundColor: 'white', 
                borderRadius: '1rem', 
                padding: '2.5rem', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem' }}>{getCurrentData().icon}</div>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                    {getCurrentData().title}
                  </h2>
                  <p style={{ fontSize: '1rem', color: '#6b7280', margin: '0.5rem 0 0 0' }}>
                    Informations essentielles pour bien vivre en Guinée
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {getCurrentData().content.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      padding: '1.5rem',
                      backgroundColor: '#f9fafb',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '1.5rem' }}>{section.icon}</div>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: '600', 
                        color: '#374151', 
                        margin: 0
                      }}>
                        {section.title}
                      </h3>
                    </div>
                    <ul style={{ 
                      margin: 0, 
                      paddingLeft: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}>
                      {section.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                          style={{ 
                            color: '#4b5563',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            fontWeight: item.highlight ? '500' : '400',
                            listStyleType: 'disc'
                          }}
                        >
                          {item.text}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}

                {/* Entreprises liées */}
                {getCurrentData().businesses && getCurrentData().businesses.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      padding: '1.5rem',
                      backgroundColor: '#eff6ff',
                      marginTop: '1rem'
                    }}
                  >
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e40af', marginBottom: '1rem' }}>
                      💼 Entreprises recommandées
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {getCurrentData().businesses.map((business) => (
                        <Link
                          key={business.id}
                          to={`/category/${business.category}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.75rem',
                            backgroundColor: 'white',
                            borderRadius: '0.5rem',
                            textDecoration: 'none',
                            color: '#374151',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#dbeafe';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{business.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{business.address}</div>
                          </div>
                          <ChevronRight size={16} color="#3b82f6" />
                        </Link>
                      ))}
                      <Link
                        to={`/category/${getCurrentData().businesses[0]?.category}`}
                        style={{
                          textAlign: 'center',
                          padding: '0.75rem',
                          color: '#3b82f6',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}
                      >
                        Voir toutes les entreprises →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Guide rapide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '1rem', 
                  padding: '1.5rem', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={20} color="#3b82f6" />
                  Guide Rapide
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { icon: '🏛️', text: 'Ambassades à Conakry', link: '/category/administration' },
                    { icon: '🏥', text: 'Hôpitaux d\'urgence', link: '/category/hopitaux' },
                    { icon: '🏦', text: 'Banques et change', link: '/category/banques' },
                    { icon: '📱', text: 'Opérateurs télécoms' },
                    { icon: '🚌', text: 'Transport public', link: '/category/transport' }
                  ].map((item, index) => (
                    <Link
                      key={index}
                      to={item.link || '#'}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.875rem',
                        color: '#4b5563',
                        textDecoration: 'none',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                        e.currentTarget.style.color = '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#4b5563';
                      }}
                    >
                      <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                      <span>{item.text}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Numéros utiles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '1rem', 
                  padding: '1.5rem', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={20} color="#ef4444" />
                  Numéros Utiles
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { label: '🚨 Urgences', number: '117', color: '#dc2626' },
                    { label: '🚒 Pompiers', number: '118', color: '#dc2626' },
                    { label: '🏥 SAMU', number: '119', color: '#dc2626' },
                    { label: '📱 Orange', number: '+224 6xx', color: '#f97316' },
                    { label: '📱 MTN', number: '+224 6xx', color: '#f97316' }
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.875rem',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        backgroundColor: '#f9fafb'
                      }}
                    >
                      <span style={{ color: '#4b5563' }}>{item.label}</span>
                      <a
                        href={`tel:${item.number}`}
                        style={{
                          fontWeight: '600',
                          color: item.color,
                          textDecoration: 'none'
                        }}
                      >
                        {item.number}
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Conseils pratiques */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '1rem', 
                  padding: '1.5rem', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={20} color="#10b981" />
                  Conseils Pratiques
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  {[
                    'Respecter les coutumes locales',
                    'Apprendre quelques mots en français',
                    'Avoir toujours de la monnaie',
                    'Se renseigner sur les horaires',
                    'Garder ses documents sur soi',
                    'Être patient et flexible'
                  ].map((tip, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={16} color="#10b981" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                  Explorez Conakry
                </h3>
                <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '1rem' }}>
                  Découvrez les meilleures adresses de la capitale
                </p>
                <Link
                  to="/all-categories"
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'white',
                    color: '#3b82f6',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Voir les catégories →
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VivreEnGuineePage;
