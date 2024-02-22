import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    rowStyles: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarStyles: {
        width: 45,
        height: 45,
        marginEnd: 15
    },
    textStyles: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555555'
    },
    subTextStyles: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#555555'

    },
    header: {
        fontSize: 20,
        color: '#000000',
        marginVertical: 20
    },
    topIcon: {
        width: 40,
        height: 40,
    },
    newContainer: {
        flex: 1,
        backgroundColor: '#EFF3F5',
        paddingTop: '4%',
        paddingHorizontal: '4%',
    },

});