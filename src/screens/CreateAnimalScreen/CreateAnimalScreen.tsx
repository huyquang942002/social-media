import moment from 'moment';
import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import {
  Image,
  ScrollView,
  View
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Overlay } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import { images } from '../../../assets';
import AppHeader from '../../components/AppHeader';
import AppInput from '../../components/AppInput';
import AppText from '../../components/AppText';
import AppButton from '../../components/Button';
import { convertToS3LinkPet, convertUriToBase64 } from '../../config/util';
import { AuthContext } from '../../context/AuthContext';
import { FlashMessageContext } from '../../context/FlashMessageContext';
import { usePet } from '../../service/api/pet';
import { usePost } from '../../service/api/post';
import { styles } from './styles';

interface Types {
  route: any;
  navigation: any;
}
const GenderItems = [
  { label: 'Male', value: "MALE" },
  { label: 'Female', value: "FEMALE" },
  // { label: 'Other', value: "OTHER" },
];

const SpeciesItems = [
  { label: 'Dog', value: "DOG" },
  { label: 'Cat', value: "CAT" },
  { label: 'Bird', value: "BIRD" },
  { label: 'Fish', value: "FISH" },
  { label: 'Shrimp', value: "SHRIMP" },
  { label: 'Squid', value: "SQUID" },
  { label: 'Scallop', value: "SCALLOP" },
  { label: 'Crab', value: "CRAB" },
  { label: 'Other', value: "OTHER" },


];

const CreateAnimalScreen: React.FC<Types> = ({ navigation, route }) => {
  let petInfo = route.params?.petInfo;
  const {user} = useContext(AuthContext);
  const [name, setName] = useState<string>();
  const [species, setSpecies] = useState<any>(SpeciesItems[0]);
  const [gender, setGender] = useState<any>();
  const [color, setColor] = useState<string>();
  const [description, setDescription] = useState<string>();


  const { showFlashMessage } = useContext(FlashMessageContext);
  const [open, setOpen] = useState(false);
  const [openSpecies, setOpenSpecies] = useState(false);

  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false)
  const [imgConfig, setImgConfig] = useState(false);
  const [avatar, setAvatar] = useState<any>();
  const { onPutImage } = usePost();

  const { onCreatePet, onUpdateHavePet, onUpdatePet } = usePet();

  useEffect(() => {    
    if (petInfo) {
      setName(petInfo.name);
      setSpecies(petInfo.species);
      setGender(petInfo.gender);
      setColor(petInfo.furColor);
      setDescription(petInfo.description);
      if (petInfo.s3ImagePet) {
        
        const oldImage = convertToS3LinkPet(user.id, petInfo.s3ImagePet);

        const base64 = convertUriToBase64(oldImage.path);
        const imageItem = {
          filename: moment.now().toString(),
          path: oldImage.path,
          type: "image/jpeg",
          data: base64
        }
        setAvatar(imageItem);
      }
    }
  }, []);

  const handleCreate = async () => {
    if (!avatar) {
      showFlashMessage({
        message: "Error",
        description: "Please choose your pet's image",
        type: "danger",
      });
      return;
    }
    if (!name) {
      showFlashMessage({
        message: "Error",
        description: "Please enter your pet's name",
        type: "danger",
      });
      return;
    }
    if (!species) {
      showFlashMessage({
        message: "Error",
        description: "Please choose your pet's species",
        type: "danger",
      });
      return;
    }
    // if (!gender) {
    //   showFlashMessage({
    //     message: "Error",
    //     description: "Please choose your pet's gender",
    //     type: "danger",
    //   });
    //   return;
    // }
    const res = await onCreatePet(avatar.filename, date.toDateString(), gender, color, description, name, species);
    if (res.succeeded) {
      if (avatar) {        
        await onPutImage(res.data.s3ImagePet, avatar);
      }
      await onUpdateHavePet();
      showFlashMessage({
        message: "Success",
        description: "Your pet has been created successfully",
        type: "success",
      });
      resetScreen();
      navigation.navigate('Home');
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
  };

  const handleUpdate = async () => {
    if (!avatar) {
      showFlashMessage({
        message: "Error",
        description: "Please choose your pet's image",
        type: "danger",
      });
      return;
    }
    if (!name) {
      showFlashMessage({
        message: "Error",
        description: "Please enter your pet's name",
        type: "danger",
      });
      return;
    }
    if (!species) {
      showFlashMessage({
        message: "Error",
        description: "Please choose your pet's species",
        type: "danger",
      });
      return;
    }
    if (!gender) {
      showFlashMessage({
        message: "Error",
        description: "Please choose your pet's gender",
        type: "danger",
      });
      return;
    }

    const res = await onUpdatePet(petInfo.id, avatar.filename, date.toDateString(), gender, color, description, name, species, false);
    if (res.succeeded) {
      if (avatar) {        
        await onPutImage(res.data.data.newS3Link, avatar);
      }
      showFlashMessage({
        message: "Success",
        description: "Your pet has been created successfully",
        type: "success",
      });
      resetScreen();
      navigation.navigate('Home');
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
  };

  const resetScreen = () => {
    petInfo = null;
    setName('');
    setSpecies(SpeciesItems[0]);
    setGender('');
    setColor('');
    setDescription('');
    setDate(new Date());
    setAvatar(null);
  }

  // Function for opening the camera in the android
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


  return (
    <View style={styles.container}>


      <AppHeader title={"Create Pet"} navigation={navigation} />
      <ScrollView
        style={styles.inputsContainer}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.avatarContainer} onPress={() => setImgConfig(true)} >
          <Image source={avatar?.path ? { uri: avatar.path } : images.catImg} style={styles.petAvatar} />
        </TouchableOpacity>
        <AppInput title="Name" placeHolder='' data={name} setData={setName} />
        <AppText style={styles.infoTitle}>{"Species < dog, cat...>"}</AppText>

        <View style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={openSpecies}
            value={species}
            items={SpeciesItems}
            setOpen={setOpenSpecies}
            setValue={setSpecies}
            placeholder={''}
            zIndex={1000}
            dropDownContainerStyle={{
              backgroundColor: "#D9D9D9",
              borderWidth: 1,
              borderRadius: 15,
            }}
            listMode="SCROLLVIEW"
            style={{
              backgroundColor: "#D9D9D9",
              borderWidth: 0,
              borderRadius: 15,
            }}
          />
        </View>
        {/* <TouchableOpacity onPress={() => setDateOpen(true)}> */}
        <AppInput onPress={() => setDateOpen(true)} title="DoB" placeHolder='' data={moment(date).format("DD-MM-YYYY")} setData={() => { }} disabled={true} />
        <DatePicker
          modal
          open={dateOpen}
          date={date}
          mode="date"
          onConfirm={(date) => {
            setDateOpen(false)
            setDate(date)
          }}
          onCancel={() => {
            setDateOpen(false)
          }}
        />
        {/* </TouchableOpacity> */}
        <AppInput title="Color" placeHolder='' data={color} setData={setColor} />
        <AppInput title="Description" placeHolder='' data={description} setData={setDescription} />
        <AppText style={styles.infoTitle}>Gender</AppText>
        <View>
          <DropDownPicker
            open={open}
            value={gender}
            items={GenderItems}
            setOpen={setOpen}
            setValue={setGender}
            placeholder={''}
            dropDownContainerStyle={{
              backgroundColor: "#D9D9D9",
              borderWidth: 1,
              borderRadius: 15,
            }}
            listMode="SCROLLVIEW"
            style={{
              backgroundColor: "#D9D9D9",
              borderWidth: 0,
              borderRadius: 15,
            }}
          />
        </View>
        <AppButton title="Continue" onPress={petInfo ? handleUpdate : handleCreate} />
        <View style={{ marginBottom: 20 }} />
      </ScrollView>
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
    </View>
  );
};

export default CreateAnimalScreen;

