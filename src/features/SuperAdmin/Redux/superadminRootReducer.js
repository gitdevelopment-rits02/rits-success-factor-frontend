import { combineReducers } from "@reduxjs/toolkit";

import superAdminDashboardReducer from "./slices/superAdminDashboardSlice";
import superAdminAdminManagementReducer from "./slices/superAdminAdminManagementSlice";
import superAdminFeedbackReducer from "./slices/superAdminFeedbackSlice";
import superAdminOrgChartReducer from "./slices/superAdminOrgChartSlice";
import superAdminPayrollReducer from "./slices/superAdminPayrollSlice";
import superAdminPolicyReducer from "./slices/superAdminPolicySlice";

const superradminRootReducer = combineReducers({
  dashboard: superAdminDashboardReducer,
  adminManagement: superAdminAdminManagementReducer,
  superAdminFeedback: superAdminFeedbackReducer,
  orgChart: superAdminOrgChartReducer,
  payroll: superAdminPayrollReducer,
  policy: superAdminPolicyReducer,
});

export default superradminRootReducer;
 