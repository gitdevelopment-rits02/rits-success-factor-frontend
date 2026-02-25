import { createSlice } from "@reduxjs/toolkit";
import hrClockMyTimeThunk from "../thunks/HrClockMyTimeThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrClockMyTimeSlice = createSlice({
    name: "hrClockMyTime",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrClockMyTimeSlice.reducer;
