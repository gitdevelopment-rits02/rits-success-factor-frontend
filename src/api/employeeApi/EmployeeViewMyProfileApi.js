// src/api/employeeApi/EmployeeViewMyProfileApi.js
import axiosInstance from '../axiosInstance';

const EmployeeViewMyProfileApi = {
  getProfile: async () => {
    try {
      const response = await axiosInstance.get("/employee/my-profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching employee profile:", error);
      throw error;
    }
  },
};

export default EmployeeViewMyProfileApi;
