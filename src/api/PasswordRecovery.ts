import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebase";
import { localizeErrorMap } from "../utils/firebase/firebaseTranslator";

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
