import { createAsyncThunk } from "@reduxjs/toolkit";
import managerOrgChartApi from "../../../../api/managerApi/ManagerOrgChartApi";

const managerOrgChartThunk = {
    getOrgChart: createAsyncThunk(
        "managerOrgChart/getOrgChart",
        async (_, { rejectWithValue }) => {
            try {
                const res = await managerOrgChartApi.getOrgChart();
                return res.data;
            } catch (error) {
                return rejectWithValue(error.response?.data || error.message);
            }
        }
    ),
};

export default managerOrgChartThunk;
