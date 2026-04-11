    //IMPORTACOES
    import { createContext, useState, type ReactNode } from "react";
    import { type User, type ContextData, type ReturnLogin } from "@/features/auth/types/Auth.types";
    import { AuthServices } from "@/features/auth/services/Auth.services";
    import { injetaBuscaToken, injetaRefreshToken } from "@/api/api";
    import { useEffect } from "react";

    //CRIANDO O AUTH CONTEXT QUE ACEITA TANTO O TIPO CONTEXTDATA QUANTO NULL (QUE SERA O VALOR INICIAL) ------
    export const AuthContext = createContext<ContextData | null>(null);
    // -------------------------------------------------------------------------------------------------------

    //CRIANDO O AUTH PROVIDER QUE IRA ENVOLVER OS COMPONENTES QUE IRAO CONSUMIR O AUTH CONTEXT ---------------
    export const AuthProvider = ({children}: {children: ReactNode}) => {
    // -------------------------------------------------------------------------------------------------------

        //STATES ----------------------------------------------------------------------------------------------
        const [objUser, setObjUser] = useState<User | null>(null);
        const [token, setToken] = useState<string | null>(null);
        const [loading, setLoading] = useState<boolean>(true);
        //-----------------------------------------------------------------------------------------------------

        //FUNCAO DE LOGIN -------------------------------------------------------------------------------------
        const login = async (email: string, senha: string): Promise<void> => {
            try{
                setLoading(true);
                const response: ReturnLogin = await AuthServices.login(email, senha);
                setObjUser(response.objUser);
                setToken(response.token);
            }catch(error: any){
                console.log(error.message)
            }
            finally{
                setLoading(false);
            }
        }
        //-----------------------------------------------------------------------------------------------------

        //FUNCAO PARA RETORNAR NOVO TOKEN PELO REFRESH TOKEN --------------------------------------------------
        const refreshToken = async (): Promise<string | null> => {
            try{
                const response = await AuthServices.refreshToken();
                setObjUser(response.objUser);
                setToken(response.token);

                return response.token;
            }catch(error){
                console.log("Erro ao buscar refreshToken");
                setToken(null);
                setObjUser(null);
                return null
            }
        }
        // -----------------------------------------------------------------------------------------------------

        //FUNCAO DE LOGOUT -------------------------------------------------------------------------------------
        const logout = async (): Promise<void> => {
            try{
                setObjUser(null);
                setToken(null);
            }catch(error: any){
                console.log(error.message)
            }
        }
        // ----------------------------------------------------------------------------------------------------

        // INJETAR FUNCAO DE RECUPERAR TOKEN DENTRO DA INSTANCIA DO AXIOS -------------------------------------
        const buscaToken = (): string | null => {
            return token;
        }

        injetaBuscaToken(buscaToken);
        //-----------------------------------------------------------------------------------------------------

        //INJETA FUNCAO DE REFRESH TOKEN DENTRO DA INSTANCIA DO AXIOS -----------------------------------------
        injetaRefreshToken(refreshToken)
        //-----------------------------------------------------------------------------------------------------

        //TODA VEZ QUE O TOKEN MUDAR, ATUALIZA A FUNCAO QUE PEGA O TOKEN, E A FUNCAO DE PRA PEGAR O NOVO E NAO O ANTIGO -----
        useEffect(() => {
            injetaBuscaToken((): string | null => {
                return token
            })

            injetaRefreshToken(refreshToken)
        }, [token])
        // ----------------------------------------------------------------------------------------------------

        return(
            <AuthContext.Provider value={{loading, objUser, login, logout}}>
                {children}
            </AuthContext.Provider>
        )
    }