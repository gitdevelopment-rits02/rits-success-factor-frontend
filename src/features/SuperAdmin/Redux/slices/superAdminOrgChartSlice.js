import { createSlice } from "@reduxjs/toolkit";
import superAdminOrgChartThunk from "../thunks/superAdminOrgChartThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const superAdminOrgChartSlice = createSlice({
  name: "superAdminOrgChart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default superAdminOrgChartSlice.reducer;
