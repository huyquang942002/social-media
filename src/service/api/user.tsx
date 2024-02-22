import { API_URL } from "@env";
import { BaseApiService } from "./BaseApi";
import { UserInfo } from "../model/user";
import { useLoadingContext } from "../../context/loadingHelper";



export const useUser = () => {
    const baseApi = new BaseApiService();
    const { showLoading, hideLoading } = useLoadingContext();
    const onForgetPassword = async (email: string) => {
        showLoading();
        const res = await baseApi.post(`${API_URL}/users/send-forgot-password`, {
            email: email
        });
        hideLoading();
        return res;
    };
    const onVerifyEmail = async () => {
        showLoading();

        const res = await baseApi.post(`${API_URL}/users/send-verify-mail`, {
        });
        hideLoading();

        return res;
    };

    const onVerifyCode = async (code: string, type: string) => {
        showLoading();

        const res = await baseApi.post(`${API_URL}/users/verify-user-code`, {
            code: code,
            type: type
        });
        hideLoading();

        return res;
    };

    const onGetUser = async () => {
        showLoading();

        const res = await baseApi.get(`${API_URL}/users`);
        hideLoading();

        return res;
    };

    const onResetPassword = async (password: string, email: string) => {
        showLoading();

        const res = await baseApi.post(`${API_URL}/users/reset-password`, {
            password: password,
            email: email
        });
        hideLoading();

        return res;
    };

    const onChangeProfile = async (userName: string, email: string, firstName: string, lastName: string, phoneNumber: string, dob: string, gender: string, zipcode: string, address: string) => {
        showLoading();

        const res = await baseApi.patch(`${API_URL}/users/update-profile-user`, {
            username: userName,
            email: email,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            dob: dob,
            gender: gender,
            zipcode: zipcode,
            address: address
        });
        hideLoading();

        return res;
    };

    const onUpdatePassword = async (oldPassword: string, newPassword: string) => {
        showLoading();

        const res = await baseApi.post(`${API_URL}/users/update-password`, {
            oldPassword: oldPassword,
            newPassword: newPassword
        });
        hideLoading();

        return res;
    };

    const onGetUrlAvatar = async () => {
        showLoading();

        const res = await baseApi.get(`${API_URL}/users/presigned-url`);
        hideLoading();

        return res;
    }


    return { onForgetPassword, onVerifyCode, onResetPassword, onGetUser, onChangeProfile, onUpdatePassword, onVerifyEmail, onGetUrlAvatar };
}; 