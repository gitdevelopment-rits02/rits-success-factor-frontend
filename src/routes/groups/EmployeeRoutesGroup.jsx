import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeLayout from "../../layouts/employeeLayout";
import { employeeRoutes } from "../modules/employee.routes";
import { store } from "../../app/store";
import employeeRootReducer from "../../features/Employee/Redux/employeeRootReducer";
import PageLoader from "../../components/PageLoader";

export default function EmployeeRoutesGroup() {
    const [isLoaded, setIsLoaded] = React.useState(false);

    useEffect(() => {
        store.reducerManager.add("employee", employeeRootReducer);
        console.log("Employee Reducer Dynamic Injection: SUCCESS");
        setIsLoaded(true);
    }, []);

    if (!isLoaded) return <PageLoader />;

    return (
        <Routes>
            <Route element={<EmployeeLayout />}>
                {employeeRoutes.map((r) => (
                    <Route
                        key={r.path}
                        path={r.path.replace("/employee/", "")}
                        element={r.element}
                    />
                ))}
            </Route>
        </Routes>
    );
}
