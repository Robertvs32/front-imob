import type { ReactNode } from "react";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/contexts/AuthContext";
import type { ContextData } from "@/features/auth/types/Auth.types";
import { useNavigate } from "react-router";

export default function AdminGuard({children}: {children: ReactNode}): ReactNode | null{

    const navigate = useNavigate();

    const { objUser } = useContext(AuthContext) as ContextData;

    if(objUser == null){
        return null;
    }

    if(objUser.id_role == 1 || objUser.id_role == 2){
        return <>{children}</>
    }

    navigate('/')
    return null;

}