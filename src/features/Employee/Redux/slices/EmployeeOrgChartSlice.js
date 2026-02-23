import { createSlice } from "@reduxjs/toolkit";
import employeeOrgChartThunk from "../thunks/EmployeeOrgChartThunk";

const initialState = {
    loading: false,
    data: [],
    error: null,
};

const employeeOrgChartSlice = createSlice({
    name: "employeeOrgChart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(employeeOrgChartThunk.getOrgChart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(employeeOrgChartThunk.getOrgChart.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(employeeOrgChartThunk.getOrgChart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default employeeOrgChartSlice.reducer;
