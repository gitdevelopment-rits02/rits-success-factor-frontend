import { createAsyncThunk } from "@reduxjs/toolkit";
import managerPolicyDocumentsApi from "../../../../api/managerApi/ManagerPolicyDocumentsApi";

// GET ALL POLICIES
export const getAllManagerPolicyDocuments = createAsyncThunk(
  "managerPolicyDocuments/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await managerPolicyDocumentsApi.getAllPolicyDocuments();

      // res = { success: true, message, data: [...] }
      return res.data;   

    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

// GET POLICY BY ID
export const getManagerPolicyById = createAsyncThunk(
  "managerPolicyDocuments/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await managerPolicyDocumentsApi.getPolicyById(id);

      // res = { success: true, data: {...} }
      return res.data;  

    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);