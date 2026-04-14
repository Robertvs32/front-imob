import './headerSidebar.css'

export default function HeaderSidebar({statusSidebar}: {statusSidebar: boolean}){

    // HEADER DO SIDEBAR -------------------------------------------------------------------------
    return(
        <div
            className={`headerSidebar ${statusSidebar ? 'headerSidebarOpen' : 'headerSidebarClosed'}`}
        >
            <div id="logoSidebar">HuB</div>

            {statusSidebar && (
                <div>
                    <h1 id="titleSidebar">Hub Imoveis</h1>
                    <p id="subtitleSidebar">Painel administrativo</p>
                </div>
            )}
            
        </div>
    )
    // --------------------------------------------------------------------------------------------
}