import EncryptedStorage from "react-native-encrypted-storage";
import { PostGallery } from "../service/model/post";
import RNFetchBlob from "rn-fetch-blob";
import Clipboard from '@react-native-clipboard/clipboard';
export const convertToS3LinkProfile = (userId: string, name: string) => {
  return { path: process.env.NEXT_PUBLIC_URL_S3 + "profilePic_user_id" + "_" + userId + "/" + name };
};

export const convertToS3LinkChat = (userId: string, name: string) => {
  return { path: process.env.NEXT_PUBLIC_URL_S3 + "conversation_user_id" + "_" + userId + "/" + name };
};

export const convertToS3LinkComment = (userId: string, name: string) => {
  return { path: process.env.NEXT_PUBLIC_URL_S3 + "comment_user_id" + "_" + userId + "/" + name };
};

export const convertListS3Link = (postGalleries: PostGallery[], userId: string) => {
  return postGalleries.map((item) => {
    return process.env.NEXT_PUBLIC_URL_S3 + "post_user_id" + "_" + userId + "/" + item.name;
  });
}

export const convertToS3LinkPet = (userId: string, name: string) => {
  if (name.includes("https")) {
    const res = getImageUrlFromS3(name);
    return { path: res };
  }
  return { path: process.env.NEXT_PUBLIC_URL_S3 + "pet_user_id" + "_" + userId + "/" + name };

}

export const convertImage = (images: any) => {
  return images.map((image: any) => {
    return image.path;

  })
}

export const getImageUrlFromS3 = (imageUrl: string) => {
  try {
    const baseUrl = imageUrl.substring(0, imageUrl.indexOf("?"));
    return baseUrl;
  } catch (error) {
    return imageUrl;
  }
}

export const convertUriToBase64 = (image: any) => {
  const fs = RNFetchBlob.fs;
  let imagePath: any = null;
  RNFetchBlob.config({
    fileCache: true
  })
    .fetch("GET", image)
    // the image is now dowloaded to device's storage
    .then(resp => {
      // the image path you can use it directly with Image component
      imagePath = resp.path();
      return resp.readFile("base64");
    })
    .then(base64Data => {
      // here's base64 encoded image
      // remove the file from storage
      return fs.unlink(imagePath);
    });
}

export const convertFormData = (data: any) => {
  var formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
}

export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export const getToken = async () => {
  const authorizationKey = await EncryptedStorage.getItem("secure_token");
  return authorizationKey;
}

export const copyToClipboard = (text: string) => {
  Clipboard.setString(text)
}