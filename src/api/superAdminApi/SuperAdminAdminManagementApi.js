// SuperAdminAdminManagementApi.js
import axiosInstance from "../axiosInstance";

const superAdminAdminManagementApi = {
  // GET ALL ADMINS
  getAdmins: () => {
    return axiosInstance.get("/superadmin/system/admins", {
      params: { _t: Date.now() }, // cache buster
    });
  },

  // GET ADMIN BY ID
  getAdminById: (id) => {
    return axiosInstance.get(`/superadmin/system/${id}`);
  },

  // CREATE ADMIN
  createAdmin: (data) => {
    return axiosInstance.post("/superadmin/system/create", data);
  },

  //UPADATE ADMIN
  updateAdmin: (payload) => {
    return axiosInstance.patch(
      `/superadmin/system/${payload.id}`,
      payload.data
    );
  },

  // DELETE ADMIN
  deleteAdmin: (id) => {
    return axiosInstance.delete(`/superadmin/system/${id}`);
  },
};

export default superAdminAdminManagementApi;

