import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { images } from '../../../assets';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppText';
import { convertToS3LinkProfile } from '../../config/util';
import { AuthContext } from '../../context/AuthContext';
import { FlashMessageContext } from '../../context/FlashMessageContext';
import { useFriend } from '../../service/api/friend';
import { styles } from './styles';
import { AppModal } from '../../components/AppModal';
interface Types {
  navigation: any;
}
const FriendItem = ({ navigation, item, deleteFriend, acceptFriend }: any) => {
  const { user } = useContext(AuthContext);
  const [friend, setFriend] = useState<any>([]);

  useEffect(() => {
    if (item) {

      if (item.senderId == user.id) {
        setFriend(item.receiverUser);
      } else {
        setFriend(item.senderUser);
      }
    }

  }, [item]);


  return (
    <TouchableOpacity style={styles.rowStyles} onPress={() => navigation.navigate('User', { userId: friend?.id })}>
      <Image source={friend?.s3Profile ? { uri: convertToS3LinkProfile(friend?.id, friend?.s3Profile).path } : images.avatarDemo} style={styles.avatarStyles} />
      <AppText style={styles.textStyles}>{friend?.username}</AppText>
      {deleteFriend != null && <TouchableOpacity style={styles.friendButton} onPress={() => deleteFriend(item?.id)}>
        <AppText style={styles.friendButtonText}>Delete</AppText>
      </TouchableOpacity>}
      {acceptFriend != null && <TouchableOpacity style={styles.friendButton} onPress={() => acceptFriend(item?.senderUser.id)}>
        <AppText style={styles.friendButtonText}>Accept</AppText>
      </TouchableOpacity>}
    </TouchableOpacity>
  )
}

const FriendList = ({ data, navigation, deleteFriend, acceptFriend, refreshing, onRefresh }: any) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <FriendItem navigation={navigation} item={item} deleteFriend={deleteFriend}
        acceptFriend={acceptFriend} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.listContainer}
    />
  )
}

const MyFriendRoute = ({ navigation }: any) => {
  const { onGetAllFriend, onDeleteFriend } = useFriend();
  const [friends, setFriends] = useState<any>([]);
  const { showFlashMessage } = useContext(FlashMessageContext);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<any>(0);

  const onRefresh = React.useCallback(async () => {
    getAllFriend();
    setRefreshing(true);
  }, [refreshing]);

  const getAllFriend = async () => {
    const res = await onGetAllFriend();
    setRefreshing(false);
    if (res.succeeded) {
      setFriends(res.data.listFriend);
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
  }

  const deleteFriend = async (id: string) => {
    setShowModal(0);
    const res = await onDeleteFriend(id);
    if (res.succeeded) {
      getAllFriend();
      showFlashMessage({
        message: "Friend deleted",
        description: "Friend has been deleted successfully",
        type: "success",
      });
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
  }

  useEffect(() => {
    getAllFriend();
  }, []);
  return (
    <>
      <FriendList data={friends} navigation={navigation} deleteFriend={setShowModal} onRefresh={onRefresh} refreshing={refreshing} />
      <AppModal
        onConfirm={() => deleteFriend(showModal)}
        onCancel={() => setShowModal(0)}
        isVisible={showModal != 0}
        onBackdropPress={() => { }}
        title='Delete friend ?'
        canCancel>

      </AppModal>
    </>
  );
}

const RequestFriendRoute = ({ navigation }: any) => {
  const { onGetListRequestFriend, onCreateFriend } = useFriend();
  const [friends, setFriends] = useState<any>([]);
  const { user } = useContext(AuthContext);
  const { showFlashMessage } = useContext(FlashMessageContext);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = React.useCallback(async () => {
    getListRequestFriend();
    setRefreshing(true);
  }, [refreshing]);

  const getListRequestFriend = async () => {
    const res = await onGetListRequestFriend();
    setRefreshing(false);
    if (res.succeeded) {
      setFriends(res.data.totalFollower);

    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
  }

  const acceptFriend = async (id: string) => {
    const res = await onCreateFriend(id);
    if (res.succeeded) {
      getListRequestFriend();
      showFlashMessage({
        message: "Friend accepted",
        description: "Friend has been accepted successfully",
        type: "success",
      });
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
  }
  useEffect(() => {
    getListRequestFriend();
  }, []);
  return (
    <FriendList data={friends} navigation={navigation} acceptFriend={acceptFriend} onRefresh={onRefresh} refreshing={refreshing} />
  );
}

const ProposeFriendRoute = ({ navigation }: any) => {
  const { onGetAllFriend, onDeleteFriend } = useFriend();
  const [friends, setFriends] = useState<any>([]);
  const { user } = useContext(AuthContext);
  const { showFlashMessage } = useContext(FlashMessageContext);

  const getAllFriend = async () => {
    const res = await onGetAllFriend();
    if (res.succeeded) {
      const friendList = res.data.listFriend.map((item: any) => {
        if (item.senderId == user.id) {
          return item.receiverUser;
        } else {
          return item.senderUser;
        }
      });
      setFriends(friendList);
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
  }

  const deleteFriend = async (id: string) => {
    const res = await onDeleteFriend(id);
    if (res.succeeded) {
      getAllFriend();
      showFlashMessage({
        message: "Friend deleted",
        description: "Friend has been deleted successfully",
        type: "success",
      });
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
  }
  useEffect(() => {
    getAllFriend();
  }, []);


  return (
    <FriendList data={friends} navigation={navigation} deleteFriend={deleteFriend} />
  );
}

const FriendScreen: React.FC<Types> = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = useState([
    { key: 'MyFriend', title: 'My Friend' },
    { key: 'RequestFriend', title: 'Requested Friend' },
    // { key: 'ProposeFriend', title: 'Proposed Friend' },
  ]);

  const renderScene = SceneMap({
    MyFriend: () => <MyFriendRoute navigation={navigation} />,
    RequestFriend: () => <RequestFriendRoute navigation={navigation} />,
    ProposeFriend: () => <ProposeFriendRoute navigation={navigation} />,
  });
  return (
    <View style={styles.container}>
      <AppHeader title={"Friends"} navigation={navigation} rightComponent={() => {
        return (
          <TouchableOpacity>
            <Icon name="more-vert" size={20} color={'#484860'} />
          </TouchableOpacity>
        );
      }} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#F03974' }}
          renderLabel={({ route, color }) => (
            <AppText style={{ color: '#F03974' }}>
              {route.title}
            </AppText>
          )}
          style={styles.tabView}
        />}
      />
    </View>
  )
}

export default FriendScreen
