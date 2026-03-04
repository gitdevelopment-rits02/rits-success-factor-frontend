import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefSystemDashboard } from "../thunks/ChiefSystemDashboardThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefSystemDashboardSlice = createSlice({
    name: "chiefSystemDashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefSystemDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefSystemDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefSystemDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefSystemDashboardSlice.reducer;
