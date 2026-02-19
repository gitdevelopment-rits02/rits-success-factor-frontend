import { createSlice } from "@reduxjs/toolkit";
import managerViewMyProfileThunk from "../thunks/ManagerViewMyProfileThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerViewMyProfileSlice = createSlice({
    name: "managerViewMyProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Pending
            .addCase(managerViewMyProfileThunk.viewMyProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // Fulfilled
            .addCase(managerViewMyProfileThunk.viewMyProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })

            // Rejected
            .addCase(managerViewMyProfileThunk.viewMyProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default managerViewMyProfileSlice.reducer;
 