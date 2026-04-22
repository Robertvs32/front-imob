import { useContext } from "react"
import { AuthContext } from "@/features/auth/contexts/AuthContext"
import type { ContextData } from "@/features/auth/types/Auth.types"
import "@/features/auth/components/LogoutBtn/logoutBtn.css"

export default function logoutBtn(){

    const { logout } = useContext(AuthContext) as ContextData 

    return(
        <div 
            className="logoutBtn"
            onClick={async () => await logout()}
        >
            Sair
        </div>
    )
}