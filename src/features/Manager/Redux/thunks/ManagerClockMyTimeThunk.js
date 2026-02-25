import { createAsyncThunk } from "@reduxjs/toolkit";
import managerClockMyTimeApi from "../../../../api/managerApi/ManagerClockMyTimeApi";

const managerClockMyTimeThunk = {

  // =========================
  // CLOCK IN
  // =========================
  clockIn: createAsyncThunk(
    "managerClockMyTime/clockIn",
    async (_, { rejectWithValue }) => {
      try {
        const res = await managerClockMyTimeApi.clockIn();
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message);
      }
    }
  ),

  // =========================
  // CLOCK OUT
  // =========================
  clockOut: createAsyncThunk(
    "managerClockMyTime/clockOut",
    async (_, { rejectWithValue }) => {
      try {
        const res = await managerClockMyTimeApi.clockOut();
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message);
      }
    }
  ),

  // =========================
  // GET CALENDAR
  // =========================
  getCalendar: createAsyncThunk(
    "managerClockMyTime/getCalendar",
    async (date, { rejectWithValue }) => {
      try {
        const res = await managerClockMyTimeApi.getCalendar(date);
        return res.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message);
      }
    }
  ),
};

export default managerClockMyTimeThunk;