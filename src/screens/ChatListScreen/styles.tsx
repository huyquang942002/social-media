import { Dimensions, StyleSheet } from "react-native";
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingVertical: '10%',
        backgroundColor: '#EFF3F5',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
        // justifyContent:'center'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    exploreSearchInput: {
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        width: screenWidth * .80,
        height: 50,
        backgroundColor: '#fff',
        paddingLeft: 35,
    },
    listHeader: {
        flexDirection: 'row',
        margin: 20,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: '500',
        alignItems: 'center',
        flex: 1,
    },


});