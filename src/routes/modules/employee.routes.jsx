import React, { Suspense } from "react";
import PageLoader from "../../components/PageLoader";

const EmployeeClockMyTime = React.lazy(() => import("../../features/Employee/pages/EmployeeClockMyTime"));
const EmployeeRequestTimeOff = React.lazy(() => import("../../features/Employee/pages/EmployeeRequestTimeOff"));
const EmployeeViewMyProfile = React.lazy(() => import("../../features/Employee/pages/EmployeeViewMyProfile"));
const EmployeeViewOrgChart = React.lazy(() => import("../../features/Employee/pages/EmployeeViewOrgChart"));
const EmployeeGrowthPortfolio = React.lazy(() => import("../../features/Employee/pages/EmployeeGrowthPortfolio"));
const EmployeeInsurance = React.lazy(() => import("../../features/Employee/pages/EmployeeInsurance"));
const EmployeeLearning = React.lazy(() => import("../../features/Employee/pages/EmployeeLearning"));
const EmployeePaySlips = React.lazy(() => import("../../features/Employee/pages/EmployeePaySlips"));
const EmployeeTimeSheet = React.lazy(() => import("../../features/Employee/pages/EmployeeTimeSheet"));
const EmployeeDashboard = React.lazy(() => import("../../features/Employee/pages/EmployeeDashboard"));
const EmployeeNotification = React.lazy(() => import("../../features/Employee/pages/EmployeeNotification"));
const EmployeePolicyDocuments = React.lazy(() => import("../../features/Employee/pages/EmployeePolicyDocuments"));

const lazy = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const employeeRoutes = [
  { path: "clockmytime", element: lazy(EmployeeClockMyTime) },
  { path: "requesttimeoff", element: lazy(EmployeeRequestTimeOff) },
  { path: "profile", element: lazy(EmployeeViewMyProfile) },
  { path: "orgchart", element: lazy(EmployeeViewOrgChart) },
  { path: "growthportfolio", element: lazy(EmployeeGrowthPortfolio) },
  { path: "insurance", element: lazy(EmployeeInsurance) },
  { path: "learning", element: lazy(EmployeeLearning) },
  { path: "payslips", element: lazy(EmployeePaySlips) },
  { path: "timesheet", element: lazy(EmployeeTimeSheet) },
  { path: "dashboard", element: lazy(EmployeeDashboard) },
  { path: "notification", element: lazy(EmployeeNotification) },
  { path: "policydocuments", element: lazy(EmployeePolicyDocuments) },
];
