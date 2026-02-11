import { createSlice } from "@reduxjs/toolkit";
import employeeNotificationThunk from "../thunks/EmployeeNotificationThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const employeeNotificationSlice = createSlice({
  name: "employeeNotification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default employeeNotificationSlice.reducer;
