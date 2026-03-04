import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefAdminManagement } from "../thunks/ChiefAdminManagementThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefAdminManagementSlice = createSlice({
    name: "chiefAdminManagement",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefAdminManagement.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefAdminManagement.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefAdminManagement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefAdminManagementSlice.reducer;
