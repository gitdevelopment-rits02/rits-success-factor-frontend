
import { createAsyncThunk } from "@reduxjs/toolkit";
import hrDashboardApi from "../../../../api/hrApi/HrDashboardApi";

// fetch dashboard
export const fetchHrDashboard = createAsyncThunk(
    "hrDashboard/fetchHrDashboard",
    async (_, { rejectWithValue }) => {
        try {
            const data = await hrDashboardApi.getDashboard();
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Something went wrong"
            );
        }
    }
);
 