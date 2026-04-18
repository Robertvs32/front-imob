import './global.css'
import Login from '@/features/auth/components/Login/Login'
import { useContext, useState } from 'react'
import { AuthContext } from '@/features/auth/contexts/AuthContext'
import type { ContextData } from './features/auth/types/Auth.types';
import Sidebar from '@/shared/sidebar/Sidebar'
import { Outlet } from 'react-router';
import BtnSidebar from '@/shared/sidebar/components/btnSidebar/BtnSidebar';
import Loader from '@/shared/loader/Loader';

function App() {

  const { objUser, loading } = useContext(AuthContext) as ContextData;
  const [statusSidebar, setStatusSidebar] = useState(false);

  console.log(objUser)

  if(loading){
    return <Loader/>
  }

  if(objUser){
    return(
      <div id="appContainer">

        {/* sidebar */}
        <Sidebar
          statusSidebar={statusSidebar}
          setStatusSidebar={setStatusSidebar}
        />

        {/* botao de abrir / fechar sidebar */}
        <BtnSidebar
            setter={setStatusSidebar}
            statusSidebar={statusSidebar}
        />

        {/* container de funcionalidades - outlet */}
        <Outlet/>
        
      </div>
    )
  }
  
  return <Login/>

}

export default App
