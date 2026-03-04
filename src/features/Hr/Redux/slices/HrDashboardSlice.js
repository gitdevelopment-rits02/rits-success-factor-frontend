import { createSlice } from "@reduxjs/toolkit";
import { fetchHrDashboard } from "../thunks/HrDashboardThunk";

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
        builder

        // loading
        .addCase(fetchHrDashboard.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        // success
        .addCase(fetchHrDashboard.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })

        // error
        .addCase(fetchHrDashboard.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default hrDashboardSlice.reducer;
 