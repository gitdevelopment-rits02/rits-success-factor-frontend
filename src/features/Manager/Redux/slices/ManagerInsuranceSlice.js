import { createSlice } from "@reduxjs/toolkit";
import managerInsuranceThunk from "../thunks/ManagerInsuranceThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const managerInsuranceSlice = createSlice({
    name: "managerInsurance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default managerInsuranceSlice.reducer;
