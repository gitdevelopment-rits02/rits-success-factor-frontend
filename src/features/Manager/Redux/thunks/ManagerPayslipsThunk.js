import { createAsyncThunk } from "@reduxjs/toolkit";
import managerPayslipsApi from "../../../../api/managerApi/ManagerPayslipsApi";

/* PAYSLIP */
export const fetchManagerPayslip = createAsyncThunk(
  "managerPayslips/fetchPayslip",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const res = await managerPayslipsApi.getManagerPayslip(month, year);
      return res.data; 
    } catch (e) {
      return rejectWithValue(e.response?.data || "Failed to fetch payslip");
    }
  }
);

/* HISTORY */
export const fetchManagerPayslipHistory = createAsyncThunk(
  "managerPayslips/fetchHistory",
  async (params, { rejectWithValue }) => {
    try {
      const res = await managerPayslipsApi.getManagerPayslipHistory(params);
      return res.data; 
    } catch (e) {
      return rejectWithValue("Failed to fetch history");
    }
  }
);


