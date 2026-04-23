export const executaFila = (error: any, token: string | null = null, fila: any[]) => {
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