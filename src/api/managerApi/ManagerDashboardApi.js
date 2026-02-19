import axiosInstance from "../axiosInstance";

const managerDashboardApi = {
  getDashboard: async (month, year) => {
    const response = await axiosInstance.get(
      `/manager/dashboard?month=${month}&year=${year}`
    );
    return response.data;
  },
};

export default managerDashboardApi;
