import { createSlice } from "@reduxjs/toolkit";
import superAdminAdminManagementThunk from "../thunks/superAdminAdminManagementThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const superAdminAdminManagementSlice = createSlice({
  name: "superAdminAdminManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default superAdminAdminManagementSlice.reducer;
