import { createSlice } from "@reduxjs/toolkit";
import managerLeaveApprovalThunk from "../thunks/ManagerLeaveApprovalThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerLeaveApprovalSlice = createSlice({
    name: "managerLeaveApproval",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default managerLeaveApprovalSlice.reducer;
