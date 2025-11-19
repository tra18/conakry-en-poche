import { useState, useEffect, useRef } from 'react';

// Hook personnalisé pour la reconnaissance vocale
export const useSpeechRecognition = (language = 'fr-FR') => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Vérifier si la reconnaissance vocale est supportée
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      setError('La reconnaissance vocale n\'est pas supportée par votre navigateur');
      return;
    }

    setIsSupported(true);
    
    // Initialiser la reconnaissance vocale
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      // Mettre à jour avec la transcription finale (accumulée) et l'interim
      if (finalTranscript) {
        setTranscript(prev => (prev + finalTranscript).trim());
      } else if (interimTranscript) {
        // Pour l'interim, on remplace juste la partie interim
        setTranscript(prev => {
          // Extraire la partie finale (sans interim) et ajouter le nouveau interim
          const finalPart = prev.replace(/\s*$/, '');
          return finalPart + (finalPart ? ' ' : '') + interimTranscript;
        });
      }
    };

    recognition.onerror = (event) => {
      console.error('Erreur de reconnaissance vocale:', event.error);
      
      let errorMessage = 'Erreur de reconnaissance vocale';
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'Aucune parole détectée. Parlez plus fort ou vérifiez votre microphone.';
          break;
        case 'audio-capture':
          errorMessage = 'Aucun microphone détecté. Vérifiez vos paramètres.';
          break;
        case 'not-allowed':
          errorMessage = 'Permission microphone refusée. Autorisez l\'accès au microphone.';
          break;
        case 'network':
          errorMessage = 'Erreur réseau. Vérifiez votre connexion.';
          break;
        default:
          errorMessage = `Erreur: ${event.error}`;
      }
      
      setError(errorMessage);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]);

  const startListening = () => {
    if (!isSupported) {
      setError('La reconnaissance vocale n\'est pas supportée');
      return;
    }

    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setError(null);
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Erreur lors du démarrage:', err);
        setError('Impossible de démarrer la reconnaissance vocale');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const resetTranscript = () => {
    setTranscript('');
    setError(null);
  };

  return {
    isListening,
    transcript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  };
};

