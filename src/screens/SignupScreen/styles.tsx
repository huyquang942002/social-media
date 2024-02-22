import { Dimensions, StyleSheet } from "react-native";
const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
    },

    authHeaderTextContainer: {
        alignSelf: 'center',
        paddingTop: '40%',
    },
    authHeaderText: {
        color: '#1D1A20',
        textAlign: 'center',
        fontFamily: 'GeneralSans-Medium',
        fontSize: 35,
    },
    authSubText: {
        color: 'gray',
        textAlign: 'center',
    },
    authInputContainer: {
        paddingTop: '20%',
    },
    authInputIcon: {
        position: 'absolute',
        paddingRight: '13%',
        alignSelf: 'flex-end',
        zIndex: 1,
        bottom: 15,
    },
    authTextInput: {
        marginTop: '4%',
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        width: width * 0.85,
        height: 50,
        backgroundColor: 'rgba(196, 196, 196, 0.2)',
        paddingLeft: 15,
        paddingRight: '15%',
        color: '#1D1A20',
    },
    authButtonContainer: {
        alignSelf: 'center',
        marginTop: '20%',
    },
    authButtonStyle: {
        width: width * 0.5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#1D1A20',
    },
    authButtonText: {
        fontFamily: 'GeneralSans-Medium',
        color: 'white',
    },
    signUpText: {
        color: 'gray',
        textDecorationLine: 'underline',
    },
    authNewMemberContainer: {
        paddingTop: 15,
        alignSelf: 'center',
        flexDirection: 'row',
        gap: 12,
    },

});