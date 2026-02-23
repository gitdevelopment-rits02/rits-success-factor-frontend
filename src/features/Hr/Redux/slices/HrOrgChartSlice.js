import { createSlice } from "@reduxjs/toolkit";
import hrOrgChartThunk from "../thunks/HrOrgChartThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrOrgChartSlice = createSlice({
    name: "hrOrgChart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrOrgChartSlice.reducer;
