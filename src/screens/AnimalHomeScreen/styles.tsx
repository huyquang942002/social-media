import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5FA',
        paddingTop: '4%',
        paddingHorizontal: '4%',
    },
    topIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    createPostBtn: {
        width: '50%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: '5%',
    },
    createPostBtnText: {
        color: '#333333',
        fontSize: 14,
        margin: 5,
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
        alignItems: 'center',
    },

    filterItem: {
        backgroundColor: '#F5F5FA',
        borderRadius: 16,
        elevation: 10,
        paddingVertical: 6,
        paddingHorizontal: 24,
        margin: 10,
    },
    filterItemText: {
        color: '#7878AB',
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