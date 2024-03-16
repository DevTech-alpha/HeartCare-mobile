import { AuthError } from "firebase/auth";
import { useLanguage } from "../../hooks/LanguageProvider";
import { firebaseErrorsIngles, firebaseErrorsPortugues } from "./firebase-error";

export const localizeErrorMap = (e: Error) => {
  const { language } = useLanguage();
  
  if (typeof (e as AuthError).code === "string") {
    const errorMap = language.TEXTO.PERGUNTAS === "INGLES" ? firebaseErrorsIngles : firebaseErrorsPortugues;
    
    if (errorMap.hasOwnProperty((e as AuthError).code)) {
      (e as AuthError).message = errorMap[(e as AuthError).code];
    }
  }
};
