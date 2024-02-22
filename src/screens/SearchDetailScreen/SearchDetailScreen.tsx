import _ from 'lodash';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppText';
import PostItem from '../../components/PostItem';
import { FlashMessageContext } from '../../context/FlashMessageContext';
import { UserContext } from '../../context/UserContext';
import { usePost } from '../../service/api/post';
import { Post } from '../../service/model/post';
import { styles } from './styles';
interface Types {
  navigation: any;
  route: any;
}
const filters = ["PET", "PET LOST", "PET DISEASES", "PET EVENT"];

const SearchDetailScreen: React.FC<Types> = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>(route?.params?.searchText ? route?.params?.searchText : "");

  const { onGetAllPost } = usePost()
  const [posts, setPosts] = useState<Post[]>();
  const { showFlashMessage } = useContext(FlashMessageContext);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [onMomentalScroll, setOnMomentalScroll] = useState(true);
  const {getUser} = useContext(UserContext);
  const [selectSpec, setSelectSpec] = useState<any>(filters[0]);

  const getAllPost = async (refreshing = false) => {
    const res = await onGetAllPost(
      refreshing ? 1 : page,
      5,
      "DESC",
      searchText,
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
  

 
  const renderItem = ({ item }: { item: Post }) => (
    <PostItem
      item={item}
      onRefresh={onRefresh}
      onPress={() => navigation.navigate('PostDetail', { post: item, onRefresh: onRefresh})}
      onEdit={() => navigation.navigate('Add', {post: item})}
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
          <TouchableOpacity style={[styles.filterItem, {backgroundColor: selectSpec == item ? "#FF80A4" : "white"}]} onPress={() => setSelectSpec(item)}>
            <AppText style={[styles.filterItemText, {color: selectSpec == item ? "white" : "#FF80A4"}]}>
              {item}
            </AppText>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Search" navigation={navigation}/>
      <View style={styles.rowContainer}>
        <Ionicons name="ios-search-outline" color={'#AEAEAE'} size={20} style={styles.exploreSearchIcon} />
        <TextInput 
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={() => navigation.navigate('SearchDetail')} style={styles.exploreSearchInput} placeholder={'What are you looking for?'} placeholderTextColor={'#AEAEAE'} />
        <Ionicons name="close" color={'#AEAEAE'} size={16} style={styles.closeIcon} />

        <View>
          <Icon name="tune" color={'#7E8389'} size={20} style={styles.filterIconContainer} />
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
          renderItem={memoizedValue}
          onEndReachedThreshold={1}
          onEndReached={() => onLoadMore()}
          onMomentumScrollBegin={() => setOnMomentalScroll(false)}
        />
      
    </View>
  );
};

export default SearchDetailScreen;
