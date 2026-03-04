import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefManageMyTeam } from "../thunks/ChiefManageMyTeamThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefManageMyTeamSlice = createSlice({
    name: "chiefManageMyTeam",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefManageMyTeam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefManageMyTeam.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefManageMyTeam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefManageMyTeamSlice.reducer;
