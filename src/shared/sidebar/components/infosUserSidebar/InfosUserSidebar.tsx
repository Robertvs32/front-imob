import '@/shared/sidebar/components/infosUserSidebar/infosUserSidebar.css';
import IconUser from '@/shared/sidebar/icons/user.png'

export default function InfosUserSidebar({statusSidebar}: {statusSidebar: boolean}){

    // COMPONENTE QUE MOSTRA AS INFORMACOES DO USUARIO ---------------------------------------------------
    return(
        <div 
            className={`infosUserSidebarContainer ${statusSidebar && 'infosUserSidebarContainerOpen'}`}
        >
            <img className="iconUserSidebar" src={IconUser} alt="icone user" />

            {statusSidebar && (
                <div className="containerInfos">
                    <p className="nameUserSidebar">Robert</p>
                    <p className="roleUserSidebar">Administrador</p>
                </div>  
            )}
            
        </div>
    )
    // ---------------------------------------------------------------------------------------------------
}