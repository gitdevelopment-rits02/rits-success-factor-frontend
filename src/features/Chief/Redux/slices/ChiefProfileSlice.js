import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefProfile } from "../thunks/ChiefProfileThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefProfileSlice = createSlice({
    name: "chiefProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefProfileSlice.reducer;
