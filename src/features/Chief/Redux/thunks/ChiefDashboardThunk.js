import { createAsyncThunk } from "@reduxjs/toolkit";
// import chiefDashboardApi from "../../../../api/chiefApi/ChiefDashboardApi";

export const fetchChiefDashboard = createAsyncThunk(
    "chiefDashboard/fetchChiefDashboard",
    async (_, { rejectWithValue }) => {
        try {
            // const data = await chiefDashboardApi.getDashboard();
            // return data;
            return {}; // Placeholder
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Something went wrong"
            );
        }
    }
);
