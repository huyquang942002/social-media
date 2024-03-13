import { API_URL } from "@env";
import { BaseApiService } from "./BaseApi";
import { useLoadingContext } from "../../context/loadingHelper";


export const useProfile = () => {
    const baseApi = new BaseApiService();
    const {showLoading, hideLoading} = useLoadingContext();

    const onGetDetailProfile = async (page?: number, take?: number, otherId?: string) => {
        showLoading();
        const res = await baseApi.get(`${API_URL}/public-api/detail-profile?page=${page}&take=${take}&otherId=${otherId}`);
        hideLoading();
        return res;
    };
    
    return { onGetDetailProfile };
}; 