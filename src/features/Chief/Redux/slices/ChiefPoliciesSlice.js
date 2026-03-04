import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefPolicies } from "../thunks/ChiefPoliciesThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefPoliciesSlice = createSlice({
    name: "chiefPolicies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefPolicies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefPolicies.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefPolicies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefPoliciesSlice.reducer;
