import { createAsyncThunk } from "@reduxjs/toolkit";
import employeeOrgChartApi from "../../../../api/employeeApi/EmployeeOrgChartApi";

const employeeOrgChartThunk = {};

employeeOrgChartThunk.getOrgChartThunk = createAsyncThunk(
    "employeeOrgChart/getOrgChart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await employeeOrgChartApi.getOrgChartApi();
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch organization chart"
            );
        }
    }
);

export default employeeOrgChartThunk;
