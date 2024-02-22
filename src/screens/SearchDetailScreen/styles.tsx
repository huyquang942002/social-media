import { Dimensions, StyleSheet } from "react-native";
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    topIcon: {
        width: 40,
        height: 40,
    },
    createPostBtn: {
        width: '50%',
        height: 40,
        borderRadius: 15,
        backgroundColor: '#F03974',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        elevation: 20,

    },
    createPostBtnText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 10,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: 40,
        height: 40,
        backgroundColor: '#fff',

        elevation: 20,
    },
    topBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '25%',
    },
    filterItem: {
        backgroundColor: 'white',
        borderRadius: 16,
        elevation: 10,
        paddingVertical: 6,
        paddingHorizontal: 24,
        marginHorizontal: 10,
        marginBottom: 15,
        marginTop: 5,
    },
    filterItemText: {
        color: '#FF80A4',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
    filterList: {
        marginTop: '5%',
        flexDirection: 'row',
        display: 'flex',
        // paddingBottom: '10%',
    },
    filterIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 8,
        height: 50,
        borderRadius: 14,
        marginStart: 10,

    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: '5%',
        // justifyContent:'center'
    },
    exploreSearchInput: {
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        width: screenWidth * .80,
        height: 50,
        backgroundColor: '#F2F2F2',
        paddingLeft: 35,
    },
    exploreSearchIcon: {
        position: 'absolute',
        paddingLeft: '10%',
        zIndex: 1,
        bottom: 15,
        marginStart: '2%',
    },
    closeIcon: {
        position: 'absolute',
        zIndex: 1,
        bottom: 15,
        alignSelf: 'flex-end',
        marginLeft: '76%',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: '4%',
    },
    postContainer: {
        flex: 2,
        display: 'flex',
        height: '100%',
    },
});