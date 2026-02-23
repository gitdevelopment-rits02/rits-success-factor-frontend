import axiosInstance from "../axiosInstance";

const EmployeePolicyDocumentsApi = {
  // GET all policies
  getPolicies: async () => {
  const response = await axiosInstance.get(
    `/employee/policies?timestamp=${Date.now()}`
  );

  return response.data;   // ✅ return API response body
},

getPolicyById: async (id) => {
  const response = await axiosInstance.get(
    `/employee/policies/${id}?timestamp=${Date.now()}`
  );

  return response.data;   // ✅ return API response body
},

};

export default EmployeePolicyDocumentsApi;