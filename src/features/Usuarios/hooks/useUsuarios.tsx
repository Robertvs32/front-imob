import { useState, useEffect } from "react";
import UsuariosServices from "../services/usuarios.services";
import type { ItemListaUsuarios } from "../types/usuarios.types";

export default function useUsuarios(){

    const [usuarios, setUsuarios] = useState<ItemListaUsuarios[]>([]);

    const buscarUsuarios = async () => {
        try{
            const listaUsuarios = await UsuariosServices.buscarListaUsuarios();
            setUsuarios(listaUsuarios);
        }catch(error: any){
            alert(error.message)
        }
    }

    useEffect(() => {
        const busca = async () => {
            await buscarUsuarios()
        }
        busca();
    }, [])

    return{
        usuarios
    }
}