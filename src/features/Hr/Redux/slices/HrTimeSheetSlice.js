import { createSlice } from "@reduxjs/toolkit";
import hrTimeSheetThunk from "../thunks/HrTimeSheetThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrTimeSheetSlice = createSlice({
    name: "hrTimeSheet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrTimeSheetSlice.reducer;
