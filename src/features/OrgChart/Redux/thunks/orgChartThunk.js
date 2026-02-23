import { createAsyncThunk } from "@reduxjs/toolkit";
import orgChartApi from "../../../../api/orgChartApi";

const orgChartThunk = createAsyncThunk(
    "orgChart/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await orgChartApi.getAllOrgChart();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export default orgChartThunk;
