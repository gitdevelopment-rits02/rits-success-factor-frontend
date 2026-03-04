import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChiefAdminManagement = createAsyncThunk(
    "chiefAdminManagement/fetch",
    async (_, { rejectWithValue }) => {
        try {
            return {};
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
