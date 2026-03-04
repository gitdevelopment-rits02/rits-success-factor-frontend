import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefPersonalTimeSheet } from "../thunks/ChiefPersonalTimeSheetThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefPersonalTimeSheetSlice = createSlice({
    name: "chiefPersonalTimeSheet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefPersonalTimeSheet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefPersonalTimeSheet.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefPersonalTimeSheet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefPersonalTimeSheetSlice.reducer;
