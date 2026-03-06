import { createAsyncThunk } from "@reduxjs/toolkit";
import hrOffBoardingApi from "../../../../api/hrApi/HrOffBoardingApi";

// Get employees by department
export const getEmployeesByDepartment = createAsyncThunk(
  "hrOffBoarding/getEmployeesByDepartment",
  async (department, { rejectWithValue }) => {
    try {
      const response = await hrOffBoardingApi.getEmployeesByDepartment(department);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching employees");
    }
  }
);

// Get employee by ID
export const getEmployeeById = createAsyncThunk(
  "hrOffBoarding/getEmployeeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await hrOffBoardingApi.getEmployeeById(id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching employee");
    }
  }
);

// Search employees by name
export const searchEmployeesByName = createAsyncThunk(
  "hrOffBoarding/searchEmployeesByName",
  async (search, { rejectWithValue }) => {
    try {
      const response = await hrOffBoardingApi.searchEmployeesByName(search);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error searching employees");
    }
  }
);
export const updateOffboarding = createAsyncThunk(
  "hrOffBoarding/updateOffboarding",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await hrOffBoardingApi.updateOffboarding(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error updating offboarding"
      );
    }
  }
);
export const completeOffboarding = createAsyncThunk(
  "hrOffBoarding/completeOffboarding",
  async (id, { rejectWithValue }) => {
    try {
      const response = await hrOffBoardingApi.completeOffboarding(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error completing offboarding"
      );
    }
  }
);
const hrOffBoardingThunk = {
  getEmployeesByDepartment,
  getEmployeeById,
  searchEmployeesByName,
  updateOffboarding,
  completeOffboarding, 
};

export default hrOffBoardingThunk;