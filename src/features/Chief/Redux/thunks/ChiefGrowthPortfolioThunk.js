import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChiefGrowthPortfolio = createAsyncThunk(
    "chiefGrowthPortfolio/fetch",
    async (_, { rejectWithValue }) => {
        try {
            return {};
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
