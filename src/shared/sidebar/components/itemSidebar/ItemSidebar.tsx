import '@/shared/sidebar/components/itemSidebar/itemSidebar.css'
import { useNavigate } from 'react-router';
import type { PropsItemSidebar } from '@/shared/sidebar/components/itemSidebar/itemSidebar.types'

export default function ItemSidebar({statusSidebar, icon, alt, title, selected, setter, path, setSidebar}: PropsItemSidebar){

    // INSTANCIA DE NAVEGACAO, CHAMAR A FUNCAO NAVIGATE AO CLICAR NO ITEM DO SIDEBAR --------------------
    const navigate = useNavigate();
    // --------------------------------------------------------------------------------------------------

    // FUNCAO DE SELECIONAR UM ITEM DO SIDEBAR ----------------------------------------------------------
    const handleSelected = () => {
        setter(title); //passa o nome do item pro setter, indicar o que está selecionado
        navigate(path); // navegar para o path do item
        setSidebar(false); //fechar o sidebar
    }
    // --------------------------------------------------------------------------------------------------

    // COMPONENTE ITEM SIDEBAR --------------------------------------------------------------------------
    return(
        <button 
            className={`itemSidebar ${statusSidebar ? 'itemSidebarOpen' : 'itemSidebarClosed'}`}
            style={{
                background: `${selected == title ? 'linear-gradient(to right, rgba(180, 220, 255, 0.43), rgba(180, 133, 224, 0.21))' : 'white'}`, 
                borderColor: `${selected == title ? 'rgb(166, 191, 228)' : 'rgba(173, 173, 173, 0.247)'}`}}
            onClick={() => handleSelected()}
        >
            <img className="iconItemSidebar" src={icon} alt={alt} />

            {statusSidebar && (
                <p className="titleItemSidebar">{title}</p>
            )}
        </button>
    )
    // --------------------------------------------------------------------------------------------------
}