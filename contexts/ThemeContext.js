import { createContext, useContext, useState } from 'react';

// Créer le contexte — contexts/ThemeContext.js
const ThemeContext = createContext(null);

// Le Provider enveloppe l'app et fournit l'état
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    isDark,
    couleurs: {
      fond:   isDark ? '#1A1A2E' : '#FFFFFF',
      texte:  isDark ? '#FFFFFF' : '#000000',
      carte:  isDark ? '#2D2D44' : '#F5F5F5',
      accent: '#23B2A4',
    },
    basculer: () => setIsDark(prev => !prev),
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte facilement
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme doit être utilisé dans ThemeProvider');
  return ctx;
}
