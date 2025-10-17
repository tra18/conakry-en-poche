import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { showInfo, showSuccess } = useNotification();

  // Afficher l'infobulle après 2 secondes au lancement
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Masquer l'infobulle après 5 secondes
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  // Base de connaissances pour les réponses
  const knowledgeBase = {
    'hôtel': {
      response: '🏨 Voici les meilleurs hôtels de Conakry :\n• Hôtel Riviera (4 étoiles)\n• Hôtel Palm Camayenne\n• Hôtel Noom\n• Hôtel Mariador Palace\n\nVoulez-vous plus de détails sur un hôtel spécifique ?',
      keywords: ['hôtel', 'hotel', 'hébergement', 'logement', 'nuitée']
    },
    'restaurant': {
      response: '🍽️ Les meilleurs restaurants de Conakry :\n• Restaurant Le Gourmet (cuisine guinéenne)\n• La Paillote (cuisine française)\n• Chez Moussa (cuisine africaine)\n• Le Bistrot (cuisine internationale)\n\nQuel type de cuisine vous intéresse ?',
      keywords: ['restaurant', 'manger', 'cuisine', 'repas', 'gastronomie']
    },
    'taxi': {
      response: '🚕 Service ALLO Taxi disponible 24h/24 :\n• Taxi Express : +224 111 222 333\n• Rapide Taxi : +224 444 555 666\n• Taxi Conakry : +224 777 888 999\n\nAppelez directement ou utilisez notre service en ligne !',
      keywords: ['taxi', 'transport', 'aller', 'déplacement', 'voiture']
    },
    'administration': {
      response: '🏛️ Services administratifs à Conakry :\n• Mairie de Conakry : Quartier du Port\n• Préfecture : Centre-ville\n• Ambassades : Quartier Almamya\n• Services publics : Quartier Dixinn\n\nQuel service administratif cherchez-vous ?',
      keywords: ['administration', 'mairie', 'préfecture', 'ambassade', 'papiers']
    },
    'loisirs': {
      response: '🎭 Activités et loisirs à Conakry :\n• Marché de Madina (artisanat)\n• Plage de Rogbané (détente)\n• Centre culturel franco-guinéen\n• Stade du 28 septembre (sport)\n\nQuelle activité vous intéresse ?',
      keywords: ['loisirs', 'activité', 'plage', 'sport', 'culture', 'divertissement']
    },
    'urgence': {
      response: '🚨 Numéros d\'urgence en Guinée :\n• Police : 117\n• Pompiers : 18\n• SAMU : 442-020-020\n• Ambassade France : +224 30 45 10 00\n\nEn cas d\'urgence, composez directement ces numéros !',
      keywords: ['urgence', 'urgence', 'police', 'pompiers', 'ambulance', 'sécurité']
    }
  };

  const findBestResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    for (const [category, data] of Object.entries(knowledgeBase)) {
      for (const keyword of data.keywords) {
        if (lowerQuestion.includes(keyword)) {
          return data.response;
        }
      }
    }
    
    return 'Je suis Nimba, votre assistant pour Conakry ! Je peux vous aider avec :\n• Hôtels et hébergements\n• Restaurants et gastronomie\n• Transport et taxis\n• Services administratifs\n• Loisirs et activités\n• Numéros d\'urgence\n\nPosez-moi votre question !';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      showInfo('Veuillez saisir un message.');
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simuler une réponse de l'IA
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: findBestResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      showSuccess('Nimba a répondu à votre question !');
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Bouton flottant de l'assistant */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000
      }}>
        {/* Infobulle */}
        {showTooltip && !isOpen && (
          <div style={{
            position: 'absolute',
            bottom: '80px',
            right: '0',
            backgroundColor: '#374151',
            color: 'white',
            padding: '1rem',
            borderRadius: '0.75rem',
            maxWidth: '300px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            animation: 'fadeInUp 0.3s ease-out'
          }}>
            <div style={{
              position: 'absolute',
              bottom: '-8px',
              right: '20px',
              width: '0',
              height: '0',
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #374151'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <img 
                src="/ai-assistant-icon.svg" 
                alt="Assistant IA" 
                style={{
                  width: '24px',
                  height: '24px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  marginRight: '0.5rem'
                }}
              />
              <span style={{ fontWeight: '600' }}>Nimba - Assistant IA</span>
            </div>
            <p style={{ fontSize: '0.875rem', margin: 0, lineHeight: '1.4' }}>
              Bonjour ! Je suis là pour vous aider à découvrir Conakry. 
              Cliquez pour me poser vos questions !
            </p>
          </div>
        )}

        {/* Bouton principal */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#374151',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            transition: 'all 0.3s ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            overflow: 'hidden'
          }}
        >
          {isOpen ? '✕' : (
            <img 
              src="/ai-assistant-icon.svg" 
              alt="Assistant IA" 
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'cover',
                borderRadius: '50%'
              }}
            />
          )}
        </button>
      </div>

      {/* Interface de chat */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '350px',
          height: '500px',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001,
          border: '1px solid #e5e7eb'
        }}>
          {/* Header du chat */}
          <div style={{
            backgroundColor: '#374151',
            color: 'white',
            padding: '1rem',
            borderRadius: '1rem 1rem 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="/ai-assistant-icon.svg" 
                alt="Assistant IA" 
                style={{
                  width: '32px',
                  height: '32px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  marginRight: '0.5rem'
                }}
              />
              <div>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Nimba</h3>
                <p style={{ margin: 0, fontSize: '0.75rem', opacity: '0.8' }}>Assistant IA</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.25rem'
              }}
            >
              ✕
            </button>
          </div>

          {/* Zone des messages */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {messages.length === 0 && (
              <div style={{
                textAlign: 'center',
                color: '#6b7280',
                padding: '2rem 1rem'
              }}>
                <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                  <img 
                    src="/ai-assistant-icon.svg" 
                    alt="Assistant IA" 
                    style={{
                      width: '48px',
                      height: '48px',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                  Bonjour ! Je suis Nimba, votre assistant pour Conakry. 
                  Posez-moi vos questions !
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem',
                  backgroundColor: message.sender === 'user' ? '#374151' : '#f3f4f6',
                  color: message.sender === 'user' ? 'white' : '#374151',
                  fontSize: '0.875rem',
                  lineHeight: '1.4',
                  whiteSpace: 'pre-line'
                }}>
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{
                display: 'flex',
                justifyContent: 'flex-start'
              }}>
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem',
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  Nimba tape...
                </div>
              </div>
            )}
          </div>

          {/* Zone de saisie */}
          <div style={{
            padding: '1rem',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question..."
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              style={{
                backgroundColor: '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                opacity: inputMessage.trim() ? 1 : 0.5,
                fontSize: '0.875rem'
              }}
            >
              Envoyer
            </button>
          </div>
        </div>
      )}

      {/* Styles CSS pour l'animation */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default AIAssistant;
