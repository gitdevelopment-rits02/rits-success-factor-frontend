import React, { Suspense } from "react";
import { ROUTES } from "../configs/routes.config";
import PageLoader from "../../components/PageLoader";

const HrDashboard = React.lazy(() => import("../../features/Hr/pages/HrDashboard"));
const HrClockMyTime = React.lazy(() => import("../../features/Hr/pages/HrClockMyTime"));
const HrInsurance = React.lazy(() => import("../../features/Hr/pages/HrInsurance"));
const HrNotification = React.lazy(() => import("../../features/Hr/pages/HrNotification"));
const HrOnboarding = React.lazy(() => import("../../features/Hr/pages/HrOnboarding"));
const HrPayslips = React.lazy(() => import("../../features/Hr/pages/HrPayslips"));
const HrPolicyAndInsuranceCreation = React.lazy(() => import("../../features/Hr/pages/HrPolicyAndInsuranceCreation"));
const HrPolicyDocuments = React.lazy(() => import("../../features/Hr/pages/HrPolicyDocuments"));
const HrRequestTimeOff = React.lazy(() => import("../../features/Hr/pages/HrRequestTimeOff"));
const HrSalaryCreation = React.lazy(() => import("../../features/Hr/pages/HrSalaryCreation"));
const HrTimeSheet = React.lazy(() => import("../../features/Hr/pages/HrTimeSheet"));
const HrOrgChart = React.lazy(() => import("../../features/Hr/pages/HrOrgChart"));
const HrOffBoarding = React.lazy(() => import("../../features/Hr/pages/HrOffBoarding"));
const HrLeaveApproval = React.lazy(() => import("../../features/Hr/pages/HrLeaveApproval"));
const HrAnnouncements = React.lazy(() => import("../../features/Hr/pages/HrAnnouncements"));
const HrCalender = React.lazy(() => import("../../features/Hr/pages/HrCalender"));
const HrSalStatus = React.lazy(() => import("../../features/Hr/pages/HrSalStatus"));
const HrOurOrganization = React.lazy(() => import("../../features/Hr/pages/HrOurOrganization"));

const lazy = (Component) => (
    <Suspense fallback={<PageLoader />}>
        <Component />
    </Suspense>
);

const hrRoutes = [
    { path: ROUTES.HR.DASHBOARD, element: lazy(HrDashboard) },
    { path: ROUTES.HR.LEAVEAPPROVAL, element: lazy(HrLeaveApproval) },
    { path: ROUTES.HR.CLOCKMYTIME, element: lazy(HrClockMyTime) },
    { path: ROUTES.HR.INSURANCE, element: lazy(HrInsurance) },
    { path: ROUTES.HR.NOTIFICATION, element: lazy(HrNotification) },
    { path: ROUTES.HR.ONBOARDING, element: lazy(HrOnboarding) },
    { path: ROUTES.HR.PAYSLIPS, element: lazy(HrPayslips) },
    { path: ROUTES.HR.POLICYANDINSURANCECREATION, element: lazy(HrPolicyAndInsuranceCreation) },
    { path: ROUTES.HR.POLICYDOCUMENTS, element: lazy(HrPolicyDocuments) },
    { path: ROUTES.HR.REQUESTTIMEOFF, element: lazy(HrRequestTimeOff) },
    { path: ROUTES.HR.SALARYCREATION, element: lazy(HrSalaryCreation) },
    { path: ROUTES.HR.TIMESHEET, element: lazy(HrTimeSheet) },
    { path: ROUTES.HR.ORGCHART, element: lazy(HrOrgChart) },
    { path: ROUTES.HR.OFFBOARDING, element: lazy(HrOffBoarding) },
    { path: ROUTES.HR.ANNOUNCEMENT, element: lazy(HrAnnouncements) },
    { path: ROUTES.HR.HRCALENDER, element: lazy(HrCalender) },
    { path: ROUTES.HR.SALARYSTATUS, element: lazy(HrSalStatus) },
    { path: ROUTES.HR.OURORGANIZATION, element: lazy(HrOurOrganization) },
];

export default hrRoutes;
