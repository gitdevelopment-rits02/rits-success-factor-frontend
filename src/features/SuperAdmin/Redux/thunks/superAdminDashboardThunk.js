
import { createAsyncThunk } from "@reduxjs/toolkit";

import superAdminDashboardApi from "../../../../api/superAdminApi/SuperAdminDashboardApi";

const superAdminDashboardThunk = {};

// Get dashboard data
superAdminDashboardThunk.getDashboardDataThunk = createAsyncThunk(
  "superAdminDashboard/getDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await superAdminDashboardApi.getDashboardDataApi();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to get the dashboard data"
      );
    }
  }
);

// GET ATTENDANCE DATA 
superAdminDashboardThunk.getAttendanceDataThunk = createAsyncThunk(
  "superAdminDashboard/getAttendanceData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await superAdminDashboardApi.getAttendanceDataApi();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to get attendance data"
      );
    }
  }
);

export default superAdminDashboardThunk;
