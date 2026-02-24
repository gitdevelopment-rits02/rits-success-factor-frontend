import { createSlice } from "@reduxjs/toolkit";
import managerOrgChartThunk from "../thunks/ManagerOrgChartThunk";

const initialState = {
    loading: false,
    data: [],
    error: null,
};

const managerOrgChartSlice = createSlice({
    name: "managerOrgChart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(managerOrgChartThunk.getOrgChart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(managerOrgChartThunk.getOrgChart.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(managerOrgChartThunk.getOrgChart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default managerOrgChartSlice.reducer;
