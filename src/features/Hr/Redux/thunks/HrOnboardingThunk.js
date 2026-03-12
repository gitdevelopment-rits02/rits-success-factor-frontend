import { createAsyncThunk } from "@reduxjs/toolkit";
import hrOnboardingApi from "../../../../api/hrApi/HrOnboardingApi";
 
 
// GET EMPLOYEES
 
export const getEmployeesThunk = createAsyncThunk(
  "hr/onboarding/getEmployees",
  async (filters, { rejectWithValue }) => {
    try {
      const response = await hrOnboardingApi.getEmployees(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employees"
      );
    }
  }
);
 
 
// DASHBOARD CARDS
 
export const getDashboardCardsThunk = createAsyncThunk(
  "hr/onboarding/getDashboardCards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await hrOnboardingApi.getDashboardCards();
      return response.data.data;   // because API returns { success, data }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard data"
      );
    }
  }
);
 
// GET SINGLE
 
export const getEmployeeByIdThunk = createAsyncThunk(
  "hr/onboarding/getEmployeeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await hrOnboardingApi.getEmployeeById(id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employee"
      );
    }
  }
);
 
 
// CREATE
 
export const createEmployeeThunk = createAsyncThunk(
  "hr/onboarding/createEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const response = await hrOnboardingApi.createEmployee(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create employee"
      );
    }
  }
);
 
 
// UPDATE EMPLOYEE
 
export const updateEmployeeThunk = createAsyncThunk(
  "hr/onboarding/updateEmployee",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await hrOnboardingApi.updateEmployee(id, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update employee"
      );
    }
  }
);
 
 
// UPDATE LEAVE
 
export const updateLeaveAllocationThunk = createAsyncThunk(
  "hr/onboarding/updateLeaveAllocation",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await hrOnboardingApi.updateLeaveAllocation(id, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to update leave allocation"
      );
    }
  }
);
 
 
// REPLACE DOCUMENT
 
export const replaceDocumentThunk = createAsyncThunk(
  "hr/onboarding/replaceDocument",
  async ({ employeeId, documentId, formData }, { rejectWithValue }) => {
    try {
      const response = await hrOnboardingApi.replaceDocument(
        employeeId,
        documentId,
        formData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to replace document"
      );
    }
  }
);
 
 
// RETURN ASSET
 
export const returnAssetThunk = createAsyncThunk(
  "hr/onboarding/returnAsset",
  async ({ employeeId, assetId }, { rejectWithValue }) => {
    try {
      const response = await hrOnboardingApi.returnAsset(
        employeeId,
        assetId
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to return asset"
      );
    }
  }
);
 
 
// UNDO RETURN ASSET
 
export const undoReturnAssetThunk = createAsyncThunk(
  "hr/onboarding/undoReturnAsset",
  async ({ employeeId, assetId }, { rejectWithValue }) => {
    try {
      const response = await hrOnboardingApi.undoReturnAsset(
        employeeId,
        assetId
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to undo asset return"
      );
    }
  }
);
 
 
// DELETE
 
export const deleteEmployeeThunk = createAsyncThunk(
  "hr/onboarding/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await hrOnboardingApi.deleteEmployee(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete employee"
      );
    }
  }
);
 