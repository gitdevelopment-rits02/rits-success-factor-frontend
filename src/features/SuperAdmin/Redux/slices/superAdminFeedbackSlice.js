import { createSlice } from "@reduxjs/toolkit";
import superAdminFeedbackThunk from "../thunks/superAdminFeedbackThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const superAdminFeedbackSlice = createSlice({
  name: "superAdminFeedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default superAdminFeedbackSlice.reducer;
