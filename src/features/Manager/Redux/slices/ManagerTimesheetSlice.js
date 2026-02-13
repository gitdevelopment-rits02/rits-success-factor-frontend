import { createSlice } from "@reduxjs/toolkit";
import managerTimesheetThunk from "../thunks/ManagerTimesheetThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerTimesheetSlice = createSlice({
    name: "managerTimesheet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default managerTimesheetSlice.reducer;
