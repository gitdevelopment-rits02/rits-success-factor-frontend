import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChiefWorkforceWithHRAnalytics = createAsyncThunk(
    "chiefWorkforceWithHRAnalytics/fetch",
    async (_, { rejectWithValue }) => {
        try {
            return {};
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
