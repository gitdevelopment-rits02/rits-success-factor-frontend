import axiosInstance from "../axiosInstance";

const hrDashboardApi = {};

hrDashboardApi.getDashboard = async () => {
    const response = await axiosInstance.get("/hr/dashboard");
     return response.data.data; 
};
export default hrDashboardApi;