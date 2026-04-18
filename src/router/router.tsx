import { createBrowserRouter } from "react-router";
import App from "@/App";
import Ranking from "@/features/Ranking/Ranking";
import Equipes from "@/features/Equipes/Equipes";
import Cadastro from "@/features/auth/components/Cadastro/Cadastro";
import AdminGuard from "@/shared/AdminGuard/AdminGuard";
import Usuarios from "@/features/Usuarios/Usuarios";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Ranking/>
            },
            {
                path: "/equipes",
                element: <Equipes/>
            },
            {
                path: "/cadastro",
                element: <AdminGuard><Cadastro/></AdminGuard>
            },
            {
                path: "/usuarios",
                element: <AdminGuard><Usuarios/></AdminGuard>
            }
        ]
    }
])

export default router