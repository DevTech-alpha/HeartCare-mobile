import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/hooks/Auth';
import { AppRoutes } from './src/routes/Tab.routes';
import { ThemeProvider, useTheme } from './src/hooks/ThemeProvider';

export default function App(): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar backgroundColor={theme.COLORS.PRIMARY} barStyle="light-content" />
          <AppRoutes />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}
