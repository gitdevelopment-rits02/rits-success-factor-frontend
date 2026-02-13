import { createAsyncThunk } from "@reduxjs/toolkit";
import managerDashboardApi from "../../../../api/managerApi/ManagerDashboardApi";

const managerDashboardThunk = {};

// GET DASHBOARD DATA
managerDashboardThunk.getDashboardDataThunk = createAsyncThunk(
    "managerDashboard/getDashboardData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await managerDashboardApi.getDashboard();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to get dashboard data"
            );
        }
    }
);

export default managerDashboardThunk;
