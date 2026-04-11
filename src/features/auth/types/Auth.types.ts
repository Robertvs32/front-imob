// INTERFACE DO OBJETO USUARIO - USADO PARA DEFINIR O ESQUELETO DO OBJUSER QUE IRA GUARDAR

import type { SyntheticEvent } from "react";

//OS DADOS DO USUARIO NO CONTEXT
export interface User {
    id_usuario: number,
    id_empresa: number,
    id_role: number,
    nome: string 
}

/* INTERFACE DO AUTH CONTEXT, QUE SERA   DISPONIBILIZADO PARA TODOS OS COMPONENTES */
export interface ContextData {
    loading: boolean,
    objUser: User | null,
    login: (email: string, senha:string) => Promise<void>,
    logout: () => void;
}

//INTERFACE DO RETORNO DO LOGIN
export interface ReturnLogin {
    objUser: User,
    token: string
}

export interface objLogin {
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>
    senha: string,
    setSenha: React.Dispatch<React.SetStateAction<string>>
    handleLogin: (e: SyntheticEvent) => void
}