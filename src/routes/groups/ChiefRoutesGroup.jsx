import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ChiefLayout from "../../layouts/ChiefLayout";
import { chiefRoutes } from "../modules/chief.routes";
import { store } from "../../app/store";
import chiefRootReducer from "../../features/Chief/Redux/chiefRootReducer";
import PageLoader from "../../components/PageLoader";

export default function ChiefRoutesGroup() {
    const [isLoaded, setIsLoaded] = React.useState(false);

    useEffect(() => {
        store.reducerManager.add("chief", chiefRootReducer);
        console.log("Chief Reducer Dynamic Injection: SUCCESS");
        setIsLoaded(true);
    }, []);

    if (!isLoaded) return <PageLoader />;

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
