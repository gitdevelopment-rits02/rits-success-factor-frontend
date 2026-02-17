import { createSlice } from "@reduxjs/toolkit";
import orgChartThunk from "../thunks/orgChartThunk";

const initialState = {
    loading: false,
    data: [],
    error: null,
};

const orgChartSlice = createSlice({
    name: "orgChart",
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            // Loading
            .addCase(orgChartThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Success
            .addCase(orgChartThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            // Error
            .addCase(orgChartThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load org chart";
            });
    },
});

export default orgChartSlice.reducer;
