import { createSlice } from "@reduxjs/toolkit";
import { fetchChiefGrowthPortfolio } from "../thunks/ChiefGrowthPortfolioThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const chiefGrowthPortfolioSlice = createSlice({
    name: "chiefGrowthPortfolio",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChiefGrowthPortfolio.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChiefGrowthPortfolio.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchChiefGrowthPortfolio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default chiefGrowthPortfolioSlice.reducer;
