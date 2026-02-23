import { createSlice } from "@reduxjs/toolkit";
import hrNotificationThunk from "../thunks/HrNotificationThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrNotificationSlice = createSlice({
    name: "hrNotification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrNotificationSlice.reducer;
