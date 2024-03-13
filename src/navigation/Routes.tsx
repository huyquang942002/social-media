import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { UserProvider } from '../context/UserProvider';
import AnimalDetailScreen from '../screens/AnimalDetailScreen/AnimalDetailScreen';
import ChatListScreen from '../screens/ChatListScreen/ChatListScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import FriendScreen from '../screens/FriendScreen/FriendScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen/OnBoardingScreen';
import PhotosScreen from '../screens/PhotosScreen/PhotosScreen';
import PostDetailScreen from '../screens/PostDetailScreen/PostDetailScreen';
import ImageDetailScreen from '../screens/PostScreen/ImageDetailScreen';
import PostScreen from '../screens/PostScreen/PostScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import UserScreen from '../screens/UserScreen/UserScreen';
import { OtpScreen } from '../screens/VerifyScreen/OtpScreen';
import VerifyScreen from '../screens/VerifyScreen/VerifyScreen';
import AnimalTabs from './AnimalTabs';
import Auth from './Auth';
import Tabs from './Tabs';
import CreateAnimalScreen from '../screens/CreateAnimalScreen/CreateAnimalScreen';
import SearchDetailScreen from '../screens/SearchDetailScreen/SearchDetailScreen';
import AnimalHomeScreen from '../screens/AnimalHomeScreen/AnimalHomeScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen/ChangePasswordScreen';

const stack = createStackNavigator();
function Routes() {
  const { user, isLoading, getUserFromStorage } = useContext(AuthContext);
  useEffect(() => {
    getUserFromStorage();
  }, []);

  return (
    <UserProvider>
      {isLoading ? (
        <ActivityIndicator
          color={'white'}
          style={{ flex: 1, alignSelf: 'center' }}
          size={24}
        />
      ) : (
        <NavigationContainer>
          {user ? (
            <>
              <stack.Navigator screenOptions={{ headerShown: false }}>
                <stack.Screen name="Tabs" component={Tabs} />
                <stack.Screen
                  name="Profile"
                  component={ProfileScreen}
                />
                <stack.Screen name="Post" component={PostScreen} />
                <stack.Screen name="Friend" component={FriendScreen} />
                <stack.Screen name="User" component={UserScreen} />
                <stack.Screen name="Photos" component={PhotosScreen} />
                <stack.Screen name="OnBoarding" component={OnBoardingScreen} />
                <stack.Screen name="AnimalTabs" component={AnimalTabs} />
                <stack.Screen name="AnimalDetail" component={AnimalDetailScreen} />
                <stack.Screen name="PostDetail" component={PostDetailScreen} />
                <stack.Screen name="Search" component={SearchScreen} />
                <stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
                <stack.Screen name="ChatList" component={ChatListScreen} />
                <stack.Screen name="Chat" component={ChatScreen} />
                <stack.Screen name="Verify" component={VerifyScreen} />
                <stack.Screen name="Otp" component={OtpScreen} />
                <stack.Screen name="ImageDetail" component={ImageDetailScreen} />
                <stack.Screen name="CreateAnimal" component={CreateAnimalScreen} />
                <stack.Screen name="Add" component={PostScreen} />
                <stack.Screen name="SearchDetail" component={SearchDetailScreen} />
                <stack.Screen name="EditPost" component={PostScreen} />
                <stack.Screen name="AnimalHome" component={AnimalHomeScreen} />

                
              </stack.Navigator>
            </>
          ) : (
            <>
              <Auth />
            </>
          )}
        </NavigationContainer>
      )}
    </UserProvider>
  );
}

export default Routes;
