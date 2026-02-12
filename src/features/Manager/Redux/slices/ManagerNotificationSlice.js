import { createSlice } from "@reduxjs/toolkit";
import managerNotificationThunk from "../thunks/ManagerNotificationThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerNotificationSlice = createSlice({
    name: "managerNotification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default managerNotificationSlice.reducer;
