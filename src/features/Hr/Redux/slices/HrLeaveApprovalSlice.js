import { createSlice } from "@reduxjs/toolkit";
import hrLeaveApprovalThunk from "../thunks/HrLeaveApprovalThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrLeaveApprovalSlice = createSlice({
    name: "hrLeaveApproval",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrLeaveApprovalSlice.reducer;
