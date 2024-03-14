import React from "react";
import { ThemeProvider } from "./src/hooks/ThemeProvider";
import { AuthProvider } from "./src/hooks/AuthProvider";
import { Router } from "./src/routes";

export default function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  );
}
