import React, { Suspense } from "react";
import PageLoader from "../../components/PageLoader";

const ManagerClockMyTime = React.lazy(() => import("../../features/Manager/pages/ManagerClockMyTime"));
const ManagerDashboard = React.lazy(() => import("../../features/Manager/pages/ManagerDashboard"));
const ManagerRequestTimeOff = React.lazy(() => import("../../features/Manager/pages/ManagerRequestTimeOff"));
const ManagerViewMyProfile = React.lazy(() => import("../../features/Manager/pages/ManagerViewMyProfile"));
const ManagerOrgChart = React.lazy(() => import("../../features/Manager/pages/ManagerOrgChart"));
const ManagerNotification = React.lazy(() => import("../../features/Manager/pages/ManagerNotification"));
const ManagerInsurance = React.lazy(() => import("../../features/Manager/pages/ManagerInsurance"));
const ManagerLeaveApproval = React.lazy(() => import("../../features/Manager/pages/ManagerLeaveApproval"));
const ManagerPayslips = React.lazy(() => import("../../features/Manager/pages/ManagerPayslips"));
const ManagerTimesheet = React.lazy(() => import("../../features/Manager/pages/ManagerTimesheet"));
const ManagerTimeSheetReview = React.lazy(() => import("../../features/Manager/pages/ManagerTimeSheetReview"));
const ManagerPolicyDocuments = React.lazy(() => import("../../features/Manager/pages/ManagerPolicyDocuments"));
const ManagerFeedBackOfEmployee = React.lazy(() => import("../../features/Manager/pages/ManagerFeedBackOfEmployee"));
const ManagerTaskAndProjectTracking = React.lazy(() => import("../../features/Manager/pages/ManagerTaskAndProjectTracking"));
const ManagerPerformanceReview = React.lazy(() => import("../../features/Manager/pages/ManagerPerformanceReview"));
const ManagerTaskAssignment = React.lazy(() => import("../../features/Manager/pages/ManagerTaskAssignment"));

const lazy = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const managerRoutes = [
  { path: "clockmytime", element: lazy(ManagerClockMyTime) },
  { path: "dashboard", element: lazy(ManagerDashboard) },
  { path: "requesttimeoff", element: lazy(ManagerRequestTimeOff) },
  { path: "profile", element: lazy(ManagerViewMyProfile) },
  { path: "orgchart", element: lazy(ManagerOrgChart) },
  { path: "notification", element: lazy(ManagerNotification) },
  { path: "insurance", element: lazy(ManagerInsurance) },
  { path: "leaveapproval", element: lazy(ManagerLeaveApproval) },
  { path: "payslips", element: lazy(ManagerPayslips) },
  { path: "timesheet", element: lazy(ManagerTimesheet) },
  { path: "timesheetreview", element: lazy(ManagerTimeSheetReview) },
  { path: "policydocuments", element: lazy(ManagerPolicyDocuments) },
  { path: "feedback", element: lazy(ManagerFeedBackOfEmployee) },
  { path: "taskandproject", element: lazy(ManagerTaskAndProjectTracking) },
  { path: "performancereview", element: lazy(ManagerPerformanceReview) },
  { path: "taskassignment", element: lazy(ManagerTaskAssignment) },
];
