import { createAsyncThunk } from "@reduxjs/toolkit";    
import managerDashboardApi from "../../../../api/managerApi/ManagerDashboardApi";

const managerDashboardThunk = {};

managerDashboardThunk.getDashboardDataThunk = createAsyncThunk(
  "managerDashboard/getDashboardData",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const response = await managerDashboardApi.getDashboard(month, year);

      // ⭐ ACTUAL DATA
     const raw = response?.data || {};


      // ---------- MONTHLY SUMMARY ----------
      const attendanceSummary = {
        present: raw?.monthlySummary?.present ?? 0,
        leave: raw?.monthlySummary?.leave ?? 0,attendance: raw?.attendance || [],
        late: raw?.monthlySummary?.late ?? 0,
        absent: raw?.monthlySummary?.absent ?? 0,
      };

      // ---------- LEAVE BALANCES ----------
      const allowedLeaveTypes = ["casual", "sick", "earned", "maternity"];

      const leaveBalances = allowedLeaveTypes
        .filter((type) => raw?.leaveBalance?.[type])
        .map((type) => ({
          type: `${type.charAt(0).toUpperCase()}${type.slice(1)} Leave`,
          available: raw.leaveBalance[type]?.available ?? 0,
          used: raw.leaveBalance[type]?.used ?? 0,
          total: raw.leaveBalance[type]?.total ?? 0,
        }));

      return {
        attendanceSummary,
        leaveBalances,
        announcements: raw?.announcements || [],
        attendance: raw?.attendanceCalendar || [],
      };

    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to get dashboard data"
      );
    }
  }
);

export default managerDashboardThunk;
