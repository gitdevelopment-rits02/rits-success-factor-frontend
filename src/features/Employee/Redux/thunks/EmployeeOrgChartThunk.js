import { createAsyncThunk } from "@reduxjs/toolkit";
import employeeOrgChartApi from "../../../../api/employeeApi/EmployeeOrgChartApi";

const employeeOrgChartThunk = {
    getOrgChart: createAsyncThunk(
        "employeeOrgChart/getOrgChart",
        async (_, { rejectWithValue }) => {
            try {
                const res = await employeeOrgChartApi.getOrgChart();
                return res.data;
            } catch (error) {
                return rejectWithValue(error.response?.data || error.message);
            }
        }
    ),
};

export default employeeOrgChartThunk;
