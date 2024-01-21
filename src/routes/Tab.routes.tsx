import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "../hooks/ThemeProvider"

import Consulta from "../screens/MyMeasurements"
import Feed from "../screens/Feed"
import Perfil from "../screens/Profile"
import { propsNavigationStack } from "./Models"
import { StatusBar } from "react-native"
import FAQ from "../screens/FAQ"

const { Navigator, Screen } = createBottomTabNavigator<propsNavigationStack>()

export function TabRoutes() {
	const { theme } = useTheme()

	const getIconSize = (isFocused: boolean, size: number) => {
		return isFocused ? size + 5 : size
	}

	const getIconColor = (isFocused: boolean) => {
		return isFocused ? theme.COLORS.PRIMARY : theme.COLORS.ICON
	}

	return (
			<><StatusBar backgroundColor={theme.COLORS.PRIMARY} barStyle="light-content" /><Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: theme.COLORS.BACKGROUND, 
				},
			}}>
			<Screen
				name="Feed"
				component={Feed}
				options={{
					tabBarIcon: ({ focused, size }) => (
						<Feather
							name="heart"
							size={getIconSize(focused, size)}
							color={getIconColor(focused)} />
					),
					tabBarLabel: () => null,
				}} />
			<Screen
				name="FAQ"
				component={FAQ}
				options={{
					tabBarIcon: ({ focused, size }) => (
						<Feather
							name="info"
							size={focused ? size + 5 : size}
							color={focused ? theme.COLORS.PRIMARY : theme.COLORS.ICON} />
					),
					tabBarLabel: () => null,
				}} />

			<Screen
				name="Consulta"
				component={Consulta}
				options={{
					tabBarIcon: ({ focused, size }) => (
						<Feather
							name="calendar"
							size={focused ? size + 5 : size}
							color={focused ? theme.COLORS.PRIMARY : theme.COLORS.ICON} />
					),
					tabBarLabel: () => null,
				}} />
			<Screen
				name="Perfil"
				component={Perfil}
				options={{
					tabBarIcon: ({ focused, size }) => (
						<Feather
							name="user"
							size={focused ? size + 5 : size}
							color={focused ? theme.COLORS.PRIMARY : theme.COLORS.ICON} />
					),
					tabBarLabel: () => null,
				}} />
		</Navigator></>
	)
}
