import { createSlice } from "@reduxjs/toolkit";
import hrCalenderThunk from "../thunks/HrCalenderThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrCalenderSlice = createSlice({
    name: "hrCalender",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrCalenderSlice.reducer;
