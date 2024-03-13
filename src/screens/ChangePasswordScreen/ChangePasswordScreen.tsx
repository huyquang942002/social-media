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
import { FlashMessageContext } from '../../context/FlashMessageContext';
import { useUser } from '../../service/api/user';
import { styles } from './styles';
interface Types {
  route: any;
  navigation: any;
}
const ChangePasswordScreen: React.FC<Types> = ({ navigation }) => {


  const [currPass, setCurrPass] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');
  const [confPass, setConfPass] = useState<string>('');
  const { onUpdatePassword } = useUser();
  const { showFlashMessage } = useContext(FlashMessageContext);

  const handleUpdate = async () => {
    if (newPass !== confPass) {
      showFlashMessage({
        message: "Error",
        description: "Confirm password is not match",
        type: "danger",
      });
      return;
    }
    const res = await onUpdatePassword(currPass, newPass);
    if (res.succeeded) {
      showFlashMessage({
        message: "Success",
        description: "Your password has been updated successfully",
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
  };


  return (
    <View style={styles.container}>


      <AppHeader title="Change Password" navigation={navigation} />
      <ScrollView
        style={styles.inputsContainer}
        showsVerticalScrollIndicator={false}>
        <AppText style={styles.userTitle}>Change Password</AppText>
        <AppInput title="Current Password" placeHolder='' data={currPass} setData={setCurrPass} />
        <AppInput title="New Password" placeHolder='' data={newPass} setData={setNewPass} />
        <AppInput title="Confirm Password" placeHolder='' data={confPass} setData={setConfPass} />


        <AppButton title="Change" onPress={handleUpdate} />
      </ScrollView>
    </View>
  );
};

export default ChangePasswordScreen;

