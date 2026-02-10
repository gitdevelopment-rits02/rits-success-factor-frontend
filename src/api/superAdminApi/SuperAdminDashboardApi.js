
import axiosInstance from "../axiosInstance";

const superAdminDashboardApi = {};

superAdminDashboardApi.getDashboardDataApi = async () => {
  return await axiosInstance.get(`/superadmin/dashboard`);
};
superAdminDashboardApi.getAttendanceDataApi = async () => {
  return await axiosInstance.get(`/superadmin/attendance`);
};

export default superAdminDashboardApi;
