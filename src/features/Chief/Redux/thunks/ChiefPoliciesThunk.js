import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChiefPolicies = createAsyncThunk(
    "chiefPolicies/fetch",
    async (_, { rejectWithValue }) => {
        try {
            return {};
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
