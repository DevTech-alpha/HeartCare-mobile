import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { localizeErrorMap } from "../utils/firebaseTranslator";

export const logar = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    if (error instanceof Error) {
      localizeErrorMap(error);
    }
    throw error;
  }
};
