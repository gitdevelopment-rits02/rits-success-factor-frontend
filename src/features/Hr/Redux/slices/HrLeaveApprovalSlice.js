import { createSlice } from "@reduxjs/toolkit";
import {
  fetchHrLeaves,
  fetchHrSummary,
  fetchOutToday,
  updateLeaveStatus,
} from "../thunks/HrLeaveApprovalThunk";

const initialState = {
  loading: false,
  leaves: [],
  summary: {
    pending: 0,
    approved: 0,
    rejected: 0,
  },
  outToday: [],
  error: null,
};

const hrLeaveApprovalSlice = createSlice({
  name: "hrLeaveApproval",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH LEAVES
      .addCase(fetchHrLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHrLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = action.payload || [];
      })
      .addCase(fetchHrLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SUMMARY
      .addCase(fetchHrSummary.fulfilled, (state, action) => {
        state.summary = action.payload || {
          pending: 0,
          approved: 0,
          rejected: 0,
        };
      })

      // OUT TODAY
      .addCase(fetchOutToday.fulfilled, (state, action) => {
        // console.log("OUT TODAY DATA:", action.payload);
        state.outToday = action.payload || [];
      })

      // UPDATE STATUS
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;

        const index = state.leaves.findIndex(
          (leave) => leave._id === updated._id
        );

        if (index !== -1) {
          // Only update the fields returned by the API
          state.leaves[index] = {
            ...state.leaves[index],
            approvalStatus: updated.approvalStatus,   // ✅ correct field
            rejectionReason: updated.rejectionReason || "",
          };
        }
      });
  },
});

export default hrLeaveApprovalSlice.reducer;