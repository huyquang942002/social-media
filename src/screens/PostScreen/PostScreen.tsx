import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { images } from '../../../assets';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppText';
import AppButton from '../../components/Button';
import FbGrid from '../../components/FBGrid';
import { convertImage, convertListS3Link, convertToS3LinkProfile, convertUriToBase64 } from '../../config/util';
import { AuthContext } from '../../context/AuthContext';
import { FlashMessageContext } from '../../context/FlashMessageContext';
import { usePost } from '../../service/api/post';
import { styles } from './styles';
import Geolocation from '@react-native-community/geolocation';
interface Params {
    route: any;
    navigation: any;
}

const listTag = ["PET", "PET LOST", "PET DISEASES", "PET EVENT"];
const screenWidth = Dimensions.get('window').width;

const PostScreen: React.FC<Params> = ({ route, navigation }) => {
    const post = route.params?.post;

    const [content, setContent] = useState<string>("");
    const [postImages, setPostImages] = useState<any>([]);

    const { onCreatePost, onPutImage, onGetAddress, onUpdatePost } = usePost();
    const { showFlashMessage } = useContext(FlashMessageContext);
    const [imgConfig, setImgConfig] = useState(false);
    const { user } = useContext(AuthContext);
    const [location, setLocation] = useState<any>("");
    const [modalType, setModalType] = useState(false);
    const [tag, setTag] = useState(listTag[0]);

    useEffect(() => {
        geolocation();
        if (post) {
            setContent(post.content);

            if (post.postGalleries.length > 0) {
                const res = convertListS3Link(post.postGalleries, post?.createdUser.id)
                const oldImages = res.map((item: any) => {
                    const base64 = convertUriToBase64(item);
                    const imageItem = {
                        filename: moment.now().toString(),
                        path: item,
                        type: "image/jpeg",
                        data: base64
                    }
                    return imageItem;
                })
                setPostImages(oldImages);
            }



        }
    }, []);

    const createPost = async () => {
        // geolocation();
        const postGalleries = postImages.map((image: any, index: any) => {
            return {
                link: (moment.now() + index).toString(),
                name: (moment.now() + index).toString(),
                description: image.filename,
            }
        });
        const res = await onCreatePost(content, location, postGalleries, tag);
        if (res.succeeded) {
            if (postImages.length > 0) {
                res.data.newS3Links.map(async (url: string, index: number) => {
                    const res = await onPutImage(url, postImages[index]);
                })
            }
            resetPost();
            navigation.navigate('Home');

        } else {
            showFlashMessage({
                message: "Error",
                description: res.data.message,
                type: "danger",
            });
        }
    }
    const geolocation = () => {
        Geolocation.getCurrentPosition(
            (pos) => {
                getAddressFromLocation(pos.coords.latitude, pos.coords.longitude);
            },
            (error) => showFlashMessage({
                message: "Error",
                description: "Can't get your location",
                type: "danger",
            }),
            { enableHighAccuracy: true }
        );
    }

    const getAddressFromLocation = async (lat: number, lng: number) => {
        const res = await onGetAddress(lat, lng);
        if (res) {
            setLocation(res.address.label);
        } else {
            showFlashMessage({
                message: "Error",
                description: res.data.message,
                type: "danger",
            });
        }
    }


    const updatePost = async () => {
        let postGalleries: any = [];
        let deleteGalleryIds = '';
        if (postImages.length > 0) {
            postGalleries = postImages.map((image: any) => {
                return {
                    link: moment.now().toString(),
                    name: moment.now().toString(),
                    description: image.filename,
                }
            });
            // const arr : any = [];
            // post.postGalleries.map((item: any) => {
            //     arr.push(item.id);
            // })
            // deleteGalleryIds = arr.join(",");
        }
        let uploadContent: any = content;
        let uploadTag: any = tag;
        if (post.content == content) {
            uploadContent = null;
        }
        if (post.tag == tag) {
            uploadTag = null;
        }

        const res = await onUpdatePost(post.id, uploadContent, location, null, uploadTag, deleteGalleryIds);
        if (res.succeeded) {
            if (postImages.length > 0 && res.data.newS3Links != null) {                
                res.data.newS3Links.map(async (url: string, index: number) => {
                    const res = await onPutImage(url, postImages[index]);
                })
            }
            resetPost();
            navigation.navigate('Home');

        } else {
            showFlashMessage({
                message: "Error",
                description: res.data.message,
                type: "danger",
            });
        }
    }

    // Function for opening the camera in the android
    const onCamera = () => {
        setImgConfig(false);
        ImagePicker.openCamera({
            width: 200,
            height: 200,
            cropping: true,
            includeBase64: true,
            // multiple: true,
            freeStyleCropEnabled: true,
        }).then((image: any) => {
            const imageItem = {
                filename: image.filename || moment.now().toString(),
                path: image.path,
                type: image.mime,
                data: image.data
            }
            let arr = [...postImages];
            arr.push(imageItem);
            setPostImages(arr);

        });
    }

    // Function to opening the gallery of android
    const onGallery = () => {
        setImgConfig(false);
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            // cropping: true,
            multiple: true,
            includeBase64: true,
            // freeStyleCropEnabled: true,
        }).then(response => {
            const ImageList = response.map((image: any, index) => ({
                filename: image.filename || moment.now().toString(),
                path: image.path,
                type: image.mime,
                data: image.data
            }));
            let arr = [...postImages, ...ImageList];
            setPostImages(arr);
        });
    }

    const renderModalType = () => {
        return (
            <Overlay
                isVisible={modalType}
                onBackdropPress={() => setModalType(false)}
                overlayStyle={styles.overlay}>
                <View
                    style={{
                        // ...Mixin.padding(16, 4, 8, 4),
                    }}>
                    {listTag?.map(
                        (elm: any, index: number) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => onSelectTag(elm)}
                                    style={{
                                        borderBottomWidth: index !== 4 ? 1 : 0,
                                        borderColor: '#F4EEE8',
                                    }}
                                    key={index}>
                                    <AppText
                                        style={{
                                            paddingVertical: 20,
                                        }}>
                                        {elm}
                                    </AppText>
                                </TouchableOpacity>
                            );
                        },
                    )}
                </View>
            </Overlay>
        );
    };

    const onSelectTag = (elm: any) => {
        setModalType(false);
        setTag(elm);
    }

    const resetPost = () => {
        setContent("");
        setPostImages([]);
        setTag(listTag[0]);
    }

    return (
        <View style={styles.flexContainer}>
            <AppHeader title={"Post"} navigation={navigation} rightComponent={() => {
                return (
                    <TouchableOpacity
                        onPress={post ? updatePost : createPost}
                    >
                        <AppText style={styles.title}>Next</AppText>
                    </TouchableOpacity>
                )
            }} />

            <View style={styles.postTopContainer}>
                <TouchableOpacity>
                    <Image
                        source={user.s3Profile ? { uri: convertToS3LinkProfile(user.id, user.s3Profile).path } : images.avatarDemo}
                        style={styles.postAvatar}
                    />
                </TouchableOpacity>
                <View style={styles.postHeaderTextContainer}>
                    <TouchableOpacity>
                        <AppText style={styles.postUserNameText}>
                            {user.username}
                        </AppText>
                    </TouchableOpacity>
                    <AppText style={styles.postCreateTimeText}>
                        {user.email}

                    </AppText>
                </View>
                <View style={styles.postIconContainer}>
                    <TouchableOpacity
                        style={styles.postIconStyle}
                    >
                        <Icon name={'more-vert'} color={'#484860'} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.postContentContainer}>
                <View>
                    <AppText style={styles.tagText}>{`# ${tag}`}</AppText>
                    <TextInput
                        placeholder='Write something here...'
                        placeholderTextColor={'#AEAEAE'}
                        style={{ marginStart: 10 }}
                        value={content}
                        onChangeText={setContent}
                        multiline={true}
                    />
                    <FbGrid
                        style={{ width: screenWidth, height: 300, padding: 10 }}
                        images={convertImage(postImages)}
                        onPress={() => {
                            navigation.navigate('ImageDetail', { postImages: postImages, setPostImages: setPostImages })
                        }}
                    />

                </View>
            </View>
            <View style={styles.bottomContainer}>
                <AppText style={styles.bottomText}>Add to your post</AppText>
                <TouchableOpacity onPress={() => setImgConfig(true)}>
                    <Icon name={'photo-library'} style={styles.bottomIcon} color={'#484860'} size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalType(true)}>
                    <Icon name={'tag'} style={styles.bottomIcon} color={'#484860'} size={25} />
                </TouchableOpacity>
                <Icon name={'mood'} style={styles.bottomIcon} color={'#484860'} size={25} />
                <Icon name={'place'} style={styles.bottomIcon} color={'#484860'} size={25} />
            </View>
            {renderModalType()}
            <Overlay
                isVisible={imgConfig}
                onBackdropPress={() => setImgConfig(false)}
                overlayStyle={styles.overlay}>
                <View>
                    <AppButton
                        title={"Camera"}
                        onPress={() => onCamera()}
                    />
                    <AppButton
                        title={"Gallery"}
                        onPress={() => onGallery()}
                    />
                </View>
            </Overlay>
        </View>
    );
};

export default PostScreen;

