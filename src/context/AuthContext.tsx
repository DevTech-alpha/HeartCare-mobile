import React, { createContext, useContext, useState } from "react";
import { User } from "firebase/auth";
import Credentials from "../models/Credentials";

interface AuthContextData {
  authData?: User;
  setAuthData: React.Dispatch<React.SetStateAction<User | undefined>>;
  signIn: (credentials: Credentials) => Promise<void>;
  signUp: (credentials: Credentials) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextData>({
  isLoading: false,
  setAuthData: () => {},
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de um AuthProvider");
  }
  return context;
};
