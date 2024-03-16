import React from "react";
import { AuthProvider } from "./src/hooks/AuthProvider";
import { ThemeProvider } from "./src/hooks/ThemeProvider";
import { Router } from "./src/routes";
import { LanguageProvider } from "./src/hooks/LanguageProvider";

export default function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
