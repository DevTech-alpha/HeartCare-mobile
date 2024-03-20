import React, { useEffect, useState, ReactNode } from "react";
import { languages } from "../utils/language";
import { Language } from "../utils/language/Models/language";
import { LanguageContext, LanguageContextData } from "../context/LanguageContext";
import { asyncGetLanguage, asyncSetLanguage } from "../utils/storage/LanguageStorage";

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(languages.INGLES);

  useEffect(() => {
    loadLanguageFromStorage();
  }, []);

  const loadLanguageFromStorage = async () => {
    try {
      const storedLanguage = await asyncGetLanguage();
      if (storedLanguage !== null) {
        setLanguage(
          storedLanguage === "PORTUGUES"
            ? languages.PORTUGUES
            : languages.INGLES
        );
      }
    } catch (error) {
      console.error("Error loading Language from storage:", error);
    }
  };

  const toggleLanguage = () => {
    const newLanguage =
      language === languages.INGLES ? languages.PORTUGUES : languages.INGLES;
    setLanguage(newLanguage);
    asyncSetLanguage(
      newLanguage === languages.PORTUGUES ? "PORTUGUES" : "INGLES"
    );
  };

  const contextValue: LanguageContextData = {
    language,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
