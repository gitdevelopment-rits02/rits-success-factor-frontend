import { createSlice } from "@reduxjs/toolkit";
import managerPolicyDocumentsThunk from "../thunks/ManagerPolicyDocumentsThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerPolicyDocumentsSlice = createSlice({
    name: "managerPolicyDocuments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default managerPolicyDocumentsSlice.reducer;
