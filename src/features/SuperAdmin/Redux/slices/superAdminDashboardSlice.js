import { createSlice } from "@reduxjs/toolkit";
import superAdminDashboardThunk from "../thunks/superAdminDashboardThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const superAdminDashboardSlice = createSlice({
  name: "superAdminDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    
  },
});

export default superAdminDashboardSlice.reducer;
