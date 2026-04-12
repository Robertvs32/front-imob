import './global.css'
import Login from '@/features/auth/components/Login/Login'
import { useContext } from 'react'
import { AuthContext } from '@/features/auth/contexts/AuthContext'
import type { ContextData } from './features/auth/types/Auth.types';

function App() {

  const { objUser, loading } = useContext(AuthContext) as ContextData;

  console.log(objUser)
  console.log("ola")

  if(loading){
    return <h1>Carregando!</h1>
  }

  if(objUser){
    return <h1>Logado!</h1>
  }
  
  return <Login/>

}

export default App
