import { createSlice } from "@reduxjs/toolkit";
import hrTimeSheetThunk from "../thunks/HrTimeSheetThunk";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const hrTimeSheetSlice = createSlice({
  name: "hrTimeSheet",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /*  FETCH TIMESHEETS */

      .addCase(hrTimeSheetThunk.fetchTimeSheets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(hrTimeSheetThunk.fetchTimeSheets.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })

      .addCase(hrTimeSheetThunk.fetchTimeSheets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch timesheets";
      })

      /*  UPDATE STATUS  */

      .addCase(hrTimeSheetThunk.updateStatus.pending, (state) => {
        state.loading = true;
      })

      .addCase(hrTimeSheetThunk.updateStatus.fulfilled, (state, action) => {
        state.loading = false;

        const { id, status } = action.payload || {};

        if (!id) return;

        const recordIndex = state.data.findIndex((r) => r._id === id);

        if (recordIndex !== -1) {
          state.data[recordIndex].approvalStatus = status;
        }
      })

      .addCase(hrTimeSheetThunk.updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update timesheet status";
      });
  },
});

export default hrTimeSheetSlice.reducer;