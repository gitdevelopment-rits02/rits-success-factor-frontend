import { ROUTES } from "../configs/routes.config";
import SuperAdminTimeSheetApproval from "../../features/SuperAdmin/pages/SuperAdminTimeSheetApproval";
import SuperAdminRequestTimeOff from "../../features/SuperAdmin/pages/SuperAdminRequestTimeOff";
import SuperAdminProfile from "../../features/SuperAdmin/pages/SuperAdminProfile";
import SuperAdminManageMyTeam from "../../features/SuperAdmin/pages/SuperAdminManageMyTeam";
import SuperAdminOrgChart from "../../features/SuperAdmin/pages/SuperAdminOrgChart";
import SuperAdminManageLeave from "../../features/SuperAdmin/pages/SuperAdminManageLeave";
import SuperAdminGrowthPortfolio from "../../features/SuperAdmin/pages/SuperAdminGrowthPortfolio";
import SuperAdminPersonalTimeSheet from "../../features/SuperAdmin/pages/SuperAdminPersonalTimeSheet";


export const superAdminRoutes = [
     { path: ROUTES.SUPERADMIN.TIMESHEETAPPROVAL, element: <SuperAdminTimeSheetApproval /> },
     { path: ROUTES.SUPERADMIN.REQUESTTIMEOFF, element: <SuperAdminRequestTimeOff /> },
     { path: ROUTES.SUPERADMIN.PROFILE, element: <SuperAdminProfile /> },
     { path: ROUTES.SUPERADMIN.MANAGEMYTEAM, element: <SuperAdminManageMyTeam /> },
     { path: ROUTES.SUPERADMIN.ORGCHART, element: <SuperAdminOrgChart /> },
     { path: ROUTES.SUPERADMIN.MANAGELEAVE, element: <SuperAdminManageLeave /> },
     { path: ROUTES.SUPERADMIN.GROWTHPORTFOLIO, element: <SuperAdminGrowthPortfolio /> },
     {path: ROUTES.SUPERADMIN.PERSONALTIMESHEET,element: <SuperAdminPersonalTimeSheet /> },

     
];


