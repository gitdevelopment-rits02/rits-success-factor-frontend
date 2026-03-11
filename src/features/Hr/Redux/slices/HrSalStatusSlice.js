import { createSlice } from "@reduxjs/toolkit";
import hrSalStatusThunk from "../thunks/HrSalStatusThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrSalStatusSlice = createSlice({
    name: "hrSalStatus",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrSalStatusSlice.reducer;
