import { createAsyncThunk } from "@reduxjs/toolkit";
import chiefPayrollApi from "../../../../api/chiefApi/ChiefPayrollApi";

/* PAYSLIP */
export const fetchChiefPayslip = createAsyncThunk(
  "chiefPayroll/fetchPayslip",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const res = await chiefPayrollApi.getChiefPayslip(month, year);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data || "Failed to fetch payslip");
    }
  }
);

/* HISTORY */
export const fetchChiefPayslipHistory = createAsyncThunk(
  "chiefPayroll/fetchHistory",
  async (params, { rejectWithValue }) => {
    try {
      const res = await chiefPayrollApi.getChiefPayslipHistory(params);
      return res.data;
    } catch (e) {
      return rejectWithValue("Failed to fetch history");
    }
  }
);

