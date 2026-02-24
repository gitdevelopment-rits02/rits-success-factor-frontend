import { combineReducers } from "@reduxjs/toolkit";

import managerClockMyTimeReducer from "./slices/ManagerClockMyTimeSlice.js";
import managerDashboardReducer from "./slices/ManagerDashboardSlice.js";
import managerFeedBackOfEmployeeReducer from "./slices/ManagerFeedBackOfEmployeeSlice.js";
import managerInsuranceReducer from "./slices/ManagerInsuranceSlice.js";
import managerLeaveApprovalReducer from "./slices/ManagerLeaveApprovalSlice.js";
import managerNotificationReducer from "./slices/ManagerNotificationSlice.js";

import managerPayslipsReducer from "./slices/ManagerPayslipsSlice.js";
import managerPerformanceReviewReducer from "./slices/ManagerPerformanceReviewSlice.js";
import managerPolicyDocumentsReducer from "./slices/ManagerPolicyDocumentsSlice.js";
import managerRequestTimeOffReducer from "./slices/ManagerRequestTimeOffSlice.js";
import managerTaskAndProjectTrackingReducer from "./slices/ManagerTaskAndProjectTrackingSlice.js";
import managerTaskAssignmentReducer from "./slices/ManagerTaskAssignmentSlice.js";
import managerTimeSheetReviewReducer from "./slices/ManagerTimeSheetReviewSlice.js";
import managerTimesheetReducer from "./slices/ManagerTimesheetSlice.js";
import managerViewMyProfileReducer from "./slices/ManagerViewMyProfileSlice.js";
import managerOrgChartReducer from "./slices/ManagerOrgChartSlice.js";

const managerRootReducer = combineReducers({
    clockMyTime: managerClockMyTimeReducer,
    dashboard: managerDashboardReducer,
    feedBackOfEmployee: managerFeedBackOfEmployeeReducer,
    insurance: managerInsuranceReducer,
    leaveApproval: managerLeaveApprovalReducer,
    notification: managerNotificationReducer,

    payslips: managerPayslipsReducer,
    performanceReview: managerPerformanceReviewReducer,
    policyDocuments: managerPolicyDocumentsReducer,
    requestTimeOff: managerRequestTimeOffReducer,
    taskAndProjectTracking: managerTaskAndProjectTrackingReducer,
    taskAssignment: managerTaskAssignmentReducer,
    timeSheetReview: managerTimeSheetReviewReducer,
    timesheet: managerTimesheetReducer,
    viewMyProfile: managerViewMyProfileReducer,
    orgChart: managerOrgChartReducer,
});

export default managerRootReducer;
