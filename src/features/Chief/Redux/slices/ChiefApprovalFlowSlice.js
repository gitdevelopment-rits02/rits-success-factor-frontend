import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefApprovalFlow } from "../thunks/ChiefApprovalFlowThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefApprovalFlowSlice = createSlice({
    name: "chiefApprovalFlow",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefApprovalFlow.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefApprovalFlow.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefApprovalFlow.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefApprovalFlowSlice.reducer;
