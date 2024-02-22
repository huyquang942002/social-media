import React from 'react';
import SignIn from '../screens/SigninScreen/SignIn';
import SignUp from '../screens/SignupScreen/SignUp';
import { createStackNavigator } from '@react-navigation/stack';
import VerifyScreen from '../screens/VerifyScreen/VerifyScreen';
import { OtpScreen } from '../screens/VerifyScreen/OtpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';

const stack = createStackNavigator();
const Auth = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name={'SignIn'}
        component={SignIn}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name={'SignUp'}
        component={SignUp}
        options={{ headerShown: false }}
      />
      <stack.Screen name="Verify" component={VerifyScreen} options={{ headerShown: false }}/>
      <stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }}/>
      <stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }}/>

    </stack.Navigator>
  );
};

export default Auth;
