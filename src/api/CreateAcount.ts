import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export const criar = async (email: string, password: string) =>{
    return await  createUserWithEmailAndPassword(auth, email, password);
  };