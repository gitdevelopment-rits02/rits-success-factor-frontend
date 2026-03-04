// import { createSlice } from "@reduxjs/toolkit";
// import managerPolicyDocumentsThunk from "../thunks/ManagerPolicyDocumentsThunk";

// const initialState = {
//     loading: false,
//     data: null,
//     error: null,
// };

// const managerPolicyDocumentsSlice = createSlice({
//     name: "managerPolicyDocuments",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder;
//     },
// });

// export default managerPolicyDocumentsSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import managerPolicyDocumentsThunk from "../thunks/ManagerPolicyDocumentsThunk";

// const initialState = {
//     loading: false,
//     data: null,
//     error: null,
// };

// const managerPolicyDocumentsSlice = createSlice({
//     name: "managerPolicyDocuments",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder;
//     },
// });

// export default managerPolicyDocumentsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  getAllManagerPolicyDocuments,
  getManagerPolicyById,
} from "../thunks/ManagerPolicyDocumentsThunk";

const initialState = {
  loading: false,
  data: [],              // All policies
  selectedPolicy: null,  // Single policy
  error: null,
};

const managerPolicyDocumentsSlice = createSlice({
  name: "managerPolicyDocuments",
  initialState,
  reducers: {
    clearSelectedPolicy: (state) => {
      state.selectedPolicy = null;
    },
  },
  extraReducers: (builder) => {
    builder

      
      // GET ALL POLICIES
      
      .addCase(getAllManagerPolicyDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllManagerPolicyDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;   // Store policies array
      })
      .addCase(getAllManagerPolicyDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      
      // GET POLICY BY ID
      
      .addCase(getManagerPolicyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getManagerPolicyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPolicy = action.payload;  // Store single policy
      })
      .addCase(getManagerPolicyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearSelectedPolicy } =
  managerPolicyDocumentsSlice.actions;

export default managerPolicyDocumentsSlice.reducer;
 