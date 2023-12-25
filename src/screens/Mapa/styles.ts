import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerHeader: {
        marginTop: '15%',
        marginBottom: '10%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    container: {
        flex: 1,
        backgroundColor: '#e61919',
    },
    mapaContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapaPequeno: {
        width: 500,
        height: '100%',
    },
    mapaExpandido: {
        flex: 1,
    },
});


