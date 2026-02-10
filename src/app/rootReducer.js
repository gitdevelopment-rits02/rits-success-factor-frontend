import { combineReducers } from "@reduxjs/toolkit";

import authRootReducer from "../features/Auth/Redux/authRootReducers"
// import adminRootReducer from "../features/SuperAdmin/Redux/superadminRootReducer";
import superAdminRootReducer from "../features/SuperAdmin/Redux/superadminRootReducer";
console.log("SuperAdmin Root Reducer:", superAdminRootReducer);

const rootReducer = combineReducers({
  auth: authRootReducer,
  superAdmin: superAdminRootReducer,
});

export default rootReducer;
