import axios from "axios";
import { type InternalAxiosRequestConfig } from "axios";

const URL = ''

export const api = axios.create({
    baseURL: URL,
    withCredentials: true,
    timeout: 5000
})

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if(config.headers.Authorization && config.headers.Authorization !== 'Bearer null'){
            return config;
        }

        return config;
    }
)