import { combineReducers } from "@reduxjs/toolkit";

import superAdminDashboardReducer from "./slices/superAdminDashboardSlice";
import superAdminAdminManagementReducer from "./slices/superAdminAdminManagementSlice";
import superAdminFeedbackReducer from "./slices/superAdminFeedbackSlice";

import superAdminPayrollReducer from "./slices/superAdminPayrollSlice";
import superAdminPolicyReducer from "./slices/superAdminPolicySlice";
import superAdminOrgChartReducer from "./slices/superAdminOrgChartSlice";

const superradminRootReducer = combineReducers({
  dashboard: superAdminDashboardReducer,
  adminManagement: superAdminAdminManagementReducer,
  superAdminFeedback: superAdminFeedbackReducer,

  payroll: superAdminPayrollReducer,
  policy: superAdminPolicyReducer,
  orgChart: superAdminOrgChartReducer,
});

export default superradminRootReducer;
