import Main from "@/pages/Main";
import type { RouteObject } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import AboutUs from "@/pages/AboutUs";

const MainRouter: RouteObject = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            index: true,
            element: <Main />,
        },
        {
            path: "about-us",
            element: <AboutUs />,
        },
    ]
};

export default MainRouter;