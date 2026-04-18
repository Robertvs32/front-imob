import '@/shared/sidebar/sidebar.css'
import HeaderSidebar from '@/shared/sidebar/components/headerSidebar/headerSidebar';
import { useContext, useState } from 'react';
import ItemSidebar from '@/shared/sidebar/components/itemSidebar/ItemSidebar'
import iconRanking from './icons/ranking.png';
import iconVenda from './icons/venda.png'
import iconLocacao from './icons/locacao.png'
import iconPropostas from './icons/propostas.png'
import InfosUserSidebar from '@/shared/sidebar/components/infosUserSidebar/InfosUserSidebar';
import { AuthContext } from '@/features/auth/contexts/AuthContext';
import type { ContextData } from '@/features/auth/types/Auth.types';
import LogoutBtn from '@/shared/sidebar/components/logoutBtn/LogoutBtn';

export default function Sidebar({statusSidebar, setStatusSidebar}: {statusSidebar: boolean, setStatusSidebar: React.Dispatch<React.SetStateAction<boolean>>}){

    const { objUser } = useContext(AuthContext) as ContextData

    //STATES
    const [itemSelected, setItemSelected] = useState('');

    //SIDEBAR
    return(
        <>
            <div 
                //estilo css condicional, sidebar aberto e fechado
                className={`sidebarContainer ${statusSidebar ?  'sidebarOpen' : 'sidebarClosed'}`}
            >
                <HeaderSidebar
                    statusSidebar={statusSidebar}
                />

                <InfosUserSidebar
                    statusSidebar={statusSidebar}
                    nome={objUser?.nome as string}
                    id_role={objUser?.id_role as number}
                />

                <ItemSidebar
                    statusSidebar={statusSidebar}
                    icon={iconRanking}
                    alt="icone ranking"
                    title="Ranking"
                    selected={itemSelected}
                    setter={setItemSelected}
                    path="/"
                    setSidebar={setStatusSidebar}
                />

                <ItemSidebar
                    statusSidebar={statusSidebar}
                    icon={iconVenda}
                    alt="icone ranking"
                    title="Propostas"
                    selected={itemSelected}
                    setter={setItemSelected}
                    path="/equipes"
                    setSidebar={setStatusSidebar}
                />

                <ItemSidebar
                    statusSidebar={statusSidebar}
                    icon={iconLocacao}
                    alt="icone ranking"
                    title="Equipes"
                    selected={itemSelected}
                    setter={setItemSelected}
                    path="/venda"
                    setSidebar={setStatusSidebar}
                />

                {(objUser?.id_role == 1 || objUser?.id_role == 2) && (
                    <ItemSidebar
                        statusSidebar={statusSidebar}
                        icon={iconLocacao}
                        alt="icone ranking"
                        title="Usuários"
                        selected={itemSelected}
                        setter={setItemSelected}
                        path="/usuarios"
                        setSidebar={setStatusSidebar}
                    />
                )} 

                <ItemSidebar
                    statusSidebar={statusSidebar}
                    icon={iconPropostas}
                    alt="icone ranking"
                    title="Imóveis"
                    selected={itemSelected}
                    setter={setItemSelected}
                    path="/propostas"
                    setSidebar={setStatusSidebar}
                />

                <ItemSidebar
                    statusSidebar={statusSidebar}
                    icon={iconPropostas}
                    alt="icone ranking"
                    title="Despesas"
                    selected={itemSelected}
                    setter={setItemSelected}
                    path="/propostas"
                    setSidebar={setStatusSidebar}
                />

                <ItemSidebar
                    statusSidebar={statusSidebar}
                    icon={iconPropostas}
                    alt="icone ranking"
                    title="Comissões"
                    selected={itemSelected}
                    setter={setItemSelected}
                    path="/propostas"
                    setSidebar={setStatusSidebar}
                />

                <LogoutBtn/>
                    
            </div>
            
        </>
    )
    // ----------------------------------------------------------------------------------------------
}