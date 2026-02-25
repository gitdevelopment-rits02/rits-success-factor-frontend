
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchLeaveSummary,
  fetchLeaveList,
  updateLeaveStatus,
} from "../thunks/ManagerLeaveApprovalThunk";

const initialState = {
  leaveList: [],
  pagination: {},
  success: false,
  summary: {},
  loading: false,
  error: null,
};


const managerLeaveApprovalSlice = createSlice({
  name: "managerLeaveApproval",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaveSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaveSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.data;
      })
      .addCase(fetchLeaveSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchLeaveList.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(fetchLeaveList.fulfilled, (state, action) => {
  state.loading = false;
  state.leaveList = action.payload.data;
  state.pagination = action.payload.pagination;
  state.success = action.payload.success;
})


      .addCase(fetchLeaveList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateLeaveStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLeaveStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateLeaveStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default managerLeaveApprovalSlice.reducer;
