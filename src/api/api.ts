import axios, { type AxiosInstance} from "axios";

const URL = ''

export const api: AxiosInstance = axios.create({
    baseURL: URL,
    withCredentials: true,
    timeout: 5000
})

let buscaToken = (): null | string => { return null }
export const injetaBuscaToken = (fun: () => null | string ) => {buscaToken = fun}

api.interceptors.request.use(
    (config) => {
        const token = buscaToken();

        if(token){
            config.headers.set('Authorization', `Bearer ${token}`);
        }

        return config;
        
    },
    error => {
        return Promise.reject(error);
    }
)

