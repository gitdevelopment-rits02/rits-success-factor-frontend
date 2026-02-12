import { createSlice } from "@reduxjs/toolkit";
import employeeViewMyProfileThunk from "../thunks/EmployeeViewMyProfileThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
  message: "",
};

const employeeViewMyProfileSlice = createSlice({
  name: "employeeViewMyProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(employeeViewMyProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = "";
      })
      .addCase(employeeViewMyProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.data = action.payload.data; //  important: extract data key
      })
      .addCase(employeeViewMyProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";
        state.success = false;
      });
  },
});

export default employeeViewMyProfileSlice.reducer;
