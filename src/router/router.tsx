import { createBrowserRouter } from "react-router";
import Login from "@/features/auth/components/Login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    }
])

export default router