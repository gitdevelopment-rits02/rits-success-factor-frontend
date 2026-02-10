import { createSlice } from "@reduxjs/toolkit";
import {
  fetchHRs,
  fetchManagersByHR,
  fetchFeedbackByManager,
  fetchOverview,
} from "../thunks/superAdminFeedbackThunk";

const initialState = {
  hrs: [],
  managers: [],
  feedbacks: [],
  overview: {
    totalFeedback: 0,
    thisMonth: 0,
  },
  loading: false,
  error: null,
};

const superAdminFeedbackSlice = createSlice({
  name: "superAdminFeedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // HRs
      .addCase(fetchHRs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHRs.fulfilled, (state, action) => {
        state.loading = false;
        state.hrs = action.payload;
      })
      .addCase(fetchHRs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Managers under HR

      .addCase(fetchManagersByHR.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchManagersByHR.fulfilled, (state, action) => {
      state.loading = false;
      state.managers = action.payload;
      })

      // Feedbacks under Manager
      .addCase(fetchFeedbackByManager.pending, (state) => {
        state.loading = true;
        state.feedbacks = [];
      })

      .addCase(fetchFeedbackByManager.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })


      .addCase(fetchOverview.pending, (state) => {
  state.loading = true;
})
.addCase(fetchOverview.fulfilled, (state, action) => {
  state.loading = false;
  state.overview = action.payload;
})
.addCase(fetchOverview.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});

  },
});

export default superAdminFeedbackSlice.reducer;
 