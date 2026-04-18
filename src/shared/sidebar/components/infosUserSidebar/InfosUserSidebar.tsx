import '@/shared/sidebar/components/infosUserSidebar/infosUserSidebar.css';
import IconUser from '@/shared/sidebar/icons/user.png'

export default function InfosUserSidebar({statusSidebar, nome, id_role}: {
    statusSidebar: boolean, 
    nome: string,
    id_role: number
}){

    //POR ENQUANTO MANUAL, DEPOIS PUXAR DO BANCO DE DADOS !!!!!
    const nomeRoles: string[] = ["Diretor geral", "Adm", "Diretor comercial", "Corretor", "Financeiro", "Cliente", "Proprietário"]

    //FUNCAO PRA PEGAR O NOME DA ROLE
    const pegaNome = (id_role: number) => {
        const nome = nomeRoles[id_role - 1];
        return nome;
    }

    // COMPONENTE QUE MOSTRA AS INFORMACOES DO USUARIO ---------------------------------------------------
    return(
        <div 
            className={`infosUserSidebarContainer ${statusSidebar && 'infosUserSidebarContainerOpen'}`}
        >
            <img className="iconUserSidebar" src={IconUser} alt="icone user" />

            {statusSidebar && (
                <div className="containerInfos">
                    <p className="nameUserSidebar">{nome}</p>
                    <p className="roleUserSidebar">{pegaNome(id_role)}</p>
                </div>  
            )}
            
        </div>
    )
    // ---------------------------------------------------------------------------------------------------
}