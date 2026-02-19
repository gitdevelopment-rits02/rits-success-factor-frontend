import { createSlice } from "@reduxjs/toolkit";
import managerClockMyTimeThunk from "../thunks/ManagerClockMyTimeThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const managerClockMyTimeSlice = createSlice({
  name: "managerClockMyTime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // =========================
      // CLOCK IN
      // =========================
      .addCase(managerClockMyTimeThunk.clockIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(managerClockMyTimeThunk.clockIn.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(managerClockMyTimeThunk.clockIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Clock In Failed";
      })

      // =========================
      // CLOCK OUT
      // =========================
      .addCase(managerClockMyTimeThunk.clockOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(managerClockMyTimeThunk.clockOut.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(managerClockMyTimeThunk.clockOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Clock Out Failed";
      })

      // =========================
      // GET CALENDAR
      // =========================
      .addCase(managerClockMyTimeThunk.getCalendar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(managerClockMyTimeThunk.getCalendar.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(managerClockMyTimeThunk.getCalendar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load calendar";
      });
  },
});

export default managerClockMyTimeSlice.reducer;
