import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { propsNavigationStack } from "./types";
import { StatusBar } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Feed from "../screens/Feed";
import Alert from "../screens/Alert";
import Query from "../screens/Query";
import Profile from "../screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator<propsNavigationStack>();

export default function TabRoutes() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar
        backgroundColor={theme.COLORS.PRIMARY}
        barStyle="light-content"
      />
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.COLORS.BACKGROUND,
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
          name="Alert"
          component={Alert}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="alert-circle"
                size={focused ? size + 5 : size}
                color={focused ? theme.COLORS.PRIMARY : theme.COLORS.ICON}
              />
            ),
            tabBarLabel: () => null,
          }}
        />

        <Screen
          name="Query"
          component={Query}
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
          name="Profile"
          component={Profile}
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
    </>
  );
}
