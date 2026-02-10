import { createAsyncThunk } from "@reduxjs/toolkit";
import superAdminOrgChartApi from "../../../../api/superAdminApi/SuperAdminOrgChartApi";

const superAdminOrgChartThunk = createAsyncThunk(
  "superAdminOrgChart/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await superAdminOrgChartApi.getAllOrgChart();

      // ✅ Return ONLY employee array
      return response.data.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch org chart"
      );
    }
  }
);

export default superAdminOrgChartThunk;