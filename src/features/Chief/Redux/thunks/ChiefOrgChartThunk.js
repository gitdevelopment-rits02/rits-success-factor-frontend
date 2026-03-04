import { createAsyncThunk } from "@reduxjs/toolkit";
// import chiefOrgChartApi from "../../../../api/chiefApi/ChiefOrgChartApi";

export const fetchChiefOrgChart = createAsyncThunk(
    "chiefOrgChart/fetchChiefOrgChart",
    async (_, { rejectWithValue }) => {
        try {
            // const data = await chiefOrgChartApi.getOrgChart();
            // return data;
            return {}; // Placeholder
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Something went wrong"
            );
        }
    }
);
