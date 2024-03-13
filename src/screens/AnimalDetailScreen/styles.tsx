import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    contentContainer: {
        flex: 1,
        paddingTop: 16,
    },
    imageContainer: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        flex: 1,
    },
    image: {
        width: 250,
        height: 250,
    },
    content: {
        flex: 1,
        backgroundColor: '#F5F5FA',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        padding: 20,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    cityText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#828282',
        marginLeft: 4,
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#9E9E9E',
        marginTop: 12,
    },
    infoIconContainer: {
        backgroundColor: '#F5F5F9',
        borderRadius: 50,
        padding: 8,
        elevation: 2,
    },
    infoIcon: {
        width: 20,
        height: 20,
    },
    infoText: {
        fontSize: 12,
        fontWeight: '300',
        color: '#555555',
        marginLeft: 6,
        marginRight: 30
    },

    dogImageContainer: {
        backgroundColor: '#F5F5F9',
        borderRadius: 50,
        padding: 8,
        elevation: 2,
        marginEnd: 24,
    },
    dogImage: {
        width: 50,
        height: 50,
    },
    postIconContainer: {
        position: 'absolute',
        elevation: 100,
        right: 0,
        top: 20,
        height: 50,
        width: 50,
        backgroundColor: 'blue',
    },
    postIconStyle: {
        justifyContent: 'center',
        height: 50,
        width: 50,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    // backIcon: {
    //     position: 'absolute',
    //     left: 20,
    //     zIndex: 100,
    //     backgroundColor: 'red',
    //     marginTop: 20,
    // },



});