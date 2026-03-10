import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ManagerLayout from "../../layouts/managerLayout";
import { managerRoutes } from "../modules/manager.routes";
import { store } from "../../app/store";
import managerRootReducer from "../../features/Manager/Redux/managerRootReducer";
import PageLoader from "../../components/PageLoader";

export default function ManagerRoutesGroup() {
    const [isLoaded, setIsLoaded] = React.useState(false);

    useEffect(() => {
        store.reducerManager.add("manager", managerRootReducer);
        // console.log("Manager Reducer Dynamic Injection: SUCCESS");
        setIsLoaded(true);
    }, []);

    if (!isLoaded) return <PageLoader />;

    return (
        <Routes>
            <Route element={<ManagerLayout />}>
                {managerRoutes.map((r) => (
                    <Route
                        key={r.path}
                        path={r.path.replace("/manager/", "")}
                        element={r.element}
                    />
                ))}
            </Route>
        </Routes>
    );
}
