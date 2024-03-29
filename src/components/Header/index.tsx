import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import HeaderProps from "../../props/HeaderProps";

export default function Header({ title }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.contain}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
}
