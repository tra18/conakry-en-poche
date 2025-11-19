import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Sun, 
  Moon, 
  Palette, 
  Type, 
  Zap, 
  Eye, 
  RotateCcw,
  Settings,
  ChevronDown
} from 'lucide-react';

const ThemeToggle = () => {
  const {
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
  } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('theme');

  const tabs = [
    { id: 'theme', label: 'Thème', icon: theme === 'light' ? Sun : Moon },
    { id: 'colors', label: 'Couleurs', icon: Palette },
    { id: 'typography', label: 'Texte', icon: Type },
    { id: 'accessibility', label: 'Accessibilité', icon: Eye }
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Petit', size: '14px' },
    { value: 'medium', label: 'Moyen', size: '16px' },
    { value: 'large', label: 'Grand', size: '18px' },
    { value: 'xlarge', label: 'Très grand', size: '20px' }
  ];

  return (
    <div style={{ position: 'relative' }}>
      {/* Bouton principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="theme-transition"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--surface-primary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-lg)',
          cursor: 'pointer',
          fontSize: 'var(--font-size-sm)',
          fontWeight: '500',
          boxShadow: 'var(--shadow-primary)',
          transition: 'all var(--transition-normal)'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'var(--surface-secondary)';
          e.target.style.transform = 'translateY(-1px)';
          e.target.style.boxShadow = 'var(--shadow-elevated)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'var(--surface-primary)';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'var(--shadow-primary)';
        }}
      >
        <Settings size={18} />
        <span>Personnaliser</span>
        <ChevronDown 
          size={16} 
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform var(--transition-normal)'
          }}
        />
      </button>

      {/* Panneau de personnalisation */}
      {isOpen && (
        <div
          className="animate-scale-in"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '0.5rem',
            width: '320px',
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-elevated)',
            zIndex: 1000,
            overflow: 'hidden'
          }}
        >
          {/* En-tête avec onglets */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-primary)',
            backgroundColor: 'var(--bg-secondary)'
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: activeTab === tab.id ? 'var(--accent-100)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--accent-700)' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: '500',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <tab.icon size={14} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Contenu des onglets */}
          <div style={{ padding: '1.5rem' }}>
            {/* Onglet Thème */}
            {activeTab === 'theme' && (
              <div>
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  Thème
                </h3>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <button
                    onClick={toggleTheme}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      backgroundColor: theme === 'light' ? 'var(--accent-100)' : 'var(--surface-secondary)',
                      color: theme === 'light' ? 'var(--accent-700)' : 'var(--text-secondary)',
                      border: `2px solid ${theme === 'light' ? 'var(--accent-300)' : 'var(--border-primary)'}`,
                      borderRadius: 'var(--radius-lg)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: '500',
                      transition: 'all var(--transition-normal)'
                    }}
                  >
                    <Sun size={20} />
                    <span>Clair</span>
                  </button>
                  
                  <button
                    onClick={toggleTheme}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      backgroundColor: theme === 'dark' ? 'var(--accent-100)' : 'var(--surface-secondary)',
                      color: theme === 'dark' ? 'var(--accent-700)' : 'var(--text-secondary)',
                      border: `2px solid ${theme === 'dark' ? 'var(--accent-300)' : 'var(--border-primary)'}`,
                      borderRadius: 'var(--radius-lg)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: '500',
                      transition: 'all var(--transition-normal)'
                    }}
                  >
                    <Moon size={20} />
                    <span>Sombre</span>
                  </button>
                </div>

                <button
                  onClick={resetToDefaults}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'var(--surface-secondary)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: 'var(--font-size-sm)',
                    transition: 'all var(--transition-normal)'
                  }}
                >
                  <RotateCcw size={16} />
                  <span>Réinitialiser</span>
                </button>
              </div>
            )}

            {/* Onglet Couleurs */}
            {activeTab === 'colors' && (
              <div>
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  Couleur d'accent
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  {accentColors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setAccentColorValue(color.value)}
                      style={{
                        width: '100%',
                        height: '40px',
                        backgroundColor: color.value,
                        border: `2px solid ${accentColor === color.value ? 'var(--text-primary)' : 'transparent'}`,
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-normal)',
                        position: 'relative'
                      }}
                      title={color.name}
                    >
                      {accentColor === color.value && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Onglet Typographie */}
            {activeTab === 'typography' && (
              <div>
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  Taille du texte
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {fontSizeOptions.map(option => (
            <button
                      key={option.value}
                      onClick={() => setFontSizeValue(option.value)}
                      style={{
                        padding: '0.75rem',
                        backgroundColor: fontSize === option.value ? 'var(--accent-100)' : 'var(--surface-secondary)',
                        color: fontSize === option.value ? 'var(--accent-700)' : 'var(--text-secondary)',
                        border: `1px solid ${fontSize === option.value ? 'var(--accent-300)' : 'var(--border-primary)'}`,
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: option.size,
                        fontWeight: '500',
                        transition: 'all var(--transition-normal)'
                      }}
                    >
                      <span>{option.label}</span>
                      <span style={{ fontSize: 'var(--font-size-xs)', opacity: 0.7 }}>
                        {option.size}
              </span>
            </button>
                  ))}
                </div>
              </div>
            )}

            {/* Onglet Accessibilité */}
            {activeTab === 'accessibility' && (
              <div>
                <h3 style={{
                  margin: '0 0 1rem 0',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: '600',
                  color: 'var(--text-primary)'
                }}>
                  Accessibilité
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer',
                    padding: '0.75rem',
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'all var(--transition-normal)'
                  }}>
                    <input
                      type="checkbox"
                      checked={animations}
                      onChange={toggleAnimations}
                      style={{ margin: 0 }}
                    />
                    <Zap size={18} />
                    <div>
                      <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                        Animations
                      </div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>
                        Activer les animations et transitions
                      </div>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer',
                    padding: '0.75rem',
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'all var(--transition-normal)'
                  }}>
                    <input
                      type="checkbox"
                      checked={highContrast}
                      onChange={toggleHighContrast}
                      style={{ margin: 0 }}
                    />
                    <Eye size={18} />
                    <div>
                      <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                        Contraste élevé
                      </div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)' }}>
                        Améliorer le contraste pour l'accessibilité
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>
      </div>
      )}

      {/* Overlay pour fermer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            backgroundColor: 'transparent'
          }}
        />
      )}
    </div>
  );
};

export default ThemeToggle;