import { createAsyncThunk } from "@reduxjs/toolkit";
import hrOrgChartApi from "../../../../api/hrApi/HrOrgChartApi";

const hrOrgChartThunk = {};

hrOrgChartThunk.getOrgChartThunk = createAsyncThunk(
    "hrOrgChart/getOrgChart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await hrOrgChartApi.getOrgChartApi();
            return response.data.data;  // assumes API returns { success, data: [...] }
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch organization chart"
            );
        }
    }
);

export default hrOrgChartThunk;