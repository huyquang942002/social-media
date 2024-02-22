import { StyleSheet } from "react-native";

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
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: '4%',
    },
    topSection: {
        paddingHorizontal: '2%',
        paddingTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '5%',
    },
    postContainer: {
        flex: 2,
        display: 'flex',
        height: '100%',
    },
});