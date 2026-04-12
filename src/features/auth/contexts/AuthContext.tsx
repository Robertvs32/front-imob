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
                throw error
            }finally{
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
                //FAZER REQUISICAO PRA LIMPAR O COOKIE ################################
                setObjUser(null);
                setToken(null);
            }catch(error: any){
                console.log(error.message)
            }
        }
        // ----------------------------------------------------------------------------------------------------

        // FUNCAO BUSCA TOKEN QUE SERA PASSADA PARA A INSTANCIA DO AXIOS --------------------------------------
        const buscaToken = (): string | null => {
            return token;
        }
        //-----------------------------------------------------------------------------------------------------

        //TODA VEZ QUE O TOKEN MUDAR, ATUALIZA A FUNCAO QUE PEGA O TOKEN, E A FUNCAO --------------------------
        //DE REFRESH TOKEN, PRA NAO TENTAR REFERENCIAR UM VALOR ANTIGO
        useEffect(() => {
            injetaBuscaToken(buscaToken);
            injetaRefreshToken(refreshToken);
        }, [token])
        // ----------------------------------------------------------------------------------------------------

        //BUSCA OS DADOS PELO REFRESH TOKEN TODA VEZ QUE CARREGA A APLICAÇÃO ----------------------------------
        useEffect(() => {
            //cria uma funcao async pq o callback do useEffect nao pode
            const buscaRefresh = async () => {
                try{
                    setLoading(true);
                    await refreshToken();
                }catch(error){
                    console.log(error);
                }finally{
                    setLoading(false);
                }
            }
            buscaRefresh();
        }, [])
        // ----------------------------------------------------------------------------------------------------

        //RETORNA O PROVIDER PRA FORNECER O CONTEXTO PROS COMPONENTES FILHOS ----------------------------------
        return(
            <AuthContext.Provider value={{loading, objUser, login, logout}}>
                {children}
            </AuthContext.Provider>
        )
        // ----------------------------------------------------------------------------------------------------
    }