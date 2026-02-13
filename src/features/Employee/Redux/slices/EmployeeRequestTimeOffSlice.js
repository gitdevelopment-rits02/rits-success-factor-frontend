import { createSlice } from "@reduxjs/toolkit";
import {
  createLeaveRequest,
  getLeaveHistory,
  getLeaveSummary,
} from "../thunks/EmployeeRequestTimeOffThunk";

const initialState = {
  history: [],
  summary: {},
  loading: false,
  error: null,
};

const employeeRequestTimeOffSlice = createSlice({
  name: "employeeRequestTimeOff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // CREATE LEAVE
      .addCase(createLeaveRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLeaveRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.history.push(action.payload);
      })
      .addCase(createLeaveRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //GET HISTORY 
      .addCase(getLeaveHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLeaveHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(getLeaveHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //GET SUMMARY 
      .addCase(getLeaveSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLeaveSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(getLeaveSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeRequestTimeOffSlice.reducer;
