import React, {useRef, useEffect, useState, useContext} from 'react';

import {View, Keyboard} from 'react-native';
import {OtpInputsRef} from 'react-native-otp-inputs';
import _ from 'lodash';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import { styles } from './styles';
import { PinCodeInput } from '../../components/OtpInput';
import { useUser } from '../../service/api/user';
import { FlashMessageContext } from '../../context/FlashMessageContext';
import { UserContext } from '../../context/UserContext';


interface Types {
  navigation: any;
  route: any;
}


export const OtpScreen:  React.FC<Types> = ({ navigation, route }) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const pinInputRef = useRef<OtpInputsRef>();
  const {onVerifyCode} = useUser();
  const {showFlashMessage} = useContext(FlashMessageContext);
  const { getUser } = useContext(UserContext);
  const type = route.params?.type;
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      resetPin();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const resetPin = () => {
    pinInputRef.current?.reset();
    setTimeout(() => {
      pinInputRef.current?.focus();
    }, 100);
  };
  const onFinishPin = async (code: string) => {
    setTimeout(() => {
      pinInputRef.current?.reset();
    }, 200);
    Keyboard.dismiss();
    const otpType = type === "Forgot" ? "FORGOT_PASSWORD" : "VERIFY_EMAIL";
    const res = await onVerifyCode(code, otpType);
    if (res.succeeded) {
      if (type === "Forgot"){
        navigation.navigate('ForgotPassword', { email: route.params.email });
      } else {
        getUser();
        navigation.navigate('Profile', { isEdit: true, isVerify: true });
      }
    } else {
      showFlashMessage({
        message: "Error",
        description: res.data.message,
        type: "danger",
      });
    }
    // onLogin(code, errorMessage => {
    //   setErrorMessage(errorMessage);
    //   resetPin();
    // });

    return;
  };
  return (
    <Container scrollEnabled={false}>
      <AppHeader title={"Pin code"} navigation={navigation}/>
      <View style={styles.container}>
        {/* <HelloLogin description={"Please enter your account PIN to login"} /> */}
        <PinCodeInput
          ref={ref => {
            if (ref) {
              pinInputRef.current = ref;
            }
          }}
          onFinish={code => onFinishPin(code)}
        />
        {/* {errorMessage && !_.isEmpty(errorMessage) ? (
          <ErrorMessage
            errorStyle={{marginTop: 32}}
            message={errorMessage}
            protected
          />
        ) : null} */}
      </View>
    </Container>
  );
};
