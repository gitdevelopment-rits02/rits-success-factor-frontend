import { createSlice } from "@reduxjs/toolkit";
import orgChartThunk from "../thunks/orgChartThunk";

const initialState = {
    loading: false,
    data: [],
    error: null,
};

const orgChartSlice = createSlice({
    name: "orgChart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default orgChartSlice.reducer;
