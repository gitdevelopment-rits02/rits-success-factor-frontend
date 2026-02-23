import { createSlice } from "@reduxjs/toolkit";
import hrPolicyDocumentsThunk from "../thunks/HrPolicyDocumentsThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrPolicyDocumentsSlice = createSlice({
    name: "hrPolicyDocuments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrPolicyDocumentsSlice.reducer;
