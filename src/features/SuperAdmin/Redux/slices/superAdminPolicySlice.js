import { createSlice } from "@reduxjs/toolkit";
import superAdminPolicyThunk from "../thunks/superAdminPolicyThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const superAdminPolicySlice = createSlice({
  name: "superAdminPolicy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default superAdminPolicySlice.reducer;
