import axiosInstance from "../axiosInstance";

const employeeRequestTimeOffApi = {
  // CREATE LEAVE
  createLeave: (payload) => {
    return axiosInstance.post(
      "/employee/request-time-off/request",
      payload
    );
  },

  // GET HISTORY
  getLeaveHistory: (status) => {
    return axiosInstance.get(
      `/employee/request-time-off/history${status ? `?status=${status}` : ""}`
    );
  },

  // GET SUMMARY
  getLeaveSummary: () => {
    return axiosInstance.get(
      "/employee/request-time-off/summary"
    );
  },
};

export default employeeRequestTimeOffApi;

