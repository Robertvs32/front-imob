import axios from "axios"
import { api } from "@/api/api"
import { type ReturnLogin } from "@/features/auth/types/Auth.types";

export const AuthServices = {
    login: async (email: string, senha: string): Promise<ReturnLogin> => {
        try{
            const response = await api.post<ReturnLogin>('', { email, senha });
            return response.data;
        }
        catch(error: unknown){
            //VERIFICAR SE E UM ERRO DO AXIOS PRO TS NAO RECLAMAR
            if(axios.isAxiosError(error)){
                throw new Error(error.message)
            }

            throw new Error("Erro inesperado")
        }
    }
}