import { createSlice } from "@reduxjs/toolkit";
import superAdminAdminManagementThunk from "../thunks/superAdminAdminManagementThunk";
 
const initialState = {
  loading: false,
  data: [],
  total: 0,
  totalPages: 1,
  page: 1,
  limit: 10,
  error: null,
};
 
const superAdminAdminManagementSlice = createSlice({
  name: "superAdminAdminManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(superAdminAdminManagementThunk.getAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     
   .addCase(
  superAdminAdminManagementThunk.getAdmins.fulfilled,
  (state, action) => {
    state.loading = false;

    state.data = action.payload.admins;
    state.total = action.payload.total;
    state.totalPages = action.payload.totalPages;
    state.page = action.payload.page;
    state.limit = action.payload.limit;

    state.error = null;
  }
)

 
.addCase(
  superAdminAdminManagementThunk.getAdmins.rejected,
  (state, action) => {
    state.loading = false;    
    state.error = action.payload || "Failed to fetch admins";
  }
)
 
      // CREATE
      .addCase(
        superAdminAdminManagementThunk.createAdmin.fulfilled,
        (state, action) => {
          state.data.unshift(action.payload);
          state.total += 1;
        }
      )
 
      // UPDATE
      .addCase(
        superAdminAdminManagementThunk.updateAdmin.fulfilled,
        (state, action) => {
          const index = state.data.findIndex(
            (admin) => admin._id === action.payload._id
          );
          if (index !== -1) {
            state.data[index] = action.payload;
          }
        }
      )
 
      // DELETE
      .addCase(
        superAdminAdminManagementThunk.deleteAdmin.fulfilled,
        (state, action) => {
          state.data = state.data.filter(
            (admin) => admin._id !== action.payload
          );
          state.total -= 1;
        }
      );
  },
});
 
export default superAdminAdminManagementSlice.reducer;
