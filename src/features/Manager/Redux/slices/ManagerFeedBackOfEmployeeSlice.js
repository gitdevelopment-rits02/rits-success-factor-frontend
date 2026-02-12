import { createSlice } from "@reduxjs/toolkit";
import managerFeedBackOfEmployeeThunk from "../thunks/ManagerFeedBackOfEmployeeThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerFeedBackOfEmployeeSlice = createSlice({
    name: "managerFeedBackOfEmployee",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default managerFeedBackOfEmployeeSlice.reducer;
