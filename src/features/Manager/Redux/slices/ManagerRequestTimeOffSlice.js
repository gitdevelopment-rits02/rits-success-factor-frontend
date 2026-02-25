// import { createSlice } from "@reduxjs/toolkit";
// import managerRequestTimeOffThunk from "../thunks/ManagerRequestTimeOffThunk";

// const initialState = {
//     loading: false,
//     data: null,
//     error: null,
// };

// const managerRequestTimeOffSlice = createSlice({
//     name: "managerRequestTimeOff",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder;
//     },
// });

// export default managerRequestTimeOffSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";
import {
  createLeaveRequest,
  getLeaveHistory,
  getLeaveSummary,
} from "../thunks/ManagerRequestTimeOffThunk";

const initialState = {
  loading: false,
  history: [],
  summary: {},
  error: null,
};

const managerRequestTimeOffSlice = createSlice({
  name: "managerRequestTimeOff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //CREATE 
      .addCase(createLeaveRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLeaveRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.history.unshift(action.payload);
      })
      .addCase(createLeaveRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // HISTORY 
      .addCase(getLeaveHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLeaveHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(getLeaveHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SUMMARY 
      .addCase(getLeaveSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLeaveSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(getLeaveSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default managerRequestTimeOffSlice.reducer;
