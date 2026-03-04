import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefPayroll } from "../thunks/ChiefPayrollThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefPayrollSlice = createSlice({
    name: "chiefPayroll",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefPayroll.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefPayroll.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefPayroll.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefPayrollSlice.reducer;
