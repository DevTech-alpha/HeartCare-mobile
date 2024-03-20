import { createContext, useContext } from "react";
import { Language } from "../utils/language/Models/language";

export interface LanguageContextData {
  language: Language;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextData>(
  {} as LanguageContextData
);

export const useLanguage = (): LanguageContextData => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
