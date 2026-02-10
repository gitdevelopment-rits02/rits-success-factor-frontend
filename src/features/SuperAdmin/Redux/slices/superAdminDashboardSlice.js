import superAdminDashboardThunk from "../thunks/superAdminDashboardThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getDashboardDataLoading: false,
  getDashboardDataError: null,
  dashboardData: null,
  getAttendanceDataLoading: false,
  getAttendanceDataError: null,
  attendanceData: null,
};

const superAdminDashboardSlice = createSlice({
  name: "superAdminDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(superAdminDashboardThunk.getDashboardDataThunk.pending, (state) => {
        state.getDashboardDataLoading = true;
        state.getDashboardDataError = null;
      })
      .addCase(
        superAdminDashboardThunk.getDashboardDataThunk.fulfilled,
        (state, action) => {
          state.getDashboardDataLoading = false;
          state.dashboardData = action.payload;
        }
      )
      .addCase(
        superAdminDashboardThunk.getDashboardDataThunk.rejected,
        (state, action) => {
          state.getDashboardDataLoading = false;
          state.getDashboardDataError = action.payload;
        }
      )

     
      .addCase(superAdminDashboardThunk.getAttendanceDataThunk.pending, (state) => {
        state.getAttendanceDataLoading = true;
        state.getAttendanceDataError = null;
      })
      .addCase(
        superAdminDashboardThunk.getAttendanceDataThunk.fulfilled,
        (state, action) => {
          state.getAttendanceDataLoading = false;
          state.attendanceData = action.payload;
        }
      )
      .addCase(
        superAdminDashboardThunk.getAttendanceDataThunk.rejected,
        (state, action) => {
          state.getAttendanceDataLoading = false;
          state.getAttendanceDataError = action.payload;
        }
      );
  },
});

export default superAdminDashboardSlice.reducer;
 
