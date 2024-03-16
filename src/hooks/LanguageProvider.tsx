import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Language, languages } from "../utils/language/language";

interface LanguageContextData {
  language: Language;
  toggleLanguage: () => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext({} as LanguageContextData);

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setlanguage] = useState<Language>(languages.INGLES);

  useEffect(() => {
    loadLanguageFromStorage();
  }, []);

  async function loadLanguageFromStorage() {
    try {
      const storedLanguage = await AsyncStorage.getItem("heartcare@Language");
      if (storedLanguage !== null) {
        setlanguage(
          storedLanguage === "PORTUGUES"
            ? languages.PORTUGUES
            : languages.INGLES
        );
      }
    } catch (error) {
      console.error("Error loading Language from storage:", error);
    }
  }

  const toggleLanguage = () => {
    const newLanguage =
      language === languages.INGLES ? languages.PORTUGUES : languages.INGLES;
    setlanguage(newLanguage);
    AsyncStorage.setItem(
      "heartcare@Language",
      newLanguage === languages.PORTUGUES ? "PORTUGUES" : "INGLES"
    );
  };

  const contextValue: LanguageContextData = {
    language,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

function useLanguage(): LanguageContextData {
  return useContext(LanguageContext);
}

export { useLanguage, LanguageProvider };
