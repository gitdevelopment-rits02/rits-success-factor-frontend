import axiosInstance from "../axiosInstance";

const managerClockMyTimeApi = {

  // Clock In
  clockIn: () => axiosInstance.post("/manager/my-time/clock-in"),

  // Clock Out
  clockOut: () => axiosInstance.post("/manager/my-time/clock-out"),

  // Get Calendar
  getCalendar: (date) =>
    axiosInstance.get(`/manager/my-time/calendar?date=${date}`),
};

export default managerClockMyTimeApi;