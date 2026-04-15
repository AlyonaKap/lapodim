import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import MainRouter from "@/routers/MainRouter";
import AppSuspense from "@/components/AppSuspense";

const router = createBrowserRouter([
    {
        path: "",
        element: <AppSuspense />,
        children: [
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