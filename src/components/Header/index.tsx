import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from "../../theme";

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

const styles = StyleSheet.create({
  contain: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  text: {
    color: theme.COLORS.WHITE,
    fontSize: 35,
    textTransform: 'uppercase',
    letterSpacing: 1    
  }
})