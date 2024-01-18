import { StyleSheet } from "react-native";

import { useTheme } from '../../hooks/ThemeProvider';

const { theme } = useTheme();

export const styles = StyleSheet.create({

    mapButton: {
       marginBottom: 10,
       alignItems: 'center',
       justifyContent: 'center',
       borderRadius: 30,
       shadowColor: theme.COLORS.OVERLAY,
       shadowOffset: {
          width: 0,
          height: 2,
       },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
       elevation: 5,
    },
    icon: {
       width: 25,
       height: 25,
       resizeMode: 'stretch'
    }
 });