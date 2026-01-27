import { ROUTES } from "../configs/routes.config";
import ManagerClockMyTime from "../../features/Manager/pages/ManagerClockMyTime";
import ManagerRequestTimeOff from "../../features/Manager/pages/ManagerRequestTimeOff";
import ManagerOrgChart from "../../features/Manager/pages/ManagerOrgChart";
import ManagerInsurance from "../../features/Manager/pages/ManagerInsurance";
import ManagerLeaveApproval from "../../features/Manager/pages/ManagerLeaveApproval";
import ManagerNotification from "../../features/Manager/pages/ManagerNotification";
import ManagerDashboard from "../../features/Manager/pages/ManagerDashboard";
// import ManagerTimesheetReview from "../../features/Manager/pages/ManagerTimesheet";
import ManagerPayslips from "../../features/Manager/pages/ManagerPayslips";
import ManagerTimesheet from "../../features/Manager/pages/ManagerTimesheet";
import ManagerPolicyDocuments from "../../features/Manager/pages/ManagerPolicyDocuments";
import ManagerFeedBackOfEmployee from "../../features/Manager/pages/ManagerFeedBackOfEmployee";
import ManagerTaskAndProjectTracking from "../../features/Manager/pages/ManagerTaskAndProjectTracking";

import ManagerTimeSheetReview from "../../features/Manager/pages/ManagerTimeSheetReview";
import ManagerPerformanceReview from "../../features/Manager/pages/ManagerPerformanceReview";
import ManagerViewMyProfile from "../../features/Manager/pages/ManagerViewMyProfile";



// export const managerRoutes = [

//   { path: "clockmytime", element: <ManagerClockMyTime /> },
//   { path: "requesttimeoff", element: <ManagerRequestTimeOff /> },
//   { path: "profile", element: <ManagerViewMyProfile /> },
//   { path: "orgchart", element: <ManagerOrgChart /> },
//   { path: "insurance", element: <ManagerInsurance /> },
//   { path: "leaveapproval", element: <ManagerLeaveApproval /> },
//   { path: "payslips", element: <ManagerPayslips /> },
//   { path: "timesheet", element: <ManagerTimesheet /> },
//   { path: "dashboard", element: <ManagerDashboard /> },
//   { path: "notification", element: <ManagerNotification /> },
//   { path: "policydocuments", element: <ManagerPolicyDocuments /> },
//   { path: "feedback", element: <ManagerFeedBackOfEmployee /> },
//   { path: "performancereview", element: <ManagerPerformanceReview /> },
//   { path:"managertaskandprojecttracking",element: <ManagerTaskAndProjectTracking />},
  
    
// ];
export const managerRoutes = [
  { path: "clockmytime", element: <ManagerClockMyTime /> },
  { path: "dashboard", element: <ManagerDashboard /> },
  { path: "requesttimeoff", element: <ManagerRequestTimeOff /> },
  { path: "profile", element: <ManagerViewMyProfile /> },
  { path: "orgchart", element: <ManagerOrgChart /> },
  { path: "notification", element: <ManagerNotification /> },
  { path: "insurance", element: <ManagerInsurance /> },
  { path: "leaveapproval", element: <ManagerLeaveApproval /> },
  { path: "payslips", element: <ManagerPayslips /> },
  { path: "timesheet", element: <ManagerTimesheet /> },
  { path: "timesheetreview", element: <ManagerTimeSheetReview /> },
  { path: "policydocuments", element: <ManagerPolicyDocuments /> },
  { path: "feedback", element: <ManagerFeedBackOfEmployee /> },
  { path: "taskandproject", element: <ManagerTaskAndProjectTracking /> },
  { path: "performancereview", element: <ManagerPerformanceReview /> },
];
