import { API_URL } from "@env";
import { BaseApiService } from "./BaseApi";
import { useLoadingContext } from "../../context/loadingHelper";


export const useFriend = () => {
    const baseApi = new BaseApiService();
    const { showLoading, hideLoading } = useLoadingContext();

    const onGetAllFriend = async () => {
        showLoading();
        const res = await baseApi.get(`${API_URL}/friend/getAllFriend`);
        hideLoading();
        return res;
    };

    const onCreateFriend = async (otherUserId: string) => {
        showLoading();
        const res = await baseApi.post(`${API_URL}/friend/create`, {
            otherUserId: otherUserId
        });
        hideLoading();
        return res;
    };

    const onDeleteFriend = async (id?: string) => {
        showLoading();
        const res = await baseApi.delete(`${API_URL}/friend/delete/${id}`);
        hideLoading();
        return res;
    }

    const onGetListRequestFriend = async () => {
        showLoading();
        const res = await baseApi.get(`${API_URL}/friend/getListRequestFriend`);
        hideLoading();
        return res;

    }



    return { onGetAllFriend, onCreateFriend, onDeleteFriend, onGetListRequestFriend };
}; 