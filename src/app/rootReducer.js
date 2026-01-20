import { combineReducers } from "@reduxjs/toolkit";

import authRootReducer from "../features/Auth/Redux/authRootReducers"
// import adminRootReducer from "../features/SuperAdmin/Redux/superadminRootReducer";

const rootReducer = combineReducers({
  auth: authRootReducer,
  // superadmin: superadminRootReducer,
  // admin: adminRootReducer,
  // hr: hrRootReducer,
  // employee: employeeRootReducer
});

export default rootReducer;
