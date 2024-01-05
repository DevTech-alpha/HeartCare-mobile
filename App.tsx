import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './src/hooks';
import { Router } from './src/routes/Router';
import theme from './src/theme';

export default function App() {
  return (
    <AppProvider>
   <NavigationContainer>
    <StatusBar backgroundColor={theme.COLORS.PRIMARY} barStyle="light-content"/>
    <Router/>
   </NavigationContainer>
    </AppProvider>
  );
}

