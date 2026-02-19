
import { createAsyncThunk } from "@reduxjs/toolkit";
import managerLeaveApprovalApi from "../../../../api/managerApi/ManagerLeaveApprovalApi";

export const fetchLeaveSummary = createAsyncThunk(
  "managerLeaveApproval/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await managerLeaveApprovalApi.getLeaveSummary();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const fetchLeaveList = createAsyncThunk(
  "managerLeaveApproval/fetchLeaveList",
  async (status, { rejectWithValue }) => {
    try {
      const response = await managerLeaveApprovalApi.getLeaveList(status);

      return {
        data: response.data,
        pagination: response.pagination,
        success: response.success,
      };

    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);



export const updateLeaveStatus = createAsyncThunk(
  "managerLeaveApproval/updateStatus",
  async ({ leaveId, action }, { rejectWithValue }) => {
    try {
      const response = await managerLeaveApprovalApi.updateLeaveStatus(
        leaveId,
        action
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
