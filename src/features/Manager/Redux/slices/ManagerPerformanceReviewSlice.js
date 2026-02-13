import { createSlice } from "@reduxjs/toolkit";
import managerPerformanceReviewThunk from "../thunks/ManagerPerformanceReviewThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerPerformanceReviewSlice = createSlice({
    name: "managerPerformanceReview",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default managerPerformanceReviewSlice.reducer;
