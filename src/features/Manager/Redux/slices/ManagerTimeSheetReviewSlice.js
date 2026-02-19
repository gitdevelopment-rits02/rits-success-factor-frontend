import { createSlice } from "@reduxjs/toolkit";
import managerTimeSheetReviewThunk from "../thunks/ManagerTimeSheetReviewThunk";

const {
  fetchManagerDashboard,
  approveTimeSheet,
  rejectTimeSheet,
  bulkApproveTimeSheet, // ✅
} = managerTimeSheetReviewThunk;




const initialState = {
  loading: false,
  data: null,
  error: null,
};

const managerTimeSheetReviewSlice = createSlice({
  name: "managerTimeSheetReview",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ✅ Dashboard - Pending
      .addCase(fetchManagerDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ Dashboard - Success
      .addCase(fetchManagerDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      // ✅ Dashboard - Error
      .addCase(fetchManagerDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
            // ✅ Approve - Pending
      .addCase(approveTimeSheet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ Approve - Success
      .addCase(approveTimeSheet.fulfilled, (state) => {
        state.loading = false;
      })

      // ✅ Approve - Error
      .addCase(approveTimeSheet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        // ✅ Reject - Pending
    .addCase(rejectTimeSheet.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    // ✅ Reject - Success
    .addCase(rejectTimeSheet.fulfilled, (state) => {
      state.loading = false;
    })

    // ✅ Reject - Error
    .addCase(rejectTimeSheet.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    // ✅ Bulk Approve - Pending
.addCase(bulkApproveTimeSheet.pending, (state) => {
  state.loading = true;
  state.error = null;
})

// ✅ Bulk Approve - Success
.addCase(bulkApproveTimeSheet.fulfilled, (state) => {
  state.loading = false;
})

// ✅ Bulk Approve - Error
.addCase(bulkApproveTimeSheet.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});


  },
});

export default managerTimeSheetReviewSlice.reducer;