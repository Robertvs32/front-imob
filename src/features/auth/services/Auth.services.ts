import { api } from "@/api/api"
import { type ReturnLogin } from "@/features/auth/types/Auth.types";

export const AuthServices = {

    login: async (email: string, senha: string): Promise<ReturnLogin> => {
        try{
            const response = await api.post<ReturnLogin>('/login', { email, senha });
            const dadosUser = response.data;

            return dadosUser;
        }
        catch(error: unknown){
            throw new Error("Erro inesperado")
        }
    }
    
}