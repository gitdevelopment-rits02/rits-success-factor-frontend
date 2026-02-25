import axiosInstance from "../axiosInstance";

const hrOnboardingApi = {
    // GET ALL EMPLOYEES
    getEmployees: (params = {}) => {
        return axiosInstance.get("/hr/employees", { params });
    },

    // GET EMPLOYEE BY ID
    getEmployeeById: (id) => {
        return axiosInstance.get(`/hr/employees/${id}`);
    },

    // ADD EMPLOYEE
    addEmployee: (data) => {
        // Sample shows it's a POST with multipart/form-data
        return axiosInstance.post("/hr/employees", data);
    },

    // UPDATE EMPLOYEE
    updateEmployee: (id, data) => {
        return axiosInstance.put(`/hr/employees/${id}`, data);
    },

    // DELETE EMPLOYEE
    deleteEmployee: (id) => {
        return axiosInstance.delete(`/hr/employees/${id}`);
    },

    // DASHBOARD CARDS
    getDashboardCards: () => {
        return axiosInstance.get("/hr/dashboard-cards");
    },
};

export default hrOnboardingApi;
