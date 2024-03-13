import React, {
  memo,
  useContext,
  useEffect,
  useState
} from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { images } from '../../assets';
import { convertListS3Link, convertToS3LinkProfile } from '../config/util';
import { AuthContext } from '../context/AuthContext';
import { FlashMessageContext } from '../context/FlashMessageContext';
import { useInteract } from '../service/api/interact';
import { usePost } from '../service/api/post';
import { Post } from '../service/model/post';
import AppText from './AppText';
import FbGrid from './FBGrid';
import { MoreDialog } from './MoreDialog';
import { AppModal } from './AppModal';

interface Types {
  onRefresh?: any;
  onPress?: () => void;
  onEdit?: () => void;
  onClickUser?: () => void;
  item: Post;
}
const screenWidth = Dimensions.get('window').width;
const PostItem: React.FC<Types> = ({ item, onPress, onRefresh, onEdit, onClickUser }) => {
  const { user } = useContext(AuthContext);

  const { onLove, onRemoveLove, onDisLove, onRemoveDisLove } = useInteract();
  // const [userIsLoved, setUserIsLoved] = useState(item.isLoved);
  // const [userIsDisLoved, setUserIsDisLoved] = useState(item.isDisLoved);
  // const [totalLove, setTotalLove] = useState<number>(+item.totalLove);
  // const [totalDislove, setTotalDisLove] = useState<number>(+item.totalDislove);

  const [openMoreDialog, setOpenMoreDialog] = useState<boolean>(false);
  const { onDeletePost } = usePost();
  const { showFlashMessage } = useContext(FlashMessageContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleLove = async () => {
    if (item.isLoved) {
      await onRemoveLove(item.id);
      // setUserIsLoved(false);
      // if (userIsDisLoved) {
      //   setTotalDisLove(totalDislove + 1);
      //   setUserIsLoved(false);
      //   setUserIsDisLoved(false);        
      // } else {
      //   setTotalLove(totalLove - 1);
      // }
    } else {
      await onLove(item.id);
      // setUserIsLoved(true);
      // if (userIsDisLoved) {
      //   setTotalDisLove(totalDislove - 1);
      //   setUserIsLoved(false);
      //   setUserIsDisLoved(false);
      // } else {
      //   setTotalLove(totalLove + 1);
      // }
    }
    onRefresh();
  }

  const checkOwnPost = () => {
    return item.createdUser.id == user?.id;
  }

  const handleDisLove = async () => {
    if (item.isDisLoved) {
      await onRemoveDisLove(item.id);
      // setUserIsDisLoved(false);
      // if (userIsLoved) {
      //   setTotalLove(totalLove + 1);
      // } else {
      //   setTotalDisLove(totalDislove - 1);
      // }
    } else {
      await onDisLove(item.id);
      // setUserIsDisLoved(true);
      // if (userIsLoved) {
      //   setTotalLove(totalLove - 1);
      // } else {
      //   setTotalDisLove(totalDislove + 1);
      // }
    }
    onRefresh();
  }

  const deletePost = async () => {
    setOpenMoreDialog(false);
    setShowModal(false);
    const res = await onDeletePost(item.id);
    if (res.succeeded) {
      showFlashMessage({
        message: "Success",
        description: "Delete post successfully",
        type: "success",
      });
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
    onRefresh();
  }
  
  return (
    <View key={item.id}>
      <View style={styles.postTopContainer}>
        <TouchableOpacity onPress={onClickUser}>
          <Image
            source={item?.createdUser?.s3Profile ? { uri: convertToS3LinkProfile(item?.createdUser?.id, item?.createdUser?.s3Profile).path } : images.avatarDemo}
            style={styles.postAvatar}
          />
        </TouchableOpacity>
        <View style={styles.postHeaderTextContainer}>
          <TouchableOpacity onPress={onClickUser}>
            <AppText style={styles.postUserNameText}>
              {item.createdUser?.username}
            </AppText>
          </TouchableOpacity>
          <AppText style={styles.postCreateTimeText}>
            {item.createdUser?.email}
          </AppText>
        </View>
        {checkOwnPost() && <View style={styles.postIconContainer}>
          <TouchableOpacity
            style={styles.postIconStyle}
            onPress={() => setOpenMoreDialog(!openMoreDialog)}
          >
            <Icon name={'more-vert'} color={'#484860'} size={20} />
          </TouchableOpacity>
          {
            openMoreDialog && <MoreDialog deletePost={() => setShowModal(true)} editPost={() => {
              onEdit && onEdit();
              setOpenMoreDialog(false);
            }} />
          }

        </View>}
      </View>
      <View style={styles.postText}>
        <TouchableOpacity onPress={onPress}>
          <AppText style={{ color: 'black' }}>{item.content}</AppText>
        </TouchableOpacity>
      </View>
      <View style={{ alignSelf: 'center', marginTop: 12, zIndex: -1 }}>
        {item.postGalleries != null ?
          <FbGrid style={{ borderRadius: 20, width: screenWidth * 0.95, height: 200 }}
            images={convertListS3Link(item.postGalleries, item?.createdUser.id)}
            onPress={onPress} />
          : null}
      </View>

      <View style={styles.postBottom}>
        <View style={styles.postActionContainer}>
          <TouchableOpacity onPress={handleLove}>
            <Ionicons name={item.isLoved ? "heart" : "heart-outline"} style={styles.postActionIcon} color={'#F04A4A'} size={18} />
          </TouchableOpacity>
          <AppText
            style={{
              color: '#F04A4A',
              alignSelf: 'center',
              paddingLeft: 12,
            }}>
            {+item.totalLove}
          </AppText>
        </View>
        <View style={styles.postActionContainer}>
          <TouchableOpacity onPress={handleDisLove}>
            <Ionicons name={item.isDisLoved ? "heart-dislike" : "heart-dislike-outline"} style={styles.postActionIcon} color={'#F04A4A'} size={18} />
          </TouchableOpacity>
          <AppText
            style={{
              color: '#F04A4A',
              alignSelf: 'center',
              paddingLeft: 12,
            }}>
            {+item.totalDislove}
          </AppText>
        </View>
        <View style={styles.postActionContainer}>
          <TouchableOpacity onPress={onPress}>
            <Image source={images.commentIcon} style={styles.postActionIcon} resizeMode='contain' />
          </TouchableOpacity>
          <AppText
            style={{
              color: '#484860',
              alignSelf: 'center',
              paddingLeft: 12,
            }}>
            {item.totalComment}
          </AppText>
        </View>
        <View style={styles.postActionContainer}>
          <TouchableOpacity>
            <Image source={images.shareIcon} style={styles.postActionIcon} resizeMode='contain' />
          </TouchableOpacity>
          <AppText
            style={{
              color: '#484860',
              alignSelf: 'center',
              paddingLeft: 12,
            }}>
            {item.totalComment}
          </AppText>
        </View>
        <View style={{ flex: 1 }} />
        <TouchableOpacity>
          <Image source={images.saveIcon} style={styles.postActionIcon} resizeMode='contain' />
        </TouchableOpacity>
      </View>
      <AppModal
      onConfirm={() => deletePost()}
      onCancel={() => setShowModal(false)}
      isVisible={showModal}
      onBackdropPress={() => {}}
      title='Move to your trash ?'
      canCancel>
      
    </AppModal>
    </View>
  );
};

export default memo(PostItem);
const styles = StyleSheet.create({
  postTopContainer: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAvatar: {
    borderRadius: 20,
    height: 44,
    width: 44,
  },
  postHeaderTextContainer: {
    flexDirection: 'column',
    // paddingTop: 12,
    paddingLeft: 15,
  },
  postUserNameText: {
    fontWeight: 'bold',
    color: '#1D1A20',
  },
  postCreateTimeText: {
    // paddingTop: 6,
    color: '#A4A4B2',
    fontSize: 12,
  },
  postIconContainer: {
    position: 'absolute',
    right: 0,
  },
  postIconStyle: {
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  postText: {
    marginHorizontal: '8%',
    marginTop: 12,    
  },
  postBottom: {
    flexDirection: 'row',
    marginTop: 18,
    marginBottom: '10%',
    marginHorizontal: '8%',
  },
  postActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10%',
  },
  postActionIcon: {
    width: 18,
    height: 18,
  },
});