import axios, { type AxiosInstance} from "axios";

const URL = 'https://antonina-supramolecular-dominga.ngrok-free.dev';

//INSTANCIA DO AXIOS
const api: AxiosInstance = axios.create({
    baseURL: URL,
    withCredentials: true,
    timeout: 5000
})

export default api;