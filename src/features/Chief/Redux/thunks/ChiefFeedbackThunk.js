import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChiefFeedback = createAsyncThunk(
    "chiefFeedback/fetch",
    async (_, { rejectWithValue }) => {
        try {
            return {};
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
