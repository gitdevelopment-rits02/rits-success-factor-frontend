
import { ROUTES } from "../configs/routes.config";
import ChiefTimeSheetApproval from "../../features/Chief/pages/ChiefTimeSheetApproval";
import ChiefRequestTimeOff from "../../features/Chief/pages/ChiefRequestTimeOff";
import ChiefProfile from "../../features/Chief/pages/ChiefProfile";
import ChiefManageMyTeam from "../../features/Chief/pages/ChiefManageMyTeam";
import ChiefOrgChart from "../../features/Chief/pages/ChiefOrgChart";
import ChiefManageLeave from "../../features/Chief/pages/ChiefManageLeave";
import ChiefGrowthPortfolio from "../../features/Chief/pages/ChiefGrowthPortfolio";
import ChiefPersonalTimeSheet from "../../features/Chief/pages/ChiefPersonalTimeSheet";
import ChiefDashboard from "../../features/Chief/pages/ChiefDashboard";
import ChiefAdminCreation from "../../features/Chief/pages/ChiefAdminCreation";
import ChiefAdminManagement from "../../features/Chief/pages/ChiefAdminManagement";
import ChiefOrg from "../../features/Chief/pages/ChiefOrg";
import ChiefPolicies from "../../features/Chief/pages/ChiefPolicies";
import ChiefPayroll from "../../features/Chief/pages/ChiefPayroll";
import ChiefApprovalFlow from "../../features/Chief/pages/ChiefApprovalFlow";
import ChiefFeedback from "../../features/Chief/pages/ChiefFeedback";
import ChiefWorkforceWithHRAnalytics from "../../features/Chief/pages/ChiefWorkforceWithHRAnalytics";
import ChiefSystemDashboard from "../../features/Chief/pages/ChiefSystemDashboard";

export const chiefRoutes = [
    { path: ROUTES.CHIEF.TIMESHEETAPPROVAL, element: <ChiefTimeSheetApproval /> },
    { path: ROUTES.CHIEF.REQUESTTIMEOFF, element: <ChiefRequestTimeOff /> },
    { path: ROUTES.CHIEF.PROFILE, element: <ChiefProfile /> },
    { path: ROUTES.CHIEF.MANAGEMYTEAM, element: <ChiefManageMyTeam /> },
    { path: ROUTES.CHIEF.ORGCHART, element: <ChiefOrgChart /> },
    { path: ROUTES.CHIEF.MANAGELEAVE, element: <ChiefManageLeave /> },
    { path: ROUTES.CHIEF.GROWTHPORTFOLIO, element: <ChiefGrowthPortfolio /> },
    { path: ROUTES.CHIEF.PERSONALTIMESHEET, element: <ChiefPersonalTimeSheet /> },
    { path: ROUTES.CHIEF.DASHBOARD, element: <ChiefDashboard /> },
    { path: ROUTES.CHIEF.ADMINCREATION, element: <ChiefAdminCreation /> },
    { path: ROUTES.CHIEF.ADMINMANAGEMENT, element: <ChiefAdminManagement /> },
    { path: ROUTES.CHIEF.ORG, element: <ChiefOrg /> },
    { path: ROUTES.CHIEF.POLICIES, element: <ChiefPolicies /> },
    { path: ROUTES.CHIEF.PAYROLL, element: <ChiefPayroll /> },
    { path: ROUTES.CHIEF.APPROVALFLOW, element: <ChiefApprovalFlow /> },
    { path: ROUTES.CHIEF.FEEDBACK, element: <ChiefFeedback /> },
    { path: ROUTES.CHIEF.WORKFORCEWITHHRANALYTICS, element: <ChiefWorkforceWithHRAnalytics /> },
    { path: ROUTES.CHIEF.SYSTEMDASHBOARD, element: <ChiefSystemDashboard /> },
];
