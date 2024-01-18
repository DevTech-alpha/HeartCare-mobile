import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
    container: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      flex: 1,
      backgroundColor: theme.COLORS.WHITE,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 10,
    },
    input: {
      backgroundColor: 'white',
      height: 40,
      marginBottom: 12,
      borderColor: theme.COLORS.PRIMARY,
      borderWidth: 2,
      marginTop: 12,
      fontSize: 16,
      paddingLeft: 5,
      borderRadius: 10,
    },
    actionButton: {
      backgroundColor: theme.COLORS.BUTTON,
      width: '100%',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'white',
      paddingVertical: 8,
      marginTop: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    roundedActionButton: {
      backgroundColor: theme.COLORS.OVERLEY,
      width: '100%',
      paddingVertical: 8,
      marginTop: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 15,
      fontWeight: 'bold',
    },
  });