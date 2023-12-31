import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA60mLwi2WUY7yHFgt7eD3d2ITjlIwho04",
    authDomain: "fir-auth-9f9f7.firebaseapp.com",
    projectId: "fir-auth-9f9f7",
    storageBucket: "fir-auth-9f9f7.appspot.com",
    messagingSenderId: "800989360011",
    appId: "1:800989360011:web:047a109957e4b50522898e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const criar = async (email: string, password: string) =>{
  return await  createUserWithEmailAndPassword(auth, email, password);
};

const logar = async (email: string, password: string) =>{
  return await  signInWithEmailAndPassword(auth, email, password);
};

const enviarRecuperacaoSenha = async (email: string) => {
  return await sendPasswordResetEmail(auth, email);
};

export { db, auth, criar, logar, enviarRecuperacaoSenha };
