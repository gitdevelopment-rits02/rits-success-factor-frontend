import { createSlice } from "@reduxjs/toolkit";
import managerDashboardThunk from "../thunks/ManagerDashboardThunk";

const initialState = {
    // Dashboard
    getDashboardDataLoading: false,
    getDashboardDataError: null,
    dashboardData: null,
};

const managerDashboardSlice = createSlice({
    name: "managerDashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ---------------- DASHBOARD ----------------
            .addCase(
                managerDashboardThunk.getDashboardDataThunk.pending,
                (state) => {
                    state.getDashboardDataLoading = true;
                    state.getDashboardDataError = null;
                }
            )
            .addCase(
                managerDashboardThunk.getDashboardDataThunk.fulfilled,
                (state, action) => {
                    state.getDashboardDataLoading = false;
                    state.dashboardData = action.payload;
                }
            )
            .addCase(
                managerDashboardThunk.getDashboardDataThunk.rejected,
                (state, action) => {
                    state.getDashboardDataLoading = false;
                    state.getDashboardDataError = action.payload;
                }
            );
    },
});

export default managerDashboardSlice.reducer;
