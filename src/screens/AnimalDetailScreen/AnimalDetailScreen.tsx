import ReadMore from '@fawazahmed/react-native-read-more';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import {
  Image,
  ImageBackground,
  View
} from 'react-native';
import { images } from '../../../assets';
import AppText from '../../components/AppText';
import AppButton from '../../components/Button';
import { FlashMessageContext } from '../../context/FlashMessageContext';
import { usePet } from '../../service/api/pet';
import { styles } from './styles';
import { AppModal } from '../../components/AppModal';
import { convertToS3LinkPet } from '../../config/util';
import { AuthContext } from '../../context/AuthContext';
import { Icon } from 'react-native-elements';
interface Types {
  navigation: any;
  route: any
}



const AnimalDetailScreen: React.FC<Types> = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const petInfo = route.params?.petInfo;
  const { showFlashMessage } = useContext(FlashMessageContext);
  const { onDeletePet } = usePet();
  const [showModal, setShowModal] = useState<boolean>(false);
  const checkOwnPet = () => {
    return petInfo.createdUser.id == user?.id;
  }

  const deletePost = async () => {
    setShowModal(false);
    const res = await onDeletePet(petInfo.id);
    if (res.succeeded) {
      showFlashMessage({
        message: "Success",
        description: "Delete post successfully",
        type: "success",
      });
      navigation.goBack();
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.animalBg}
        style={styles.imageBackground}
      >
        {/* <Icon
            onPress={() => navigation.goBack()}
            color={'white'}
            name="chevron-left"
            type="material-community"
            size={50}
            style={styles.backIcon}
          /> */}
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={{ uri: convertToS3LinkPet(user.id, petInfo.s3ImagePet).path }}
              style={styles.image}
            />
          </View>
          <View style={styles.content}>
            <AppText style={styles.textTitle}>{petInfo.name}</AppText>
            <View style={styles.rowContainer}>
              <Image
                resizeMode="contain"
                style={{ width: 12, height: 12 }}
                source={images.pinOutlineIcon}
              />
              <AppText style={styles.cityText}>New York City</AppText>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.infoIconContainer}>
                <Image resizeMode="contain" style={styles.infoIcon} source={images.pawIcon} />
              </View>
              <AppText style={styles.infoText}>{petInfo.furColor}</AppText>

              <View style={styles.infoIconContainer}>
                <Image resizeMode="contain" style={styles.infoIcon} source={images.genderIcon} />
              </View>
              <AppText style={styles.infoText}>{petInfo.gender}</AppText>

              <View style={styles.infoIconContainer}>
                <Image resizeMode="contain" style={styles.infoIcon} source={images.deerIcon} />
              </View>
              <AppText style={styles.infoText}>{moment(petInfo.dateOfBirth).format("DD-MM-YYYY")}</AppText>

            </View>
            <View>
              <ReadMore numberOfLines={3} seeMoreText="More" seeLessText="Less" style={styles.descriptionText}>
                {/* {
                  "The dog (Canis familiaris when considered a distinct species or Canis lupus familiaris when considered a subspecies of the wolf) is a domesticated carnivore of the "
                } */}
                {petInfo.description}
              </ReadMore>
            </View>

            <View style={[styles.rowContainer, { flex: 1 }]}>
              <View style={styles.dogImageContainer}>
                <Image resizeMode="contain" style={styles.dogImage} source={images.dog1} />
              </View>
              <View style={styles.dogImageContainer}>
                <Image resizeMode="contain" style={styles.dogImage} source={images.dog2} />
              </View>
              <View style={styles.dogImageContainer}>
                <Image resizeMode="contain" style={styles.dogImage} source={images.dog3} />
              </View>
            </View>

            {checkOwnPet() && <View style={styles.bottomContainer}>
              <AppButton title="Update" onPress={() => navigation.navigate('CreateAnimal', { petInfo: petInfo })} buttonStyle={{ height: 50, width: '45%' }} />
              <AppButton title="Delete" onPress={() => setShowModal(true)} buttonStyle={{ height: 50, width: '45%' }} />
            </View>}
          </View>

        </View>
      </ImageBackground>
      <AppModal
        onConfirm={() => deletePost()}
        onCancel={() => setShowModal(false)}
        isVisible={showModal}
        onBackdropPress={() => { }}
        title='Delete pet ?'
        canCancel>

      </AppModal>
    </View>
  );
};

export default AnimalDetailScreen;
