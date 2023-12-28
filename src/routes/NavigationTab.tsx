import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";


import Mapa from "../screens/Map";
import Consulta from "../screens/Query";
import Feed from "../screens/Feed";
import FAQScreen from "../screens/FAQ/Index";
import Perfil from "../screens/Perfil";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFF', 
        },
      }}
    >
      <Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="home"
              size={focused ? size + 5 : size} 
              color={focused ? 'red' : color} 
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Screen
        name="Mapa"
        component={Mapa}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="map"
              size={focused ? size + 5 : size}
              color={focused ? 'red' : color}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Screen
        name="FAQ"
        component={FAQScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="list"
              size={focused ? size + 5 : size}
              color={focused ? 'red' : color}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
       <Screen
        name="Consulta"
        component={Consulta}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="edit"
              size={focused ? size + 5 : size}
              color={focused ? 'red' : color}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="user"
              size={focused ? size + 5 : size}
              color={focused ? 'red' : color}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
