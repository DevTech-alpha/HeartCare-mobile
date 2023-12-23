import React from 'react';
import { createNativeStackNavigator,
   NativeStackNavigationProp } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Mapa from '../screens/Mapa';
import Cadastrar from '../screens/Cadastro';
import Tarefas from '../screens/Tarefas';

const Stack = createNativeStackNavigator();

type StackNavigation= {
  Home: undefined;
  Login: undefined;
  Cadastrar: undefined;
  Mapa: undefined;
  Tarefas: undefined;
};

// Define StackNavigationProp type
export type StackTypes = NativeStackNavigationProp<StackNavigation>;


// Component function
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
        name="Tarefas"
        component={Tarefas}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
