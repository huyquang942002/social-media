import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, Text, TextInput, SafeAreaView } from 'react-native';
import ChatListItem from '../../components/ChatListItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import AppText from '../../components/AppText';
import { Icon } from 'react-native-elements';
import { io } from "socket.io-client";
import { API_URL, SOCKET_URL } from '@env';
import { getToken } from '../../config/util';
import { EmptyList } from '../../components/EmptyComponent';

interface Types {
    navigation: any;
    route: any;
}

let socket: any;
const ChatListScreen: React.FC<Types> = ({ navigation, route }) => {

    // const loggedUser = useSelector(state => state.auth.user);
    // const chatList = useSelector(state => state.chat.chatList);
    // const allChats = useSelector(state => state.chat.allChats);
    // let allUsers = useSelector(state => state.users.allUsers);

    // // remove logged user from the list
    // allUsers = allUsers.filter(item => item._id !== loggedUser._id);


    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [listConversation, setListConversation] = useState([]);

    useEffect(() => {
        getToken().then((token) => {
            socket = io(SOCKET_URL, {
                extraHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
            socket.on('connect', () => {
                console.log('connected chat screen');
            })
            socket.on('listenListConversation', (chats: any) => {                
                setListConversation(chats.data);
                
            })
            socket.emit('listConversation', { page: 1, take: 10 });
        })

       
    }, []);


    // const dispatch = useDispatch();

    // const loadChatList = useCallback(async () => {
    //     setIsRefreshing(true);
    //     try {
    //         const result = await dispatch(chatActions.fetchChatList());
    //         await dispatch(chatActions.fetchChats());
    //         setData(result);
    //     } catch (err) {
    //         console.log(err)
    //     }
    //     setIsRefreshing(false);
    // }, [dispatch, setIsLoading])

    // const loadChats = useCallback(async () => {
    //     try {
    //         await dispatch(chatActions.fetchChats());
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }, [dispatch, setIsLoading])


    // useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus', e => {
    //         setSearchText('');
    //         loadChatList();
    //     });
    //     return () => {
    //         unsubscribe();
    //     };
    // }, [])

    // useEffect(() => {
    //     setIsLoading(true);
    //     loadChats()
    //     .then(() => {
    //         setIsLoading(false);
    //     });
    //     setIsLoading(false)
    // }, [dispatch, loadChats])

    const handleSearchTextChange = (text: any) => {
        // setSearchText(text);
        // if(text !== ''){
        //     let filteredData = []
        //     let currData = allUsers;

        //     filteredData = currData.filter(item => {
        //         const lc = item.name.toLowerCase();
        //         text = text.toLowerCase();
        //         return lc.includes(text);
        //     });
        //     setData(filteredData);
        // } else {
        //     setData(chatList);
        // }
    }


    if (isLoading) {
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={"#F03974"} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.rowContainer}>
                <Ionicons name="ios-search-outline" color={'#AEAEAE'} size={20} style={styles.exploreSearchIcon} />
                <TextInput style={styles.exploreSearchInput} placeholder={'Search'} placeholderTextColor={'#AEAEAE'} />
                {/* <Ionicons name="close" color={'#AEAEAE'} size={16} style={styles.closeIcon} /> */}
            </View>
            {/* <Header style={{ backgroundColor: Colors.brightBlue }} searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input
                        value={searchText}
                        onChangeText={(text) => handleSearchTextChange(text)}
                        placeholder="Search" 
                    />
                    <Icon name="ios-people" />
                </Item>
            </Header> */}
            <FlatList
                ListHeaderComponent={() => {
                    return (
                        <View style={styles.listHeader}>
                            <AppText style={styles.listTitle}>Messages</AppText>
                            <Icon name="add" color={'#FF005C'} size={23} />
                        </View>
                    );
                }}
                data={listConversation}
                ListEmptyComponent={() => <EmptyList title="No chats !" />}
                // refreshing={isRefreshing}
                // onRefresh={loadChatList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(conversation) => {
                    return <ChatListItem conversation={conversation.item} navigation={navigation} />
                }}
                // extraData={listConversation}
            />
        </SafeAreaView>
    );
};


export default ChatListScreen;