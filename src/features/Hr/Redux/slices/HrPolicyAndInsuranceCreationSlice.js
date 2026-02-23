import { createSlice } from "@reduxjs/toolkit";
import hrPolicyAndInsuranceCreationThunk from "../thunks/HrPolicyAndInsuranceCreationThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrPolicyAndInsuranceCreationSlice = createSlice({
    name: "hrPolicyAndInsuranceCreation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrPolicyAndInsuranceCreationSlice.reducer;
