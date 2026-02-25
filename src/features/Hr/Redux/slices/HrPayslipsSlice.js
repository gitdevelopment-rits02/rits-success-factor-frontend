import { createSlice } from "@reduxjs/toolkit";
import hrPayslipsThunk from "../thunks/HrPayslipsThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrPayslipsSlice = createSlice({
    name: "hrPayslips",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrPayslipsSlice.reducer;
