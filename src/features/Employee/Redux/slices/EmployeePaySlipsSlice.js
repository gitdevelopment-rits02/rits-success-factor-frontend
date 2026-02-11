import { createSlice } from "@reduxjs/toolkit";
import employeePaySlipsThunk from "../thunks/EmployeePaySlipsThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const employeePaySlipsSlice = createSlice({
  name: "employeePaySlips",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default employeePaySlipsSlice.reducer;
