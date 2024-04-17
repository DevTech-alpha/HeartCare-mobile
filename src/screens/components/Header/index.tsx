import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import HeaderProps from "../../../props/HeaderProps";
import { useTheme } from "../../../context/ThemeContext";

export default function Header({ title }: HeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
      <View style={styles.contain}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
}
