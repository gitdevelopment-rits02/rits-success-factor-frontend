import { createAsyncThunk } from "@reduxjs/toolkit";
import superAdminOrgChartApi from "../../../../api/superAdminApi/SuperAdminOrgChartApi";

const superAdminOrgChartThunk = {
    getOrgChart: createAsyncThunk(
        "superAdminOrgChart/getOrgChart",
        async (_, { rejectWithValue }) => {
            try {
                const res = await superAdminOrgChartApi.getOrgChart();
                return res.data;
            } catch (error) {
                return rejectWithValue(error.response?.data || error.message);
            }
        }
    ),
};

export default superAdminOrgChartThunk;
