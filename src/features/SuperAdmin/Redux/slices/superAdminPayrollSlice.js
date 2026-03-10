import { createSlice } from "@reduxjs/toolkit";
import { fetchPayrollListThunk, fetchPayrollBreakdownThunk, fetchPayslipPdfThunk, fetchPayrollReportThunk } from "../thunks/superAdminPayrollThunk";

const initialState = {
  payrollList: [],
  breakdownMap: {},   
  pdfMap: {},
  reportBlob: null,
  error: null,
};


const superAdminPayrollSlice = createSlice({
  name: "superAdminPayroll",
  initialState,
  reducers: {
    resetList: (state) => {
    state.payrollList = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayrollListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayrollListThunk.fulfilled, (state, action) => {
       state.loading = false;
        console.log("Thunk payload:", action.payload);

        if (action.payload?.success) {

        if (action.payload.page === 1) {
        state.payrollList = action.payload.data;
        } else {
        state.payrollList = [...state.payrollList, ...action.payload.data];
  }
} else {
    state.error = action.payload?.message || "Failed to fetch payroll";
  }
})

      .addCase(fetchPayrollListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Request failed";
      })


      //breakdown
.addCase(fetchPayrollBreakdownThunk.pending, (state) => {
  state.loading = true;
})
.addCase(fetchPayrollBreakdownThunk.fulfilled, (state, action) => {
  state.loading = false;
  const { payrollId, data } = action.payload;

  if (data?.success) {
    state.breakdownMap[payrollId] = data.data; 
  }
})
.addCase(fetchPayrollBreakdownThunk.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || "Breakdown fetch failed";
})


//PDF
builder
  .addCase(fetchPayslipPdfThunk.fulfilled, (state, action) => {
    state.pdfMap = state.pdfMap || {};
    state.pdfMap[action.payload.payrollId] = action.payload.pdfBlob;
  })
  .addCase(fetchPayslipPdfThunk.rejected, (state, action) => {
    state.error = action.payload || "Payslip download failed";
  })


  //report excel
  .addCase(fetchPayrollReportThunk.fulfilled, (state, action) => {
  state.reportBlob = action.payload.fileBlob;
 })
.addCase(fetchPayrollReportThunk.rejected, (state, action) => {
  state.error = action.payload || "Report download failed";
});
  },
});

export const { resetList } = superAdminPayrollSlice.actions;
export default superAdminPayrollSlice.reducer;
