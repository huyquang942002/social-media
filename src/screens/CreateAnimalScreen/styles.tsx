import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    userTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputsContainer: {
        paddingHorizontal: '8%',
        // zIndex: -4,
    },

    container: {
        flex: 1,
    },

    infoTitle: {
        color: '#555555',
        fontSize: 14,
        marginVertical: 10,
        fontWeight: 'bold',
    },

    textInput: {
        flex: 1,
        marginTop: 0,
        paddingLeft: 10,
        color: '#333333',
    },
    overlay: {
        position: 'absolute',
        width: '95%',
        bottom: 24,
        borderRadius: 8,
    },

    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },

    petAvatar: {
        width: 120,
        height: 120,
        borderRadius: 50,
    },




});