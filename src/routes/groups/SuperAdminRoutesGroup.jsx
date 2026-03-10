import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../layouts/adminLayout";
import { superAdminRoutes } from "../modules/superadmin.routes";
import { store } from "../../app/store";
import superAdminRootReducer from "../../features/SuperAdmin/Redux/superadminRootReducer";
import PageLoader from "../../components/PageLoader";

export default function SuperAdminRoutesGroup() {
    const [isLoaded, setIsLoaded] = React.useState(false);

    useEffect(() => {
        store.reducerManager.add("superAdmin", superAdminRootReducer);
        // console.log("SuperAdmin Reducer Dynamic Injection: SUCCESS");
        setIsLoaded(true);
    }, []);

    if (!isLoaded) return <PageLoader />;

    return (
        <Routes>
            <Route element={<AdminLayout />}>
                {superAdminRoutes.map((r) => (
                    <Route
                        key={r.path}
                        path={r.path.replace("/superadmin/", "")}
                        element={r.element}
                    />
                ))}
            </Route>
        </Routes>
    );
}
