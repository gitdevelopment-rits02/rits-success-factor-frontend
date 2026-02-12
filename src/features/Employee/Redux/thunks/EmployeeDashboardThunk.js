
import { createAsyncThunk } from "@reduxjs/toolkit";
import employeeDashboardApi from "../../../../api/employeeApi/EmployeeDashboardApi";

const employeeDashboardThunk = {};

// GET DASHBOARD DATA
employeeDashboardThunk.getDashboardDataThunk = createAsyncThunk(
  "employeeDashboard/getDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await employeeDashboardApi.getDashboard();
      return response.data;   // ✅ important
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to get dashboard data"
      );
    }
  }
);

// // GET ATTENDANCE DATA
// employeeDashboardThunk.getAttendanceDataThunk = createAsyncThunk(
//   "employeeDashboard/getAttendanceData",
//   async (month, { rejectWithValue }) => {
//     try {
//       const response = await employeeDashboardApi.getAttendance(month);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "Failed to get attendance data"
//       );
//     }
//   }
// );
employeeDashboardThunk.getAttendanceDataThunk = createAsyncThunk(
  "employeeDashboard/getAttendanceData",
  async (month, { rejectWithValue }) => {
    try {
      const response = await employeeDashboardApi.getAttendance(month);
      return response.data;   // ✅ FIXED
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to get attendance data"
      );
    }
  }
);

// GET ANNOUNCEMENTS
employeeDashboardThunk.getAnnouncementsThunk = createAsyncThunk(
  "employeeDashboard/getAnnouncements",
  async (_, { rejectWithValue }) => {
    try {
      const response = await employeeDashboardApi.getAnnouncements();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to get announcements"
      );
    }
  }
);

export default employeeDashboardThunk;







