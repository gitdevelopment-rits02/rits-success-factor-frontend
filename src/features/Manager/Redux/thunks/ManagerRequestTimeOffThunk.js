// import { createAsyncThunk } from "@reduxjs/toolkit";
// import managerRequestTimeOffApi from "../../../../api/managerApi/ManagerRequestTimeOffApi";

// const managerRequestTimeOffThunk = {};

// export default managerRequestTimeOffThunk;



import { createAsyncThunk } from "@reduxjs/toolkit";
import managerRequestTimeOffApi from "../../../../api/managerApi/ManagerRequestTimeOffApi";

// CREATE LEAVE
export const createLeaveRequest = createAsyncThunk(
  "managerRequestTimeOff/createLeave",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await managerRequestTimeOffApi.createLeave(payload);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// GET HISTORY
export const getLeaveHistory = createAsyncThunk(
  "managerRequestTimeOff/getHistory",
  async (status, { rejectWithValue }) => {
    try {
      const response = await managerRequestTimeOffApi.getHistory(status);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// GET SUMMARY
export const getLeaveSummary = createAsyncThunk(
  "managerRequestTimeOff/getSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await managerRequestTimeOffApi.getSummary();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
