import { API_URL } from "@env";
import { BaseApiService } from "./BaseApi";
import { useLoadingContext } from "../../context/loadingHelper";



export const userNotification = () => {
    const baseApi = new BaseApiService();
    const { showLoading, hideLoading } = useLoadingContext();

    const onCreateNotification = async (type: string, data: string, createdBy: string, userId: string, actionUserId: string, additionalData: string) => {
        showLoading();
        const res = await baseApi.post(`${API_URL}/notifications`, {
            type: type,
            data: data,
            createdBy: createdBy,
            userId: userId,
            actionUserId: actionUserId,
            additionalData: additionalData
        });
        hideLoading();
        return res;
    }

    const onGetAllNotification = async (order: string, page: number, take: number) => {
        showLoading();
        const res = await baseApi.get(`${API_URL}/notifications?page=${page}&take=${take}&order=${order}`);
        hideLoading();
        return res;
    };
    const onGetCommentByParentComment = async (commentId: string, page: number, take: number) => {
        // showLoading();
        const res = await baseApi.get(`${API_URL}/comment/get-by-parent-comment?commentId=${commentId}&page=${page}&take=${take}&order=DESC`);
        // hideLoading();
        return res;
    };

    const deleteComment = async (id: string) => {
        showLoading();
        const res = await baseApi.delete(`${API_URL}/comment/delete/${id}`);
        hideLoading();
        return res;
    }


    return { onCreateNotification, onGetAllNotification, deleteComment, onGetCommentByParentComment };
}; 