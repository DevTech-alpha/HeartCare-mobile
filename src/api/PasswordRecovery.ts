import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";

export const enviarRecuperacaoSenha = async (email: string) => {
    return await sendPasswordResetEmail(auth, email);
  };