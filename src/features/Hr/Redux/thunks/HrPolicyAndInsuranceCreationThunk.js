
import { createAsyncThunk } from "@reduxjs/toolkit";
import hrPolicyAndInsuranceCreationApi from "../../../../api/hrApi/HrPolicyAndInsuranceCreationApi";

const hrPolicyAndInsuranceCreationThunk = {};

// ✅ CREATE
hrPolicyAndInsuranceCreationThunk.createPolicyThunk =
  createAsyncThunk(
    "hrPolicy/create",
    async (formData, { rejectWithValue }) => {
      try {
        const response =
          await hrPolicyAndInsuranceCreationApi.createPolicy(formData);

        // return ONLY created object
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response?.data);
      }
    }
  );

// ✅ GET ALL
hrPolicyAndInsuranceCreationThunk.getPoliciesThunk =
  createAsyncThunk(
    "hrPolicy/getAll",
    async (_, { rejectWithValue }) => {
      try {
        const response =
          await hrPolicyAndInsuranceCreationApi.getPolicies();
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response?.data);
      }
    }
  );

// ✅ UPDATE
hrPolicyAndInsuranceCreationThunk.updatePolicyThunk =
  createAsyncThunk(
    "hrPolicy/update",
    async ({ id, formData }, { rejectWithValue }) => {
      try {
        const response =
          await hrPolicyAndInsuranceCreationApi.updatePolicy(id, formData);

        // return updated object only
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response?.data);
      }
    }
  );

// ✅ DELETE
hrPolicyAndInsuranceCreationThunk.deletePolicyThunk =
  createAsyncThunk(
    "hrPolicy/delete",
    async (id, { rejectWithValue }) => {
      try {
        await hrPolicyAndInsuranceCreationApi.deletePolicy(id);

        // return deleted id
        return id;
      } catch (error) {
        return rejectWithValue(error.response?.data);
      }
    }
  );

export default hrPolicyAndInsuranceCreationThunk;