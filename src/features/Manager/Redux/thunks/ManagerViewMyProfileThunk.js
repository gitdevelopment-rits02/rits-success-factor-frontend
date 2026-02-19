import { createAsyncThunk } from "@reduxjs/toolkit";
import managerViewMyProfileApi from "../../../../api/managerApi/ManagerViewMyProfileApi";

const managerViewMyProfileThunk = {};

// View My Profile Thunk
managerViewMyProfileThunk.viewMyProfile = createAsyncThunk(
    "manager/viewMyProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await managerViewMyProfileApi.viewMyProfile();
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Something went wrong"
            );
        }
    }
);

export default managerViewMyProfileThunk;
