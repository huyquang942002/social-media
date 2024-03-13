import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { images } from '../../../assets';
import AppText from '../../components/AppText';
import { EmptyList } from '../../components/EmptyComponent';
import { convertToS3LinkProfile } from '../../config/util';
import { AuthContext } from '../../context/AuthContext';
import { FlashMessageContext } from '../../context/FlashMessageContext';
import { usePet } from '../../service/api/pet';
import AnimalCard, { AnimalCardProps } from './AnimalCard';
import { styles } from './styles';
interface Types {
  navigation: any;
  route: any;
}

const filters = ["DOG", "CAT", "BIRD", "FISH", "SHRIMP", "SQUID", "SCALLOP", "CRAB", "OTHER"];

const AnimalHomeScreen: React.FC<Types> = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const userId = route.params?.userId ? route.params?.userId : user.id;
  const [selectSpec, setSelectSpec] = useState<any>("DOG");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { onGetAllPet } = usePet();
  const { showFlashMessage } = useContext(FlashMessageContext);
  const [pets, setPets] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [onMomentalScroll, setOnMomentalScroll] = useState(true);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getPets();
    setCanLoadMore(true);
    if (page === 1) {
      getPets(true);
    } else {
      setPage(1);
    }
    // setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    getPets()
  }, [selectSpec, page]);

  const getPets = async (refreshing = false) => {
    const res = await onGetAllPet(
      refreshing ? 1 : page,
      5,
      selectSpec,
      userId
    );
    setRefreshing(false);

    if (res.succeeded) {
      // setPosts(res.data);
      const convertResponse = res?.data.data;
      if (page === 1) {
        setPets(convertResponse);
      } else {
        if (!_.isEmpty(convertResponse)) {
          setPets(pets?.concat(convertResponse));
        } else {
          setCanLoadMore(false);
        }
      }

    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
  }

  const onLoadMore = () => {
    if (canLoadMore && !onMomentalScroll) {
      setPage(page + 1);
      setOnMomentalScroll(true);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      getPets();
      return () => {
      };
    }, [])
  );


  const renderItem = ({ item }: { item: AnimalCardProps }) => (
    <AnimalCard
      item={item}
      onPress={() => { navigation.navigate('AnimalDetail', { petInfo: item }) }}
    />
  );
  const filterList = () => {
    return (
      <FlatList
        horizontal={true}
        data={filters}
        style={styles.filterList}
        scrollEnabled={true}
        initialNumToRender={4}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(key, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.filterItem, { backgroundColor: selectSpec == item ? "#7878AB" : "#F5F5FA" }]} onPress={() => setSelectSpec(item)}>
            <AppText style={[styles.filterItemText, { color: selectSpec == item ? "#F5F5FA" : "#7878AB" }]}>
              {item}
            </AppText>
          </TouchableOpacity>
        )}
      />
    );
  };
  function handleBackButtonClick() {
    navigation.navigate('Tabs')
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image style={styles.topIcon} source={user.s3Profile ? { uri: convertToS3LinkProfile(user.id, user.s3Profile).path } : images.avatarDemo} resizeMode='cover' />
        <TouchableOpacity style={styles.createPostBtn}>
          <Icon name="place" size={15} color={'#F03974'} />
          <AppText style={styles.createPostBtnText}>New York City</AppText>
          <Icon name="expand-more" size={15} color={'#57419D'} />
        </TouchableOpacity>
        <View style={styles.topBtnContainer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name={'notifications-outline'} color={'#F03974'} size={25} />
          </TouchableOpacity>
        </View>

      </View>


      <FlatList
        data={pets}
        keyExtractor={(item, index) => index.toString()}
        style={styles.postContainer}
        initialNumToRender={3}
        ListHeaderComponent={filterList}
        contentContainerStyle={{ paddingBottom: 5 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={renderItem}
        onEndReachedThreshold={1}
        onEndReached={() => onLoadMore()}
        onMomentumScrollBegin={() => setOnMomentalScroll(false)}
        ListEmptyComponent={() => <EmptyList title="No pet" />}
      />
    </View>
  );
};

export default AnimalHomeScreen;
