import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
}

interface AdvancedThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  isSystemDark: boolean;
  effectiveTheme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isTransitioning: boolean;
}

const lightColors: ThemeColors = {
  primary: '#3b82f6',
  secondary: '#6366f1',
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#1f2937',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  accent: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444'
};

const darkColors: ThemeColors = {
  primary: '#60a5fa',
  secondary: '#818cf8',
  background: '#0f172a',
  surface: '#1e293b',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  border: '#334155',
  accent: '#a78bfa',
  success: '#34d399',
  warning: '#fbbf24',
  error: '#f87171'
};

const AdvancedThemeContext = createContext<AdvancedThemeContextType | undefined>(undefined);

export const useAdvancedTheme = (): AdvancedThemeContextType => {
  const context = useContext(AdvancedThemeContext);
  if (context === undefined) {
    throw new Error('useAdvancedTheme must be used within an AdvancedThemeProvider');
  }
  return context;
};

interface AdvancedThemeProviderProps {
  children: ReactNode;
}

export const AdvancedThemeProvider: React.FC<AdvancedThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'system';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSystemDark, setIsSystemDark] = useState(false);

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsSystemDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const effectiveTheme = theme === 'system' ? (isSystemDark ? 'dark' : 'light') : theme;
  const colors = effectiveTheme === 'dark' ? darkColors : lightColors;

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Add transition class for smooth color changes
    setIsTransitioning(true);
    root.style.setProperty('--color-transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)');
    
    // Apply theme class
    root.classList.remove('light', 'dark');
    root.classList.add(effectiveTheme);
    
    // Set CSS custom properties for dynamic theming
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Remove transition after animation
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      root.style.removeProperty('--color-transition');
    }, 300);

    return () => clearTimeout(timer);
  }, [effectiveTheme, colors]);

  const toggleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const value: AdvancedThemeContextType = {
    theme,
    colors,
    isSystemDark,
    effectiveTheme,
    toggleTheme,
    setTheme,
    isTransitioning
  };

  return (
    <AdvancedThemeContext.Provider value={value}>
      {children}
    </AdvancedThemeContext.Provider>
  );
};
