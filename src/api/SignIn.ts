import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../utils/firebase";
import { localizeErrorMap } from "../utils/firebase/firebaseTranslator";

export const signInApi = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof Error) {
      localizeErrorMap(error);
    }
    throw error;
  }
};
