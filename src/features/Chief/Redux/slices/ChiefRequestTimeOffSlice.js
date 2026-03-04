import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefRequestTimeOff } from "../thunks/ChiefRequestTimeOffThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefRequestTimeOffSlice = createSlice({
    name: "chiefRequestTimeOff",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefRequestTimeOff.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefRequestTimeOff.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefRequestTimeOff.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefRequestTimeOffSlice.reducer;
