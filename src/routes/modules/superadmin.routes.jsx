import React, { Suspense } from "react";
import { ROUTES } from "../configs/routes.config";
import PageLoader from "../../components/PageLoader";

const SuperAdminTimeSheetApproval = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminTimeSheetApproval"));
const SuperAdminRequestTimeOff = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminRequestTimeOff"));
const SuperAdminProfile = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminProfile"));
const SuperAdminManageMyTeam = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminManageMyTeam"));
const SuperAdminOrgChart = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminOrgChart"));
const SuperAdminManageLeave = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminManageLeave"));
const SuperAdminGrowthPortfolio = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminGrowthPortfolio"));
const SuperAdminPersonalTimeSheet = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminPersonalTimeSheet"));
const SuperAdminDashboard = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminDashboard"));
const SuperAdminAdminCreation = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminAdminCreation"));
const SuperAdminAdminManagement = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminAdminManagement"));
const SuperAdminOrg = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminOrg"));
const SuperAdminPolicies = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminPolicies"));
const SuperAdminPayroll = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminPayroll"));
const SuperAdminApprovalFlow = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminApprovalFlow"));
const SuperAdminFeedback = React.lazy(() => import("../../features/SuperAdmin/pages/SuperAdminFeedback"));

const lazy = (Component) => (
      <Suspense fallback={<PageLoader />}>
            <Component />
      </Suspense>
);

export const superAdminRoutes = [
      { path: ROUTES.SUPERADMIN.TIMESHEETAPPROVAL, element: lazy(SuperAdminTimeSheetApproval) },
      { path: ROUTES.SUPERADMIN.REQUESTTIMEOFF, element: lazy(SuperAdminRequestTimeOff) },
      { path: ROUTES.SUPERADMIN.PROFILE, element: lazy(SuperAdminProfile) },
      { path: ROUTES.SUPERADMIN.MANAGEMYTEAM, element: lazy(SuperAdminManageMyTeam) },
      { path: ROUTES.SUPERADMIN.ORGCHART, element: lazy(SuperAdminOrgChart) },
      { path: ROUTES.SUPERADMIN.MANAGELEAVE, element: lazy(SuperAdminManageLeave) },
      { path: ROUTES.SUPERADMIN.GROWTHPORTFOLIO, element: lazy(SuperAdminGrowthPortfolio) },
      { path: ROUTES.SUPERADMIN.PERSONALTIMESHEET, element: lazy(SuperAdminPersonalTimeSheet) },
      { path: ROUTES.SUPERADMIN.DASHBOARD, element: lazy(SuperAdminDashboard) },
      { path: ROUTES.SUPERADMIN.ADMINCREATION, element: lazy(SuperAdminAdminCreation) },
      { path: ROUTES.SUPERADMIN.ADMINMANAGEMENT, element: lazy(SuperAdminAdminManagement) },
      { path: ROUTES.SUPERADMIN.ORG, element: lazy(SuperAdminOrg) },
      { path: ROUTES.SUPERADMIN.POLICIES, element: lazy(SuperAdminPolicies) },
      { path: ROUTES.SUPERADMIN.PAYROLL, element: lazy(SuperAdminPayroll) },
      { path: ROUTES.SUPERADMIN.APPROVALFLOW, element: lazy(SuperAdminApprovalFlow) },
      { path: ROUTES.SUPERADMIN.FEEDBACK, element: lazy(SuperAdminFeedback) },
];
