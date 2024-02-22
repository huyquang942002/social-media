import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimalHomeScreen from '../screens/AnimalHomeScreen/AnimalHomeScreen';
import CreateAnimalScreen from '../screens/CreateAnimalScreen/CreateAnimalScreen';

export type RootStackParamList = {
    Home: undefined;
    Chat: undefined;
    Create: undefined;
    Profile: undefined;

};
const AnimalTab = createBottomTabNavigator<RootStackParamList>();

export default function AnimalTabs() {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
            <AnimalTab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = '';
                        color = focused ? '#FF005C' : '#BDBDBD';
                        size = 20;
                        if (route.name === 'Home') {
                            iconName = 'home-outline';
                        } else if (route.name === 'Chat') {
                            iconName = 'chatbubble-outline';
                        } else if (route.name === 'Create') {
                            iconName = 'add-outline';
                        } else if (route.name === 'Profile') {
                            iconName = 'person-outline';
                        }
                        return (
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                                backgroundColor: 'white',
                                elevation: 10,
                                padding: 8,
                            }}>
                                <Ionicons name={iconName} size={18} color={color} />
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
                        borderTopStartRadius: 30,
                        borderTopEndRadius: 30,
                        height: 60,
                    },
                    lazy: false,
                })}>
                <AnimalTab.Screen name="Home" component={AnimalHomeScreen} />
                <AnimalTab.Screen name="Chat" component={AnimalHomeScreen} />
                <AnimalTab.Screen name="Create" component={CreateAnimalScreen} />
                <AnimalTab.Screen name="Profile" component={AnimalHomeScreen} />

            </AnimalTab.Navigator>
    );
}
