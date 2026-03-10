import { createAsyncThunk } from "@reduxjs/toolkit";
import { SuperAdminPayrollApi } from "../../../../api/superAdminApi/SuperAdminPayrollApi";

export const fetchPayrollListThunk = createAsyncThunk(
  "superAdminPayroll/fetchList",
  async ({ month, year, page, limit }, { rejectWithValue }) => {
    try {
      const data = await SuperAdminPayrollApi.getPayrollList({ month, year, page, limit });
      return { ...data, page};
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch payroll"
      );
    }
  }
);


export const fetchPayrollBreakdownThunk = createAsyncThunk(
  "superAdminPayroll/fetchBreakdown",
  async (payrollId, { rejectWithValue }) => {
    try {
      const data = await SuperAdminPayrollApi.getPayrollBreakdown(payrollId);
      return { payrollId, data };
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch breakdown"
      );
    }
  }
);

export const fetchPayslipPdfThunk = createAsyncThunk(
  "superAdmin/payroll/fetchPayslipPdf",
  async (payrollId, { rejectWithValue }) => {
    try {
      const data = await SuperAdminPayrollApi.getPayslipPdf(payrollId);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch payslip data"
      );
    }
  }
);

export const fetchPayrollReportThunk = createAsyncThunk(
  "superAdmin/payroll/fetchReport",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const fileBlob = await SuperAdminPayrollApi.downloadPayrollReport({
        month,
        year,
      });

      return { month, year, fileBlob };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to download report"
      );
    }
  }
);
 