import { createSlice } from "@reduxjs/toolkit";
import employeeGrowthPortfolioThunk from "../thunks/EmployeeGrowthPortfolioThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const employeeGrowthPortfolioSlice = createSlice({
  name: "employeeGrowthPortfolio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default employeeGrowthPortfolioSlice.reducer;
