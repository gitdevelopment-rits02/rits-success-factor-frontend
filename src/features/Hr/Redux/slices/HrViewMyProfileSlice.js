import { createSlice } from "@reduxjs/toolkit";
import hrViewMyProfileThunk from "../thunks/HrViewMyProfileThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrViewMyProfileSlice = createSlice({
    name: "hrViewMyProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrViewMyProfileSlice.reducer;
