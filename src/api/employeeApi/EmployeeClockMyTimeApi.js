import axiosInstance from "../axiosInstance";

const employeeClockMyTimeApi = {

  // Clock In
  clockIn: () => axiosInstance.post("/employee/my-time/clock-in"),

  // Clock Out
  clockOut: () => axiosInstance.post("/employee/my-time/clock-out"),

  // ✅ Get Calendar Summary
  getCalendar: (date) =>
    axiosInstance.get(`/employee/my-time/calendar?date=${date}`),
};

export default employeeClockMyTimeApi;
