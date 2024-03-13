import { API_URL } from "@env";
import { BaseApiService } from "./BaseApi";
import { useLoadingContext } from "../../context/loadingHelper";



export const useComments = () => {
    const baseApi = new BaseApiService();
    const { showLoading, hideLoading } = useLoadingContext();

    const onCreateComment = async (postId: string, content: string, commentId: string, commentImageName: string) => {
        showLoading();
        const res = await baseApi.post(`${API_URL}/comment/create`, {
            postId: postId,
            content: content,
            commentId: commentId,
            commentImageName: commentImageName
        });
        hideLoading();
        return res;
    }

    const onGetCommentByPost = async (postId: string, page: number, take: number) => {
        showLoading();
        const res = await baseApi.get(`${API_URL}/comment/postId/${postId}?page=${page}&take=${take}`);
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


    return { onCreateComment, onGetCommentByPost, deleteComment, onGetCommentByParentComment };
}; 