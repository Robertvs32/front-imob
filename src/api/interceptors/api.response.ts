import api from '@/api/api'
import { executaFila } from '@/api/api.utils';

let buscandoRefresh = false;

let fila: any[] = [];

//FUNCAO DE REFRESH TOKEN, QUE RETORNA O TOKEN QUE SERA USADO QUANDO EXPIRAR O ANTIGO
let refreshToken = async (): Promise<string | null> => { return null }
export const injetaRefreshToken = (fun: () => Promise<string | null>) => { refreshToken = fun }


//INTERCEPTORS DO AXIOS RESPONSE - CASO O TOKEN ESTEJA EXPIRADO SOLICITA UM NOVO
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
            error.response?.data?.mensagem == 'Token expirado!'  &&
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
                    executaFila(null, novoToken, fila);
                    return await api(requisicao);
                }
            }

            //se nao for error 401 devolve uma promise rejeitada pra ser tratada por quem chamou
            return Promise.reject(error)
        }catch(error){
            //se der um erro no try, que nao for uma resposta de erro, retorna uma promise de erro
            buscandoRefresh = false;
            executaFila(error, null, fila);
            return Promise.reject(error);
        }
    }
)