import React, { useState } from 'react';

const VivreEnGuineePage = () => {
  const [activeSection, setActiveSection] = useState('culture');

  const sections = [
    { id: 'culture', name: 'Culture & Traditions', icon: '🎭' },
    { id: 'langues', name: 'Langues', icon: '🗣️' },
    { id: 'cuisine', name: 'Cuisine', icon: '🍽️' },
    { id: 'transport', name: 'Transport', icon: '🚌' },
    { id: 'sante', name: 'Santé', icon: '🏥' },
    { id: 'education', name: 'Éducation', icon: '🎓' },
    { id: 'economie', name: 'Économie', icon: '💰' },
    { id: 'tourisme', name: 'Tourisme', icon: '🏖️' }
  ];

  const cultureData = {
    culture: {
      title: 'Culture & Traditions',
      content: [
        {
          title: 'Fêtes et Célébrations',
          items: [
            'Fête de l\'Indépendance (2 octobre)',
            'Fête du Travail (1er mai)',
            'Ramadan et Tabaski',
            'Noël et Nouvel An',
            'Festivals culturels régionaux'
          ]
        },
        {
          title: 'Arts et Artisanat',
          items: [
            'Musique traditionnelle (djembé, balafon)',
            'Danse et théâtre',
            'Artisanat (poterie, tissage, sculpture)',
            'Littérature guinéenne',
            'Cinéma et médias'
          ]
        },
        {
          title: 'Vie Sociale',
          items: [
            'Importance de la famille élargie',
            'Respect des aînés',
            'Solidarité communautaire',
            'Hospitalité traditionnelle',
            'Cérémonies de mariage et naissance'
          ]
        }
      ]
    },
    langues: {
      title: 'Langues en Guinée',
      content: [
        {
          title: 'Langues Officielles',
          items: [
            'Français (langue officielle)',
            'Langues nationales reconnues',
            'Soussou (région de Conakry)',
            'Malinké (Haute-Guinée)',
            'Pular (Moyenne-Guinée)',
            'Kissi, Toma, Guerzé (Forêt)'
          ]
        },
        {
          title: 'Apprendre le Français',
          items: [
            'Cours de français pour débutants',
            'Écoles de langues à Conakry',
            'Centres culturels français',
            'Applications mobiles d\'apprentissage',
            'Conversation avec les locaux'
          ]
        },
        {
          title: 'Expressions Utiles',
          items: [
            'Bonjour : "Bonjour" ou "Salam"',
            'Merci : "Merci" ou "Baraka"',
            'Comment allez-vous ? : "Comment ça va ?"',
            'Au revoir : "Au revoir" ou "Allah ka baraka"',
            'Excusez-moi : "Excusez-moi"'
          ]
        }
      ]
    },
    cuisine: {
      title: 'Cuisine Guinéenne',
      content: [
        {
          title: 'Plats Traditionnels',
          items: [
            'Riz au gras (riz avec sauce)',
            'Fouti (couscous de manioc)',
            'Sauce arachide',
            'Poulet Yassa',
            'Poisson grillé',
            'Ragoût de légumes'
          ]
        },
        {
          title: 'Ingrédients Locaux',
          items: [
            'Riz (aliment de base)',
            'Manioc et igname',
            'Arachides et huile de palme',
            'Légumes frais du marché',
            'Épices et condiments',
            'Fruits tropicaux'
          ]
        },
        {
          title: 'Où Manger',
          items: [
            'Marchés locaux (cuisine de rue)',
            'Restaurants traditionnels',
            'Maquis (petits restaurants)',
            'Hôtels et restaurants internationaux',
            'Cuisine familiale (invitations)'
          ]
        }
      ]
    },
    transport: {
      title: 'Transport en Guinée',
      content: [
        {
          title: 'Transport Urbain',
          items: [
            'Taxis collectifs (taxi-brousse)',
            'Motos-taxis (zemidjan)',
            'Bus urbains (limités)',
            'Taxis privés',
            'Location de véhicules'
          ]
        },
        {
          title: 'Transport Interurbain',
          items: [
            'Bus interurbains',
            'Taxis-brousse longue distance',
            'Transport aérien domestique',
            'Trains (ligne Conakry-Kankan)',
            'Bateaux (fleuves et côtes)'
          ]
        },
        {
          title: 'Conseils Pratiques',
          items: [
            'Négocier les prix avant de monter',
            'Avoir de la monnaie pour les transports',
            'Éviter les heures de pointe',
            'Respecter les règles de sécurité',
            'Utiliser les applications de transport'
          ]
        }
      ]
    },
    sante: {
      title: 'Santé en Guinée',
      content: [
        {
          title: 'Système de Santé',
          items: [
            'Hôpitaux publics et privés',
            'Centres de santé communautaires',
            'Pharmacies (nombreuses)',
            'Médecins généralistes et spécialistes',
            'Services d\'urgence 24h/24'
          ]
        },
        {
          title: 'Prévention',
          items: [
            'Vaccinations recommandées',
            'Prévention du paludisme',
            'Hygiène alimentaire',
            'Protection solaire',
            'Eau potable et hygiène'
          ]
        },
        {
          title: 'Urgences',
          items: [
            'Numéros d\'urgence : 117 (police), 118 (pompiers)',
            'Hôpitaux d\'urgence à Conakry',
            'Ambulances privées',
            'Centres de traumatologie',
            'Services d\'évacuation médicale'
          ]
        }
      ]
    },
    education: {
      title: 'Éducation en Guinée',
      content: [
        {
          title: 'Système Éducatif',
          items: [
            'École primaire (6-12 ans)',
            'Collège (12-16 ans)',
            'Lycée (16-19 ans)',
            'Enseignement supérieur',
            'Formation professionnelle'
          ]
        },
        {
          title: 'Établissements',
          items: [
            'Écoles publiques et privées',
            'Universités (Conakry, Kankan)',
            'Instituts techniques',
            'Écoles internationales',
            'Centres de formation'
          ]
        },
        {
          title: 'Langues d\'Enseignement',
          items: [
            'Français (langue principale)',
            'Langues nationales (début primaire)',
            'Anglais (secondaire et supérieur)',
            'Arabe (écoles coraniques)',
            'Langues étrangères'
          ]
        }
      ]
    },
    economie: {
      title: 'Économie Guinéenne',
      content: [
        {
          title: 'Secteurs Clés',
          items: [
            'Mines (bauxite, or, diamants)',
            'Agriculture (riz, café, cacao)',
            'Services (commerce, transport)',
            'Tourisme (potentiel)',
            'Artisanat et petites entreprises'
          ]
        },
        {
          title: 'Monnaie et Banques',
          items: [
            'Franc guinéen (GNF)',
            'Banques commerciales',
            'Distributeurs automatiques',
            'Services de transfert d\'argent',
            'Cartes de crédit (limitées)'
          ]
        },
        {
          title: 'Opportunités d\'Affaires',
          items: [
            'Commerce et distribution',
            'Services aux entreprises',
            'Tourisme et hôtellerie',
            'Agriculture et agroalimentaire',
            'Technologies et innovation'
          ]
        }
      ]
    },
    tourisme: {
      title: 'Tourisme en Guinée',
      content: [
        {
          title: 'Sites Touristiques',
          items: [
            'Îles de Loos (Conakry)',
            'Chutes de la Soumba',
            'Mont Nimba (UNESCO)',
            'Fouta Djalon (montagnes)',
            'Plages de la côte atlantique'
          ]
        },
        {
          title: 'Activités',
          items: [
            'Randonnées et trekking',
            'Observation de la faune',
            'Plages et sports nautiques',
            'Visites culturelles',
            'Festivals et événements'
          ]
        },
        {
          title: 'Conseils aux Voyageurs',
          items: [
            'Visa et documents requis',
            'Vaccinations recommandées',
            'Assurance voyage',
            'Sécurité et précautions',
            'Respect des coutumes locales'
          ]
        }
      ]
    }
  };

  const getCurrentData = () => {
    return cultureData[activeSection] || cultureData.culture;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '2rem 0', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1f2937', margin: 0, marginBottom: '1rem' }}>
              🇬🇳 Vivre en Guinée
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', margin: 0, maxWidth: '600px', margin: '0 auto' }}>
              Découvrez tout ce qu'il faut savoir pour vivre, travailler et s'épanouir en Guinée
            </p>
          </div>
        </div>
      </div>

      {/* Navigation des sections */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            overflowX: 'auto',
            paddingBottom: '0.5rem'
          }}>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  backgroundColor: activeSection === section.id ? '#3b82f6' : '#f3f4f6',
                  color: activeSection === section.id ? 'white' : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  whiteSpace: 'nowrap',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{section.icon}</span>
                <span>{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div style={{ padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
            
            {/* Contenu principal */}
            <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem' }}>
                {getCurrentData().title}
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {getCurrentData().content.map((section, index) => (
                  <div key={index} style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    backgroundColor: '#f9fafb'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '600', 
                      color: '#374151', 
                      marginBottom: '1rem' 
                    }}>
                      {section.title}
                    </h3>
                    <ul style={{ 
                      margin: 0, 
                      paddingLeft: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}>
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} style={{ 
                          color: '#4b5563',
                          fontSize: '0.95rem',
                          lineHeight: '1.5'
                        }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Guide rapide */}
              <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
                  📋 Guide Rapide
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
                    <span>🏛️</span>
                    <span>Ambassades à Conakry</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
                    <span>🏥</span>
                    <span>Hôpitaux d'urgence</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
                    <span>🏦</span>
                    <span>Banques et change</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
                    <span>📱</span>
                    <span>Opérateurs télécoms</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
                    <span>🚌</span>
                    <span>Transport public</span>
                  </div>
                </div>
              </div>

              {/* Numéros utiles */}
              <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
                  📞 Numéros Utiles
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: '#4b5563' }}>🚨 Urgences</span>
                    <span style={{ fontWeight: '600', color: '#dc2626' }}>117</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: '#4b5563' }}>🚒 Pompiers</span>
                    <span style={{ fontWeight: '600', color: '#dc2626' }}>118</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: '#4b5563' }}>🏥 SAMU</span>
                    <span style={{ fontWeight: '600', color: '#dc2626' }}>119</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: '#4b5563' }}>📱 Orange</span>
                    <span style={{ fontWeight: '600', color: '#f97316' }}>+224 6xx</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: '#4b5563' }}>📱 MTN</span>
                    <span style={{ fontWeight: '600', color: '#f97316' }}>+224 6xx</span>
                  </div>
                </div>
              </div>

              {/* Conseils pratiques */}
              <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
                  💡 Conseils Pratiques
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  <div>• Respecter les coutumes locales</div>
                  <div>• Apprendre quelques mots en français</div>
                  <div>• Avoir toujours de la monnaie</div>
                  <div>• Se renseigner sur les horaires</div>
                  <div>• Garder ses documents sur soi</div>
                  <div>• Être patient et flexible</div>
                </div>
              </div>

              {/* Liens utiles */}
              <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
                  🔗 Liens Utiles
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <a href="#" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '0.875rem' }}>
                    🌐 Site officiel du gouvernement
                  </a>
                  <a href="#" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '0.875rem' }}>
                    🏛️ Ambassades et consulats
                  </a>
                  <a href="#" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '0.875rem' }}>
                    🏥 Hôpitaux et cliniques
                  </a>
                  <a href="#" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '0.875rem' }}>
                    🏦 Banques et services financiers
                  </a>
                  <a href="#" style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '0.875rem' }}>
                    🎓 Éducation et formation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VivreEnGuineePage;
