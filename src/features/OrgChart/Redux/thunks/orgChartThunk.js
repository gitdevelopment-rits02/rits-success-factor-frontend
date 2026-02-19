import { createAsyncThunk } from "@reduxjs/toolkit";
// import orgChartApi from "../../../api/orgChartApi";
import orgChartApi from "../../../../api/orgChartApi";

const orgChartThunk = createAsyncThunk(
    "orgChart/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await orgChartApi.getAllOrgChart();

            // Return employee array from data.data
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch org chart"
            );
        }
    }
);

export default orgChartThunk;
