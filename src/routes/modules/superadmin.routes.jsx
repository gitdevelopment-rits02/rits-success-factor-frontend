import { ROUTES } from "../configs/routes.config";
import SuperAdminTimeSheetApproval from "../../features/SuperAdmin/pages/SuperAdminTimeSheetApproval";
import SuperAdminRequestTimeOff from "../../features/SuperAdmin/pages/SuperAdminRequestTimeOff";
import SuperAdminProfile from "../../features/SuperAdmin/pages/SuperAdminProfile";
import SuperAdminManageMyTeam from "../../features/SuperAdmin/pages/SuperAdminManageMyTeam";
import SuperAdminOrgChart from "../../features/SuperAdmin/pages/SuperAdminOrgChart";
import SuperAdminManageLeave from "../../features/SuperAdmin/pages/SuperAdminManageLeave";
import SuperAdminGrowthPortfolio from "../../features/SuperAdmin/pages/SuperAdminGrowthPortfolio";
import SuperAdminPersonalTimeSheet from "../../features/SuperAdmin/pages/SuperAdminPersonalTimeSheet";
import SuperAdminDashboard from "../../features/SuperAdmin/pages/SuperAdminDashboard";
import SuperAdminAdminCreation from "../../features/SuperAdmin/pages/SuperAdminAdminCreation";
import SuperAdminAdminManagement from "../../features/SuperAdmin/pages/SuperAdminAdminManagement";
import SuperAdminOrg from "../../features/SuperAdmin/pages/SuperAdminOrg";
import SuperAdminPolicies from "../../features/SuperAdmin/pages/SuperAdminPolicies";

import SuperAdminPayroll from "../../features/SuperAdmin/pages/SuperAdminPayroll";

import SuperAdminApprovalFlow from "../../features/SuperAdmin/pages/SuperAdminApprovalFlow";
import SuperAdminFeedback from "../../features/SuperAdmin/pages/SuperAdminFeedback";

export const superAdminRoutes = [
     { path: ROUTES.SUPERADMIN.TIMESHEETAPPROVAL, element: <SuperAdminTimeSheetApproval /> },
     { path: ROUTES.SUPERADMIN.REQUESTTIMEOFF, element: <SuperAdminRequestTimeOff /> },
     { path: ROUTES.SUPERADMIN.PROFILE, element: <SuperAdminProfile /> },
     { path: ROUTES.SUPERADMIN.MANAGEMYTEAM, element: <SuperAdminManageMyTeam /> },
     { path: ROUTES.SUPERADMIN.ORGCHART, element: <SuperAdminOrgChart /> },
     { path: ROUTES.SUPERADMIN.MANAGELEAVE, element: <SuperAdminManageLeave /> },
     { path: ROUTES.SUPERADMIN.GROWTHPORTFOLIO, element: <SuperAdminGrowthPortfolio /> },
     {path: ROUTES.SUPERADMIN.PERSONALTIMESHEET,element: <SuperAdminPersonalTimeSheet /> },
     {path: ROUTES.SUPERADMIN.DASHBOARD,element: <SuperAdminDashboard /> },
     {path: ROUTES.SUPERADMIN.ADMINCREATION,element: <SuperAdminAdminCreation /> },
     {path: ROUTES.SUPERADMIN.ADMINMANAGEMENT,element: <SuperAdminAdminManagement /> },

     {path:ROUTES.SUPERADMIN.ORG,element: <SuperAdminOrg />},
      {path:ROUTES.SUPERADMIN.POLICIES,element: <SuperAdminPolicies />},
      {path:ROUTES.SUPERADMIN.PAYROLL,element: <SuperAdminPayroll />},
      {path:ROUTES.SUPERADMIN.APPROVALFLOW,element: <SuperAdminApprovalFlow />},
      {path:ROUTES.SUPERADMIN.FEEDBACK,element: <SuperAdminFeedback />}
     



     
];


