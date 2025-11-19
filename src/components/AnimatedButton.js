import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedButton = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  icon,
  loading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const { animations } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--accent-color)',
          color: 'white',
          border: 'none'
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--surface-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-primary)'
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--accent-color)',
          border: '1px solid var(--accent-color)'
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--text-primary)',
          border: 'none'
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '0.5rem 0.75rem',
          fontSize: 'var(--font-size-sm)',
          gap: '0.25rem'
        };
      case 'medium':
        return {
          padding: '0.75rem 1rem',
          fontSize: 'var(--font-size-base)',
          gap: '0.5rem'
        };
      case 'large':
        return {
          padding: '1rem 1.5rem',
          fontSize: 'var(--font-size-lg)',
          gap: '0.75rem'
        };
      default:
        return {};
    }
  };

  const buttonVariants = {
    rest: { 
      scale: 1,
      transition: {
        duration: animations ? 0.2 : 0.01,
        ease: "easeOut"
      }
    },
    hover: animations ? {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    } : {},
    tap: animations ? {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeOut"
      }
    } : {},
    loading: {
      scale: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const iconVariants = {
    rest: { rotate: 0 },
    hover: animations ? { rotate: 5 } : {},
    tap: animations ? { rotate: -5 } : {}
  };

  return (
    <motion.button
      className={`theme-transition ${className}`}
      variants={buttonVariants}
      initial="rest"
      whileHover={!disabled && !loading ? "hover" : "rest"}
      whileTap={!disabled && !loading ? "tap" : "rest"}
      animate={loading ? "loading" : "rest"}
      disabled={disabled || loading}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        borderRadius: 'var(--radius-md)',
        fontWeight: '500',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        boxShadow: 'var(--shadow-sm)',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...props.style
      }}
      {...props}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTop: '2px solid transparent',
            borderRadius: '50%'
          }}
        />
      ) : icon ? (
        <motion.div
          variants={iconVariants}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {icon}
        </motion.div>
      ) : null}
      
      {children}
    </motion.button>
  );
};

export default AnimatedButton;








