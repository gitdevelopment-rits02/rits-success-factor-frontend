import { combineReducers } from "@reduxjs/toolkit";

import chiefAdminCreationReducer from "./slices/ChiefAdminCreationSlice";
import chiefAdminManagementReducer from "./slices/ChiefAdminManagementSlice";
import chiefApprovalFlowReducer from "./slices/ChiefApprovalFlowSlice";
import chiefDashboardReducer from "./slices/ChiefDashboardSlice";
import chiefFeedbackReducer from "./slices/ChiefFeedbackSlice";
import chiefGrowthPortfolioReducer from "./slices/ChiefGrowthPortfolioSlice";
import chiefManageLeaveReducer from "./slices/ChiefManageLeaveSlice";
import chiefManageMyTeamReducer from "./slices/ChiefManageMyTeamSlice";
import chiefOrgReducer from "./slices/ChiefOrgSlice";
import chiefOrgChartReducer from "./slices/ChiefOrgChartSlice";
import chiefPayrollReducer from "./slices/ChiefPayrollSlice";
import chiefPersonalTimeSheetReducer from "./slices/ChiefPersonalTimeSheetSlice";
import chiefPoliciesReducer from "./slices/ChiefPoliciesSlice";
import chiefProfileReducer from "./slices/ChiefProfileSlice";
import chiefRequestTimeOffReducer from "./slices/ChiefRequestTimeOffSlice";
import chiefSystemDashboardReducer from "./slices/ChiefSystemDashboardSlice";
import chiefTimeSheetApprovalReducer from "./slices/ChiefTimeSheetApprovalSlice";
import chiefWorkforceWithHRAnalyticsReducer from "./slices/ChiefWorkforceWithHRAnalyticsSlice";

const chiefRootReducer = combineReducers({
    adminCreation: chiefAdminCreationReducer,
    adminManagement: chiefAdminManagementReducer,
    approvalFlow: chiefApprovalFlowReducer,
    dashboard: chiefDashboardReducer,
    feedback: chiefFeedbackReducer,
    growthPortfolio: chiefGrowthPortfolioReducer,
    manageLeave: chiefManageLeaveReducer,
    manageMyTeam: chiefManageMyTeamReducer,
    org: chiefOrgReducer,
    orgChart: chiefOrgChartReducer,
    payroll: chiefPayrollReducer,
    personalTimeSheet: chiefPersonalTimeSheetReducer,
    policies: chiefPoliciesReducer,
    profile: chiefProfileReducer,
    requestTimeOff: chiefRequestTimeOffReducer,
    systemDashboard: chiefSystemDashboardReducer,
    timeSheetApproval: chiefTimeSheetApprovalReducer,
    workforceAnalytics: chiefWorkforceWithHRAnalyticsReducer,
});

export default chiefRootReducer;
