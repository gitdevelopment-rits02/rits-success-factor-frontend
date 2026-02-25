import { createSlice } from "@reduxjs/toolkit";
import hrOrgChartThunk from "../thunks/HrOrgChartThunk";

const initialState = {
    getOrgChartLoading: false,
    orgChartData: [],
    getOrgChartError: null,
};

const hrOrgChartSlice = createSlice({
    name: "hrOrgChart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(hrOrgChartThunk.getOrgChartThunk.pending, (state) => {
                state.getOrgChartLoading = true;
                state.getOrgChartError = null;
            })
            .addCase(hrOrgChartThunk.getOrgChartThunk.fulfilled, (state, action) => {
                state.getOrgChartLoading = false;
                state.orgChartData = action.payload;
            })
            .addCase(hrOrgChartThunk.getOrgChartThunk.rejected, (state, action) => {
                state.getOrgChartLoading = false;
                state.getOrgChartError = action.payload;
            });
    },
});

export default hrOrgChartSlice.reducer;
