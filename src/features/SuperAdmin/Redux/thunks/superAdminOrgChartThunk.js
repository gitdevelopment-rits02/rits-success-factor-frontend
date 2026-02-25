import { createAsyncThunk } from "@reduxjs/toolkit";
import superAdminOrgChartApi from "../../../../api/superAdminApi/SuperAdminOrgChartApi";

const superAdminOrgChartThunk = {};

superAdminOrgChartThunk.getOrgChartThunk = createAsyncThunk(
    "superAdminOrgChart/getOrgChart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await superAdminOrgChartApi.getOrgChartApi();
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch organization chart"
            );
        }
    }
);

export default superAdminOrgChartThunk;
