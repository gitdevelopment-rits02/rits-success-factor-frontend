import { createSlice } from "@reduxjs/toolkit";
import hrOffBoardingThunk from "../thunks/HrOffBoardingThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrOffBoardingSlice = createSlice({
    name: "hrOffBoarding",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrOffBoardingSlice.reducer;
