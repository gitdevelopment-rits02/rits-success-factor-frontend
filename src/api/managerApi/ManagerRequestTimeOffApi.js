// import axiosInstance from "../axiosInstance";

// const managerRequestTimeOffApi = {};

// export default managerRequestTimeOffApi;


import axiosInstance from "../axiosInstance";

const managerRequestTimeOffApi = {
  // CREATE LEAVE
  createLeave: (data) =>
    axiosInstance.post("/manager/request-time-off", data),

  // GET HISTORY
  getHistory: (status) =>
    axiosInstance.get("/manager/request-time-off/history", {
      params: status ? { status } : {},
    }),

  // GET SUMMARY
  getSummary: () =>
    axiosInstance.get("/manager/request-time-off/summary"),
};

export default managerRequestTimeOffApi;

