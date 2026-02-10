import { createAsyncThunk } from "@reduxjs/toolkit";
import superAdminFeedbackApi from "../../../../api/superAdminApi/SuperAdminFeedBackApi";

// OVERVIEW
export const fetchOverview = createAsyncThunk(
  "superAdminFeedback/fetchOverview",
  async (_, { rejectWithValue }) => {
    try {
      const res = await superAdminFeedbackApi.getOverview();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


// HR List
export const fetchHRs = createAsyncThunk(
  "superAdminFeedback/fetchHRs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await superAdminFeedbackApi.getAllHRs();
      return res.data.data; // array of HRs
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Managers under HR
export const fetchManagersByHR = createAsyncThunk(
  "superAdminFeedback/fetchManagersByHR",
  async (hrId, { rejectWithValue }) => {
    try {
      const res = await superAdminFeedbackApi.getManagersByHR(hrId);
      return res.data.data; // array of managers
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Feedback under Manager
export const fetchFeedbackByManager = createAsyncThunk(
  "superAdminFeedback/fetchFeedbackByManager",
  async (managerId, { rejectWithValue }) => {
    try {
      const res = await superAdminFeedbackApi.getFeedbackByManager(managerId);
      return res.data.data; // array of feedbacks
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
 