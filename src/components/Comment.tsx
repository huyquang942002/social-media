import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { images } from '../../assets';
import { convertToS3LinkComment } from '../config/util';
import { FlashMessageContext } from '../context/FlashMessageContext';
import { useComments } from '../service/api/comments';
import { useInteract } from '../service/api/interact';
import AppText from './AppText';
import { AuthContext } from '../context/AuthContext';
import { AppModal } from './AppModal';



const Comment = (props: any) => {
    const { user } = useContext(AuthContext);
    const { item, handleFeedBack, handleDelete } = props;
    const { onGetCommentByParentComment } = useComments();
    const [childComment, setChildComment] = useState<any>([]);
    const { onLoveComment, onRemoveLoveComment, onDisloveComment, onRemoveDisloveComment } = useInteract();
    const [showModal, setShowModal] = useState<any>(0);

    const { showFlashMessage } = useContext(FlashMessageContext);
    // const [userIsLoved, setUserIsLoved] = useState(item.isLoved);
    // const [userIsDisLoved, setUserIsDisLoved] = useState(item.isDisLoved);
    // const [totalLove, setTotalLove] = useState<number>(+item.totalLove);
    // const [totalDislove, setTotalDisLove] = useState<number>(+item.totalDisLove);

    const deleteComment = async (id: any) => {
        setShowModal(0);
        handleDelete(id);
    }
    const getChildComment = async () => {
        const res = await onGetCommentByParentComment(item.id, 1, 20);
        if (res.succeeded) {
            setChildComment(res.data.data);
        } else {
            showFlashMessage({
                message: "Error",
                description: res.data.message,
                type: "danger",
            });
        }
    }
    const checkOwnPost = () => {
        return item.createdUser.id == user?.id;
    }
    const handleLove = async () => {
        if (item.isLoved) {
            await onRemoveLoveComment(item.id);
            // setUserIsLoved(false);
            // if (userIsDisLoved) {
            //     setTotalDisLove(totalDislove + 1);
            //     setUserIsLoved(false);
            //     setUserIsDisLoved(false);

            // } else {
            //     setTotalLove(totalLove - 1);
            // }
        } else {
            await onLoveComment(item.id);
            // setUserIsLoved(true);
            // if (userIsDisLoved) {
            //     setTotalDisLove(totalDislove - 1);
            //     setUserIsLoved(false);
            //     setUserIsDisLoved(false);
            // } else {
            //     setTotalLove(totalLove + 1);
            // }
        }
    }

    const handleDisLove = async () => {
        if (item.isDisLoved) {
            await onRemoveDisloveComment(item.id);
            // setUserIsDisLoved(false);
            // if (userIsLoved) {
            //     setTotalLove(totalLove + 1);
            // } else {
            //     setTotalDisLove(totalDislove - 1);
            // }
        } else {
            await onDisloveComment(item.id);
            // setUserIsDisLoved(true);
            // if (userIsLoved) {
            //     setTotalLove(totalLove - 1);
            // } else {
            //     setTotalDisLove(totalDislove + 1);
            // }
        }
    }


    useEffect(() => {
        if (item.id != null) {
            getChildComment();
        }
    }, [item])

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={images.avatarDemo}
                    style={styles.avatar}
                />
                <View style={styles.commentContainer}>
                    <AppText style={styles.name}>{item.createdUser.username}</AppText>
                    <AppText style={styles.comment}>{item.content}</AppText>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                {/* <AppText style={styles.time}>{moment(item.createdAt).toNow()}</AppText> */}
                <View style={{ flexDirection: 'row', marginStart: 10 }}>
                    <TouchableOpacity onPress={() => handleLove()}>
                        <Ionicons name={item.isLoved ? "heart" : "heart-outline"} style={styles.postActionIcon} color={'#F04A4A'} size={16} />
                    </TouchableOpacity>
                    <AppText style={styles.loveIcon}>{+item.totalLove}</AppText>
                </View>

                <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                    <TouchableOpacity onPress={() => handleDisLove()}>
                        <Ionicons name={item.isDisLoved ? "heart-dislike" : "heart-dislike-outline"} style={styles.postActionIcon} color={'#F04A4A'} size={16} />
                    </TouchableOpacity>
                    <AppText style={styles.loveIcon}>{+item.totalDisLove}</AppText>
                </View>

                <TouchableOpacity onPress={() => handleFeedBack(item)}>
                    <AppText style={styles.feedBackAction}>Feedback</AppText>
                </TouchableOpacity>

                {checkOwnPost() && <TouchableOpacity onPress={() => setShowModal(item.id)}>
                    <AppText style={styles.feedBackAction}>Delete</AppText>
                </TouchableOpacity>}
            </View>
            {
                item.commentImageName &&
                <Image source={{ uri: convertToS3LinkComment(item.createdUser.id, item.commentImageName).path }} style={styles.commentImage} resizeMode='cover' />

            }
            <View style={{ marginStart: '10%' }}>

                <FlatList
                    data={childComment}
                    renderItem={({ item }) => {
                        return <ChildComment item={item} checkOwnPost={checkOwnPost} handleFeedBack={handleFeedBack} handleDelete={setShowModal} />
                    }} />
            </View>
            <AppModal
                onConfirm={() => deleteComment(showModal)}
                onCancel={() => setShowModal(0)}
                isVisible={showModal != 0}
                onBackdropPress={() => { }}
                title='Move to your trash ?'
                canCancel>

            </AppModal>
        </View>
    );
};


const ChildComment = ({ item, handleFeedBack, handleDelete, checkOwnPost }: any) => {
    // const [userIsLoved, setUserIsLoved] = useState(item.isLoved);
    // const [userIsDisLoved, setUserIsDisLoved] = useState(item.isDisLoved);
    // const [totalLove, setTotalLove] = useState<number>(+item.totalLove);
    // const [totalDislove, setTotalDisLove] = useState<number>(+item.totalDisLove);
    const { onLoveComment, onRemoveLoveComment, onDisloveComment, onRemoveDisloveComment } = useInteract();


    const handleLove = async () => {
        if (item.isLoved) {
            await onRemoveLoveComment(item.id);
            // setUserIsLoved(false);
            // if (userIsDisLoved) {
            //     setTotalDisLove(totalDislove + 1);
            //     setUserIsLoved(false);
            //     setUserIsDisLoved(false);
            // } else {
            //     setTotalLove(totalLove - 1);
            // }
        } else {
            await onLoveComment(item.id);
            // setUserIsLoved(true);
            // if (userIsDisLoved) {
            //     setTotalDisLove(totalDislove - 1);
            //     setUserIsLoved(false);
            //     setUserIsDisLoved(false);
            // } else {
            //     setTotalLove(totalLove + 1);
            // }
        }
    }

    const handleDisLove = async () => {
        if (item.isDisLoved) {
            await onRemoveDisloveComment(item.id);
            // setUserIsDisLoved(false);
            // if (userIsLoved) {
            //     setTotalLove(totalLove + 1);
            // } else {
            //     setTotalDisLove(totalDislove - 1);
            // }
        } else {
            await onDisloveComment(item.id);
            // setUserIsDisLoved(true);
            // if (userIsLoved) {
            //     setTotalLove(totalLove - 1);
            // } else {
            //     setTotalDisLove(totalDislove + 1);
            // }
        }
    }
    return (<View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Image
                source={images.avatarDemo}
                style={styles.avatar}
            />
            <View style={styles.commentContainer}>
                <AppText style={styles.name}>{item.createdUser.username}</AppText>
                <AppText style={styles.comment}>{item.content}</AppText>
            </View>
        </View>
        <View style={styles.bottomContainer}>
            {/* <AppText style={styles.time}>{moment(item.createdAt).toNow()}</AppText> */}
            <View style={{ flexDirection: 'row', marginStart: 10 }}>
                <TouchableOpacity onPress={handleLove}>
                    <Ionicons name={item.isLoved ? "heart" : "heart-outline"} style={styles.postActionIcon} color={'#F04A4A'} size={16} />
                </TouchableOpacity>
                <AppText style={styles.loveIcon}>{+item.totalLove}</AppText>
            </View>

            <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
                <TouchableOpacity onPress={handleDisLove}>
                    <Ionicons name={item.isDisLoved ? "heart-dislike" : "heart-dislike-outline"} style={styles.postActionIcon} color={'#F04A4A'} size={16} />
                </TouchableOpacity>
                <AppText style={styles.loveIcon}>{+item.totalDisLove}</AppText>
            </View>

            <TouchableOpacity onPress={() => handleFeedBack(item)}>
                <AppText style={styles.feedBackAction}>Feedback</AppText>
            </TouchableOpacity>

            {checkOwnPost() && <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <AppText style={styles.feedBackAction}>Delete</AppText>
            </TouchableOpacity>}
        </View>
        {
            item.commentImageName &&
            <Image source={{ uri: convertToS3LinkComment(item.createdUser.id, item.commentImageName).path }} style={styles.commentImage} resizeMode='cover' />

        }
    </View>);
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 20,
        // alignItems: 'center'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: '#c2c2c2',
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
    },
    name: {
        fontSize: 16,
        color: "#000",
        fontWeight: 'bold'
    },
    comment: {
        flexWrap: 'wrap',
        color: '#555555',
        fontSize: 12
    },
    commentContainer: {
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        marginStart: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        minWidth: 180,
    },
    time: {
        color: '#555555',
        fontSize: 12,
        marginStart: 20,

    },
    feedBackAction: {
        color: '#000',
        fontSize: 12,
        marginStart: 10,
    },
    loveIcon: {
        color: '#F04A4A',
        fontSize: 12,
    },
    postActionIcon: {
        // marginHorizontal: 10,
    },
    bottomContainer: {
        flexDirection: 'row',
        marginTop: 2,
        marginStart: 50,
    },

    commentImage: {
        width: 120,
        height: 120,
        marginStart: 60,
        marginTop: 10,
    }



})

export default Comment;