import { createSlice } from "@reduxjs/toolkit";
import managerTaskAndProjectTrackingThunk from "../thunks/ManagerTaskAndProjectTrackingThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerTaskAndProjectTrackingSlice = createSlice({
    name: "managerTaskAndProjectTracking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default managerTaskAndProjectTrackingSlice.reducer;
