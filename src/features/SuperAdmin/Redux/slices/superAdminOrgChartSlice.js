import { createSlice } from "@reduxjs/toolkit";
import superAdminOrgChartThunk from "../thunks/superAdminOrgChartThunk";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const superAdminOrgChartSlice = createSlice({
  name: "orgChart",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Loading
      .addCase(superAdminOrgChartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Success ✅
      .addCase(superAdminOrgChartThunk.fulfilled, (state, action) => {
        state.loading = false;

        console.log("REDUX DATA:", action.payload);

        // ✅ IMPORTANT FIX
        state.data = action.payload;
      })

      // Error
      .addCase(superAdminOrgChartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load org chart";
      });
  },
});

export default superAdminOrgChartSlice.reducer;