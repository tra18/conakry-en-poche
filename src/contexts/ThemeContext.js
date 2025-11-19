import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [accentColor, setAccentColor] = useState('#3b82f6');
  const [fontSize, setFontSize] = useState('medium');
  const [animations, setAnimations] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  // Charger les préférences depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('conakry-theme');
    const savedAccentColor = localStorage.getItem('conakry-accent-color');
    const savedFontSize = localStorage.getItem('conakry-font-size');
    const savedAnimations = localStorage.getItem('conakry-animations');
    const savedHighContrast = localStorage.getItem('conakry-high-contrast');

    if (savedTheme) setTheme(savedTheme);
    if (savedAccentColor) setAccentColor(savedAccentColor);
    if (savedFontSize) setFontSize(savedFontSize);
    if (savedAnimations !== null) setAnimations(savedAnimations === 'true');
    if (savedHighContrast !== null) setHighContrast(savedHighContrast === 'true');
  }, []);

  // Sauvegarder les préférences
  useEffect(() => {
    localStorage.setItem('conakry-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('conakry-accent-color', accentColor);
  }, [accentColor]);

  useEffect(() => {
    localStorage.setItem('conakry-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('conakry-animations', animations.toString());
  }, [animations]);

  useEffect(() => {
    localStorage.setItem('conakry-high-contrast', highContrast.toString());
  }, [highContrast]);

  // Appliquer le thème au document
  useEffect(() => {
    const root = document.documentElement;
    
    // Thème de base
    root.setAttribute('data-theme', theme);
    
    // Couleur d'accent
    root.style.setProperty('--accent-color', accentColor);
    
    // Taille de police
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '20px'
    };
    root.style.setProperty('--base-font-size', fontSizeMap[fontSize]);
    
    // Contraste élevé
    root.setAttribute('data-high-contrast', highContrast.toString());
    
    // Animations
    root.setAttribute('data-animations', animations.toString());
  }, [theme, accentColor, fontSize, highContrast, animations]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setAccentColorValue = (color) => {
    setAccentColor(color);
  };

  const setFontSizeValue = (size) => {
    setFontSize(size);
  };

  const toggleAnimations = () => {
    setAnimations(prev => !prev);
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const resetToDefaults = () => {
    setTheme('light');
    setAccentColor('#3b82f6');
    setFontSize('medium');
    setAnimations(true);
    setHighContrast(false);
  };

  // Couleurs prédéfinies
  const accentColors = [
    { name: 'Bleu', value: '#3b82f6' },
    { name: 'Vert', value: '#10b981' },
    { name: 'Violet', value: '#8b5cf6' },
    { name: 'Rose', value: '#ec4899' },
    { name: 'Orange', value: '#f59e0b' },
    { name: 'Rouge', value: '#ef4444' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Emeraude', value: '#059669' }
  ];

  const value = {
    theme,
    accentColor,
    fontSize,
    animations,
    highContrast,
    toggleTheme,
    setAccentColorValue,
    setFontSizeValue,
    toggleAnimations,
    toggleHighContrast,
    resetToDefaults,
    accentColors
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};








