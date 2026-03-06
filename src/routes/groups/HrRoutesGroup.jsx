import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HrLayout from "../../layouts/hrLayout";
import hrRoutes from "../modules/hr.routes";
import { store } from "../../app/store";
import hrRootReducer from "../../features/Hr/Redux/hrRootReducer";

export default function HrRoutesGroup() {
    // Dynamically add the HR reducer to the store only when this component loads
    useEffect(() => {
        store.reducerManager.add("hr", hrRootReducer);
        console.log("HR Reducer Dynamic Injection: SUCCESS");
    }, []);

    return (
        <Routes>
            <Route element={<HrLayout />}>
                {hrRoutes.map((r) => (
                    <Route
                        key={r.path}
                        path={r.path.replace("/hr/", "")}
                        element={r.element}
                    />
                ))}
            </Route>
        </Routes>
    );
}
