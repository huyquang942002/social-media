import { API_URL, HERE_API_KEY } from "@env";
import { BaseApiService } from "./BaseApi";
import { decode } from 'base64-arraybuffer';
import { useLoadingContext } from "../../context/loadingHelper";
import axios from "axios";


export const usePost = () => {
    const baseApi = new BaseApiService();
    const {showLoading, hideLoading} = useLoadingContext();

    const onGetAllPost = async (page?: number, take?: number, order?: string, content?: string, filterByType?: string) => {
        showLoading();
        const res = await baseApi.get(`${API_URL}/post/lookup?page=${page}&take=${take}&order=${order}&filterByType=${filterByType}&content=${content}`);
        hideLoading();
        return res;
    };

    const onCreatePost = async (content?: string, address?: string, postGalleries?: any, tag?: string) => {
        showLoading();
        const res = await baseApi.post(`${API_URL}/post`, {
            content: content,
            address: address,
            postGalleries: postGalleries,
            tag: tag
        });
        hideLoading();
        return res;
    };

    const onUpdatePost = async (id?: string, content?: string, address?: string, postGallaries?: any, tag?: string, deleteGalleryIds?: string) => {
        showLoading();
        const res = await baseApi.patch(`${API_URL}/post/${id}`, {
            content: content,
            address: address,
            postGallaries: postGallaries,
            tag: tag,
            deleteGalleryIds: deleteGalleryIds
        });
        hideLoading();
        return res;
    };



    const onDeletePost = async (id?: string) => {
        showLoading();
        const res = await baseApi.delete(`${API_URL}/post/${id}`);
        hideLoading();
        return res;
    }


    const onPutImage = async (url: string, image?: any) => {      
        // showLoading();        
        const arrayBuffer = decode(image.data);
        try {
            await fetch(url, {
              method: 'PUT',
              body: arrayBuffer,
              headers: {
                'Content-Type': 'image/jpeg',
              },
            });
            // hideLoading();
          } catch (e: any) {
            // hideLoading();
            throw e;
          }
    }

    const onGetAddress = async (lat: number, lng: number) => {
        showLoading();
        try {
            showLoading();
            const res: any = await axios.get(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lng}&lang=en-US&apiKey=${HERE_API_KEY}`);
            hideLoading();
            return res.data.items[0];
          } catch (error: any) {
            hideLoading();
            return null;
          }
    }


    return { onGetAllPost, onCreatePost, onUpdatePost, onDeletePost, onPutImage, onGetAddress };
}; 