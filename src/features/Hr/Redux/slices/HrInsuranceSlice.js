import { createSlice } from "@reduxjs/toolkit";
import hrInsuranceThunk from "../thunks/HrInsuranceThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrInsuranceSlice = createSlice({
    name: "hrInsurance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrInsuranceSlice.reducer;
