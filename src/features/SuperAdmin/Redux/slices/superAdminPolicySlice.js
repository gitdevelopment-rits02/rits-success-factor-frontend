import { createSlice } from "@reduxjs/toolkit";
import superAdminPolicyThunk from "../thunks/superAdminPolicyThunk";

const initialState = {
  loading: false,
  data: [], 
  error: null,
};

const superAdminPolicySlice = createSlice({
  name: "superAdminPolicy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // CREATE POLICY
      .addCase(superAdminPolicyThunk.createPolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        superAdminPolicyThunk.createPolicy.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data = [action.payload.data, ...state.data];
        },
      )
      .addCase(superAdminPolicyThunk.createPolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL POLICIES
      .addCase(superAdminPolicyThunk.getPolicies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(superAdminPolicyThunk.getPolicies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(superAdminPolicyThunk.getPolicies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE POLICY
      .addCase(superAdminPolicyThunk.updatePolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        superAdminPolicyThunk.updatePolicy.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data = state.data.map((p) =>
            p._id === action.payload._id ? action.payload : p,
          );
        },
      )
      .addCase(superAdminPolicyThunk.updatePolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE POLICY
      .addCase(superAdminPolicyThunk.deletePolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        superAdminPolicyThunk.deletePolicy.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data = state.data.filter((p) => p._id !== action.payload);
        },
      )
      .addCase(superAdminPolicyThunk.deletePolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default superAdminPolicySlice.reducer;
