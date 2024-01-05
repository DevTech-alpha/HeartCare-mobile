import React from "react";
import { StyleSheet, View, Text } from 'react-native'

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
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 17,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.PRIMARY,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingStart: '10%',
    paddingEnd: '5%',
  },
  text: {
    color: theme.COLORS.WHITE,
    fontSize: 25,
    textTransform: 'uppercase',
    letterSpacing: 1    
  }
})
