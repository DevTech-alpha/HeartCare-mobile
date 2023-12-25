import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import Mapa from "../screens/Map";
import Consulta from "../screens/Query";
import Feed from "../screens/Feed";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: () => {
            return <Feather name="home" size={25} color="#000" />;
          },
        }}
      />
      <Screen
        name="Mapa"
        component={Mapa}
        options={{
          tabBarIcon: () => {
            return <Feather name="map" size={25} color="#000" />;
          },
        }}
      />
      <Screen
        name="Consulta"
        component={Consulta}
        options={{
          tabBarIcon: () => {
            return <Feather name="search" size={25} color="#000" />;
          },
        }}
      />

    </Navigator>
  );
}

// Wrap the entire application with NavigationContainer
export default function App() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
