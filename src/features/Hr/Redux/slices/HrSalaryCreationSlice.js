import { createSlice } from "@reduxjs/toolkit";
import hrSalaryCreationThunk from "../thunks/HrSalaryCreationThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrSalaryCreationSlice = createSlice({
    name: "hrSalaryCreation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrSalaryCreationSlice.reducer;
