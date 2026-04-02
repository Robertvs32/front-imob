    //IMPORTACOES
    import { createContext, useState, type ReactNode } from "react";
    import { type User, type ContextData, type ReturnLogin } from "@/features/auth/types/Auth.types";
    import { AuthServices } from "@/features/auth/services/Auth.services";

    //CRIANDO O AUTH CONTEXT QUE ACEITA TANTO O TIPO CONTEXTDATA QUANTO NULL (QUE SERA O VALOR INICIAL)
    export const AuthContext = createContext<ContextData | null> (null);

    //CRIANDO O AUTH PROVIDER QUE IRA ENVOLVER OS COMPONENTES QUE IRAO CONSUMIR O AUTH CONTEXT
    export const AuthProvider = ({children}: {children: ReactNode}) => {

        const [objUser, setObjUser] = useState<User | null>(null);
        const [token, setToken] = useState<string | null>(null);
        const [loading, setLoading] = useState<boolean>(true);


        const login = async (email: string, senha: string): Promise<void> => {
            try{
                const response: ReturnLogin = await AuthServices.login(email, senha);
                setObjUser(response.objUser);
                setToken(response.token);
            }catch(error){

            }
        }

        const logout = async (): Promise<void> => {
            try{

            }catch(error){

            }
        }


        return(
            <AuthContext.Provider value={{loading, objUser, login, logout}}>
                {children}
            </AuthContext.Provider>
            
        )
    }