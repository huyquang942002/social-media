import { API_URL } from "@env";
import { BaseApiService } from "./BaseApi";
import { useLoadingContext } from "../../context/loadingHelper";


export const useInteract = () => {
    const baseApi = new BaseApiService();
    const { showLoading, hideLoading } = useLoadingContext();
    const onLove = async (entityId: string) => {
        showLoading();
        const res = await baseApi.post(`${API_URL}/user-interact/love`, {
            entityId: entityId
        });
        hideLoading();
        return res;
    };

    const onRemoveLove = async (entityId: string) => {
        showLoading();
        const res = await baseApi.post(`${API_URL}/user-interact/remove-love`, {
            entityId: entityId
        });
        hideLoading();
        return res;
    };

    const onDisLove = async (entityId: string) => {
        showLoading();
        const res = await baseApi.post(`${API_URL}/user-interact/dislove`, {
            entityId: entityId
        });
        hideLoading();
        return res;
    };

    const onRemoveDisLove = async (entityId: string) => {
        showLoading();
        const res = await baseApi.post(`${API_URL}/user-interact/remove-dislove`, {
            entityId: entityId
        });
        hideLoading();
        return res;
    };

    const onLoveComment = async (entityId: string) => {
        showLoading();
        const res = await baseApi.post(`${API_URL}/user-interact/love-comment`, {
            entityId: entityId
        });
        hideLoading();
        return res;
    };

    const onRemoveLoveComment = async (entityId: string) => {
        showLoading();
        const res = await baseApi.post(`${API_URL}/user-interact/remove-love-comment`, {
            entityId: entityId
        });
        hideLoading();
        return res;
    };

    const onDisloveComment = async (entityId: string) => {
        showLoading();
        const res = await baseApi.post(`${API_URL}/user-interact/dislove-comment`, {
            entityId: entityId
        });
        hideLoading();
        return res;
    };

    const onRemoveDisloveComment = async (entityId: string) => {
        showLoading();
        const res = await baseApi.post(`${API_URL}/user-interact/remove-dislove-comment`, {
            entityId: entityId
        });
        hideLoading();
        return res;
    };


    return { onLove, onRemoveLove, onDisLove, onRemoveDisLove, onLoveComment, onRemoveLoveComment, onDisloveComment, onRemoveDisloveComment }

}; 