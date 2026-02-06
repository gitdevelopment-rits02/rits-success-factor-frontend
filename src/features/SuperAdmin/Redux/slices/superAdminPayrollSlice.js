import { createSlice } from "@reduxjs/toolkit";
import superAdminPayrollThunk from "../thunks/superAdminPayrollThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const superAdminPayrollSlice = createSlice({
  name: "superAdminPayroll",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default superAdminPayrollSlice.reducer;
