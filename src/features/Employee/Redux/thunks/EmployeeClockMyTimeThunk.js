import { createAsyncThunk } from "@reduxjs/toolkit";
import employeeClockMyTimeApi from "../../../../api/employeeApi/EmployeeClockMyTimeApi";

const employeeClockMyTimeThunk = {

  // CLOCK IN
  clockIn: createAsyncThunk(
    "employeeClockMyTime/clockIn",
    async (_, { rejectWithValue }) => {
      try {
        const res = await employeeClockMyTimeApi.clockIn();
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message);
      }
    }
  ),

  // CLOCK OUT
  clockOut: createAsyncThunk(
    "employeeClockMyTime/clockOut",
    async (_, { rejectWithValue }) => {
      try {
        const res = await employeeClockMyTimeApi.clockOut();
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message);
      }
    }
  ),

  // ✅ GET CALENDAR
  getCalendar: createAsyncThunk(
    "employeeClockMyTime/getCalendar",
    async (date, { rejectWithValue }) => {
      try {
        const res = await employeeClockMyTimeApi.getCalendar(date);
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message);
      }
    }
  ),
};

export default employeeClockMyTimeThunk;
