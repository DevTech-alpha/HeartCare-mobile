import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/NavigationStack';

export default function App() {
  return (
   <NavigationContainer>
    <StatusBar backgroundColor="#e61919" barStyle="light-content"/>
    <Routes/>
   </NavigationContainer>
  );
}

