import { createSlice } from "@reduxjs/toolkit";
import managerRequestTimeOffThunk from "../thunks/ManagerRequestTimeOffThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerRequestTimeOffSlice = createSlice({
    name: "managerRequestTimeOff",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default managerRequestTimeOffSlice.reducer;
