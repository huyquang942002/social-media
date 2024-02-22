import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    userContainer: {
        flex: 1,
    },
    infoContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 30,
        marginHorizontal: 15,
    },
    rowInfoContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    rowContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginStart: 60,
        marginVertical: 5,
    },
    userImg: {
        height: 55,
        width: 55,
        borderRadius: 30,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    userJob: {
        fontSize: 14,
        color: '#A4A4B2',
    },
    userNameContainer: {
        paddingHorizontal: '5%',
        flex: 1,
    },

    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 5,
    },
    userBtn: {
        backgroundColor: '#F03974',
        borderRadius: 10,
        marginHorizontal: 30,
        marginVertical: 10,
        width: 120,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userBtnTxt: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 10,
        width: '100%',
    },
    userInfoItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    userInfoTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: '#F03974',
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    userPostContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 4,
        width: '90%',
        gap: 8,
        paddingBottom: '22%',
    },
    userPostImages: {
        height: 100,
        width: 100,
    },

    userIcon: {
        width: 15,
        height: 15,
        marginHorizontal: 10,
    },
    breakLine: {
        backgroundColor: '#ECEDF4',
        height: 30,
        width: 1,
    },
    actionIcon: {
        width: 20,
        height: 20,
        marginBottom: 5,
    },
    smallIcon: {
        width: 15,
        height: 15,
        marginEnd: 5,
    },
    smallText: {
        fontSize: 10,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 12,
    },
    postAvatar: {
        height: 30,
        width: 30,
        borderRadius: 15,
    },
    postContainer: {
        flex: 2,
        display: 'flex',
        height: '100%',
    },
    postInput: {
        flex: 1,
        paddingHorizontal: 15,
        fontSize: 10,
    },

    overlay: {
        position: 'absolute',
        width: '95%',
        bottom: 24,
        borderRadius: 8,
    },
    newContainer: {
        flex: 1,
        backgroundColor: '#EFF3F5',
        paddingTop: '4%',
        paddingHorizontal: '4%',
    },
});