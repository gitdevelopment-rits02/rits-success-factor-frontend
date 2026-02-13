import axiosInstance from "../axiosInstance";

const superAdminPolicyApi = {};

// CREATE POLICY
superAdminPolicyApi.createPolicyApi = (data) => {
  return axiosInstance.post("/superadmin/policies/createPolicy", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// GET ALL POLICIES
superAdminPolicyApi.getPoliciesApi = () => {
  return axiosInstance.get("/superadmin/policies/getPolicies");
};

// GET POLICY BY ID
superAdminPolicyApi.getPolicyByIdApi = (id) => {
  return axiosInstance.get(`/superadmin/policies/getPolicies/${id}`);
};

// UPDATE POLICY
superAdminPolicyApi.updatePolicyApi = (id, data) => {
  return axiosInstance.put(`/superadmin/policies/updatePolicy/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE POLICY
superAdminPolicyApi.deletePolicyApi = (id) => {
  return axiosInstance.delete(`/superadmin/policies/deletePolicy/${id}`);
};

//  THIS WAS MISSING
export default superAdminPolicyApi;
