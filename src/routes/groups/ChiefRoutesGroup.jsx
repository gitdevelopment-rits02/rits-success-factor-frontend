import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ChiefLayout from "../../layouts/ChiefLayout";
import { chiefRoutes } from "../modules/chief.routes";
import { store } from "../../app/store";
import chiefRootReducer from "../../features/Chief/Redux/chiefRootReducer";

export default function ChiefRoutesGroup() {
    useEffect(() => {
        store.reducerManager.add("chief", chiefRootReducer);
        console.log("Chief Reducer Dynamic Injection: SUCCESS");
    }, []);

    return (
        <Routes>
            <Route element={<ChiefLayout />}>
                {chiefRoutes.map((r) => (
                    <Route
                        key={r.path}
                        path={r.path.replace("/chief/", "")}
                        element={r.element}
                    />
                ))}
            </Route>
        </Routes>
    );
}
