import _, { set } from 'lodash';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppText';
import AppButton from '../../components/Button';
import Comment from '../../components/Comment';
import PostItem from '../../components/PostItem';
import { convertListS3Link } from '../../config/util';
import { FlashMessageContext } from '../../context/FlashMessageContext';
import { useComments } from '../../service/api/comments';
import { usePost } from '../../service/api/post';
import { Post } from '../../service/model/post';
import { styles } from './styles';
interface Types {
  route: any;
  navigation: any;
}

const PostDetailScreen: React.FC<Types> = ({ route, navigation }) => {
  const post = route.params.post as Post;
  const onRefresh = route.params.onRefresh;

  const { onCreateComment, onGetCommentByPost, deleteComment } = useComments();
  const { showFlashMessage } = useContext(FlashMessageContext);
  const [commentList, setCommentList] = useState<any>([]);

  const [imgConfig, setImgConfig] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [commentChild, setCommentChild] = useState<Post | null>();
  const [imageComment, setImageComment] = useState<any>();
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [page, setPage] = useState(1);
  const [onMomentalScroll, setOnMomentalScroll] = useState(true);
  const { onPutImage } = usePost();
  const createComment = async () => {
    const image = imageComment ? imageComment.filename : null;

    if (commentChild == null) {
      const res = await onCreateComment(post.id, commentContent, "", image);
      if (res.succeeded) {
        if (imageComment) {
          await onPutImage(res.data.s3Link, imageComment);
        }
      } else {
        showFlashMessage({
          message: "Error",
          description: res.data.message,
          type: "danger",
        });
      }
    } else {
      const res = await onCreateComment(post.id, commentContent, commentChild?.id, image);
      if (res.succeeded) {
        if (imageComment) {
          await onPutImage(res.data.s3Link, imageComment);
        }
      } else {
        showFlashMessage({
          message: "Error",
          description: res.data.message,
          type: "danger",
        });
      }
    }
    getAllCommentByPost();
    setCommentChild(null);
    setImageComment(null);
    setCommentContent("");
  }

  const getAllCommentByPost = async (refreshing = false) => {
    // const res = await onGetCommentByPost(
    //   post.id,
    //   refreshing ? 1 : page,
    //   5,
    // );
    const res = await onGetCommentByPost(
      post.id,
      1,
      20,
    );
    if (res.succeeded) {
      const convertResponse = res?.data.data;
      if (page === 1) {
        setCommentList(convertResponse);
      } else {
        if (!_.isEmpty(convertResponse)) {
          setCommentList(commentList?.concat(convertResponse));
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
        filename: moment.now().toString(),
        path: image.path,
        type: image.mime,
        data: image.data
      }
      setImageComment(imageItem);
    });
  }

  // Function to opening the gallery of android
  const onGallery = () => {
    setImgConfig(false);
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      includeBase64: true,
    }).then((image: any) => {
      const imageItem = {
        filename: moment.now().toString(),
        path: image.path,
        type: image.mime,
        data: image.data
      }
      setImageComment(imageItem);

    });
  }

  useEffect(() => {
    getAllCommentByPost();
  }, [page]);

  const handleFeedBack = (postFeedback: Post) => {
    setCommentChild(postFeedback);
  }

  const handleDelete = async (commentId: any) => {
    const res = await deleteComment(commentId);
    if (res.succeeded) {
      showFlashMessage({
        message: "Success",
        description: "Delete comment successfully",
        type: "success",
      });
      getAllCommentByPost();
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
  }
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

  const onLoadMore = () => {
    console.log("onLoadMore", canLoadMore, onMomentalScroll);
    
    if (canLoadMore && !onMomentalScroll) {
      setPage(page + 1);
      setOnMomentalScroll(true);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title={"Post"} navigation={navigation} />

      <FlatList
        ListHeaderComponent={() => <PostItem
          item={post}
          onPress={() => navigation.navigate('ImageDetail', { postImages: convertListS3Link(post.postGalleries, post?.createdUser.id) })}
          onRefresh={() => {
            onRefresh();
            navigation.navigate("Tabs")
          }} />}
        data={commentList}
        // onEndReachedThreshold={1}
        // onEndReached={() => onLoadMore()}
        // onMomentumScrollBegin={() => setOnMomentalScroll(false)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <Comment item={item} handleFeedBack={handleFeedBack} handleDelete={handleDelete} />
          )
        }} />

      <View style={{ elevation: 5, backgroundColor: 'white' }}>
        {commentChild && <View style={{ marginStart: '15%', marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
          <AppText style={styles.postCreateTimeText}>
            {`Feedback ${commentChild?.createdUser?.username}`}
          </AppText>
          <TouchableOpacity onPress={() => setCommentChild(null)}>
            <Icon name={'close'} color={'#A4A4B2'} size={14} style={{ marginStart: 10 }} />
          </TouchableOpacity>
        </View>}
        {imageComment && <View style={{ marginStart: '15%', marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: imageComment.path }} style={{ width: 80, height: 80 }} />
          <TouchableOpacity onPress={() => setImageComment(null)}>
            <Icon name={'close'} color={'#A4A4B2'} size={14} style={{ marginStart: 10 }} />
          </TouchableOpacity>
        </View>}
        <View style={styles.bottomContainer}>
          <Icon name={'photo-library'} color={'#484860'} size={25} onPress={() => setImgConfig(true)} />
          <View style={styles.commentInput}>
            <TextInput
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={commentContent}
              onChangeText={txt => setCommentContent(txt)}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity onPress={createComment} disabled={_.isEmpty(commentContent)}>
            <Icon name={'send'} color={'#484860'} size={25} />
          </TouchableOpacity>
        </View>
      </View>
      {renderModalAvatar()}

    </View>
  )
}

export default PostDetailScreen
