import { createSlice } from "@reduxjs/toolkit";
import employeePolicyDocumentsThunk from "../thunks/EmployeePolicyDocumentsThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const employeePolicyDocumentsSlice = createSlice({
  name: "employeePolicyDocuments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default employeePolicyDocumentsSlice.reducer;
