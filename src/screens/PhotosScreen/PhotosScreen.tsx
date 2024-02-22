import { Text, View, Image, FlatList, Touchable, TouchableOpacity, Dimensions } from 'react-native'
import React, { ReactElement, useContext, useMemo, useState } from 'react'
import AppHeader from '../../components/AppHeader'
import { Icon, useTheme } from 'react-native-elements';
import { styles } from './styles';
import MasonryList from '@react-native-seoul/masonry-list';

interface Types {
    navigation: any;
}


const PhotosScreen: React.FC<Types> = ({ navigation }) => {


    const [visibleImages, setVisibleImages] = useState([
        {
            id: '1',
            imgURL: 'https://picsum.photos/500/1000'
        },
        {
            id: '2',
            imgURL: 'https://picsum.photos/500/1000'

        },
        {
            id: '3',
            imgURL: 'https://picsum.photos/500/1000'

        },
        {
            id: '4',
            imgURL: 'https://picsum.photos/500/1000'
        },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const handleLoadMore = () => {
        setCurrentPage(currentPage + 1);
    };

    const AnimalCard = ({
        item,
        style,
    }: any) => {
        const randomBool = useMemo(() => Math.random() < 0.5, []);

        return (
            <View key={item.id} style={[{ marginTop: 12, flex: 1 }, style]}>
                <Image
                    source={{ uri: item.imgURL }}
                    style={{
                        height: randomBool ? 150 : 280,
                        alignSelf: 'stretch',
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 1,
                    }}
                    resizeMode="cover"
                />

            </View>
        );
    };
    const renderItem = ({ item, i }: any): ReactElement => {
        return (
            <AnimalCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 12 }} />
        );
    };

    return (
        <View style={styles.container}>
            <AppHeader title={"Photos"} navigation={navigation} rightComponent={() => {
                return (
                    <TouchableOpacity>
                        <Icon name="more-vert" size={20} color={'#484860'} />
                    </TouchableOpacity>
                );
            }} />
            <MasonryList
                keyExtractor={(item: any): string => item.id}
                ListHeaderComponent={<View />}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    alignSelf: 'stretch',
                }}
                onEndReached={() => console.log('onEndReached')}
                numColumns={2}
                data={visibleImages}
                renderItem={renderItem}
            />

        </View>
    )
}

export default PhotosScreen
