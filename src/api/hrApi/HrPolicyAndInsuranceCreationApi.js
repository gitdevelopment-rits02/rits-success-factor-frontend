

import axiosInstance from "../axiosInstance";

const hrPolicyAndInsuranceCreationApi = {};

// ================= CREATE =================
hrPolicyAndInsuranceCreationApi.createPolicy = (formData) => {
  return axiosInstance.post("/hr/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ================= GET ALL =================
hrPolicyAndInsuranceCreationApi.getPolicies = () => {
  return axiosInstance.get("/hr/policy");
};

// ================= UPDATE =================
hrPolicyAndInsuranceCreationApi.updatePolicy = (id, formData) => {
  return axiosInstance.put(`/hr/policy/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ================= DELETE =================
hrPolicyAndInsuranceCreationApi.deletePolicy = (id) => {
  return axiosInstance.delete(`/hr/policy/${id}`);
};

export default hrPolicyAndInsuranceCreationApi;