import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './src/hooks';
import { Router } from './src/routes/Router';

export default function App() {
  return (
    <AppProvider>
   <NavigationContainer>
    <StatusBar backgroundColor="#e61919" barStyle="light-content"/>
    <Router/>
   </NavigationContainer>
    </AppProvider>
  );
}

