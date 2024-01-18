import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../hooks/ThemeProvider"; 

import Consulta from "../screens/Query";
import Feed from "../screens/Feed";
import Perfil from "../screens/Profile";
import { propsNavigationStack } from "./Models";
import Map from "../screens/Map";

const { Navigator, Screen } = createBottomTabNavigator<propsNavigationStack>();

const { theme } = useTheme();

export function AppRoutes() {


  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.COLORS.BACKGROUND, // Use a cor apropriada do tema
        },
      }}
    >
      <Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="heart"
              size={focused ? size + 5 : size}
              color={focused ? theme.COLORS.PRIMARY : theme.COLORS.ICON}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Screen
        name="Mapa"
        component={Map}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="search"
              size={focused ? size + 5 : size}
              color={focused ? theme.COLORS.PRIMARY : theme.COLORS.ICON}
            />
          ),
          tabBarLabel: () => null,
        }}
      />

      <Screen
        name="Consulta"
        component={Consulta}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="calendar"
              size={focused ? size + 5 : size}
              color={focused ? theme.COLORS.PRIMARY : theme.COLORS.ICON}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Feather
              name="user"
              size={focused ? size + 5 : size}
              color={focused ? theme.COLORS.PRIMARY : theme.COLORS.ICON}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Navigator>
  );
}
