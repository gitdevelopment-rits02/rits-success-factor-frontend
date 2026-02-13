import { createSlice } from "@reduxjs/toolkit";
import managerTaskAssignmentThunk from "../thunks/ManagerTaskAssignmentThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerTaskAssignmentSlice = createSlice({
    name: "managerTaskAssignment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default managerTaskAssignmentSlice.reducer;
