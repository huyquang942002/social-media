import { API_URL } from '@env';
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import _ from 'lodash';
import EncryptedStorage from 'react-native-encrypted-storage';

export interface IApiResponse<T = void> {
    data?: T;
    header?: any;
    errors?: any;
    succeeded: boolean;
    failed?: boolean;
    error?: IApiError;
}
export interface IApiError {
    code?: string | number;
    message: string;
}
export interface IErrorResponse {
    error: string;
    error_description: string;
    error_uri: string;
}


interface IApiRequestConfig extends AxiosRequestConfig {
    unProtected?: boolean;
}


const API_CONFIG: AxiosRequestConfig = {
    // returnRejectedPromiseOnError: true,
    // withCredentials: true,
    timeout: 10000,
    baseURL: API_URL,
    headers: {
        'Content-type': 'application/json',
        'accept-language': 'en-Us',
        // timeOffset: Math.round(moment().utcOffset() / 60),
        accept: '*/*',
        maxContentLength: 100000000,
        maxBodyLength: 1000000000
    },
};
export class BaseApiService {
    private instance: AxiosInstance;
    private protectedApi: boolean;
    private controller = new AbortController();
    constructor(protectedApi = false) {
        this.instance = axios.create(API_CONFIG);
        this.protectedApi = protectedApi;
        this.instance.interceptors.request.use(this._handleRequest);
        this.instance.interceptors.response.use(
            response => {
                const config = response.config;
                return response;
            },
            error => {
                // if (error.response.status === 410) {

                // }
                // if (error.response.status === 401) {

                // }
                throw new Error(error);
            },
        );
    }

    private _handleRequest = async (config: IApiRequestConfig): Promise<IApiRequestConfig> => {
        try {

            const authorizationKey = await EncryptedStorage.getItem("secure_token");
            
            if (
                this.protectedApi &&
                !config.unProtected &&
                !authorizationKey
            ) {
                this.controller.abort();
                const CancelToken = axios.CancelToken;
                return {
                    ...config,
                    cancelToken: new CancelToken(cancel => cancel('Protected API')),
                };
            }
            config.headers!.Authorization = "Bearer " + authorizationKey!;
            return config;
        } catch (error) {
            throw new Error(error as string);
        }
    };
    private _handleResponse(
        response: AxiosResponse<any | IErrorResponse>,
    ): IApiResponse<any> {
        
        if (response.data.statusCode === 200 || response.status == 200 || response.status == 201) {
            const data = response.data;
                return {
                    data,
                    header: response.headers,
                    succeeded: true,
                };
        }
        const error = response.data as IErrorResponse;
        return {
            succeeded: false,
            error: {
                message: error.error_description,
            },
        };
    }

    private _handleError(): IApiResponse {
        const data = {
            message: 'Network Error',
        };
        return {
            succeeded: false,
            failed: true,
            error: {
                message: 'Network Error',
            },
            data,
        };
    }

    convertFormData(data: any) {
        var formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        return formData;
    }

    public async get(
        url: string,
        config?: IApiRequestConfig,
    ) {
        try {
            const response = await this.instance.get(`${url}`, config);
            console.log('url', url, response);
            return this._handleResponse(response);
        } catch (error) {
            return this._handleError();
        }
    }
    public async post(
        url: string,
        data?: any,
        config?: IApiRequestConfig,
    ) {
        try {
            const response = await this.instance.post(`${url}`, data, config);
            console.log('url', url, response);
            return this._handleResponse(response);
        } catch (error) {
            console.log('url error', url, error);
            return this._handleError();
        }
    }
    public async patch(
        url: string,
        data?: any,
        config?: IApiRequestConfig,
    ) {
        try {
            const response = await this.instance.patch(`${url}`, data, config);
            console.log('url', url, response);
            return this._handleResponse(response);
        } catch (error) {
            console.log('url error', url, error);
            return this._handleError();
        }
    }
    public async put(
        url: string,
        data?: any,
        config?: IApiRequestConfig,
    ) {
        try {
            const response = await this.instance.put(`${url}`, data, config);
            return this._handleResponse(response);
        } catch (error) { }
    }
    public async delete(
        url: string,
        config?: IApiRequestConfig,
    ) {
        try {
            const response = await this.instance.delete(`${url}`, config);
            return this._handleResponse(response);
        } catch (error) {
            return this._handleError();
        }
    }
    public async postForm(
        url: string,
        data?: any,
        config?: IApiRequestConfig,
    ) {
        try {
            const formConfig: IApiRequestConfig = {
                ...config,
                headers: {
                    ...config?.headers,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };
            const formData = this.convertFormData(data);
            const response = await this.instance.post(
                `${url}`,
                formData,
                formConfig,
            );
            return this._handleResponse(response);
        } catch (error) {
            return this._handleError();
        }
    }
    public async putForm(
        url: string,
        data?: any,
        config?: IApiRequestConfig,
    ) {
        try {
            const formConfig: IApiRequestConfig = {
                ...config,
                headers: {
                    ...config?.headers,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };
            const formData = this.convertFormData(data);
            const response = await this.instance.put(
                `${url}`,
                formData,
                formConfig,
            );
            return this._handleResponse(response);
        } catch (error) {
            return this._handleError();
        }
    }
}
