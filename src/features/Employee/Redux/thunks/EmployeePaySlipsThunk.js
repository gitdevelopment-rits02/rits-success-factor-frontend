import { createAsyncThunk } from "@reduxjs/toolkit";
import employeePaySlipsApi from "../../../../api/employeeApi/EmployeePaySlipsApi";

export const fetchMyPayslip = createAsyncThunk(
  "employeePaySlips/fetchMyPayslip",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const data = await employeePaySlipsApi.getMyPayslip(month, year);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Failed to fetch payslip"
      );
    }
  }
);


export const fetchMyPayslipHistory = createAsyncThunk(
  "employee/fetchMyPayslipHistory",
  async (params, { rejectWithValue }) => {
    try {
      const data = await employeePaySlipsApi.getMyPayslipHistory(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch history");
    }
  }
);

export const fetchMyPayslipPdf = createAsyncThunk(
  "employeePaySlips/fetchMyPayslipPdf",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const pdfBlob = await employeePaySlipsApi.getMyPayslipPdf(month, year);
      return pdfBlob;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to download PDF"
      );
    }
  }
);
