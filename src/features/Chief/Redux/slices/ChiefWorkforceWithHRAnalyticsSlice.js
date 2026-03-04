import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefWorkforceWithHRAnalytics } from "../thunks/ChiefWorkforceWithHRAnalyticsThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefWorkforceWithHRAnalyticsSlice = createSlice({
    name: "chiefWorkforceWithHRAnalytics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefWorkforceWithHRAnalytics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefWorkforceWithHRAnalytics.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefWorkforceWithHRAnalytics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefWorkforceWithHRAnalyticsSlice.reducer;
