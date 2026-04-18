import type { DadosRoles } from "./roles.types";

const RolesUtils = {

    buscarNomeRole: (arrayRoles: DadosRoles[], id: number) => {
        const objRole = arrayRoles.find(item => 
            item.id_role == id
        )

        return objRole?.nome;
    }

}

export default RolesUtils;