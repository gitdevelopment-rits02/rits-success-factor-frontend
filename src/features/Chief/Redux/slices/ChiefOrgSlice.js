import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefOrg } from "../thunks/ChiefOrgThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefOrgSlice = createSlice({
    name: "chiefOrg",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefOrg.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefOrg.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefOrg.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefOrgSlice.reducer;
