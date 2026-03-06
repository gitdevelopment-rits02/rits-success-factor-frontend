import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../layouts/adminLayout";
import { superAdminRoutes } from "../modules/superadmin.routes";
import { store } from "../../app/store";
import superAdminRootReducer from "../../features/SuperAdmin/Redux/superadminRootReducer";

export default function SuperAdminRoutesGroup() {
    useEffect(() => {
        store.reducerManager.add("superAdmin", superAdminRootReducer);
        console.log("SuperAdmin Reducer Dynamic Injection: SUCCESS");
    }, []);

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
