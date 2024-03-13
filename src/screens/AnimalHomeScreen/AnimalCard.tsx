import React, { useContext } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { images } from '../../../assets';
import AppText from '../../components/AppText';
import { convertToS3LinkPet, getImageUrlFromS3 } from '../../config/util';
import { AuthContext } from '../../context/AuthContext';


export interface AnimalCardProps {
   
    onPress?: () => void;
    item: any
}



const AnimalCard = (props: AnimalCardProps) => {
    const {user} = useContext(AuthContext);
    const {  onPress, item } = props;
    
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image resizeMode={'cover'} style={{ width: 130, height: 150 }} source={{uri: convertToS3LinkPet(user.id, item.s3ImagePet).path}} />
            <View style={styles.contentRight}>
                <AppText style={styles.textTitle}>{item.name}</AppText>
                <View style={styles.rowContainer}>
                    <Image resizeMode={'contain'} style={{ width: 12, height: 12 }} source={images.pinOutlineIcon} />
                    <AppText style={styles.cityText}>{"New York City"}</AppText>
                </View>
                <AppText numberOfLines={2} ellipsizeMode='tail' style={styles.descriptionText}>{item.description}</AppText>
            </View>
            <View style={styles.favoriteContainer}>
                <Ionicons name="heart-outline" size={18} color="#BDBDBD"  />  
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        height: 150,
        backgroundColor: '#fff',
        overflow: 'hidden',
        elevation: 2,
        marginVertical: 16,
        marginHorizontal: 2,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: "#333333",
    },
    contentRight: {
        flex: 1,
        marginLeft: 12,
        // borderBottomWidth: 1,
        height: '100%',
        // borderColor: '#EEF0F4',
        justifyContent: 'center'
    },
    cityText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#828282',
        marginLeft: 4,
        marginVertical: 6,
    },
    descriptionText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#4F4F4F',
    },
    favoriteContainer  : {
        alignItems: 'center',
        justifyContent: 'center',
        height: 26,
        width: 26,
        elevation: 10,
        borderRadius: 13,
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        margin: 14,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default AnimalCard;
