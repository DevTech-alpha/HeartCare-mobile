import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
    container: {
       flex: 1,
    },
    map: {
       ...StyleSheet.absoluteFillObject,
    },
    
    buttonWrapper: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
    },
    loadingIndicator: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
    },
 });
 