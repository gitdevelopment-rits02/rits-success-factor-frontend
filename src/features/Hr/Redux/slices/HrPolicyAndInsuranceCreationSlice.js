
import { createSlice } from "@reduxjs/toolkit";
import hrPolicyAndInsuranceCreationThunk from "../thunks/HrPolicyAndInsuranceCreationThunk";

const initialState = {
  loading: false,
  policies: [],
  error: null,
};

const hrPolicyAndInsuranceCreationSlice = createSlice({
  name: "hrPolicyAndInsuranceCreation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ✅ GET
      .addCase(
        hrPolicyAndInsuranceCreationThunk.getPoliciesThunk.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        hrPolicyAndInsuranceCreationThunk.getPoliciesThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.policies = action.payload; // ✅ FIXED (removed .data)
        }
      )
      .addCase(
        hrPolicyAndInsuranceCreationThunk.getPoliciesThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ✅ CREATE
      .addCase(
        hrPolicyAndInsuranceCreationThunk.createPolicyThunk.fulfilled,
        (state, action) => {
          state.policies.push(action.payload); // ✅ FIXED
        }
      )

      // ✅ UPDATE
      .addCase(
        hrPolicyAndInsuranceCreationThunk.updatePolicyThunk.fulfilled,
        (state, action) => {
          const updated = action.payload; // ✅ FIXED
          state.policies = state.policies.map((p) =>
            p._id === updated._id ? updated : p
          );
        }
      )

      // ✅ DELETE
      .addCase(
        hrPolicyAndInsuranceCreationThunk.deletePolicyThunk.fulfilled,
        (state, action) => {
          state.policies = state.policies.filter(
            (p) => p._id !== action.payload
          );
        }
      );
  },
});

export default hrPolicyAndInsuranceCreationSlice.reducer;