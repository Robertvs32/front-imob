import '@/shared/sidebar/components/btnSidebar/btnSidebar.css'
import iconSeta from '../../icons/seta.png'
import type { BtnSidebarProps } from './BtnSidebar.types';

export default function BtnSidebar({setter, statusSidebar}: BtnSidebarProps){

    // FUNCAO QUE ALTERA O STATUS DE ABERTO E FECHADO DO SIDEBAR --------------------------------
    const clickBtn = () => {
        setter(ant => !ant);
    }
    // ------------------------------------------------------------------------------------------

    // COMPONENTE QUE FECHA O SIDEBAR -----------------------------------------------------------
    return(
        <button 
            id="btnSidebar"
            onClick={() => clickBtn()}
        >
            <img 
                id="iconBtnSidebar" 
                src={iconSeta} 
                alt="icone seta"
                style={{transform: `rotate(${statusSidebar ? '-180deg' : '0deg'})`}}
            />
        </button>
    )
    // ------------------------------------------------------------------------------------------
}