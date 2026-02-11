import { createSlice } from "@reduxjs/toolkit";
import employeeTimeSheetThunk from "../thunks/EmployeeTimeSheetThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const employeeTimeSheetSlice = createSlice({
  name: "employeeTimeSheet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default employeeTimeSheetSlice.reducer;
