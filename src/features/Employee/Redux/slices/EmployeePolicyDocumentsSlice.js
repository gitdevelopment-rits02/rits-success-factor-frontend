import { createSlice } from "@reduxjs/toolkit";
import {
  getEmployeePolicies,
  getEmployeePolicyById,
} from "../thunks/EmployeePolicyDocumentsThunk";

const initialState = {
  policies: [],
  selectedPolicy: null,
  loading: false,
  error: null,
};

const employeePolicyDocumentsSlice = createSlice({
  name: "employeePolicyDocuments",
  initialState: {
    policies: [],
    selectedPolicy: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearSelectedPolicy: (state) => {
      state.selectedPolicy = null;
    },
    setSelectedPolicy: (state, action) => {
      state.selectedPolicy = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getEmployeePolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeePolicies.fulfilled, (state, action) => {
        state.loading = false;
        state.policies = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getEmployeePolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEmployeePolicyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeePolicyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPolicy = action.payload;
      })
      .addCase(getEmployeePolicyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedPolicy, setSelectedPolicy } =
  employeePolicyDocumentsSlice.actions;


export default employeePolicyDocumentsSlice.reducer;
