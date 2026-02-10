import { createSlice } from "@reduxjs/toolkit";
import employeeLearningThunk from "../thunks/EmployeeLearningThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const employeeLearningSlice = createSlice({
  name: "employeeLearning",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default employeeLearningSlice.reducer;
