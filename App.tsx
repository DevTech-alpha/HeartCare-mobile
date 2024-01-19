import React from 'react';
import { AppRoutes } from './src/routes/Tab.routes';
import { ThemeProvider } from './src/hooks/ThemeProvider';
import { AuthProvider } from './src/hooks/AuthProvider';


export default function App(): React.JSX.Element {
  

  return (
    <AuthProvider>
      <ThemeProvider>
          <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}
