
import employeeDashboardThunk from "../thunks/EmployeeDashboardThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Dashboard
  getDashboardDataLoading: false,
  getDashboardDataError: null,
  dashboardData: null,

  // Attendance
  getAttendanceDataLoading: false,
  getAttendanceDataError: null,
  attendanceData: null,

  // Announcements
  getAnnouncementsLoading: false,
  getAnnouncementsError: null,
  announcementsData: null,
};

const employeeDashboardSlice = createSlice({
  name: "employeeDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ---------------- DASHBOARD ----------------
      .addCase(
        employeeDashboardThunk.getDashboardDataThunk.pending,
        (state) => {
          state.getDashboardDataLoading = true;
          state.getDashboardDataError = null;
        }
      )
      .addCase(
        employeeDashboardThunk.getDashboardDataThunk.fulfilled,
        (state, action) => {
          state.getDashboardDataLoading = false;
          state.dashboardData = action.payload;
        }
      )
      .addCase(
        employeeDashboardThunk.getDashboardDataThunk.rejected,
        (state, action) => {
          state.getDashboardDataLoading = false;
          state.getDashboardDataError = action.payload;
        }
      )

      // ---------------- ATTENDANCE ----------------
      .addCase(
        employeeDashboardThunk.getAttendanceDataThunk.pending,
        (state) => {
          state.getAttendanceDataLoading = true;
          state.getAttendanceDataError = null;
        }
      )
      .addCase(
        employeeDashboardThunk.getAttendanceDataThunk.fulfilled,
        (state, action) => {
          state.getAttendanceDataLoading = false;
          state.attendanceData = action.payload;
        }
      )
      .addCase(
        employeeDashboardThunk.getAttendanceDataThunk.rejected,
        (state, action) => {
          state.getAttendanceDataLoading = false;
          state.getAttendanceDataError = action.payload;
        }
      )

      // ---------------- ANNOUNCEMENTS ----------------
      .addCase(
        employeeDashboardThunk.getAnnouncementsThunk.pending,
        (state) => {
          state.getAnnouncementsLoading = true;
          state.getAnnouncementsError = null;
        }
      )
      .addCase(
        employeeDashboardThunk.getAnnouncementsThunk.fulfilled,
        (state, action) => {
          state.getAnnouncementsLoading = false;
          state.announcementsData = action.payload;
        }
      )
      .addCase(
        employeeDashboardThunk.getAnnouncementsThunk.rejected,
        (state, action) => {
          state.getAnnouncementsLoading = false;
          state.getAnnouncementsError = action.payload;
        }
      );
  },
});

export default employeeDashboardSlice.reducer;

