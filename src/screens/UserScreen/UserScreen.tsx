import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import { images } from '../../../assets';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppText';
import PostItem from '../../components/PostItem';
import UserLoader from '../../components/UserLoader';
import { convertToS3LinkProfile } from '../../config/util';
import { FlashMessageContext } from '../../context/FlashMessageContext';
import { useFriend } from '../../service/api/friend';
import { useProfile } from '../../service/api/profile';
import { Post } from '../../service/model/post';
import { styles } from './styles';
import AppButton from '../../components/Button';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import { AuthContext } from '../../context/AuthContext';

interface Types {
  navigation: any;
  route: any;
}
const UserScreen: React.FC<Types> = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const userId = route.params?.userId ? route.params?.userId : user.id;
    
  const [loading, setLoading] = useState<boolean>(true);
  const [userDetail, setUserDetail] = useState<any>([]);
  const [userInfo, setUserInfo] = useState<any>([]);

  const { onGetDetailProfile } = useProfile();
  const { showFlashMessage } = useContext(FlashMessageContext);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [onMomentalScroll, setOnMomentalScroll] = useState(true);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>();
  const { onCreateFriend, onDeleteFriend } = useFriend();
  const [avatar, setAvatar] = useState<any>();
  const [imgConfig, setImgConfig] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);

  const getUserProfile = async () => {
    const res = await onGetDetailProfile(1, 10, userId);
    if (res.succeeded) {
      setPosts(res.data.profileUser.data);
      setUserDetail(res.data.detailUser);
      setUserInfo(res.data.user);      
      setLoading(false);
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
      setLoading(false);
    }
  }

  const addFriend = async () => {
    const res = await onCreateFriend(userId);
    if (res.succeeded) {
      showFlashMessage({
        message: "Success",
        description: "Request add friend successfully",
        type: "success",
      });
      getUserProfile();
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
  }
  const deleteFriend = async () => {
    const res = await onDeleteFriend(userId);
    if (res.succeeded) {
      showFlashMessage({
        message: "Friend deleted",
        description: "Friend has been deleted successfully",
        type: "success",
      });
      getUserProfile();
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
  }
  

  const handleAction = (type: string) => {
    if (type == "ADD_FRIEND" || type == "ACCEPT") {
      addFriend();
    } else if (type == "SENT") {
      deleteFriend();
    }
  }

  useEffect(() => {
    if (userId) {
      getUserProfile();
    }
  }, []);

  const getAllPost = async (refreshing = false) => {
    const res = await onGetDetailProfile(
      refreshing ? 1 : page,
      5,
      userId
    );
    if (res.succeeded) {
      // setPosts(res.data);
      const convertResponse = res.data.profileUser.data
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


  useEffect(() => {
    getAllPost();
  }, [page]);

  // const updateAvatar = async () => {
  //   const res = await onGetUrlAvatar();
  //   if (res.succeeded) {
  //     if (avatar?.data) {
  //       await onPutImage(res.data.s3NewLinks, avatar);
  //     }
  //     // setAvatar(image);
  //   } else {
  //     showFlashMessage({
  //       message: "Error",
  //       description: res.data.message,
  //       type: "danger",
  //     });
  //   }
  // }


  const renderModalAvatar = () => {
    return (
      <Overlay
        isVisible={imgConfig}
        onBackdropPress={() => setImgConfig(false)}
        overlayStyle={styles.overlay}>
        <View>
          <AppButton
            title={"Camera"}
            onPress={() => onCamera()}
          />
          <AppButton
            title={"Gallery"}
            onPress={() => onGallery()}
          />
        </View>
      </Overlay>
    );
  };

  const onCamera = () => {
    setImgConfig(false);
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
    }).then((image: any) => {
      const imageItem = {
        filename: image.filename || moment.now().toString(),
        path: image.path,
        type: image.mime,
        data: image.data
      }
      setAvatar(imageItem);
    });
  }

  const onGallery = () => {
    setImgConfig(false);
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      includeBase64: true,
    }).then((image: any) => {
      const imageItem = {
        filename: image.filename || moment.now().toString(),
        path: image.path,
        type: image.mime,
        data: image.data
      }
      setAvatar(imageItem);

    });
  }


  return (
    <View style={styles.newContainer}>
      <AppHeader navigation={navigation} rightComponent={() => {
        return (
          <TouchableOpacity>
            <Icon name="more-vert" size={20} color={'#484860'} />
          </TouchableOpacity>
        );
      }} />
      {loading ? (
        <UserLoader />
      ) : (
        <ScrollView
          style={styles.userContainer}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.infoContainer}>
            <View style={styles.rowInfoContainer}>
              <Image
                style={styles.userImg}
                source={userInfo.s3Profile ?
                  { uri: convertToS3LinkProfile(userInfo.id, userInfo.s3Profile).path }
                  : images.avatarDemo}
              />

              <View style={styles.userNameContainer}>
                <AppText style={styles.userName}>
                  {userInfo ? userInfo.username : "User"}
                </AppText>
                {/* <AppText style={styles.userJob}>{userInfo ? userInfo.email : "Email"}</AppText> */}
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                <Image source={images.chatIcon} style={styles.userIcon} resizeMode='contain' />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('AnimalHome', {userId: userId})}>
                <Image source={images.petIcon} style={styles.userIcon} resizeMode='contain' />
              </TouchableOpacity>
            </View>

            <View style={styles.userInfoWrapper}>
              <View style={styles.userInfoItem}>
                <AppText style={styles.userInfoTitle}>{userDetail.totalFriend}</AppText>
                <AppText style={styles.userInfoSubTitle}>Friends</AppText>
              </View>

              <View style={styles.breakLine}></View>

              <View style={styles.userInfoItem}>
                <AppText style={styles.userInfoTitle}>{userDetail.totalFollower}</AppText>
                <AppText style={styles.userInfoSubTitle}>Followers</AppText>
              </View>

              <View style={styles.breakLine}></View>

              <View style={styles.userInfoItem}>
                <AppText style={styles.userInfoTitle}>
                  {userDetail.totalPost}
                </AppText>
                <AppText style={styles.userInfoSubTitle}>Posts</AppText>
              </View>
            </View>

          </View>
          <View style={styles.userBtnWrapper}>

            <TouchableOpacity style={styles.userBtn} onPress={() => handleAction(userDetail.typeFriend.type)}>
              <AppText style={styles.userBtnTxt}>{userDetail.typeFriend.type}</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userBtn} onPress={() => { navigation.navigate('Chat', { userChat: userInfo })}}>
              <AppText style={styles.userBtnTxt}>Messager</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.userInfoItem} onPress={() => navigation.navigate('Photos')}>
              <Image source={images.photosIcon} style={styles.actionIcon} />
              <AppText style={styles.userInfoSubTitle}>Photos</AppText>
            </TouchableOpacity>


            <View style={styles.userInfoItem}>
              <Image source={images.musicIcon} style={styles.actionIcon} />
              <AppText style={styles.userInfoSubTitle}>Music</AppText>
            </View>


            <View style={styles.userInfoItem}>
              <Image source={images.youtubeIcon} style={styles.actionIcon} />
              <AppText style={styles.userInfoSubTitle}>Videos</AppText>
            </View>

            <View style={styles.userInfoItem}>
              <Image source={images.gameIcon} style={styles.actionIcon} />
              <AppText style={styles.userInfoSubTitle}>Games</AppText>
            </View>

            <View style={styles.userInfoItem}>
              <Image source={images.groupIcon} style={styles.actionIcon} />
              <AppText style={styles.userInfoSubTitle}>Groups</AppText>
            </View>
          </View>

          <View style={{ height: 20 }} />

          <View style={styles.rowContainer}>
            <Image source={images.userIcon} style={styles.smallIcon} resizeMode='contain' />
            <AppText style={styles.smallText}>{`${userDetail.totalFriend} Friends - 0 mutual`}</AppText>
          </View>
          <View style={styles.rowContainer}>
            <Image source={images.influencerIcon} style={styles.smallIcon} resizeMode='contain' />
            <AppText style={styles.smallText}>{`${userDetail.totalFollower} Followers`}</AppText>
          </View>

          {isShowMore && <>
            {userInfo.address && <View style={styles.rowContainer}>
              <Image source={images.emailIcon} style={styles.smallIcon} resizeMode='contain' />
              <AppText style={styles.smallText}>{userInfo.email}</AppText>
            </View>}
            {userInfo.firstName && <View style={styles.rowContainer}>
              <Image source={images.usernameIcon} style={styles.smallIcon} resizeMode='contain' />
              <AppText style={styles.smallText}>{userInfo.firstName}</AppText>
            </View>}
            {userInfo.lastName && <View style={styles.rowContainer}>
              <Image source={images.usernameIcon} style={styles.smallIcon} resizeMode='contain' />
              <AppText style={styles.smallText}>{userInfo.lastName}</AppText>
            </View>}
            {userInfo.phoneNumber && <View style={styles.rowContainer}>
              <Image source={images.phoneIcon} style={styles.smallIcon} resizeMode='contain' />
              <AppText style={styles.smallText}>{userInfo.phoneNumber}</AppText>
            </View>}
            {userInfo.dob && <View style={styles.rowContainer}>
              <Image source={images.birthdayIcon} style={styles.smallIcon} resizeMode='contain' />
              <AppText style={styles.smallText}>{userInfo.dob}</AppText>
            </View>}
            {userInfo.gender && <View style={styles.rowContainer}>
              <Image source={images.genderBlackIcon} style={styles.smallIcon} resizeMode='contain' />
              <AppText style={styles.smallText}>{userInfo.gender}</AppText>
            </View>}
            {userInfo.zipcode && <View style={styles.rowContainer}>
              <Image source={images.zipcodeIcon} style={styles.smallIcon} resizeMode='contain' />
              <AppText style={styles.smallText}>{userInfo.zipcode}</AppText>
            </View>}
            {userInfo.address && <View style={styles.rowContainer}>
              <Image source={images.addressIcon} style={styles.smallIcon} resizeMode='contain' />
              <AppText style={styles.smallText}>{userInfo.address}</AppText>
            </View>}
          </>}

          <TouchableOpacity style={styles.rowContainer} onPress={() => setIsShowMore(!isShowMore)}>
            <Image source={images.moreIcon} style={styles.smallIcon} resizeMode='contain' />
            <AppText style={styles.smallText}>{isShowMore ? "Hide information" : `More about ${userInfo ? userInfo.username : "User"}`}</AppText>
          </TouchableOpacity>

          <View style={styles.postContainer}>
            {/* <Image source={posts ? posts[0].createdUser?.s3Profile ? 
                  { uri: convertToS3LinkProfile(posts[0]?.createdUser?.id, posts[0]?.createdUser?.s3Profile).path } 
                  : images.avatarDemo : images.avatarDemo} style={styles.postAvatar} />
            <TextInput placeholder='Write something here...' style={styles.postInput} />
            <Image source={images.mediaIcon} style={styles.smallIcon} />
            <Icon name="more-vert" size={20} color={'#484860'} /> */}
          </View>

          {/* <PostItem /> */}
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            style={styles.postContainer}
            initialNumToRender={3}
            contentContainerStyle={{ paddingBottom: 5 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <PostItem item={item}   onClickUser={() => navigation.navigate('User', { userId: item.createdUser.id })}    onPress={() => navigation.navigate('PostDetail', { post: item })}
            />}
            onEndReachedThreshold={1}
            onEndReached={() => onLoadMore()}
            onMomentumScrollBegin={() => setOnMomentalScroll(false)}
            scrollEnabled={false}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default UserScreen;
