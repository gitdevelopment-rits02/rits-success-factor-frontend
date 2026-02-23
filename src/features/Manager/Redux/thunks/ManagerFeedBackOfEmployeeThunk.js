import { createAsyncThunk } from "@reduxjs/toolkit";
import managerFeedBackOfEmployeeApi from "../../../../api/managerApi/ManagerFeedBackOfEmployeeApi";

// CREATE
export const createManagerFeedbackThunk = createAsyncThunk(
  "managerFeedback/create",
  async (payload, { rejectWithValue }) => {
    try {
      return await managerFeedBackOfEmployeeApi.createFeedback(payload);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// LIST
export const getManagerFeedbackListThunk = createAsyncThunk(
  "managerFeedback/list",
  async (_, { rejectWithValue }) => {
    try {
      return await managerFeedBackOfEmployeeApi.getFeedbackList();
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
