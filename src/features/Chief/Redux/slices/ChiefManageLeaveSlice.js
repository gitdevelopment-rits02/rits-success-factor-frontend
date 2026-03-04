import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefManageLeave } from "../thunks/ChiefManageLeaveThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefManageLeaveSlice = createSlice({
    name: "chiefManageLeave",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefManageLeave.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefManageLeave.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefManageLeave.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefManageLeaveSlice.reducer;
