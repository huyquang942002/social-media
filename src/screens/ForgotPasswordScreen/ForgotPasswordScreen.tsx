import React, {
  useContext,
  useState
} from 'react';
import {
  ScrollView,
  View
} from 'react-native';
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
const ForgotPasswordScreen: React.FC<Types> = ({ navigation, route }) => {
  const {onResetPassword} = useUser();
  const { showFlashMessage } = useContext(FlashMessageContext);
  const [password, setPassword] = useState<string>('');
  const [confPassword, setConfPassword] = useState<string>('');
  

  const handleUpdate = async () => {
    if (password !== confPassword) {
      showFlashMessage({
        message: "Error",
        description: "Password and confirm password are not matched",
        type: "danger",
      });
      return;
    }
    const res = await onResetPassword(password, route.params.email);
    if (res.succeeded) {
      navigation.navigate('SignIn');
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
      <ScrollView
        style={styles.inputsContainer}
        showsVerticalScrollIndicator={false}>
        <AppText style={styles.userTitle}>Forgot Password</AppText>
        <AppText style={styles.userTitle}>Let’s help recover your account</AppText>

        <AppInput title="Password" placeHolder='' data={password} setData={setPassword} />
        <AppInput title="Confirm Password" placeHolder='' data={confPassword} setData={setConfPassword} />
       

      </ScrollView>
      <AppButton title="Change" onPress={handleUpdate} style={{alignSelf: "flex-end"}}/>
      <View style={{marginBottom: 20}}/>

    </View>
  );
};

export default ForgotPasswordScreen;

