import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { localizeErrorMap } from "../utils/firebaseTranslator";


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