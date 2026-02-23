import { createSlice } from "@reduxjs/toolkit";
import {
  createManagerFeedbackThunk,
  getManagerFeedbackListThunk,
} from "../thunks/ManagerFeedBackOfEmployeeThunk";

const initialState = {
  loading: false,
  feedbackList: [],
  summary: null,
  error: null,
};

const managerFeedBackOfEmployeeSlice = createSlice({
  name: "managerFeedBackOfEmployee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // CREATE
      .addCase(createManagerFeedbackThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createManagerFeedbackThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createManagerFeedbackThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LIST
      .addCase(getManagerFeedbackListThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getManagerFeedbackListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbackList = action.payload.data.feedbackList;
        state.summary = action.payload.data.summary;
      })
      .addCase(getManagerFeedbackListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default managerFeedBackOfEmployeeSlice.reducer;
