import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export const logar = async (email: string, password: string) =>{
    return await  signInWithEmailAndPassword(auth, email, password);
  };