import React, {
  useContext,
  useState
} from 'react';
import {
  ScrollView,
  View
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import AppInput from '../../components/AppInput';
import AppText from '../../components/AppText';
import AppButton from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';
import { FlashMessageContext } from '../../context/FlashMessageContext';
import { UserContext } from '../../context/UserContext';
import { useUser } from '../../service/api/user';
import { styles } from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
interface Types {
  route: any;
  navigation: any;
}
const GenderItems = [
  { label: 'Male', value: "MALE" },
  { label: 'Female', value: "FEMALE" },
  { label: 'Other', value: "OTHER" },
];
const ProfileScreen: React.FC<Types> = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const { getUser } = useContext(UserContext);
  const isEdit = route.params?.isEdit;
  const [userName, setUserName] = useState<string>(user?.username);
  const [userEmail, setUserEmail] = useState<string>(user?.email);
  const [firstName, setFirstName] = useState<string>(user?.firstName);
  const [lastName, setLastName] = useState<string>(user?.lastName);
  const [userPhone, setUserPhone] = useState<string>(user?.phoneNumber);
  const [userGender, setUserGender] = useState<any>(user?.gender);
  const [userAddress, setUserAddress] = useState<any>(user?.address);
  const [userZipCode, setUserZipCode] = useState<any>(user?.zipcode);

  const title = isEdit ? "Change Profile" : "Profile";
  // const isVerify = route.params?.isVerify;
  const { onChangeProfile, onVerifyEmail } = useUser();
  const { showFlashMessage } = useContext(FlashMessageContext);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(user?.dob == null ? new Date() : new Date(user?.dob));
  const [dateOpen, setDateOpen] = useState(false)

  const handleUpdate = async () => {    
    const res = await onChangeProfile(userName, userEmail, firstName, lastName, userPhone, date.toDateString(), userGender, userZipCode, userAddress);
    if (res.succeeded) {
      const res = await getUser();
      showFlashMessage({
        message: "Success",
        description: "Your profile has been updated successfully",
        type: "success",
      });
      // navigation.navigate('ProfileScreen', { isEdit: false });
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
  };

  const verifyEmail = async () => {
    const res = await onVerifyEmail();
    if (res.succeeded) {
      showFlashMessage({
        message: "Success",
        description: "OTP has sent to your email",
        type: "success",
      });
      navigation.navigate('Otp', {type: "Verify"})
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


      <AppHeader title={title} navigation={navigation} />
      <ScrollView
        style={styles.inputsContainer}
        showsVerticalScrollIndicator={false}>
        <AppText style={styles.userTitle}>Personal Information</AppText>
        <AppInput title="Username" placeHolder='' data={userName} setData={setUserName} disabled={!isEdit} />
        <AppInput title="Email" placeHolder='' data={userEmail} setData={setUserEmail} disabled={!isEdit} needVerify
        verify={() => verifyEmail()} isVerify={user.isActiveEmail}/>
        <AppInput title="First name" placeHolder='' data={firstName} setData={setFirstName} disabled={!isEdit} />
        <AppInput title="Last name" placeHolder='' data={lastName} setData={setLastName} disabled={!isEdit} />
        <AppInput title="Phone" keyBoardType='phone-pad' placeHolder='' data={userPhone} setData={setUserPhone} disabled={!isEdit} />
        <TouchableOpacity onPress={() => setDateOpen(true)}>
          <AppInput title="DoB" placeHolder='' data={moment(date).format("DD-MM-YYYY")} setData={() => { }} disabled={true} />
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
        </TouchableOpacity>
        <AppText style={styles.infoTitle}>Gender</AppText>
        <View style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={open}
            value={userGender}
            items={GenderItems}
            setOpen={setOpen}
            setValue={setUserGender}
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
        <AppInput title="Address" placeHolder='' data={userAddress} setData={setUserAddress} disabled={!isEdit} />
        <AppInput title="Zipcode" placeHolder='' data={userZipCode} setData={setUserZipCode} disabled={!isEdit} />
        {isEdit ?
          <AppButton title="Change" onPress={handleUpdate} /> : <View />}
        <View style={{ marginBottom: 20 }} />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

