import { createSlice } from "@reduxjs/toolkit";
import managerTimeSheetReviewThunk from "../thunks/ManagerTimeSheetReviewThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerTimeSheetReviewSlice = createSlice({
    name: "managerTimeSheetReview",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default managerTimeSheetReviewSlice.reducer;
