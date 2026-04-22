import Main from "@/pages/Main";
import type { RouteObject } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import AboutUs from "@/pages/AboutUs";
import PetCatalog from "@/pages/PetCatalog";
import AnimalDetails from "@/pages/AnimalDetails";

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
    {
      path: "pet-catalog",
      element: <PetCatalog />,
    },
    {
      path: "pet-catalog/:animalId",
      element: <AnimalDetails />,
    },
  ],
};

export default MainRouter;
