import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { asyncGetUser, asyncSetUser } from "../utils/store";
import { logar } from "../api/LogInToAccount";
import { DB_USER } from "../model/User";

interface SignCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  authData?: DB_USER;
  setAuthData: React.Dispatch<React.SetStateAction<DB_USER | undefined>>;
  signIn: (credentials: SignCredentials) => Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authData, setAuthData] = useState<DB_USER>();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFromStorage();
  }, [])

  async function loadFromStorage() {

    const user = await asyncGetUser();
    console.log(user)
    setIsLoading(true)
    if (user) {
      setAuthData(user);
    }
    setIsLoading(false)
  }

  async function signIn({ email, password }: SignCredentials) {
    try {
      setLoading(true);
      const { user } = await logar(email, password)

      await asyncSetUser(user)
      setAuthData(user as any) //fiquei sem paciencia para tipar 
      setLoading(false);
    } catch (err: any) {
      Alert.alert('Atenção', err.message)
    } finally {
      setLoading(false);
    }
  }

  return <AuthContext.Provider value={{
    authData,
    signIn,
    isLoading,
    setAuthData
  }}>{children}</AuthContext.Provider>
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }