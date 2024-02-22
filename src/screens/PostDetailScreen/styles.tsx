import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFF3F5'
    },
    postTopContainer: {
        paddingHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    postAvatar: {
        borderRadius: 20,
        height: 44,
        width: 44,
    },
    postUserNameText: {
        fontWeight: 'bold',
        color: '#1D1A20',
    },
    postHeaderTextContainer: {
        flexDirection: 'column',
        paddingLeft: 15,
    },
    postCreateTimeText: {
        color: '#A4A4B2',
        fontSize: 12,
    },
    postIconContainer: {
        position: 'absolute',
        right: 0,
    },
    postIconStyle: {
        justifyContent: 'center',
        height: 50,
        width: 50,
    },
    postText: {
        marginHorizontal: '8%',
        marginTop: 12,
    },
    postBottom: {
        flexDirection: 'row',
        marginTop: 18,
        marginBottom: '10%',
        marginHorizontal: '8%',
    },
    postActionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10%',
    },
    postActionIcon: {
        width: 18,
        height: 18,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '3%',
        marginBottom: '3%',
        marginTop: '3%',
    },
    textInput: {
        flex: 1,
        marginTop: 0,
        paddingLeft: 10,
        color: '#333333',
        fontSize: 12
    },
    commentInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
        flex: 1,
        marginHorizontal: '3%',
        height: 40,
    },
    overlay: {
        position: 'absolute',
        width: '95%',
        bottom: 24,
        borderRadius: 8,
    },
});