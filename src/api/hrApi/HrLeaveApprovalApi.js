
import axiosInstance from "../axiosInstance";

const BASE_PATH = "/hr/timesheets";

const hrLeaveApi = {

  getAllLeaves: (params = {}) =>
    axiosInstance.get(BASE_PATH, { params }),

  //  FIXED
getOutToday: () =>
  axiosInstance.get("/hr/timesheets", {
    params: { dateFilter: "today" }
  }),

  //  FIXED (no backend endpoint)
  getSummary: () =>
    axiosInstance.get(BASE_PATH),

  approveLeave: (leaveId) =>
    axiosInstance.patch(`${BASE_PATH}/${leaveId}/status`, {
      status: "Approved"
    }),

  rejectLeave: (leaveId, rejectionReason) =>
    axiosInstance.patch(`${BASE_PATH}/${leaveId}/status`, {
      status: "Rejected",
      rejectionReason
    }),

  pendingLeave: (leaveId) =>
    axiosInstance.patch(`${BASE_PATH}/${leaveId}/status`, {
      status: "Pending"
    }),
};

export default hrLeaveApi;