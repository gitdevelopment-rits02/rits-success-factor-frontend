import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HrLayout from "../../layouts/hrLayout";
import hrRoutes from "../modules/hr.routes";
import { store } from "../../app/store";
import hrRootReducer from "../../features/Hr/Redux/hrRootReducer";
import PageLoader from "../../components/PageLoader";

export default function HrRoutesGroup() {
    const [isLoaded, setIsLoaded] = React.useState(false);

    useEffect(() => {
        store.reducerManager.add("hr", hrRootReducer);
        console.log("HR Reducer Dynamic Injection: SUCCESS");
        setIsLoaded(true);
    }, []);

    if (!isLoaded) return <PageLoader />;

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
