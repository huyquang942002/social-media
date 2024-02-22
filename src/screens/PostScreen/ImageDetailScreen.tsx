import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity,
    View
} from 'react-native';
import { Icon } from 'react-native-elements';
import AppHeader from '../../components/AppHeader';
import { styles } from './styles';
interface Params {
    route: any;
    navigation: any;
}
const win = Dimensions.get('window');
const ImageDetailScreen: React.FC<Params> = ({ route, navigation }) => {
    const [images, setImages] = useState<any>(route?.params?.postImages);
    const setPostImages = route?.params?.setPostImages;
    console.log("images", images);
    
    const deleteImage = (index: number) => {
        let tempImages = [...images];
        tempImages.splice(index, 1);
        setImages(tempImages);
    };

    return (
        <View style={styles.flexContainer}>
            <AppHeader title={"Image"} navigation={navigation} onGoback={
                () => {
                    setPostImages && setPostImages(images);
                    navigation.goBack();
                }
            } />

            <FlatList
                data={images}
                renderItem={({ item, index }) => (
                    <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                        {setPostImages && <TouchableOpacity style={{marginTop: 10}} onPress={() => deleteImage(index)}>
                            <Icon name="close" type="ionicon" size={20} color="#fff" style={{
                                backgroundColor: "black", width: 20, height: 20, justifyContent: 'center',
                                alignItems: 'center'
                            }} />
                        </TouchableOpacity>}
                        <Image style={{ width: win.width, height: 300 }} source={item.data ? {uri: item.path} : {uri: item}} />
                    </View>
                )}
                //Setting the number of column
                // numColumns={3}
                keyExtractor={(item, index) => index.toString()} />
        </View>
    );
};

export default ImageDetailScreen;

