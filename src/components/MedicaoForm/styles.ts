import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({

    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    label: {
      fontSize: 15,
      marginTop: 12,
    },
    input: {
      borderBottomWidth: 1,
      height: 40,
      marginBottom: 12,
      fontSize: 16,
    },
  
    botaoAdicionar: {
      backgroundColor: theme.COLORS.BUTTON,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      marginTop: 14,
    },
    textoBotao: {
      color: theme.COLORS.BUTTON_TEXT,
    },
   
  });
  