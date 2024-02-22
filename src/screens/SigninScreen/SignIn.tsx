import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useContext, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserContext } from '../../context/UserContext';
import AppText from '../../components/AppText';
import { images } from '../../../assets';
import { styles } from './styles';

const SignIn = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { setEmail, setPassword, signIn } = useContext(UserContext)

  return (
    <View style={styles.flexContainer}>
      <View style={styles.authHeaderTextContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={images.catImg} style={{width: 80, height: 80}} />
        <AppText style={styles.authHeaderText}>Pet Sky</AppText>
        </View>
        <AppText style={styles.authSubText}>Sign in to access your account</AppText>
      </View>
      <View style={styles.authInputContainer}>
        <View>
          <View>
            <Ionicons
              name="mail-outline"
              color={'#AEAEAE'}
              size={20}
              style={styles.authInputIcon}
            />
            <TextInput
              onChangeText={setEmail}
              style={styles.authTextInput}
              placeholder={'Enter your e-mail'}
              placeholderTextColor={'#AEAEAE'}
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
              secureTextEntry={true}
              textContentType={"password"}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Verify', {type: "Forgot"})}>
          <AppText style={[styles.authSubText, {alignSelf: 'flex-start', marginTop: 15, marginStart: 40}]}>Forgot Password?</AppText>
        </TouchableOpacity>

        <View style={styles.otherWayContainer}>
          <AppText style={styles.authSubText}>Or Register up with</AppText>
          <View style={styles.authNewMemberContainer}>
            <TouchableOpacity style={styles.ggsbButton}>
              <AppText style={styles.authButtonText}>Google</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ggsbButton}>
              <AppText style={styles.authButtonText}>Apple</AppText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.authButtonContainer}>
          <TouchableOpacity style={styles.authButtonStyle} onPress={() => signIn()}>
            <AppText style={styles.authButtonText}>Log In</AppText>
          </TouchableOpacity>
        </View>
        <View style={styles.authNewMemberContainer}>
          <AppText style={styles.authSubText}>Do you have an account ?</AppText>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <AppText style={styles.signUpText}>Sign Up</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;



