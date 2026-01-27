// // import { ROUTES } from "../configs/routes.config";
// // import EmployeeClockMyTime from "../../features/Employee/pages/EmployeeClockMyTime";



// // export const employeeRoutes = [
// //      {
// //     path: ROUTES.EMPLOYEE.CLOCKMYTIME,
// //     element: <EmployeeClockMyTime />,
// //     },
//     // {
//     // path: ROUTES.EMPLOYEE.REQUESTTIMEOFF,
//     // element: <EmployeeRequestTimeOff />,
//     // }



// // ];

// // ROUTES.EMPLOYEE.CLOCKMYTIME,
// //     ROUTES.EMPLOYEE.REQUESTTIMEOFF,
// //     ROUTES.EMPLOYEE.PROFILE,
// //     ROUTES.EMPLOYEE.ORGCHART,
// //     ROUTES.EMPLOYEE.GROWTHPORTFOLIO,
// //     ROUTES.EMPLOYEE.FEEDBACK,
// //     ROUTES.EMPLOYEE.LEARNING,
// //     ROUTES.EMPLOYEE.PAYSLIPS,
// //     ROUTES.EMPLOYEE.TIMESHEET


// import EmployeeClockMyTime from "../../features/Employee/pages/EmployeeClockMyTime";
// import EmployeeRequestTimeOff from "../../features/Employee/pages/EmployeeRequestTimeOff";
// import EmployeeProfile from "../../features/Employee/pages/EmployeeProfile";
// import EmployeeOrgChart from "../../features/Employee/pages/EmployeeOrgChart";
// import EmployeeGrowthPortfolio from "../../features/Employee/pages/EmployeeGrowthPortfolio";
// import EmployeeFeedback from "../../features/Employee/pages/EmployeeFeedback";
// import EmployeeLearning from "../../features/Employee/pages/EmployeeLearning";
// import EmployeePayslips from "../../features/Employee/pages/EmployeePayslips";
// import EmployeeTimesheet from "../../features/Employee/pages/EmployeeTimesheet";

// export const employeeRoutes = [
//   { path: "clockmytime", element: <EmployeeClockMyTime /> },
//   { path: "requesttimeoff", element: <EmployeeRequestTimeOff /> },
//   { path: "profile", element: <EmployeeProfile /> },
//   { path: "orgchart", element: <EmployeeOrgChart /> },
//   { path: "growthportfolio", element: <EmployeeGrowthPortfolio /> },
//   { path: "feedback", element: <EmployeeFeedback /> },
//   { path: "learning", element: <EmployeeLearning /> },
//   { path: "payslips", element: <EmployeePayslips /> },
//   { path: "timesheet", element: <EmployeeTimesheet /> },
// ];


import EmployeeClockMyTime from "../../features/Employee/pages/EmployeeClockMyTime";
import EmployeeRequestTimeOff from "../../features/Employee/pages/EmployeeRequestTimeOff";
import EmployeeViewMyProfile from "../../features/Employee/pages/EmployeeViewMyProfile";
import EmployeeViewOrgChart from "../../features/Employee/pages/EmployeeViewOrgChart";
import EmployeeGrowthPortfolio from "../../features/Employee/pages/EmployeeGrowthPortfolio";
import EmployeeFeedBack from "../../features/Employee/pages/EmployeeFeedBack";
import EmployeeLearning from "../../features/Employee/pages/EmployeeLearning";
import EmployeePaySlips from "../../features/Employee/pages/EmployeePaySlips";
import EmployeeTimeSheet from "../../features/Employee/pages/EmployeeTimeSheet";
import EmployeeDashboard from "../../features/Employee/pages/EmployeeDashboard";
import EmployeeNotification from "../../features/Employee/pages/EmployeeNotification";
import EmployeePolicyDocuments from "../../features/Employee/pages/EmployeePolicyDocuments";



export const employeeRoutes = [
  { path: "clockmytime", element: <EmployeeClockMyTime /> },
  { path: "requesttimeoff", element: <EmployeeRequestTimeOff /> },
  { path: "profile", element: <EmployeeViewMyProfile /> },
  { path: "orgchart", element: <EmployeeViewOrgChart /> },
  { path: "growthportfolio", element: <EmployeeGrowthPortfolio /> },
  { path: "feedback", element: <EmployeeFeedBack /> },
  { path: "learning", element: <EmployeeLearning /> },
  { path: "payslips", element: <EmployeePaySlips /> },
  { path: "timesheet", element: <EmployeeTimeSheet /> },
   { path: "dashboard", element: <EmployeeDashboard /> },
  { path: "notification", element: <EmployeeNotification /> },
  { path: "policydocuments", element: <EmployeePolicyDocuments /> },





];

