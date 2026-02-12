import { createSlice } from "@reduxjs/toolkit";
import managerPayslipsThunk from "../thunks/ManagerPayslipsThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerPayslipsSlice = createSlice({
    name: "managerPayslips",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default managerPayslipsSlice.reducer;
