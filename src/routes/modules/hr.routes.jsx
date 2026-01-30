import { ROUTES } from "../configs/routes.config";
// import LoginPage from "../../features/Auth/pages/LoginPage";
import HrDashboard from "../../features/Hr/pages/HrDashboard";
import HrClockMyTime from "../../features/Hr/pages/HrClockMyTime";
import HrInsurance from "../../features/Hr/pages/HrInsurance";
import HrNotification from "../../features/Hr/pages/HrNotification";
import HrOnboarding from "../../features/Hr/pages/HrOnboarding";
import HrPayslips from "../../features/Hr/pages/HrPayslips";
import HrPolicyAndInsuranceCreation from "../../features/Hr/pages/HrPolicyAndInsuranceCreation";
import HrPolicyDocuments from "../../features/Hr/pages/HrPolicyDocuments";
import HrRequestTimeOff from "../../features/Hr/pages/HrRequestTimeOff";
import HrSalaryCreation from "../../features/Hr/pages/HrSalaryCreation";
import HrTimeSheet from "../../features/Hr/pages/HrTimeSheet";

import HrOrgChart from "../../features/Hr/pages/HrOrgChart";
import HrOffBoarding from "../../features/Hr/pages/HrOffBoarding";


import { elements } from "chart.js";
const hrRoutes = [
 
   {
        path: ROUTES.HR.DASHBOARD,
        element: <HrDashboard />,
    },
    {
        path:ROUTES.HR.CLOCKMYTIME,
        element: <HrClockMyTime/>
    },
    {
        path:ROUTES.HR.INSURANCE,
        element: <HrInsurance />
    },
    {
        path:ROUTES.HR.NOTIFICATION,
        element: < HrNotification/>
    },
    {
        path:ROUTES.HR.ONBOARDING,
        element: <HrOnboarding />
    },
    {
        path:ROUTES.HR.PAYSLIPS,
        element: < HrPayslips />
    },
    {
        path:ROUTES.HR.POLICYANDINSURANCECREATION,
        element: < HrPolicyAndInsuranceCreation />
    },
    {
        path:ROUTES.HR.POLICYDOCUMENTS,
        element: < HrPolicyDocuments/>
    },
    {
        path:ROUTES.HR.REQUESTTIMEOFF,
        element: < HrRequestTimeOff/>
    },
    {
        path:ROUTES.HR.SALARYCREATION,
        element: < HrSalaryCreation/>
    },
    {
        path:ROUTES.HR.TIMESHEET,
        element: < HrTimeSheet/>
    },
    {
        path:ROUTES.HR.ORGCHART,
        element: < HrOrgChart/>
    },
    {
        path:ROUTES.HR.OFFBOARDING,
        element: < HrOffBoarding/>
    }
];

export default hrRoutes;
