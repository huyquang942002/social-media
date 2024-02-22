import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import { images } from '../../../assets';
import AppText from '../../components/AppText';
import PostItem from '../../components/PostItem';
import { AuthContext } from '../../context/AuthContext';
import { FlashMessageContext } from '../../context/FlashMessageContext';
import { UserContext } from '../../context/UserContext';
import { usePost } from '../../service/api/post';
import { Post } from '../../service/model/post';
import { styles } from './styles';
import { EmptyList } from '../../components/EmptyComponent';
interface Types {
  navigation: any;
}
const filters = ["PET", "PET LOST", "PET DISEASES", "PET EVENT"];

const HomeScreen: React.FC<Types> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const { onGetAllPost } = usePost()
  const [posts, setPosts] = useState<Post[]>();
  const { showFlashMessage } = useContext(FlashMessageContext);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [onMomentalScroll, setOnMomentalScroll] = useState(true);
  const { getUser } = useContext(UserContext);
  const [selectSpec, setSelectSpec] = useState<string>(filters[0]);

  const getAllPost = async (refreshing = false) => {    
    const res = await onGetAllPost(
      refreshing ? 1 : page,
      5,
      "DESC",
      "",
      selectSpec
    );
    setRefreshing(false);

    if (res.succeeded) {
      // setPosts(res.data);
      const convertResponse = res?.data.data;
      if (page === 1) {
        setPosts(convertResponse);
      } else {
        if (!_.isEmpty(convertResponse)) {
          setPosts(posts?.concat(convertResponse));
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
  const onRefresh = React.useCallback(async () => {
    
    getUser();
    setRefreshing(true);
    setCanLoadMore(true);
    if (page === 1) {
      getAllPost(true);
    } else {
      setPage(1);
    }
    // setRefreshing(false);
  }, [refreshing]);


  useEffect(() => {
    getAllPost();
  }, [page, selectSpec]);

  useFocusEffect(
    React.useCallback(() => {
      getAllPost();
      return () => {
      };
    }, [])
  );

  const renderItem = ({ item }: { item: Post }) => (
    <PostItem
      item={item}
      onRefresh={onRefresh}
      onPress={() => navigation.navigate('PostDetail', { post: item, onRefresh: onRefresh })}
      onEdit={() => navigation.navigate('EditPost', { post: item, onRefresh: onRefresh })}
      onClickUser={() => navigation.navigate('User', { userId: item.createdUser.id })}
    />
  );
  const memoizedValue = useMemo(() => renderItem, [posts]);
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
          <TouchableOpacity style={[styles.filterItem, { backgroundColor: selectSpec == item ? "#FF80A4" : "white" }]} onPress={() => setSelectSpec(item)}>
            <AppText style={[styles.filterItemText, { color: selectSpec == item ? "white" : "#FF80A4" }]}>
              {item}
            </AppText>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image style={styles.topIcon} source={images.catImg} resizeMode='cover' />
        <TouchableOpacity style={styles.createPostBtn} onPress={() => navigation.navigate('Add')}>
          <Icon name="border-color" size={15} color={'white'} />
          <AppText style={styles.createPostBtnText}>Create Post</AppText>
        </TouchableOpacity>
        <View style={styles.topBtnContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Search')}>
            <Icon name={'search'} color={'#F03974'} size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => {
            if (user.isHavePet == "true") {
              navigation.navigate("AnimalTabs")
            } else {
              navigation.navigate('OnBoarding')
            }
          }}>
            <Image style={styles.topIcon} source={images.animalIcon} resizeMode='center' />
          </TouchableOpacity>
        </View>

      </View>

      <View></View>

      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        style={styles.postContainer}
        initialNumToRender={3}
        ListHeaderComponent={filterList}
        contentContainerStyle={{ paddingBottom: 5 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={memoizedValue}
        onEndReachedThreshold={1}
        onEndReached={() => onLoadMore()}
        ListEmptyComponent={() => <EmptyList title="No post" />}
        onMomentumScrollBegin={() => setOnMomentalScroll(false)}
      />

    </View>
  );
};

export default HomeScreen;
