import { createSlice } from "@reduxjs/toolkit";
import employeeOrgChartThunk from "../thunks/EmployeeOrgChartThunk";

const initialState = {
    getOrgChartLoading: false,
    orgChartData: [],
    getOrgChartError: null,
};

const employeeOrgChartSlice = createSlice({
    name: "employeeOrgChart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(employeeOrgChartThunk.getOrgChartThunk.pending, (state) => {
                state.getOrgChartLoading = true;
                state.getOrgChartError = null;
            })
            .addCase(employeeOrgChartThunk.getOrgChartThunk.fulfilled, (state, action) => {
                state.getOrgChartLoading = false;
                state.orgChartData = action.payload;
            })
            .addCase(employeeOrgChartThunk.getOrgChartThunk.rejected, (state, action) => {
                state.getOrgChartLoading = false;
                state.getOrgChartError = action.payload;
            });
    },
});

export default employeeOrgChartSlice.reducer;
