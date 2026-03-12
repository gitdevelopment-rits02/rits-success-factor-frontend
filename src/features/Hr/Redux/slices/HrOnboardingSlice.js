import { createSlice } from "@reduxjs/toolkit";
import {
  getEmployeesThunk,
  getEmployeeByIdThunk,
  createEmployeeThunk,
  updateEmployeeThunk,
  updateLeaveAllocationThunk,
  replaceDocumentThunk,
  returnAssetThunk,
  undoReturnAssetThunk,
  deleteEmployeeThunk,
  getDashboardCardsThunk
} from "../thunks/HrOnboardingThunk";
 
const normalizeEmployee = (emp) => emp;
 
const initialState = {
  loading: false,
  employees: [],
  selectedEmployee: null,
  pagination: null,
  dashboard: {
    totalEmployees: 0,
    active: 0,
    inactive: 0,
    departments: 0,
  },
  error: null,
};
 
const hrOnboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
  },
 
  extraReducers: (builder) => {
    builder
 
 
      // GET EMPLOYEES
 
      .addCase(getEmployeesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload?.employees || [];
        state.pagination = action.payload?.pagination || null;
      })
      .addCase(getEmployeesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 
 
 
      // DASHBOARD CARDS
 
      .addCase(getDashboardCardsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardCardsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(getDashboardCardsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 
 
      // GET SINGLE EMPLOYEE
 
      .addCase(getEmployeeByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEmployee = normalizeEmployee(action.payload);
      })
      .addCase(getEmployeeByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 
 
      // CREATE EMPLOYEE
 
      .addCase(createEmployeeThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.employees.unshift(action.payload);
        }
      })
 
 
      // UPDATE EMPLOYEE (GENERAL)
 
      .addCase(updateEmployeeThunk.fulfilled, (state, action) => {
        updateEmployeeInState(state, action.payload);
      })
 
 
      // UPDATE LEAVE ALLOCATION
 
      .addCase(updateLeaveAllocationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLeaveAllocationThunk.fulfilled, (state, action) => {
        state.loading = false;
        updateEmployeeInState(state, action.payload);
      })
      .addCase(updateLeaveAllocationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 
 
      // REPLACE DOCUMENT
 
      .addCase(replaceDocumentThunk.fulfilled, (state, action) => {
        updateEmployeeInState(state, action.payload);
      })
 
 
      // RETURN ASSET
 
      .addCase(returnAssetThunk.fulfilled, (state, action) => {
        updateEmployeeInState(state, action.payload);
      })
 
 
      // UNDO RETURN ASSET
 
      .addCase(undoReturnAssetThunk.fulfilled, (state, action) => {
        updateEmployeeInState(state, action.payload);
      })
 
 
 
      // DELETE EMPLOYEE
 
      .addCase(deleteEmployeeThunk.fulfilled, (state, action) => {
        const deletedId = action.payload;
 
        state.employees = state.employees.filter(
          (emp) => emp._id !== deletedId
        );
 
        if (state.selectedEmployee?._id === deletedId) {
          state.selectedEmployee = null;
        }
      });
  },
});
 
 
function updateEmployeeInState(state, updated) {
  const index = state.employees.findIndex(
    (emp) => emp._id === updated._id
  );
 
  if (index !== -1) {
    state.employees[index] = updated;
  }
 
  state.selectedEmployee = updated;
}
 
export const { clearSelectedEmployee } = hrOnboardingSlice.actions;
export default hrOnboardingSlice.reducer;
