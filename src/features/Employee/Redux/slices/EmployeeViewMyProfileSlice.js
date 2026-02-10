import { createSlice } from "@reduxjs/toolkit";
import employeeViewMyProfileThunk from "../thunks/EmployeeViewMyProfileThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const employeeViewMyProfileSlice = createSlice({
  name: "employeeViewMyProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default employeeViewMyProfileSlice.reducer;
