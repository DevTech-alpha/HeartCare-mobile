import { AuthErrorCodes, UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { localizeErrorMap } from "../components/firebaseTranslator";


export const criar = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    if (error instanceof Error) {
      localizeErrorMap(error);
    }
    throw error;
  }
};