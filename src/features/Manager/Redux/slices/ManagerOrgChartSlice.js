import { createSlice } from "@reduxjs/toolkit";
import managerOrgChartThunk from "../thunks/ManagerOrgChartThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerOrgChartSlice = createSlice({
    name: "managerOrgChart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default managerOrgChartSlice.reducer;
