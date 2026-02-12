import axiosInstance from "../axiosInstance";

const managerDashboardApi = {
    getDashboard: async () => {
        const response = await axiosInstance.get("/manager/dashboard");
        return response.data;
    },
};

export default managerDashboardApi;
