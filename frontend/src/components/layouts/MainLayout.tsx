import { Outlet } from "react-router-dom";
import { Header } from "@/components/ui/Header";

export default function MainLayout() {
    return (
        <main className="w-full min-h-screen flex flex-col overflow-x-hidden">
            <Header />
            <div className="flex flex-col flex-1 bg-background-light">
                <Outlet />
            </div>
        </main>
    );
}