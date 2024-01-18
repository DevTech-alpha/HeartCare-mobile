import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    markerWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
    },
    markerBody: {
      width: 30,
      height: 30,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center'
    },
    markerDot: {
      width: 5,
      height: 5,
      borderRadius: 5,
      backgroundColor: '#fff'
    },
    markerArrow: {
      width: 0,
      height: 0,
      borderLeftWidth: 8,
      borderRightWidth: 8,
      borderBottomWidth: 16,
      borderStyle: 'solid',
      backgroundColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      transform: [{ rotate: "180deg" }],
      marginTop: -10,
    },
    callout: {
      width: 250,
      height: 100,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontWeight: "700",
      fontSize: 16,
      marginBottom: 5
    }
  
  });