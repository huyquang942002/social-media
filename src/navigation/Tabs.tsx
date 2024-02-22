import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
//screens
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import { images } from '../../assets';
import AppText from '../components/AppText';
import FriendScreen from '../screens/FriendScreen/FriendScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MenuScreen from '../screens/MenuScreen/MenuScreen';
import Notifications from '../screens/NotificationsScreen/Notifications';
import PostScreen from '../screens/PostScreen/PostScreen';

export type RootStackParamList = {
  Friend: undefined;
  Add: undefined;
  Feature: undefined;
  Notifications: undefined;
  Home: undefined;
  Menu: {userId: any} | undefined;
};
const Tab = createBottomTabNavigator<RootStackParamList>();

export default function Tabs() {

  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            color = 'black';
            size = 20;
            if (route.name === 'Home') {
              iconName = images.homeIcon;
            } else if (route.name === 'Friend') {
              iconName = images.friendHomeIcon;
            } else if (route.name === 'Add') {         
              iconName = images.postIcon;
            } else if (route.name === 'Notifications') {
              iconName = images.notiIcon;
            } else if (route.name === 'Menu') {
              iconName = images.menuIcon;
            }
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image source={iconName} style={{width: 20, height: 20}} />
                <AppText style={{color: 'black', fontSize: 10}}>{route.name}</AppText>
              </View>
            );
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            borderTopWidth: 0,
            shadowOffset: {
              width: 0,
              height: 0, // for IOS
            },
          },
          lazy: false,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Friend" component={FriendScreen} />
        <Tab.Screen name="Add" component={PostScreen} />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{tabBarBadge: 3}}
        />
        <Tab.Screen
          name="Menu"
          component={MenuScreen}
          // listeners={{
          //   tabPress: event => {
          //     event.preventDefault();
          //     const action = TabActions.jumpTo('User', {userId: null});
          //     navigation.dispatch(action);
          //   },
          // }}
        />
      </Tab.Navigator>
  );
}
