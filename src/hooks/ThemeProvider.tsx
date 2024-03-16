import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themes } from "../utils/theme";
import { Theme } from "../utils/theme/Models/theme";

interface ThemeContextData {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext({} as ThemeContextData);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(themes.dark);

  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  async function loadThemeFromStorage() {
    try {
      const storedTheme = await AsyncStorage.getItem("heartcare@theme");
      if (storedTheme !== null) {
        setTheme(storedTheme === "dark" ? themes.dark : themes.light);
      }
    } catch (error) {
      console.error("Error loading theme from storage:", error);
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.dark : themes.light;
    setTheme(newTheme);
    AsyncStorage.setItem(
      "heartcare@theme",
      newTheme === themes.dark ? "dark" : "light"
    );
  };

  const contextValue: ThemeContextData = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextData {
  return useContext(ThemeContext);
}

export { useTheme, ThemeProvider };
