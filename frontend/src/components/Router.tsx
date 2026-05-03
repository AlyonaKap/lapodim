import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import MainRouter from "@/routers/MainRouter";
import AppSuspense from "@/components/AppSuspense";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const router = createBrowserRouter([
    {
        path: "",
        element: <AppSuspense />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            MainRouter,
            {
                path: "*",
                element: <Navigate to="/" replace />,
            },
        ],
    },
]);

export default function Router() {
    return (
        <RouterProvider router={router} />
    );
}
