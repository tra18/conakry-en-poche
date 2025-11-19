import frTranslations from '../locales/fr.json';
import enTranslations from '../locales/en.json';

const translations = {
  fr: frTranslations,
  en: enTranslations
};

/**
 * Récupère une traduction par clé
 * @param {string} language - Code de la langue ('fr' ou 'en')
 * @param {string} key - Clé de traduction (ex: 'header.home' ou 'home.title')
 * @param {object} params - Paramètres optionnels pour remplacer des variables
 * @returns {string} - Texte traduit
 */
export const t = (language, key, params = {}) => {
  const lang = language || 'fr';
  const keys = key.split('.');
  let value = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      // Si la clé n'existe pas, essayer en français comme fallback
      if (lang !== 'fr') {
        let fallbackValue = translations.fr;
        for (const fk of keys) {
          if (fallbackValue && typeof fallbackValue === 'object') {
            fallbackValue = fallbackValue[fk];
          } else {
            return key; // Retourner la clé si aucune traduction n'est trouvée
          }
        }
        return fallbackValue || key;
      }
      return key;
    }
  }

  // Remplacer les paramètres dans la chaîne
  if (typeof value === 'string' && params) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
      return params[paramKey] !== undefined ? params[paramKey] : match;
    });
  }

  return value || key;
};

/**
 * Hook personnalisé pour utiliser les traductions
 * @param {string} language - Code de la langue
 * @returns {function} - Fonction de traduction
 */
export const useTranslation = (language) => {
  return (key, params) => t(language, key, params);
};

export default translations;

