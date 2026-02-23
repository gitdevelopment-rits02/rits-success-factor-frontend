import { createSlice } from "@reduxjs/toolkit";
import hrRequestTimeOffThunk from "../thunks/HrRequestTimeOffThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrRequestTimeOffSlice = createSlice({
    name: "hrRequestTimeOff",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrRequestTimeOffSlice.reducer;
