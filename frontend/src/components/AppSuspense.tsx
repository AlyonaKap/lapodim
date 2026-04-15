import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function AppSuspense() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
        </Suspense>
    );
}