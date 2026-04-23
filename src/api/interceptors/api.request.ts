import api from "@/api/api"

//FUNCAO DE BUSCA TOKEN QUE SERA INJETADA PELO CONTEXT
let buscaToken = (): null | string => { return null }
export const injetaBuscaToken = (fun: () => null | string ) => {buscaToken = fun}


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


