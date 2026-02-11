import { createSlice } from "@reduxjs/toolkit";
import employeeDashboardThunk from "../thunks/EmployeeDashboardThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const employeeDashboardSlice = createSlice({
  name: "employeeDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default employeeDashboardSlice.reducer;
