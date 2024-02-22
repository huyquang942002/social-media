import React, { useContext, useEffect, useState } from 'react';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { images } from '../../../assets';
import AppText from '../../components/AppText';
import AppButton from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';
import { FlashMessageContext } from '../../context/FlashMessageContext';
import { UserContext } from '../../context/UserContext';
import { useUser } from '../../service/api/user';
import ItemProfile from './ItemProfile';
import { styles } from './styles';
import moment from 'moment';
import { usePost } from '../../service/api/post';
import { convertToS3LinkProfile } from '../../config/util';
interface Types {
  navigation: any;
}


const MenuScreen: React.FC<Types> = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { signOut } = useContext(UserContext);
  const [avatar, setAvatar] = useState<any>(convertToS3LinkProfile(user.id, user.s3Profile));
  const [imgConfig, setImgConfig] = useState(false);
  const { onGetUrlAvatar } = useUser();
  const { showFlashMessage } = useContext(FlashMessageContext);
  const { onPutImage } = usePost();


  const updateAvatar = async () => {
    const res = await onGetUrlAvatar();
    if (res.succeeded) {
      if (avatar?.data) {
        await onPutImage(res.data.s3NewLinks, avatar);
      }
      // setAvatar(image);
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
        filename: image.filename || moment.now().toString(),
        path: image.path,
        type: image.mime,
        data: image.data
      }
      setAvatar(imageItem);
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
        filename: image.filename || moment.now().toString(),
        path: image.path,
        type: image.mime,
        data: image.data
      }
      setAvatar(imageItem);

    });
  }
  useEffect(() => {
    if (avatar?.data) {
      updateAvatar();
    }
  }, [avatar]);
  useEffect(() => {
    const s3Link = convertToS3LinkProfile(user.id, user.s3Profile);
    setAvatar(s3Link);
  }, [user])
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


  const RenderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <ImageBackground source={images.profileBg} resizeMode="cover" style={styles.profileBg}>
          <TouchableOpacity style={styles.closeButton}>
            <Ionicons name="close" style={styles.closeIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowStyles} onPress={() => setImgConfig(true)}>
            <Image source={avatar?.path ? { uri: avatar.path } : images.avatarDemo} style={styles.avatar} resizeMode='contain' />
            <AppText style={styles.userName}>{user.username}</AppText>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  };
  return (
    <LinearGradient colors={['#E28E5A', '#D22966']} style={styles.gradientContainer}>
      <RenderHeader />
      <View>
        <ItemProfile icon={images.profileIcon} title="Profiles" onPress={() => navigation.navigate('User', { userId: user.id })} />
        <ItemProfile icon={images.messIcon} title="Messager" onPress={() => navigation.navigate('ChatList')} />
        <ItemProfile icon={images.friendIcon} title="Friend" onPress={() => navigation.navigate('Friend')} />
        <ItemProfile icon={images.passwordIcon} title="Change Password" onPress={() => navigation.navigate('ChangePassword')} />
        <ItemProfile icon={images.changeProfileIcon} title="Change Profile" onPress={() => navigation.navigate('Profile', { isEdit: true })} />
        <ItemProfile icon={images.logoutIcon} title="Logout" onPress={() => signOut()} />
      </View>
      {renderModalAvatar()}
    </LinearGradient>
  );
};

export default MenuScreen;

