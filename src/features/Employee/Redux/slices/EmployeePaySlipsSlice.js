import { createSlice } from "@reduxjs/toolkit";
import { fetchMyPayslip, fetchMyPayslipHistory,  } 
from "../thunks/EmployeePaySlipsThunk";


const initialState = {
  loading: false,
  data: null,
  error: null,
//history
  historyLoading: false,
  historyData: [],
  historyError: null,

  //pdf
  // pdfLoading: false,

};


const employeePaySlipsSlice = createSlice({
  name: "employeePaySlips",
  initialState,
  reducers: {
    clearPayslip: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyPayslip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMyPayslip.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // <-- your full API response goes here
      })

      .addCase(fetchMyPayslip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch payslip";
      })

      //history
.addCase(fetchMyPayslipHistory.pending, (state) => {
  state.historyLoading = true;
  state.historyError = null;
})

.addCase(fetchMyPayslipHistory.fulfilled, (state, action) => {
  state.historyLoading = false;
  state.historyData = action.payload; // ✅ CORRECT
})

.addCase(fetchMyPayslipHistory.rejected, (state, action) => {
  state.historyLoading = false;
  state.historyError = action.payload || "Failed to fetch history";
});
// //pdf
// .addCase(fetchMyPayslipPdf.pending, (state) => {
//   state.pdfLoading = true;
// })
// .addCase(fetchMyPayslipPdf.fulfilled, (state) => {
//   state.pdfLoading = false;
// })
// .addCase(fetchMyPayslipPdf.rejected, (state) => {
//   state.pdfLoading = false;
// });


  },
});

export const { clearPayslip } = employeePaySlipsSlice.actions;
export default employeePaySlipsSlice.reducer;
