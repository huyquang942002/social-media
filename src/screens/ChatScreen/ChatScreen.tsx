import { SOCKET_URL } from '@env';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, Vibration, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Actions, Bubble, Composer, GiftedChat, InputToolbar, MessageText, Send, Time } from 'react-native-gifted-chat';
import { io } from "socket.io-client";
import AppText from '../../components/AppText';
import { convertToS3LinkChat, convertToS3LinkProfile, copyToClipboard, getToken } from '../../config/util';
import { AuthContext } from '../../context/AuthContext';
import { MessageChat, TImage, TMessSend, TMessage } from '../../service/model/chat';
import { styles } from './styles';
import { UserInfo } from '../../service/model/user';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SwipeRow } from 'react-native-swipe-list-view';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import { usePost } from '../../service/api/post';
import { decode } from 'base64-arraybuffer';
import { MoreDialog } from '../../components/MoreDialog';
import { MessageActionDialog } from '../../components/MessageActionDialog';

interface Types {
    navigation: any;
    route: any;
}

let socket: any;

const ChatScreen: React.FC<Types> = ({ navigation, route }) => {
    const userChat: UserInfo = route.params.userChat;
    const [page, setPage] = useState(1);
    const [isLoadMore, setIsLoadMore] = useState(true);
    const [replyMsg, setReplyMsg] = useState({
        replyId: null,
        text: '',
        user: null,
    });
    const [sendImages, setSendImages] = useState<TImage>();

    const { user } = useContext(AuthContext);
    const firstUpdate = useRef(true);
    const [text, setText] = useState('');
    const [messages, setMessages] = useState<TMessage[]>([]);

    // const sendPushNotification = async (userName, text) => {
    //     const message = {
    //         to: user.notificationToken,
    //         sound: 'default',
    //         title: `New message from ${userName}`,
    //         body: text,
    //         data: { data: 'goes here' },
    //         _displayInForeground: true,
    //     };
    //     const response = await fetch('https://exp.host/--/api/v2/push/send', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Accept-encoding': 'gzip, deflate',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(message),
    //     });

    //     const res = await response.json();
    //     // console.log(res);
    // };

    // Function for opening the camera in the android
    const onCamera = () => {
        // setImgConfig(false);
        ImagePicker.openCamera({
            width: 200,
            height: 200,
            cropping: true,
            includeBase64: true,
            freeStyleCropEnabled: true,
        }).then((image: any) => {
            const imageItem: TImage = {
                filename: image.filename || moment.now().toString(),
                path: image.path,
                type: image.mime,
                data: image.data
            }
            if (imageItem) {
                setSendImages(imageItem);
            }
        });
    }

    // Function to opening the gallery of android
    const onGallery = () => {
        // setImgConfig(false);
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            // cropping: true,
            includeBase64: true,
            // freeStyleCropEnabled: true,
        }).then((image: any) => {
            const imageItem: TImage = {
                filename: image.filename || moment.now().toString(),
                path: image.path,
                type: image.mime,
                data: image.data
            }
            if (imageItem) {
                setSendImages(imageItem);
            }
        });
    }

    useEffect(() => {
        if (sendImages) {
            onSend();
        }
    }, [sendImages])

    const renderActions = (props: any) => (
        <>
            <Actions
                {...props}
                containerStyle={{
                    width: 30,
                    height: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 0,

                }}
                icon={() => (
                    <Ionicons name="image-outline" size={24} />
                )}
                options={{
                    'Choose From Library': () => {
                        onGallery();
                    },
                    'Camera': () => {
                        onCamera();
                    },
                }}
                optionTintColor="#222B45"

            />
        </>
    );

    useEffect(() => {
        getToken().then((authorizationKey) => {
            
            socket = io(SOCKET_URL, {
                extraHeaders: {
                    Authorization: `Bearer ${authorizationKey}`
                }
            })
            socket.on('connect', () => {
                console.log('connected chat screen');
                // setPage(1);
                // socket.emit('userInfo', loggedUser);
            })
            // setPage(1);
            socket.on('listenDetailConversation', (chatsData: any) => {
                // console.log('listenDetailConversation', chatsData);
                if (chatsData.data.length == 0) {
                    setIsLoadMore(false);
                } else {
                    const chats: MessageChat[] = chatsData.data;
                    handleMessage(chats);
                }
            })
            socket.emit('detailConversation', { receiverId: userChat.id, page: 1, take: 15 });
            firstUpdate.current = false;
            socket.on('listenChat', (newChat: MessageChat) => {
                console.log("newChat", newChat);
                // setSendImages(prevSendImages => {
                //     console.log("sendImages", prevSendImages);
                //     return prevSendImages;
                // });
                // if (newChat.senderId == user.id && newChat.newS3Links != undefined && newChat.newS3Links.length > 0) {
                //     setSendImages(prevSendImages => {
                //         handlePutImage(newChat, prevSendImages);
                //         return prevSendImages;
                //     })
                //     // setSendImages(undefined);
                // }
                // if (newChat.senderId != user.id) {
                const outChat: TMessage = {
                    _id: newChat.id,
                    text: newChat.content,
                    createdAt: new Date(newChat.createdAt),
                    user: {
                        _id: newChat.senderId,
                        name: userChat.username,
                        avatar: convertToS3LinkProfile(userChat.id, userChat.s3Profile).path
                    },

                }
                if (newChat.replyTo && newChat.contentReply) {
                    outChat.isReply = {
                        name: newChat.replyTo,
                        text: newChat.contentReply
                    }
                }
                if (newChat.newS3Links != undefined && newChat.newS3Links != null) {
                    outChat.image = newChat.newS3Links;
                }
                setMessages(previousMessages => GiftedChat.append(previousMessages, [outChat]))


            })
            socket.on("listenDeleteChat", (chatId: any) => {

                setMessages(previousMessages => {
                    const newMess = previousMessages.filter(message => message._id != chatId.id)
                    return newMess

                })
            })
        })

    }, []);

    useEffect(() => {
        if (socket != null && isLoadMore && !firstUpdate.current) {
            if (page == 1) {
                setMessages([]);
            }
            socket.emit('detailConversation', { receiverId: userChat.id, page: page, take: 15 });
        }
    }, [page])

    const handleMessage = (mess: MessageChat[]) => {
        const result = mess.map(m => {
            // if (m.senderId == user.id) {
            //     return {
            //         _id: m.id,
            //         text: m.content,
            //         createdAt: new Date(m.createdAt),
            //         user: {
            //             _id: m.senderId,
            //             name: m.senderUser.username,
            //             avatar: m.senderUser.s3Profile
            //         }
            //     }
            // } else {
            if (m.replyTo && m.contentReply) {
                return {
                    _id: m.id,
                    text: m.content,
                    createdAt: new Date(m.createdAt),
                    user: {
                        _id: m.senderId,
                        name: m.senderUser.username,
                        avatar: convertToS3LinkProfile(m.senderId, m.senderUser.s3Profile).path
                    },
                    isReply: {
                        name: m.replyTo,
                        text: m.contentReply
                    },

                }
            } else {
                const responseChat: TMessage = {
                    _id: m.id,
                    text: m.content,
                    createdAt: new Date(m.createdAt),
                    user: {
                        _id: m.senderId,
                        name: m.senderUser.username,
                        avatar: convertToS3LinkProfile(m.senderId, m.senderUser.s3Profile).path
                    },


                }
                if (m.conversationsGalleries != undefined && m.conversationsGalleries != null) {
                    responseChat.image = m.conversationsGalleries;
                }

                return responseChat;
            }
            // }

        })
        setMessages(previousMessages => GiftedChat.append(result, previousMessages))
    }

    // const handlePutImage = (newChat: MessageChat, sendImages: any) => {
    //     newChat.newS3Links.map(async (url: string, index: number) => {
    //         const res = await onPutImage(url, sendImages);
    //     })
    // }

    const onSend = (messages: TMessage[] = []) => {
        const modifyMessages: TMessSend = {
            receiverId: userChat.id,
            content: text,
        }
        if (replyMsg.replyId) {
            modifyMessages.conversationId = replyMsg.replyId;
        }
        if (sendImages) {
            // modifyMessages.conversationsGalleries = [{
            //     name: sendImages.filename,
            // }]
            modifyMessages.file = {
                originalname: sendImages.filename,
                mimetype: sendImages.type,
                buffer: decode(sendImages.data)
            }
        }
        // if (replyMsg.replyId) {
        //     messages[0].isReply = {
        //         name: replyMsg.user!,
        //         text: replyMsg.text
        //     }
        // }        
        socket.emit('chat', modifyMessages, () => {

            // console.log("NOTIFICATION PUSHING to", user.name)
            // sendPushNotification(loggedUser.name, messages[0].text);
            setText('');
            setReplyMsg({ replyId: null, text: '', user: null });
            setSendImages(undefined);
            // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        })
    }
    const HeaderConponent = () => {
        return (
            <View style={styles.rowContainer}>
                <AppText style={styles.headerTitle}>{userChat.username}</AppText>
                {/* <AppText style={styles.headerSubTitle}>Active 3m ago</AppText> */}
            </View>
        );
    }

    const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToTop = 10;
        return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
    }

    const loadMoreMessage = () => {
        if (isLoadMore) {
            setPage(page + 1);
        }
    }
    const renderBubble = (props: any) => {


        return (
            <>
                <BubbleComp props={props} setReplyMsg={setReplyMsg} />

            </>
        );
    };
    const renderInputToolbar = (props: any) => {
        return (
            <InputToolbar
                {...props}
                placeholder="Type your message here..."
                containerStyle={{
                    marginLeft: 15,
                    marginRight: 15,
                    marginBottom: 5,
                    borderRadius: 25,
                    borderColor: '#fff',
                    borderTopWidth: 0,
                }}
                textInputStyle={{ color: '#000' }}
                renderComposer={props1 => {
                    return (
                        <View style={{ flex: 1 }}>
                            {replyMsg.replyId && <ReplyWrapper replyMsg={replyMsg} setReplyMsg={setReplyMsg} />}
                            <Composer {...props1} />
                        </View>
                    );
                }}
            // textInputProps={{
            //     multiline: true,
            //     returnKeyType: 'go',
            //     onSubmitEditing: () => {                        
            //         if (props.text && props.onSend) {
            //             let text = props.text;
            //             props.onSend({ text: text.trim() }, true);
            //         }
            //     },
            // }}
            />
        );
    };

    return (
        <View style={styles.container} >
            <Header
                containerStyle={[
                    styles.headerContainer,
                ]}
                leftComponent={
                    <Icon
                        onPress={() => navigation.goBack()}
                        color={'black'}
                        name="chevron-left"
                        type="material-community"
                        size={30}
                    />
                }
                centerComponent={<HeaderConponent />}
            />

            <View style={styles.separator} />

            <GiftedChat
                text={text}
                onInputTextChanged={text => setText(text)}
                messages={messages}
                onSend={(messages: any) => onSend(messages)}
                user={{
                    _id: user.id,
                    name: user.username,
                    avatar: user.s3Profile
                }}
                renderBubble={renderBubble}
                renderMessageText={renderMessageText}
                renderTime={renderTime}
                alwaysShowSend={true}
                inverted={true}
                renderSend={renderSend}
                renderActions={renderActions}
                listViewProps={{
                    scrollEventThrottle: 400,
                    onScroll: ({ nativeEvent }: any) => { if (isCloseToTop(nativeEvent)) loadMoreMessage(); }
                }}
                renderInputToolbar={renderInputToolbar}
            // renderChatFooter={renderChatFooter}
            />
        </View>
    );
};


export default ChatScreen;



const BubbleComp = ({ props, setReplyMsg }: any) => {
    const { text, system, _id } = props.currentMessage;
    const [openAction, setOpenAction] = useState<boolean>(false);
    const onLeftAction = useCallback(
        ({ isActivated }: any) => {
            if (isActivated) {
                Vibration.vibrate(50);

                setReplyMsg({
                    replyId: props.currentMessage._id,
                    text,
                    user: props.currentMessage?.user?.name,
                });
            }
        },
        [_id],
    );
    return (
        <>
            <SwipeRow
                useNativeDriver
                onLeftActionStatusChange={onLeftAction}
                disableLeftSwipe
                disableRightSwipe={!!(system)}
                leftActivationValue={90}
                leftActionValue={0}
                swipeKey={_id + ''}>
                <></>

                <Bubble
                    {...props}

                    wrapperStyle={{
                        left: { backgroundColor: '#F78239' },
                        right: { backgroundColor: '#bb44f0' },
                    }}
                    onLongPress={() => {
                        setOpenAction(true);
                    }}
                >
                    <>
                    </>

                </Bubble>
            </SwipeRow>
            <MessageActionDialog
                isVisible={openAction}
                setIsVisible={setOpenAction}
                deleteMessage={() => {
                    socket.emit('deleteChat', { id: props.currentMessage._id });
                    setOpenAction(false);
                }}
                replyMessage={() => {
                    setReplyMsg({
                        replyId: props.currentMessage._id,
                        text,
                        user: props.currentMessage?.user?.name,
                    });
                    setOpenAction(false);
                }}
                copyMessage={() => {
                    setOpenAction(false);
                    copyToClipboard(text);
                }}
            />
        </>
    );
};




const renderMessageText = (props: any) => {
    if (props.currentMessage.isReply) {
        return <CustomMessageText {...props} />;
    }
    return (
        <MessageText
            {...props}
            textStyle={{
                left: { color: 'white' },
                right: { color: 'white' },
            }}
        />
    );
};
const renderTime = (props: any) => {
    return (
        <Time
            {...props}
            timeTextStyle={{
                left: { color: 'white' },
                right: { color: 'white' },
            }}
        />
    );
};


const renderSend = (props: any) => (
    <Send
        {...props}
        disabled={!props.text}
        containerStyle={{
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 4,
        }}
    >
        <Ionicons name="send-outline" size={24} />
    </Send>
);

const Reply = ({ replyMsg, setReplyMsg }: any) => {

    return (
        <View
            style={{
                height: 55,
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: 'rgba(0,0,0,.1)',
                borderRadius: 10,
                position: 'relative',
            }}>
            <View style={{ height: 55, width: 5, backgroundColor: 'red' }}></View>
            <View style={{ flexDirection: 'column', overflow: 'hidden' }}>
                <AppText
                    style={{
                        color: 'red',
                        paddingLeft: 10,
                        paddingTop: 5,
                        fontWeight: 'bold',
                    }}>
                    {replyMsg?.user}
                </AppText>
                <AppText
                    style={{
                        color: '#034f84',
                        paddingLeft: 10,
                        paddingTop: 5,
                        marginBottom: 2,
                    }}>
                    {replyMsg.text}
                </AppText>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    paddingRight: 2,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                }}>
                <TouchableOpacity
                    onPress={() => setReplyMsg({ replyId: null, text: '', user: null })}>
                    <Icon name="x" type="feather" color="#0084ff" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
const ReplyWrapper = ({ id, replyMsg, setReplyMsg }: any) => {
    return <Reply replyMsg={replyMsg} setReplyMsg={setReplyMsg} />;
};

const CustomMessageText = (props: any) => {
    return (
        <>
            <View style={{ padding: 10 }}>
                <View style={{ backgroundColor: '#d16aff', borderRadius: 15, borderTopEndRadius: 0 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View
                            style={{
                                height: '100%',
                                width: 5,
                                backgroundColor: 'white',
                                borderTopLeftRadius: 15,
                                borderBottomLeftRadius: 15,
                            }}
                        />
                        <View style={{ flexDirection: 'column' }}>
                            <AppText
                                style={{
                                    color: 'white',
                                    paddingHorizontal: 10,
                                    paddingTop: 5,
                                    fontWeight: '700',
                                }}>
                                {props.currentMessage?.isReply?.name}
                            </AppText>
                            <AppText
                                style={{
                                    color: 'white',
                                    paddingHorizontal: 10,
                                    paddingTop: 5,
                                    marginBottom: 5,
                                }}>
                                {props.currentMessage?.isReply?.text}
                            </AppText>
                        </View>
                    </View>
                </View>
            </View>

            <MessageText
                {...props}
                textStyle={{
                    left: { color: 'white' },
                    right: { color: 'white' },
                }}
            />
        </>
    );
};
