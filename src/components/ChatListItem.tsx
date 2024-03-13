import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { images } from '../../assets';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';
import { convertToS3LinkProfile } from '../config/util';




const ChatListItem = ({conversation, navigation}: any) => {
    
    const {user} = useContext(AuthContext);
    // const loggedInUserId = useSelector(state => state.auth.user._id);
    // const allUsers = useSelector(state => state.users.allUsers);
    // const loggedInUser = allUsers.filter(u => u._id === loggedInUserId)[0];
    // currUser following list
    const [userChat, setUserChat] = useState<any>();

    useEffect(() => {        
        if (conversation.receiverId == user.id) {
            setUserChat(conversation.senderUser)
        } else {
            setUserChat(conversation.receiverUser)
        }
    
    }, [conversation]);


    // check user._id is in following list

    // const [imageUri, setImageUri] = useState(`${ENV.apiUrl}/user/photo/${user._id}`);


    const onImageErrorHandler = () => {
        // setImageUri(ENV.defaultImageUri)
    }

    return (
        <TouchableOpacity
        onPress={() => navigation.navigate('Chat', { userChat: userChat })}
        >
            <View style={styles.container}>
                <View>

                    <Image
                      source={userChat?.s3Profile ? {uri: convertToS3LinkProfile(userChat.id, userChat.s3Profile).path} : images.avatarDemo}

                        onError={onImageErrorHandler}
                        style={styles.avatar}
                    />
                    <View style={styles.dot} />
                </View>
                <View style={styles.content}>
                    <View style={styles.mainContent}>
                        <View style={styles.text}>
                            <Text
                                style={styles.name}
                            >
                               {userChat?.username}
                            </Text>
                        </View>
                        <Text style={styles.timeAgo}>
                            {conversation.content}  •  {moment(conversation.createdAt).format('HH:MM') }
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginStart: 24
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: '#c2c2c2'
    },
    text: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    content: {
        flex: 1,
        marginLeft: 16,
        marginRight: 0
    },
    mainContent: {
        marginRight: 60
    },
    img: {
        height: 50,
        width: 50,
        margin: 0
    },
    attachment: {

    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    timeAgo: {
        fontSize: 13,
        color: "#A4A4B2"
    },
    name: {
        fontSize: 15,
        color: "#1D1D28"
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4CD31C',
        borderWidth: 1,
        borderColor: 'white',
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 0,
    }
})

export default ChatListItem;