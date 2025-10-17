import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Volume2, 
  VolumeX,
  Bot,
  User,
  Loader
} from 'lucide-react';

const ChatInterface = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      initializeChat();
      initializeSpeechRecognition();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeChat = () => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'bot',
      text: "Bonjour ! Je suis Nimba, votre assistant virtuel pour Conakry. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date().toISOString()
    };
    setMessages([welcomeMessage]);
  };

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'fr-FR';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await getBotResponse(inputMessage);
      
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: response,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        
        // Speak the response
        if (!isMuted) {
          speakText(response);
        }
      }, 1000 + Math.random() * 2000); // Simulate thinking time
    } catch (error) {
      console.error('Error getting bot response:', error);
      setIsTyping(false);
    }
  };

  const getBotResponse = async (message) => {
    // Mock AI responses - replace with actual AI service
    const responses = {
      'bonjour': "Bonjour ! Comment puis-je vous aider à découvrir Conakry aujourd'hui ?",
      'restaurant': "Je peux vous recommander les meilleurs restaurants de Conakry. Que recherchez-vous ? Cuisine locale, internationale, ou quelque chose de spécifique ?",
      'hôtel': "Je connais les meilleurs hôtels de Conakry ! Voulez-vous un hôtel de luxe, économique, ou avec des services particuliers ?",
      'taxi': "Pour un taxi, je peux vous connecter avec ALLO Taxi. Voulez-vous que je trouve un taxi près de votre position ?",
      'pharmacie': "Je peux vous aider à trouver une pharmacie ouverte près de vous. Avez-vous besoin de médicaments spécifiques ?",
      'banque': "Je connais les banques et distributeurs de Conakry. Quelle banque recherchez-vous ?",
      'urgence': "Pour une urgence, composez le 117 (police), 18 (pompiers), ou 442 (SAMU). Voulez-vous que je vous aide à localiser le service d'urgence le plus proche ?",
      'météo': "Je peux vous donner des informations sur la météo à Conakry. Voulez-vous connaître les prévisions pour aujourd'hui ou les prochains jours ?",
      'transport': "Pour le transport à Conakry, vous avez plusieurs options : taxis, bus, ou location de voiture. Que préférez-vous ?",
      'shopping': "Je connais les meilleurs endroits pour faire du shopping à Conakry ! Marchés locaux, centres commerciaux, ou boutiques spécifiques ?"
    };

    const lowerMessage = message.toLowerCase();
    
    // Find matching response
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Default responses
    const defaultResponses = [
      "Je comprends votre question. Laissez-moi vous aider à trouver ce que vous cherchez sur Conakry.",
      "Excellente question ! Je peux vous orienter vers les meilleures options disponibles.",
      "Je suis là pour vous aider à découvrir Conakry. Pouvez-vous me donner plus de détails ?",
      "Conakry a beaucoup à offrir ! Dites-moi ce qui vous intéresse le plus.",
      "Je connais bien Conakry et ses services. Comment puis-je vous assister ?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  };

  const startCall = () => {
    setIsCalling(true);
    // Mock call functionality
    setTimeout(() => {
      setIsCalling(false);
      const callMessage = {
        id: Date.now(),
        type: 'bot',
        text: "Appel terminé. Comment puis-je vous aider autrement ?",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, callMessage]);
    }, 5000);
  };

  const endCall = () => {
    setIsCalling(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        ref={chatContainerRef}
        className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 w-full max-w-2xl h-[600px] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Nimba Assistant</h3>
              <p className="text-white/70 text-sm">En ligne</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className={`p-2 rounded-lg transition-colors ${
                isMuted 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 text-white/70 hover:bg-white/20 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white border border-white/20'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'bot' && (
                    <Bot className="w-5 h-5 mt-1 text-blue-400" />
                  )}
                  {message.type === 'user' && (
                    <User className="w-5 h-5 mt-1" />
                  )}
                  <div>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-white/50'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 text-white border border-white/20 p-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-blue-400" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="w-full p-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-500 focus:bg-white/15 transition-all duration-300 resize-none"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              <button
                onClick={isListening ? stopListening : startListening}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                  isListening 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
            {!isCalling ? (
              <button
                onClick={startCall}
                className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={endCall}
                className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
