import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { localizeErrorMap } from "../utils/firebaseTranslator";

export const enviarRecuperacaoSenha = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    if (error instanceof Error) {
      localizeErrorMap(error);
    }
    throw error;
  }
};
