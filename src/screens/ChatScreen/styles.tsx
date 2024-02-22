import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        borderBottomColor: '#999999',
        borderWidth: 1,
    },
    headerContainer: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        paddingHorizontal: 16,
        zIndex: 9999,
        paddingVertical: 20,
    },
    rowContainer: {
        alignItems: 'center',
      
    },  
    headerTitle: {
        fontSize: 20,
        color: '#000',
    },
    headerSubTitle: {
        fontSize: 14,
        color: '#999999',
    },
    
    separator: {
        height: 0.5,
        backgroundColor: "#999999",
        width: "100%"
    },
    chatFooter: {
        shadowColor: '#1F2687',
        shadowOpacity: 0.37,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 8},
        elevation: 8,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.18)',
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'blue'
      },
      buttonFooterChatImg: {
        width: 35,
        height: 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderColor: 'black',
        left: 66,
        top: -4,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      },
      textFooterChat: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
      },
    


});