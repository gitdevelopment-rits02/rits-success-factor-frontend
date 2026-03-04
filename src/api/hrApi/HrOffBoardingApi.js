import axiosInstance from "../axiosInstance";

const hrOffBoardingApi = {

  // Filter employees by department
  getEmployeesByDepartment: (department) =>
    axiosInstance.get("/hr/offboarding/employees", {
      params: { department }
    }),

  // Get employee details by ID
  getEmployeeById: (id) =>
    axiosInstance.get(`/hr/offboarding/employee/${id}`),

  // Search employees
  searchEmployeesByName: (search) =>
    axiosInstance.get("/hr/offboarding/employees", {
      params: { search }
    }),

  // Update offboarding
  updateOffboarding: (id, data) =>
    axiosInstance.put(`/hr/offboarding/employee/${id}`, data),

  // Complete Offboarding (NEW API)
  completeOffboarding: (id) =>
  axiosInstance.post(`/hr/offboarding/employee/${id}/complete`),

};

export default hrOffBoardingApi;