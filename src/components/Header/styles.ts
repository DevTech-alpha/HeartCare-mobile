import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
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
      fontSize: 30,
      textTransform: 'uppercase',
      letterSpacing: 2,    
    }
});