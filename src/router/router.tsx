import { createBrowserRouter } from "react-router";
import App from "@/App";
import Ranking from "@/features/Ranking/Ranking";
import Equipes from "@/features/Equipes/Equipes";

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
            }
        ]
    }
])

export default router