import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChiefPayslip,
  fetchChiefPayslipHistory
} from "../thunks/ChiefPayrollThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,

  historyLoading: false,
  historyData: [],
  historyError: null,

};

const chiefPayrollSlice = createSlice({
  name: "chiefPayroll",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* PAYSLIP */
      .addCase(fetchChiefPayslip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChiefPayslip.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchChiefPayslip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* HISTORY */
      .addCase(fetchChiefPayslipHistory.pending, (state) => {
        state.historyLoading = true;
      })
      .addCase(fetchChiefPayslipHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.historyData = action.payload;
      })
      .addCase(fetchChiefPayslipHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.historyError = action.payload;
      });

      
  },
});

export default chiefPayrollSlice.reducer;