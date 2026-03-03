import { createSlice } from "@reduxjs/toolkit";
import hrOffBoardingThunk from "../thunks/HrOffBoardingThunk";

const initialState = {
  loadingEmployees: false,
  loadingEmployeeDetails: false,
  loadingUpdate: false,
  loadingComplete: false,
  data: [],
  selectedEmployeeData: null,
  error: null,
};

const hrOffBoardingSlice = createSlice({
  name: "hrOffBoarding",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ===============================
      // Get Employees By Department
      // ===============================
     .addCase(hrOffBoardingThunk.getEmployeesByDepartment.pending, (state) => {
  state.loadingEmployees = true;
  state.error = null;
})
.addCase(hrOffBoardingThunk.getEmployeesByDepartment.fulfilled, (state, action) => {
  state.loadingEmployees = false;
  state.data = action.payload;
})
.addCase(hrOffBoardingThunk.getEmployeesByDepartment.rejected, (state, action) => {
  state.loadingEmployees = false;
  state.error = action.payload;
})
      // ===============================
      // Get Employee By ID
      // ===============================
      .addCase(hrOffBoardingThunk.getEmployeeById.pending, (state) => {
  state.loadingEmployeeDetails = true;
})
.addCase(hrOffBoardingThunk.getEmployeeById.fulfilled, (state, action) => {
  state.loadingEmployeeDetails = false;
  state.selectedEmployeeData = action.payload;
})
.addCase(hrOffBoardingThunk.getEmployeeById.rejected, (state, action) => {
  state.loadingEmployeeDetails = false;
  state.error = action.payload;
})
      // ===============================
// Search Employees By Name
// ===============================
.addCase(hrOffBoardingThunk.searchEmployeesByName.pending, (state) => {
  state.loadingEmployees = true;
})
.addCase(hrOffBoardingThunk.searchEmployeesByName.fulfilled, (state, action) => {
  state.loadingEmployees = false;
  state.data = action.payload;
})
.addCase(hrOffBoardingThunk.searchEmployeesByName.rejected, (state, action) => {
  state.loadingEmployees = false;
  state.error = action.payload;
})
// ===============================
// Update Offboarding
// ===============================

.addCase(hrOffBoardingThunk.updateOffboarding.pending, (state) => {
  state.loadingUpdate = true;
})

.addCase(hrOffBoardingThunk.updateOffboarding.fulfilled, (state) => {
  state.loadingUpdate = false;
})

.addCase(hrOffBoardingThunk.updateOffboarding.rejected, (state, action) => {
  state.loadingUpdate = false;
  state.error = action.payload;
})
// ===============================
// Complete Offboarding
// ===============================

.addCase(hrOffBoardingThunk.completeOffboarding.pending, (state) => {
  state.loadingComplete = true;
})

.addCase(hrOffBoardingThunk.completeOffboarding.fulfilled, (state) => {
  state.loadingComplete = false;
})

.addCase(hrOffBoardingThunk.completeOffboarding.rejected, (state, action) => {
  state.loadingComplete = false;
  state.error = action.payload;
});
  },
});

export default hrOffBoardingSlice.reducer;