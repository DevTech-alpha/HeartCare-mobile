import React from 'react';
import { createNativeStackNavigator,
   NativeStackNavigationProp } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Login from '../screens/SignIn';
import Mapa from '../screens/Map';
import Cadastrar from '../screens/SignUp';
import Consulta from '../screens/Query';
import Principal from '../screens/Main'

const Stack = createNativeStackNavigator();

type StackNavigation= {
  Home: undefined;
  Login: undefined;
  Cadastrar: undefined;
  Mapa: undefined;
  Consulta: undefined;
  Principal:undefined;
};


export type StackTypes = NativeStackNavigationProp<StackNavigation>;


export default function StackComponent() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastrar"
        component={Cadastrar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Mapa"
        component={Mapa}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Consulta"
        component={Consulta}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="Principal"
        component={Principal}
        options={{ headerShown: false }}
      />
       
      
    </Stack.Navigator>
  );
}
