import api from "@/api/api";
import type { DadosRoles } from "./roles.types";

const RolesServices = {
    
    buscarRoles: async () => {
        try{
            const response = await api.get('/listaroles');
            const arrayRoles: DadosRoles[] = response.data;

            return arrayRoles;
        }catch(error){
            throw error
        }
    }

}

export default RolesServices;