import { combineReducers } from "@reduxjs/toolkit";

import authRootReducer from "../features/Auth/Redux/authRootReducers"
// import adminRootReducer from "../features/SuperAdmin/Redux/superadminRootReducer";
import superAdminRootReducer from "../features/SuperAdmin/Redux/superadminRootReducer";
import employeeRootReducer from "../features/Employee/Redux/employeeRootReducer";
import managerRootReducer from "../features/Manager/Redux/managerRootReducer";
import hrRootReducer from "../features/Hr/Redux/hrRootReducer";
import chiefRootReducer from "../features/Chief/Redux/chiefRootReducer";
console.log("SuperAdmin Root Reducer:", superAdminRootReducer);

const rootReducer = combineReducers({
  auth: authRootReducer,
  superAdmin: superAdminRootReducer,
  employee: employeeRootReducer,
  manager: managerRootReducer,
  hr: hrRootReducer,
  chief: chiefRootReducer,
});


export default rootReducer;
