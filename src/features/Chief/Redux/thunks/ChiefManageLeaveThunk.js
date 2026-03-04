import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChiefManageLeave = createAsyncThunk(
    "chiefManageLeave/fetch",
    async (_, { rejectWithValue }) => {
        try {
            return {};
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
