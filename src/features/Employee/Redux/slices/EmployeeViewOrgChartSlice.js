import { createSlice } from "@reduxjs/toolkit";
import employeeViewOrgChartThunk from "../thunks/EmployeeViewOrgChartThunk";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const employeeViewOrgChartSlice = createSlice({
  name: "employeeViewOrgChart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(employeeViewOrgChartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(employeeViewOrgChartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(employeeViewOrgChartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load employee org chart";
      });
  },
});

export default employeeViewOrgChartSlice.reducer;
