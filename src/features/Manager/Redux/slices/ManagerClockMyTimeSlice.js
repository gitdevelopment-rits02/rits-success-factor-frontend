import { createSlice } from "@reduxjs/toolkit";
import managerClockMyTimeThunk from "../thunks/ManagerClockMyTimeThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerClockMyTimeSlice = createSlice({
    name: "managerClockMyTime",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default managerClockMyTimeSlice.reducer;
