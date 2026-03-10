import { createAsyncThunk } from "@reduxjs/toolkit";
import hrTimeSheetApi from "../../../../api/hrApi/HrTimeSheetApi";

const hrTimeSheetThunk = {};

/*  FETCH TIMESHEETS  */

hrTimeSheetThunk.fetchTimeSheets = createAsyncThunk(
  "hrTimeSheet/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await hrTimeSheetApi.getTimeSheets();

      console.log("API TIMESHEET DATA:", res);

      if (!Array.isArray(res)) return [];

      const mapped = res.map((item) => {
        let clockIn = "--";
        let clockOut = "--";

        if (Array.isArray(item.timeLogs) && item.timeLogs.length > 0) {
          const first = item.timeLogs[0];
          const last = item.timeLogs[item.timeLogs.length - 1];

          if (first?.clockIn) {
            clockIn = new Date(first.clockIn).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            });
          }

          if (last?.clockOut) {
            clockOut = new Date(last.clockOut).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            });
          }
        }

        if (item.clockIn) {
          clockIn = new Date(item.clockIn).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          });
        }

        if (item.clockOut) {
          clockOut = new Date(item.clockOut).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          });
        }

        return {
          _id: item._id,
          name: item.employee?.employeeName || "Unknown",
          employeeNo: item.employee?.employeeNo || "",
          role: item.employee?.workDetails?.designation || "",
          department: item.employee?.workDetails?.department || "",
          location: item.employee?.workDetails?.workLocation || "",
          date: item.date || "",
          clockIn,
          clockOut,
          totalMinutes: item.totalMinutes || 0,
          attendanceStatus: item.attendanceStatus || "On Time",
          approvalStatus: item.approvalStatus || "Pending",
        };
      });

      console.log("MAPPED TIMESHEET:", mapped);

      return mapped;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch timesheets",
      );
    }
  },
);

/*  UPDATE STATUS  */

hrTimeSheetThunk.updateStatus = createAsyncThunk(
  "hrTimeSheet/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      await hrTimeSheetApi.updateStatus(id, status);

      return { id, status };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Update failed");
    }
  },
);

/*  DOWNLOAD PDF  */

hrTimeSheetThunk.downloadPDF = createAsyncThunk(
  "hrTimeSheet/downloadPDF",
  async () => {
    const blob = await hrTimeSheetApi.downloadPDF();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "timesheet.pdf";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  },
);

/*  DOWNLOAD EXCEL  */

hrTimeSheetThunk.downloadExcel = createAsyncThunk(
  "hrTimeSheet/downloadExcel",
  async () => {
    const blob = await hrTimeSheetApi.downloadExcel();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "timesheet.xlsx";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  },
);

export default hrTimeSheetThunk;
