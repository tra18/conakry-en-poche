import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedCard = ({ 
  children, 
  className = '', 
  hover = true, 
  click = false,
  delay = 0,
  ...props 
}) => {
  const { animations } = useTheme();

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: animations ? 0.4 : 0.01,
        delay: animations ? delay : 0,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: hover && animations ? {
      y: -4,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    } : {},
    tap: click && animations ? {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    } : {}
  };

  return (
    <motion.div
      className={`theme-transition ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={hover ? "hover" : undefined}
      whileTap={click ? "tap" : undefined}
      style={{
        backgroundColor: 'var(--surface-primary)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-primary)',
        ...props.style
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;








