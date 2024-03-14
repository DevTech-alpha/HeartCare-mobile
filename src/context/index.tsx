import React from "react";
import { AuthProvider } from "../hooks/AuthProvider";
import { ThemeProvider } from "../hooks/ThemeProvider";

const Context = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
};

export default Context;
