import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    headerContainer: {
        height: "30%",
    },
    profileBg: {
        flex: 1,
        justifyContent: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        marginHorizontal: 20,
        borderRadius: 40,
        // borderWidth: 2,
        // borderColor: '#fff',
        // alignSelf: 'center',
    },

    rowStyles: {
        // flexDirection: 'row',
        alignItems: 'center'
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F03974',
    },
    closeButton: {
        borderRadius: 50,
        backgroundColor: 'rgba(233, 235, 239, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        alignSelf: 'flex-end',
        marginRight: 20,
    },
    closeIcon: {
        fontSize: 20,
        color: 'black',
    },
    WarningBalanceContainer: {
        width: '100%',
        alignItems: 'center',
    },
    iconWarning: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
    overlay: {
        position: 'absolute',
        width: '95%',
        bottom: 24,
        borderRadius: 8,
    },

});