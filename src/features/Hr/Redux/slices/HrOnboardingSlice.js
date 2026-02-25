import { createSlice } from "@reduxjs/toolkit";
import hrOnboardingThunk from "../thunks/HrOnboardingThunk";

const initialState = {
    getEmployeesLoading: false,
    getEmployeeByIdLoading: false,
    addEmployeeLoading: false,
    updateEmployeeLoading: false,
    deleteEmployeeLoading: false,
    getDashboardCardsLoading: false,
    employees: [],
    pagination: {
        totalRecords: 0,
        totalPages: 1,
        currentPage: 1,
        recordsPerPage: 10,
    },
    selectedEmployee: null,
    dashboardCards: null,
    error: null,
};

const hrOnboardingSlice = createSlice({
    name: "hrOnboarding",
    initialState,
    reducers: {
        clearSelectedEmployee: (state) => {
            state.selectedEmployee = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // GET EMPLOYEES
            .addCase(hrOnboardingThunk.getEmployeesThunk.pending, (state) => {
                state.getEmployeesLoading = true;
                state.error = null;
            })
            .addCase(hrOnboardingThunk.getEmployeesThunk.fulfilled, (state, action) => {
                state.getEmployeesLoading = false;
                state.employees = action.payload.employees;
                state.pagination = action.payload.pagination;
            })
            .addCase(hrOnboardingThunk.getEmployeesThunk.rejected, (state, action) => {
                state.getEmployeesLoading = false;
                state.error = action.payload;
            })

            // GET EMPLOYEE BY ID
            .addCase(hrOnboardingThunk.getEmployeeByIdThunk.pending, (state) => {
                state.getEmployeeByIdLoading = true;
                state.error = null;
            })
            .addCase(hrOnboardingThunk.getEmployeeByIdThunk.fulfilled, (state, action) => {
                state.getEmployeeByIdLoading = false;
                state.selectedEmployee = action.payload;
            })
            .addCase(hrOnboardingThunk.getEmployeeByIdThunk.rejected, (state, action) => {
                state.getEmployeeByIdLoading = false;
                state.error = action.payload;
            })

            // ADD EMPLOYEE
            .addCase(hrOnboardingThunk.addEmployeeThunk.pending, (state) => {
                state.addEmployeeLoading = true;
                state.error = null;
            })
            .addCase(hrOnboardingThunk.addEmployeeThunk.fulfilled, (state, action) => {
                state.addEmployeeLoading = false;
                state.employees.unshift(action.payload);
            })
            .addCase(hrOnboardingThunk.addEmployeeThunk.rejected, (state, action) => {
                state.addEmployeeLoading = false;
                state.error = action.payload;
            })

            // UPDATE EMPLOYEE
            .addCase(hrOnboardingThunk.updateEmployeeThunk.pending, (state) => {
                state.updateEmployeeLoading = true;
                state.error = null;
            })
            .addCase(hrOnboardingThunk.updateEmployeeThunk.fulfilled, (state, action) => {
                state.updateEmployeeLoading = false;
                const index = state.employees.findIndex(e => e._id === action.payload._id);
                if (index !== -1) {
                    state.employees[index] = { ...state.employees[index], ...action.payload };
                }
                if (state.selectedEmployee?._id === action.payload._id) {
                    state.selectedEmployee = { ...state.selectedEmployee, ...action.payload };
                }
            })
            .addCase(hrOnboardingThunk.updateEmployeeThunk.rejected, (state, action) => {
                state.updateEmployeeLoading = false;
                state.error = action.payload;
            })

            // DELETE EMPLOYEE
            .addCase(hrOnboardingThunk.deleteEmployeeThunk.pending, (state) => {
                state.deleteEmployeeLoading = true;
                state.error = null;
            })
            .addCase(hrOnboardingThunk.deleteEmployeeThunk.fulfilled, (state, action) => {
                state.deleteEmployeeLoading = false;
                state.employees = state.employees.filter((e) => e._id !== action.payload);
            })
            .addCase(hrOnboardingThunk.deleteEmployeeThunk.rejected, (state, action) => {
                state.deleteEmployeeLoading = false;
                state.error = action.payload;
            })

            // DASHBOARD CARDS
            .addCase(hrOnboardingThunk.getDashboardCardsThunk.pending, (state) => {
                state.getDashboardCardsLoading = true;
                state.error = null;
            })
            .addCase(hrOnboardingThunk.getDashboardCardsThunk.fulfilled, (state, action) => {
                state.getDashboardCardsLoading = false;
                state.dashboardCards = action.payload;
            })
            .addCase(hrOnboardingThunk.getDashboardCardsThunk.rejected, (state, action) => {
                state.getDashboardCardsLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSelectedEmployee, clearError } = hrOnboardingSlice.actions;

export default hrOnboardingSlice.reducer;
