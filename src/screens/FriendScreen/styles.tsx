import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFF3F5'
    },
    listContainer: {
        marginTop: 20,
        paddingHorizontal: 20
    },
    rowStyles: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarStyles: {
        width: 45,
        height: 45,
        marginEnd: 15,
        borderRadius: 45 / 2
    },
    textStyles: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555555',
        flex: 1
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
    friendButton: {
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: '#F03974'
    },
    friendButtonText: {
        color: '#545454',
        fontSize: 12,
    },
    tabView: {
        backgroundColor: '#EFF3F5',
    },

});