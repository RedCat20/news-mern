import axios, {AxiosRequestConfig} from 'axios';

export const basePath = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const axiosInstanse = axios.create({
    baseURL: basePath
})

type AxiosRequestConfigWithHeaders = {
    AxiosRequestConfig: any,
    headers: any;
}

type UpdatedAxiosRequestConfig = AxiosRequestConfig | AxiosRequestConfigWithHeaders;

axiosInstanse.interceptors.request.use((config: UpdatedAxiosRequestConfig): UpdatedAxiosRequestConfig => {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
});

export default axiosInstanse;