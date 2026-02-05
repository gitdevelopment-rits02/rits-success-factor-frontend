import { combineReducers } from "@reduxjs/toolkit";
// import authSlice from "./authSlice"
import superAdminDashboardReducer from "./slices/superAdminDashboardSlice";

const superradminRootReducer = combineReducers({
  // main: authSlice,
  dashboard: superAdminDashboardReducer,
});

export default superradminRootReducer;
