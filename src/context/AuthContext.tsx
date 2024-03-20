import React, { createContext, useContext } from "react";
import { DB_USER } from "../model/User";

export interface SignCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  authData?: DB_USER;
  setAuthData: React.Dispatch<React.SetStateAction<DB_USER | undefined>>;
  signIn: (credentials: SignCredentials) => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
