import axiosInstance from "../axiosInstance";

const superAdminFeedbackApi = {
  getOverview: () =>
  axiosInstance.get("/superadmin/feedback/overview"),

  // All HRs
  getAllHRs() {
  return axiosInstance.get("/superadmin/feedback/hr");
},

  // Managers under specific HR
  getManagersByHR(hrId) {
  return axiosInstance.get(
    `/superadmin/feedback/hr/${hrId}/managers`
  );
},

  // Feedback under specific Manager
  getFeedbackByManager(managerId) {
    return axiosInstance.get(`/superadmin/feedback/manager/${managerId}`,
    );
  },

  // Dashboard data
  getDashboard() {
  return axiosInstance.get("/superadmin/feedback/dashboard");
},
};

export default superAdminFeedbackApi;
 