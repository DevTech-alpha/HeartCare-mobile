import React, { useState, useEffect, ReactNode } from "react";
import { themes } from "../utils/theme";
import { Theme } from "../utils/theme/Models/theme";
import { ThemeContext } from "../context/ThemeContext";
import { asyncGetTheme, asyncSetTheme } from "../utils/storage/ThemeStorage";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(themes.dark);

  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  const loadThemeFromStorage = async () => {
    try {
      const storedTheme = await asyncGetTheme();
      if (storedTheme !== null) {
        setTheme(storedTheme === "dark" ? themes.dark : themes.light);
      }
    } catch (error) {
      console.error("Error loading theme from storage:", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.dark : themes.light;
    setTheme(newTheme);
    asyncSetTheme(newTheme === themes.dark ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
