import api from "@/api/api";

const UsuariosServices = {

    buscarListaUsuarios: async () => {
        try{
            const response = await api.get('/listarusuarios');
            const listaUsuarios = response.data;

            return listaUsuarios
        }catch(error){
            throw error
        }
    }

}

export default UsuariosServices;