import { createSlice } from "@reduxjs/toolkit";
import hrDashboardThunk from "../thunks/HrDashboardThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrDashboardSlice = createSlice({
    name: "hrDashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrDashboardSlice.reducer;
