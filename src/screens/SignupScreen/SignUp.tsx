import { Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserContext } from '../../context/UserContext';
import AppText from '../../components/AppText';
import { images } from '../../../assets';
import { styles } from './styles';
const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { setEmail, setPassword, createAccount, setName } = useContext(UserContext)
  const registerUser = async () => {
    await createAccount();
    navigation.navigate("SignIn");
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flexContainer}>

      <View style={styles.authHeaderTextContainer}>
        <Image source={images.catImg} style={{ width: 80, height: 80, alignSelf: 'center' }} />
        <AppText style={styles.authHeaderText}>Get Started</AppText>
        <AppText style={styles.authSubText}>create your account</AppText>
      </View>
      <View style={styles.authInputContainer}>
        <View>
          <View>
            <Ionicons
              name="person-outline"
              color={'#AEAEAE'}
              size={20}
              style={styles.authInputIcon}
            />
            <TextInput
              style={styles.authTextInput}
              placeholder={'Enter your name'}
              placeholderTextColor={'#AEAEAE'}
              onChangeText={setName}
            />
          </View>
          <View>
            <Ionicons
              name="mail-outline"
              color={'#AEAEAE'}
              size={20}
              style={styles.authInputIcon}
            />
            <TextInput
              style={styles.authTextInput}
              placeholder={'Enter your e-mail'}
              placeholderTextColor={'#AEAEAE'}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Ionicons
              name="lock-closed-outline"
              color={'#AEAEAE'}
              size={20}
              style={styles.authInputIcon}
            />
            <TextInput
              style={styles.authTextInput}
              placeholder={'Enter your password'}
              placeholderTextColor={'#AEAEAE'}
              onChangeText={setPassword}
              textContentType={"password"}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={styles.authButtonContainer}>
          <TouchableOpacity style={styles.authButtonStyle} onPress={registerUser}>
            <AppText style={styles.authButtonText}>Sign Up</AppText>
          </TouchableOpacity>

        </View>
        <View style={styles.authNewMemberContainer}>
          <AppText style={styles.authSubText}>Do you already have an account ?</AppText>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <AppText style={styles.signUpText}>Sign In</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignUp
