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
        builder;
    },
});

export default managerViewMyProfileSlice.reducer;
