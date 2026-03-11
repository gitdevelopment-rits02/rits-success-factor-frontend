import { createSlice } from "@reduxjs/toolkit";
import hrOurOrganizationThunk from "../thunks/HrOurOrganizationThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrOurOrganizationSlice = createSlice({
    name: "hrOurOrganization",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrOurOrganizationSlice.reducer;
