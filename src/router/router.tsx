import { createBrowserRouter } from "react-router";
import App from "@/App";
import Ranking from "@/pages/Ranking/Ranking";
import Equipes from "@/pages/Equipes/Equipes";
import Cadastro from "@/pages/Cadastro/Cadastro";
import AdminGuard from "@/shared/AdminGuard/AdminGuard";
import DadosUsersMin from "@/features/Usuarios/components/DadosUsersMin/DadosUsersMin";

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
                element: <AdminGuard><DadosUsersMin/></AdminGuard>
            },
            {
                path: "/dadosusuario/:id_usuario",
                element: <AdminGuard><h1>Yamete</h1></AdminGuard>
            }
        ]
    }
])

export default router