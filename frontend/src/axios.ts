import axios, {AxiosRequestConfig} from 'axios';
import {basePath} from "./paths";

const instanse = axios.create({
    baseURL: basePath
})

type AxiosRequestConfigWithHeaders = {
    AxiosRequestConfig: any,
    headers: any;
}

type UpdatedAxiosRequestConfig = AxiosRequestConfig | AxiosRequestConfigWithHeaders;

instanse.interceptors.request.use((config: UpdatedAxiosRequestConfig): UpdatedAxiosRequestConfig => {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
});

export default instanse;