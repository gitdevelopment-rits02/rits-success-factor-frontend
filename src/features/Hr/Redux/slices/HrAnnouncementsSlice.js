import { createSlice } from "@reduxjs/toolkit";
import hrAnnouncementsThunk from "../thunks/HrAnnouncementsThunk";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const hrAnnouncementsSlice = createSlice({
    name: "hrAnnouncements",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default hrAnnouncementsSlice.reducer;
