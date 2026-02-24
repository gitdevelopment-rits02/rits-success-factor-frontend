import { createSlice } from "@reduxjs/toolkit";
import superAdminOrgChartThunk from "../thunks/superAdminOrgChartThunk";

const initialState = {
    loading: false,
    data: [],
    error: null,
};

const superAdminOrgChartSlice = createSlice({
    name: "superAdminOrgChart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(superAdminOrgChartThunk.getOrgChart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(superAdminOrgChartThunk.getOrgChart.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(superAdminOrgChartThunk.getOrgChart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default superAdminOrgChartSlice.reducer;
