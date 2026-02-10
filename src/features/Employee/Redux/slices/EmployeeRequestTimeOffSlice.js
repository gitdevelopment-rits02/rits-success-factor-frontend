import { createSlice } from "@reduxjs/toolkit";
import employeeRequestTimeOffThunk from "../thunks/EmployeeRequestTimeOffThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const employeeRequestTimeOffSlice = createSlice({
  name: "employeeRequestTimeOff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default employeeRequestTimeOffSlice.reducer;
