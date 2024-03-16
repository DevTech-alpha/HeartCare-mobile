import React, { ReactNode } from "react";
import { AuthProvider } from "../hooks/AuthProvider";

interface AuthContext {
  children: ReactNode;
}

function AppProvider({ children }: AuthContext) {
  return <AuthProvider>{children}</AuthProvider>;
}

export { AppProvider };
