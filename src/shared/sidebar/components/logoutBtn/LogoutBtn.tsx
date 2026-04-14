import './logoutBtn.css'
import { useNavigate } from 'react-router';

export default function LogoutBtn({statusSidebar, icon, alt, title, selected, setter, path, setSidebar}){

    const handleSelected = () => {
        setter(title);
        navigate(path);
        setSidebar(false);
    }

    return(
        <button 
            className={`itemSidebar ${statusSidebar ? 'itemSidebarOpen' : 'itemSidebarClosed'}`}
            style={{
                backgroundColor: `${selected == title ? 'rgb(196, 227, 255)' : 'white'}`, 
                borderColor: `${selected == title ? 'rgb(166, 191, 228)' : 'rgba(173, 173, 173, 0.247)'}`}}
            onClick={() => handleSelected()}
        >
            <img className="iconItemSidebar" src={icon} alt={alt} />

            {statusSidebar && (
                <p className="titleLogout">Sair</p>
            )}
        </button>
    )
}