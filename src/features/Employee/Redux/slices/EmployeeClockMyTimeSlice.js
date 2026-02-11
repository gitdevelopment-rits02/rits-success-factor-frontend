import { createSlice } from "@reduxjs/toolkit";
import employeeClockMyTimeThunk from "../thunks/EmployeeClockMyTimeThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const employeeClockMyTimeSlice = createSlice({
  name: "employeeClockMyTime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default employeeClockMyTimeSlice.reducer;
