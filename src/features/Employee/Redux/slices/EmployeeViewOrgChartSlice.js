import { createSlice } from "@reduxjs/toolkit";
import employeeViewOrgChartThunk from "../thunks/EmployeeViewOrgChartThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const employeeViewOrgChartSlice = createSlice({
  name: "employeeViewOrgChart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default employeeViewOrgChartSlice.reducer;
