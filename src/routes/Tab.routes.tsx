import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";


import Consulta from "../screens/Query";
import Feed from "../screens/Feed";
import Perfil from "../screens/Profile";
import { propsNavigationStack } from "./Models";
import theme from "../theme";
import Map from "../screens/Map";

const { Navigator, Screen } = createBottomTabNavigator<propsNavigationStack>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.COLORS.WHITE,
        },
      }}
    >
      <Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="heart"
              size={focused ? size + 5 : size}
              color={focused ? theme.COLORS.PRIMARY : color}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Screen
        name="Mapa"
        component={Map}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="search"
              size={focused ? size + 5 : size}
              color={focused ? theme.COLORS.PRIMARY : color}
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
              name="calendar"
              size={focused ? size + 5 : size}
              color={focused ? theme.COLORS.PRIMARY : color}
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
              color={focused ? theme.COLORS.PRIMARY : color}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Navigator>
  );
}
