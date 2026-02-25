import { createSlice } from "@reduxjs/toolkit";
import superAdminOrgChartThunk from "../thunks/superAdminOrgChartThunk";

const initialState = {
    getOrgChartLoading: false,
    orgChartData: [],
    getOrgChartError: null,
};

const superAdminOrgChartSlice = createSlice({
    name: "superAdminOrgChart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(superAdminOrgChartThunk.getOrgChartThunk.pending, (state) => {
                state.getOrgChartLoading = true;
                state.getOrgChartError = null;
            })
            .addCase(superAdminOrgChartThunk.getOrgChartThunk.fulfilled, (state, action) => {
                state.getOrgChartLoading = false;
                state.orgChartData = action.payload;
            })
            .addCase(superAdminOrgChartThunk.getOrgChartThunk.rejected, (state, action) => {
                state.getOrgChartLoading = false;
                state.getOrgChartError = action.payload;
            });
    },
});

export default superAdminOrgChartSlice.reducer;
