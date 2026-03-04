import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefDashboard } from "../thunks/ChiefDashboardThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefDashboardSlice = createSlice({
    name: "chiefDashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefDashboardSlice.reducer;
