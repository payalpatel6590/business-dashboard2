import React, { useState } from 'react';
import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext';
import { 
  SunIcon, 
  MoonIcon, 
  ComputerDesktopIcon 
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedThemeToggle: React.FC = () => {
  const { theme, effectiveTheme, toggleTheme, isTransitioning, isSystemDark } = useAdvancedTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  const getThemeIcon = () => {
    switch (effectiveTheme) {
      case 'light':
        return <SunIcon className="h-5 w-5" />;
      case 'dark':
        return <MoonIcon className="h-5 w-5" />;
      default:
        return <ComputerDesktopIcon className="h-5 w-5" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      case 'system':
        return `System (${isSystemDark ? 'Dark' : 'Light'})`;
      default:
        return 'System';
    }
  };

  const getNextThemeLabel = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    switch (nextTheme) {
      case 'light':
        return 'Switch to Light';
      case 'dark':
        return 'Switch to Dark';
      case 'system':
        return 'Switch to System';
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={toggleTheme}
        disabled={isTransitioning}
        className={`
          relative p-3 rounded-xl transition-all duration-300
          ${effectiveTheme === 'dark' 
            ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400 border border-gray-700' 
            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm'
          }
          ${isTransitioning ? 'scale-95 opacity-70' : 'hover:scale-105'}
        `}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={effectiveTheme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {getThemeIcon()}
          </motion.div>
        </AnimatePresence>
        
        {/* Theme indicator dot */}
        <motion.div
          className={`
            absolute -top-1 -right-1 w-3 h-3 rounded-full
            ${effectiveTheme === 'dark' ? 'bg-blue-400' : 'bg-orange-400'}
          `}
          animate={{ 
            scale: isTransitioning ? [1, 1.2, 1] : 1,
            opacity: isTransitioning ? 0.5 : 1
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute right-0 top-full mt-2 px-3 py-2 rounded-lg text-sm
              whitespace-nowrap z-50 pointer-events-none
              ${effectiveTheme === 'dark' 
                ? 'bg-gray-800 text-gray-200 border border-gray-700' 
                : 'bg-gray-900 text-white border border-gray-700'
              }
            `}
          >
            <div className="font-medium">{getThemeLabel()}</div>
            <div className="text-xs opacity-75 mt-1">{getNextThemeLabel()}</div>
            
            {/* Arrow */}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-inherit rotate-45 border-inherit border-t border-l" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedThemeToggle;
