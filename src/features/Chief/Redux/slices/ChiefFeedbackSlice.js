import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefFeedback } from "../thunks/ChiefFeedbackThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefFeedbackSlice = createSlice({
    name: "chiefFeedback",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefFeedback.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefFeedback.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefFeedback.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefFeedbackSlice.reducer;
