import React, { useEffect, useState, ReactNode } from "react";
import { Alert } from "react-native";
import { logar } from "../api/LogInToAccount";
import { DB_USER } from "../model/User";
import { AuthContext, SignCredentials } from "../context/AuthContext";
import { asyncGetUser, asyncSetUser } from "../utils/storage/AuthStorage";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authData, setAuthData] = useState<DB_USER>();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFromStorage();
  }, []);

  async function loadFromStorage() {
    const user = await asyncGetUser();
    setIsLoading(true);
    if (user) {
      setAuthData(user);
    }
    setIsLoading(false);
  }

  async function signIn({ email, password }: SignCredentials) {
    try {
      setLoading(true);
      const { user } = await logar(email, password);

      await asyncSetUser(user);
      setAuthData(user as any);
      setLoading(false);
    } catch (err: any) {
      Alert.alert("Atenção", err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authData,
        signIn,
        isLoading,
        setAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
