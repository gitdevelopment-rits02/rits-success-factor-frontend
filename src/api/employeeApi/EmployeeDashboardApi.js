
import axiosInstance from "../axiosInstance";

const employeeDashboardApi = {
  // Dashboard Summary
  getDashboard: async () => {
    const response = await axiosInstance.get("/employee/dashboard");
    return response.data;
  },

  // Attendance Calendar
  getAttendance: async (month) => {
    const response = await axiosInstance.get(
      `/employee/attendance?month=${month}`
    );
    return response.data;
  },
  // Announcements
  getAnnouncements: async () => {
    const response = await axiosInstance.get("/employee/announcements");
    return response.data;
  },
};

export default employeeDashboardApi;

