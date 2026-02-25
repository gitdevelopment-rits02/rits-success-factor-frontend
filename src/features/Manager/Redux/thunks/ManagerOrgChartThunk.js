import { createAsyncThunk } from "@reduxjs/toolkit";
import managerOrgChartApi from "../../../../api/managerApi/ManagerOrgChartApi";

const managerOrgChartThunk = {};

managerOrgChartThunk.getOrgChartThunk = createAsyncThunk(
    "managerOrgChart/getOrgChart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await managerOrgChartApi.getOrgChartApi();
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch organization chart"
            );
        }
    }
);

export default managerOrgChartThunk;
