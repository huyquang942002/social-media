import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { API_URL } from '@env';

interface IApiResponse<T = any> {
    data?: T;
    headers?: any;
    errors?: any;
    succeeded: boolean;
    error?: IApiError;
}

interface IApiError {
    code?: string | number;
    message: string;
}

interface IErrorResponse {
    error: string;
    error_description: string;
    error_uri: string;
}

interface IApiRequestConfig extends AxiosRequestConfig {
    unProtected?: boolean;
}

const API_CONFIG: AxiosRequestConfig = {
    timeout: 10000,
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US',
        Accept: '*/*',
        'Max-Content-Length': 100000000,
        'Max-Body-Length': 1000000000,
    },
};

export class BaseApiService {
    private instance: AxiosInstance;

    constructor(private protectedApi = false) {
        this.instance = axios.create(API_CONFIG);
        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.instance.interceptors.request.use(this.handleRequest, this.handleError);
        this.instance.interceptors.response.use(this.handleResponse, this.handleError);
    }

    private handleRequest = async (config: IApiRequestConfig): Promise<IApiRequestConfig> => {
        if (this.protectedApi && !config.unProtected) {
            const token = await EncryptedStorage.getItem('secure_token');
            if (token) {
                config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
            } else {
                // Optionally handle the case where a token is required but not available
                throw new axios.Cancel('Protected API: No access token available');
            }
        }
        return config;
    };

    private handleResponse = (response: AxiosResponse): IApiResponse => {
        if (response.status === 200 || response.status === 201) {
            return { data: response.data, headers: response.headers, succeeded: true };
        } else {
            throw response.data;
        }
    };

    private handleError = (error: any): Promise<IApiResponse> => {
        let message = 'Network Error';
        if (error.response && error.response.data) {
            message = error.response.data.error_description || message;
        }
        return Promise.reject({ succeeded: false, error: { message } });
    };

    private async request<T = any>(method: 'get' | 'post' | 'patch' | 'put' | 'delete', url: string, data?: any, config?: IApiRequestConfig): Promise<IApiResponse<T>> {
        try {
            const response = await this.instance[method](url, data, config);
            return this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    convertFormData(data: object): FormData {
        const formData = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));
        return formData;
    }

    // Simplify the API methods by using the generic request method
    get<T = any>(url: string, config?: IApiRequestConfig) {
        return this.request<T>('get', url, undefined, config);
    }

    post<T = any>(url: string, data?: any, config?: IApiRequestConfig) {
        return this.request<T>('post', url, data, config);
    }

    patch<T = any>(url: string, data?: any, config?: IApiRequestConfig) {
        return this.request<T>('patch', url, data, config);
    }

    put<T = any>(url: string, data?: any, config?: IApiRequestConfig) {
        return this.request<T>('put', url, data, config);
    }

    delete<T = any>(url: string, config?: IApiRequestConfig) {
        return this.request<T>('delete', url, undefined, config);
    }

    postForm<T = any>(url: string, data?: object, config?: IApiRequestConfig) {
        const formData = this.convertFormData(data);
        return this.post<T>(url, formData, { ...config, headers: { 'Content-Type': 'multipart/form-data' } });
    }

    putForm<T = any>(url: string, data?: object, config?: IApiRequestConfig) {
        const formData = this.convertFormData(data);
        return this.put<T>(url, formData, { ...config, headers: { 'Content-Type': 'multipart/form-data' } });
    }
}
