import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, themes } from '../theme/theme';

interface ThemeContextData {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(themes.dark);

  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  async function loadThemeFromStorage() {
    try {
      const storedTheme = await AsyncStorage.getItem('themePreference');
      if (storedTheme !== null) {
        setTheme(storedTheme === 'dark' ? themes.dark : themes.light);
      }
    } catch (error) {
      console.error('Error loading theme from storage:', error);
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.dark : themes.light;
    setTheme(newTheme);
    AsyncStorage.setItem('themePreference', newTheme === themes.dark ? 'dark' : 'light');
  };

  const contextValue: ThemeContextData = {
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('deu erro na merda aqui nao tem');
  }

  return context;
}

export { useTheme, ThemeProvider };
