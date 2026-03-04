import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefTimeSheetApproval } from "../thunks/ChiefTimeSheetApprovalThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefTimeSheetApprovalSlice = createSlice({
    name: "chiefTimeSheetApproval",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefTimeSheetApproval.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefTimeSheetApproval.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefTimeSheetApproval.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefTimeSheetApprovalSlice.reducer;
