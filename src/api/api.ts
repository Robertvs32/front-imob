import axios, { type AxiosInstance} from "axios";

const URL = 'https://antonina-supramolecular-dominga.ngrok-free.dev';

//INSTANCIA DO AXIOS -------------------------------------------------------------------------
export const api: AxiosInstance = axios.create({
    baseURL: URL,
    withCredentials: true,
    timeout: 5000
})
// -------------------------------------------------------------------------------------------

//FUNCAO DE BUSCA TOKEN QUE SERA INJETADA PELO CONTEXT ---------------------------------------
let buscaToken = (): null | string => { return null }
export const injetaBuscaToken = (fun: () => null | string ) => {buscaToken = fun}
// -------------------------------------------------------------------------------------------

//FUNCAO DE REFRESH TOKEN, QUE RETORNA O TOKEN QUE SERA USADO QUANDO EXPIRAR O ANTIGO --------
let refreshToken = async (): Promise<string | null> => { return null }
export const injetaRefreshToken = (fun: () => Promise<string | null>) => { refreshToken = fun }
// -------------------------------------------------------------------------------------------

//INTERCEPTORS DO AXIOS REQUEST - INJETA O TOKEN EM TODAS AS REQUISICOES
api.interceptors.request.use(
    config => {

        //quando o token expira, solicita um novo ja insere no header da requisicao
        //se ja tiver o token inserido, nao busca novamente, pois iria retornar o antigo
        if (config.headers.Authorization && config.headers.Authorization !== 'Bearer null') {
            return config;
        }

        const token = buscaToken();
        
        //se nao tiver token, envia sem mesmo, usado para rotas publicas
        if(token){
            config.headers.set('Authorization', `Bearer ${token}`);
        }

        config.headers['Content-Type'] = 'application/json';
        config.headers['Accept'] = 'application/json';

        //skio do warning do ngrok em ambiente de desenvolvimento
        config.headers['ngrok-skip-browser-warning'] = 'true'; 

        return config;
    },
    error => {
        return Promise.reject(error);
    }
)


//TRATAR QUANDO VÁRIAS REQUISIÇÕES SÃO ENVIADAS COM TOKEN EXPIRADO, PRA NÃO
//PRECISAR PEDIR O NOVO TOKEN EM TODAS QUE DEVOLVEREM 401

//indica se já está buscando o token pelo refresh
let buscandoRefresh = false;

//guarda os objetos com resolve e rejected das promises das requisicoes
//que falharam inicialmente
let fila: any[] = [];

//funcao pra executar as pendencias
const executaFila = (error: any, token: string | null = null) => {
    //percorre a fila executando
    fila.forEach(promise => {
        if(token){
            return promise.resolve(token);
        }

        return promise.reject(error);
    })

    //limpa a fila
    fila = []
}


// --------------------------------------------------------------------------------------------

    //INTERCEPTORS DO AXIOS RESPONSE - CASO O TOKEN ESTEJA EXPIRADO SOLICITA UM NOVO --------------
        api.interceptors.response.use(
            //devolve o response em caso de sucesso, status 200...
            response => {
                return response;
            },
            
            //se der erro na requisicao, cai no error do interceptors
            async error => {
                try{
                    const requisicao = error.config

                    //verifica se o token está expirado e nao invalido
                    if(error.response?.status == 401 && 
                    error.response?.data?.mensagem == 'Token expirado'  &&
                    requisicao.try != true){

                        requisicao.try = true;

                        //verifica se já está buscando o novo token
                        if(buscandoRefresh){
                            //retorna uma promise e adiciona na fila (fica pendente)
                            return new Promise((resolve, reject) => {
                                //adiciona um objeto com resolve e reject na fila
                                fila.push({resolve, reject})
                            }).then((token) => { //se veio o token, chama a requisicao da fila com o novo 
                                requisicao.headers.set('Authorization', `Bearer ${token}`);
                                return api(requisicao);
                            }).catch(error => Promise.reject(error)) //se der errado, retorna uma promise rejeitada
                        }

                        buscandoRefresh = true;
                        const novoToken = await refreshToken();

                        if(novoToken){
                            buscandoRefresh = false;
                            requisicao.headers.set('Authorization', `Bearer ${novoToken}`);
                            executaFila(null, novoToken);
                            return await api(requisicao);
                        }
                    }

                    //se nao for error 401 devolve uma promise rejeitada pra ser tratada por quem chamou
                    return Promise.reject(error)
                }catch(error){
                    //se der um erro no try, que nao for uma resposta de erro, retorna uma promise de erro
                    buscandoRefresh = false;
                    executaFila(error, null);
                    return Promise.reject(error);
                }
            }
        )
