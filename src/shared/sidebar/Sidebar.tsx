import '@/shared/sidebar/sidebar.css'
import HeaderSidebar from '@/shared/sidebar/components/headerSidebar/headerSidebar';
import { useState } from 'react';
import ItemSidebar from '@/shared/sidebar/components/itemSidebar/ItemSidebar'
import iconRanking from './icons/ranking.png';
import iconVenda from './icons/venda.png'
import iconLocacao from './icons/locacao.png'
import iconPropostas from './icons/propostas.png'
import { useEffect } from 'react';
import InfosUserSidebar from '@/shared/sidebar/components/infosUserSidebar/InfosUserSidebar';

export default function Sidebar({statusSidebar, setStatusSidebar}: {statusSidebar: boolean, setStatusSidebar: React.Dispatch<React.SetStateAction<boolean>>}){

    // STATES ---------------------------------------------------------------------------------------
    const [itemSelected, setItemSelected] = useState('');
    // ----------------------------------------------------------------------------------------------

    // EFFECT PRA SETAR O RANKING ??? ---------------------------------------------------------------
    useEffect(() => {
        setItemSelected('Ranking');
    }, [])
    // ----------------------------------------------------------------------------------------------

    // SIDEBAR --------------------------------------------------------------------------------------
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
                />

                <ItemSidebar
                    statusSidebar={statusSidebar}
                    icon={iconRanking}
                    alt="icone ranking"
                    title="Ranking  "
                    selected={itemSelected}
                    setter={setItemSelected}
                    path="/"
                    setSidebar={setStatusSidebar}
                />

                <ItemSidebar
                    statusSidebar={statusSidebar}
                    icon={iconVenda}
                    alt="icone ranking"
                    title="Venda"
                    selected={itemSelected}
                    setter={setItemSelected}
                    path="/equipes"
                    setSidebar={setStatusSidebar}
                />

                <ItemSidebar
                    statusSidebar={statusSidebar}
                    icon={iconLocacao}
                    alt="icone ranking"
                    title="Equipe"
                    selected={itemSelected}
                    setter={setItemSelected}
                    path="/venda"
                    setSidebar={setStatusSidebar}
                />

                <ItemSidebar
                    statusSidebar={statusSidebar}
                    icon={iconPropostas}
                    alt="icone ranking"
                    title="Minhas Propostas"
                    selected={itemSelected}
                    setter={setItemSelected}
                    path="/propostas"
                    setSidebar={setStatusSidebar}
                />

                <ItemSidebar
                    statusSidebar={statusSidebar}
                    icon={iconPropostas}
                    alt="icone ranking"
                    title="Clientes"
                    selected={itemSelected}
                    setter={setItemSelected}
                    path="/propostas"
                    setSidebar={setStatusSidebar}
                />
                    
            </div>
            
        </>
    )
    // ----------------------------------------------------------------------------------------------
}