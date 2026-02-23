import { createAsyncThunk } from "@reduxjs/toolkit";
import managerTimeSheetReviewApi from "../../../../api/managerApi/ManagerTimeSheetReviewApi";

// ✅ Dashboard Thunk
export const fetchManagerDashboard = createAsyncThunk(
  "managerTimesheet/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await managerTimeSheetReviewApi.getDashboard();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Approve Timesheet Thunk
export const approveTimeSheet = createAsyncThunk(
  "managerTimesheet/approveTimeSheet",
  async (id, { rejectWithValue }) => {
    try {
      const res =
        await managerTimeSheetReviewApi.approveTimeSheet(id);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);
// ✅ Reject Timesheet Thunk
export const rejectTimeSheet = createAsyncThunk(
  "managerTimesheet/rejectTimeSheet",
  async (id, { rejectWithValue }) => {
    try {
      const res =
        await managerTimeSheetReviewApi.rejectTimeSheet(id);

      return res.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);
export const bulkApproveTimeSheet = createAsyncThunk(
  "managerTimesheet/bulkApprove",
  async (ids, { rejectWithValue }) => {
    try {
      const res =
        await managerTimeSheetReviewApi.bulkApproveTimeSheet(ids);

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);
// Download actual backend Excel file
export const downloadExcel = createAsyncThunk(
  "managerTimesheet/downloadExcel",
  async (_, { rejectWithValue }) => {
    try {
      const res =
        await managerTimeSheetReviewApi.downloadExcel(); // ✅ CORRECT

      return res.data; // blob

    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const downloadPdf = createAsyncThunk(
  "managerTimesheet/downloadPdf",
  async (_, { rejectWithValue }) => {
    try {
      const res = await managerTimeSheetReviewApi.downloadPdf();
      return res.data; // blob
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);




const managerTimeSheetReviewThunk = {
  fetchManagerDashboard,
  approveTimeSheet,
  rejectTimeSheet,
  bulkApproveTimeSheet, 
  downloadExcel,
  downloadPdf,
};

export default managerTimeSheetReviewThunk;

