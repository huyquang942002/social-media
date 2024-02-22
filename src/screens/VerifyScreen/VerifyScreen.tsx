import React, {
  useContext,
  useState
} from 'react';
import {
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
const VerifyScreen: React.FC<Types> = ({ navigation, route }) => {
  const { showFlashMessage } = useContext(FlashMessageContext);
  const type = route.params?.type;


  const [userEmail, setUserEmail] = useState<string>('');
  const { onForgetPassword } = useUser();


  const handleUpdate = async () => {
    let res;
      res = await onForgetPassword(userEmail);
   
    if (res.succeeded) {
      navigation.navigate('Otp', { email: userEmail, type: type});
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
    
  };
  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <View style={styles.container}>
      <View>
      <AppText style={styles.userTitle}>Verify email</AppText>
        <AppInput title="Email" placeHolder='' data={userEmail} setData={setUserEmail} />
        <AppButton title="Verify" onPress={handleUpdate} />
      </View>
    </View>
  );
};

export default VerifyScreen;

