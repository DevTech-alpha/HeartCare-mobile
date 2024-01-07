import React from "react";
import { View, Text } from 'react-native'

import { styles } from "./styles";

interface Props {
  title: string;
}

export function Header({ title }: Props) {

  return (
    <View style={styles.container}>
        <View style={styles.contain}>
          <Text style={styles.text}>{title}</Text>
        </View>
    </View>
  );
}

