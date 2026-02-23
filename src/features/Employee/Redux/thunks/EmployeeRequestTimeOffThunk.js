import { createAsyncThunk } from "@reduxjs/toolkit";
import employeeRequestTimeOffApi from "../../../../api/employeeApi/EmployeeRequestTimeOffApi";

// CREATE LEAVE
export const createLeaveRequest = createAsyncThunk(
  "employeeRequestTimeOff/createLeave",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await employeeRequestTimeOffApi.createLeave(payload);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// GET HISTORY
export const getLeaveHistory = createAsyncThunk(
  "employeeRequestTimeOff/getHistory",
  async (status, { rejectWithValue }) => {
    try {
      const response = await employeeRequestTimeOffApi.getLeaveHistory(status);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// GET SUMMARY
export const getLeaveSummary = createAsyncThunk(
  "employeeRequestTimeOff/getSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await employeeRequestTimeOffApi.getLeaveSummary();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
