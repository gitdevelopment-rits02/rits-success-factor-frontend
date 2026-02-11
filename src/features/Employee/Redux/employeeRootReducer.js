import { combineReducers } from "@reduxjs/toolkit";

import employeeClockMyTimeReducer from "./slices/EmployeeClockMyTimeSlice.js";
import employeeDashboardReducer from "./slices/EmployeeDashboardSlice.js";
import employeeGrowthPortfolioReducer from "./slices/EmployeeGrowthPortfolioSlice.js";
import employeeInsuranceReducer from "./slices/EmployeeInsuranceSlice.js";
import employeeLearningReducer from "./slices/EmployeeLearningSlice.js";
import employeeNotificationReducer from "./slices/EmployeeNotificationSlice.js";
import employeePaySlipsReducer from "./slices/EmployeePaySlipsSlice.js";
import employeePolicyDocumentsReducer from "./slices/EmployeePolicyDocumentsSlice.js";
import employeeRequestTimeOffReducer from "./slices/EmployeeRequestTimeOffSlice.js";
import employeeTimeSheetReducer from "./slices/EmployeeTimeSheetSlice.js";
import employeeViewMyProfileReducer from "./slices/EmployeeViewMyProfileSlice.js";
import employeeViewOrgChartReducer from "./slices/EmployeeViewOrgChartSlice.js";

const employeeRootReducer = combineReducers({
  clockMyTime: employeeClockMyTimeReducer,
  dashboard: employeeDashboardReducer,
  growthPortfolio: employeeGrowthPortfolioReducer,
  insurance: employeeInsuranceReducer,
  learning: employeeLearningReducer,
  notification: employeeNotificationReducer,
  paySlips: employeePaySlipsReducer,
  policyDocuments: employeePolicyDocumentsReducer,
  requestTimeOff: employeeRequestTimeOffReducer,
  timeSheet: employeeTimeSheetReducer,
  viewMyProfile: employeeViewMyProfileReducer,
  viewOrgChart: employeeViewOrgChartReducer,
});

export default employeeRootReducer;
