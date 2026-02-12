import { createAsyncThunk } from "@reduxjs/toolkit";
import employeeViewMyProfileApi from "../../../../api/employeeApi/EmployeeViewMyProfileApi";

// Correctly call the getProfile method
const employeeViewMyProfileThunk = createAsyncThunk(
  "employee/viewMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await employeeViewMyProfileApi.getProfile(); // ✅ Fix here
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch profile"
      );
    }
  }
);

export default employeeViewMyProfileThunk;
