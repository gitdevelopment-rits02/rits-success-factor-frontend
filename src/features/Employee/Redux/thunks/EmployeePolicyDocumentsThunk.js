import { createAsyncThunk } from "@reduxjs/toolkit";
import EmployeePolicyDocumentsApi from "../../../../api/employeeApi/EmployeePolicyDocumentsApi";
 
// Get all policies
export const getEmployeePolicies = createAsyncThunk(
  "employeePolicyDocuments/getEmployeePolicies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await EmployeePolicyDocumentsApi.getPolicies();
 
      console.log("API response:", response);
 
      return response.data;   // ✅ this is the ARRAY
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch policies"
      );
    }
  }
);
 
 
export const getEmployeePolicyById = createAsyncThunk(
  "employeePolicyDocuments/getEmployeePolicyById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await EmployeePolicyDocumentsApi.getPolicyById(id);
 
      console.log("Policy By ID API response:", response);
 
      // ✅ Return only the actual policy object
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch policy details"
      );
    }
  }
);