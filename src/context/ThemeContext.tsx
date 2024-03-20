import { createContext, useContext } from "react";
import { Theme } from "../utils/theme/Models/theme";

interface ThemeContextData {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData
);

export const useTheme = (): ThemeContextData => useContext(ThemeContext);
