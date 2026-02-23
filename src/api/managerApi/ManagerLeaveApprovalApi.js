
import axiosInstance from "../axiosInstance";

const managerLeaveApprovalApi = {

  // Summary Cards API
  getLeaveSummary: async () => {
    const response = await axiosInstance.get(
      "/manager/leaveapproval/summary"
    );
    return response.data;
  },

  // Leave List API (with status filter)
  getLeaveList: async (status) => {
    const response = await axiosInstance.get(
      `/manager/leaveapproval`
    );
    return response.data;
  },

  // Approve / Reject API
  updateLeaveStatus: async (leaveId, action) => {
    const response = await axiosInstance.patch(
      `/manager/leaveapproval/${leaveId}/status`,
      { action }
    );
    return response.data;
  },
};

export default managerLeaveApprovalApi;
