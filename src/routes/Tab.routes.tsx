import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { StatusBar, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Feed from "../screens/Feed";
import Query from "../screens/Query";
import Profile from "../screens/Profile";
import FAQ from "../screens/FAQ";
import { propsNavigationStack } from "./types";

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
            position: "absolute",
            borderTopColor: "transparent",
            padding: 15,
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 30,
            height: 80,
            ...styles.shadow,
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
                size={focused ? size + 10 : size}
                color={focused ? theme.COLORS.PRIMARY : theme.COLORS.ICON}
              />
            ),
            tabBarLabel: () => null,
          }}
        />
        <Screen
          name="FAQ"
          component={FAQ}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="alert-triangle"
                size={focused ? size + 10 : size}
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
                size={focused ? size + 10 : size}
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
                size={focused ? size + 10 : size}
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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
