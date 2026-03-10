import React, { Suspense } from "react";
import { ROUTES } from "../configs/routes.config";
import PageLoader from "../../components/PageLoader";

const ChiefTimeSheetApproval = React.lazy(() => import("../../features/Chief/pages/ChiefTimeSheetApproval"));
const ChiefRequestTimeOff = React.lazy(() => import("../../features/Chief/pages/ChiefRequestTimeOff"));
const ChiefProfile = React.lazy(() => import("../../features/Chief/pages/ChiefProfile"));
const ChiefManageMyTeam = React.lazy(() => import("../../features/Chief/pages/ChiefManageMyTeam"));
const ChiefOrgChart = React.lazy(() => import("../../features/Chief/pages/ChiefOrgChart"));
const ChiefManageLeave = React.lazy(() => import("../../features/Chief/pages/ChiefManageLeave"));
const ChiefGrowthPortfolio = React.lazy(() => import("../../features/Chief/pages/ChiefGrowthPortfolio"));
const ChiefPersonalTimeSheet = React.lazy(() => import("../../features/Chief/pages/ChiefPersonalTimeSheet"));
const ChiefDashboard = React.lazy(() => import("../../features/Chief/pages/ChiefDashboard"));
const ChiefAdminCreation = React.lazy(() => import("../../features/Chief/pages/ChiefAdminCreation"));
const ChiefAdminManagement = React.lazy(() => import("../../features/Chief/pages/ChiefAdminManagement"));
const ChiefOrg = React.lazy(() => import("../../features/Chief/pages/ChiefOrg"));
const ChiefPolicies = React.lazy(() => import("../../features/Chief/pages/ChiefPolicies"));
const ChiefPayroll = React.lazy(() => import("../../features/Chief/pages/ChiefPayroll"));
const ChiefApprovalFlow = React.lazy(() => import("../../features/Chief/pages/ChiefApprovalFlow"));
const ChiefFeedback = React.lazy(() => import("../../features/Chief/pages/ChiefFeedback"));
const ChiefWorkforceWithHRAnalytics = React.lazy(() => import("../../features/Chief/pages/ChiefWorkforceWithHRAnalytics"));
const ChiefSystemDashboard = React.lazy(() => import("../../features/Chief/pages/ChiefSystemDashboard"));

const lazy = (Component) => (
    <Suspense fallback={<PageLoader />}>
        <Component />
    </Suspense>
);

export const chiefRoutes = [
    { path: ROUTES.CHIEF.TIMESHEETAPPROVAL, element: lazy(ChiefTimeSheetApproval) },
    { path: ROUTES.CHIEF.REQUESTTIMEOFF, element: lazy(ChiefRequestTimeOff) },
    { path: ROUTES.CHIEF.PROFILE, element: lazy(ChiefProfile) },
    { path: ROUTES.CHIEF.MANAGEMYTEAM, element: lazy(ChiefManageMyTeam) },
    { path: ROUTES.CHIEF.ORGCHART, element: lazy(ChiefOrgChart) },
    { path: ROUTES.CHIEF.MANAGELEAVE, element: lazy(ChiefManageLeave) },
    { path: ROUTES.CHIEF.GROWTHPORTFOLIO, element: lazy(ChiefGrowthPortfolio) },
    { path: ROUTES.CHIEF.PERSONALTIMESHEET, element: lazy(ChiefPersonalTimeSheet) },
    { path: ROUTES.CHIEF.DASHBOARD, element: lazy(ChiefDashboard) },
    { path: ROUTES.CHIEF.ADMINCREATION, element: lazy(ChiefAdminCreation) },
    { path: ROUTES.CHIEF.ADMINMANAGEMENT, element: lazy(ChiefAdminManagement) },
    { path: ROUTES.CHIEF.ORG, element: lazy(ChiefOrg) },
    { path: ROUTES.CHIEF.POLICIES, element: lazy(ChiefPolicies) },
    { path: ROUTES.CHIEF.PAYROLL, element: lazy(ChiefPayroll) },
    { path: ROUTES.CHIEF.APPROVALFLOW, element: lazy(ChiefApprovalFlow) },
    { path: ROUTES.CHIEF.FEEDBACK, element: lazy(ChiefFeedback) },
    { path: ROUTES.CHIEF.WORKFORCEWITHHRANALYTICS, element: lazy(ChiefWorkforceWithHRAnalytics) },
    { path: ROUTES.CHIEF.SYSTEMDASHBOARD, element: lazy(ChiefSystemDashboard) },
];
