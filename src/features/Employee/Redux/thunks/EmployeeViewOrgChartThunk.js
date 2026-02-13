import { createAsyncThunk } from "@reduxjs/toolkit";
import employeeViewOrgChartApi from "../../../../api/employeeApi/EmployeeViewOrgChartApi";

const employeeViewOrgChartThunk = createAsyncThunk(
    "employeeViewOrgChart/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await employeeViewOrgChartApi.getOrgChart();
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch employee org chart"
            );
        }
    }
);

export default employeeViewOrgChartThunk;

