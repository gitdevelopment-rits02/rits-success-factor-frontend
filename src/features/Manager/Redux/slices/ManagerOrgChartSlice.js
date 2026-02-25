import { createSlice } from "@reduxjs/toolkit";
import managerOrgChartThunk from "../thunks/ManagerOrgChartThunk";

const initialState = {
    getOrgChartLoading: false,
    orgChartData: [],
    getOrgChartError: null,
};

const managerOrgChartSlice = createSlice({
    name: "managerOrgChart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(managerOrgChartThunk.getOrgChartThunk.pending, (state) => {
                state.getOrgChartLoading = true;
                state.getOrgChartError = null;
            })
            .addCase(managerOrgChartThunk.getOrgChartThunk.fulfilled, (state, action) => {
                state.getOrgChartLoading = false;
                state.orgChartData = action.payload;
            })
            .addCase(managerOrgChartThunk.getOrgChartThunk.rejected, (state, action) => {
                state.getOrgChartLoading = false;
                state.getOrgChartError = action.payload;
            });
    },
});

export default managerOrgChartSlice.reducer;
