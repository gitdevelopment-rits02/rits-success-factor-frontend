import { createSlice } from "@reduxjs/toolkit";
import hrOnboardingThunk from "../thunks/HrOnboardingThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrOnboardingSlice = createSlice({
    name: "hrOnboarding",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrOnboardingSlice.reducer;
