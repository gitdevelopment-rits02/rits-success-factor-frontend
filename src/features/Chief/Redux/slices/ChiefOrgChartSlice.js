import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefOrgChart } from "../thunks/ChiefOrgChartThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefOrgChartSlice = createSlice({
    name: "chiefOrgChart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefOrgChart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefOrgChart.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefOrgChart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefOrgChartSlice.reducer;
