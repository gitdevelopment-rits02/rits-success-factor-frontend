import { createAsyncThunk } from "@reduxjs/toolkit";

import superAdminPolicyApi from "../../../../api/superAdminApi/SuperAdminPolicyApi";

const superAdminPolicyThunk = {
  createPolicy: createAsyncThunk(
    "superAdminPolicy/createPolicy",
    async (payload, { rejectWithValue }) => {
      try {
        const res = await superAdminPolicyApi.createPolicyApi(payload);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    },
  ),

  getPolicies: createAsyncThunk(
    "superAdminPolicy/getPolicies",
    async (_, { rejectWithValue }) => {
      try {
        const res = await superAdminPolicyApi.getPoliciesApi();
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    },
  ),

  getPolicyById: createAsyncThunk(
    "superAdminPolicy/getPolicyById",
    async (id, { rejectWithValue }) => {
      try {
        const res = await superAdminPolicyApi.getPolicyByIdApi(id);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    },
  ),

  updatePolicy: createAsyncThunk(
    "superAdminPolicy/updatePolicy",
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const res = await superAdminPolicyApi.updatePolicyApi(id, data);
        return res.data.data; // 👈 return ONLY policy
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    },
  ),

  deletePolicy: createAsyncThunk(
    "superAdminPolicy/deletePolicy",
    async (id, { rejectWithValue }) => {
      try {
        await superAdminPolicyApi.deletePolicyApi(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    },
  ),
};
export default superAdminPolicyThunk;
