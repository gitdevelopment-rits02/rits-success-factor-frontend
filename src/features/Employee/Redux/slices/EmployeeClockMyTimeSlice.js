import { createSlice } from "@reduxjs/toolkit";
import employeeClockMyTimeThunk from "../thunks/EmployeeClockMyTimeThunk";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const employeeClockMyTimeSlice = createSlice({
  name: "employeeClockMyTime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // =========================
      // CLOCK IN
      // =========================
      .addCase(employeeClockMyTimeThunk.clockIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(employeeClockMyTimeThunk.clockIn.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(employeeClockMyTimeThunk.clockIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Clock In Failed";
      })

      // =========================
      // CLOCK OUT
      // =========================
      .addCase(employeeClockMyTimeThunk.clockOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(employeeClockMyTimeThunk.clockOut.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(employeeClockMyTimeThunk.clockOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Clock Out Failed";
      })
      // =========================
// GET CALENDAR
// =========================
.addCase(employeeClockMyTimeThunk.getCalendar.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(employeeClockMyTimeThunk.getCalendar.fulfilled, (state, action) => {
  state.loading = false;
  state.data = action.payload;
})

.addCase(employeeClockMyTimeThunk.getCalendar.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || "Failed to load calendar";
});

  },
});

export default employeeClockMyTimeSlice.reducer;