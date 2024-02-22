import { Dimensions, Platform, StyleSheet } from "react-native";
const device_width = Dimensions.get('window').width;
const device_height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFF3F5',
        alignItems: 'center',
    },

    imageAndTextContainer: {
        width: device_width,
    },
    dotsRootContainer: {
        position: 'absolute',
        bottom: device_height > 700 ? '10%' : '5%',
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 50,
        height: 16,
    },
    dot: {
        borderRadius: 6,
        backgroundColor: '#FF005C',
        marginHorizontal: 16 / 2,
    },
    btnSkip: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 36 : 20,
        width: 100,
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        borderRadius: 16,
        paddingHorizontal: 16,
    },
    contentCenter: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: device_height / 7,
        paddingHorizontal: 16,
    },
    txtDescription: {
        textAlign: 'center',
        marginTop: 16,
        fontSize: 14,
    },
    txtTitle: {
        color: 'black',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 24,
    },
    txtButton: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16,
    },
    bottomView: {
        paddingHorizontal: 16,
        position: 'absolute',
        bottom: 30,
        width: '100%',
    },
    image: {
        width: 220,
        height: 220,
        marginVertical: 20,
    },


});