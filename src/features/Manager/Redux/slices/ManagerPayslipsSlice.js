import { createSlice } from "@reduxjs/toolkit";
import {fetchManagerPayslip,fetchManagerPayslipHistory} from "../thunks/ManagerPayslipsThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,

  historyLoading: false,
  historyData: [],
  historyError: null,

  
};

const managerPayslipsSlice = createSlice({
  name: "managerPayslips",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* PAYSLIP */
      .addCase(fetchManagerPayslip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManagerPayslip.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchManagerPayslip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* HISTORY */
      .addCase(fetchManagerPayslipHistory.pending, (state) => {
        state.historyLoading = true;
      })
      .addCase(fetchManagerPayslipHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.historyData = action.payload;
      })
      .addCase(fetchManagerPayslipHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.historyError = action.payload;
      });

      
  },
});

export default managerPayslipsSlice.reducer;
