import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefAdminCreation } from "../thunks/ChiefAdminCreationThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefAdminCreationSlice = createSlice({
    name: "chiefAdminCreation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefAdminCreation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefAdminCreation.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefAdminCreation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefAdminCreationSlice.reducer;
