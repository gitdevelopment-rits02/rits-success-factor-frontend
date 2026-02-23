import { createAsyncThunk } from "@reduxjs/toolkit";
import superAdminAdminManagementApi from "../../../../api/superAdminApi/SuperAdminAdminManagementApi";
 
 
const normalizeAdmin = (admin = {}) => ({
  _id: admin._id,
  name: admin.employeeName || "",
  email: admin.officialEmail || "",
  employeeNo: admin.employeeNo || "",
  phone: admin.phoneNumber || "",
  status: admin.status || "inactive",   
  created: admin.createdAt || "",
  lastLogin: admin.lastLogin || "Never",
});

 
const superAdminAdminManagementThunk = {
 
  // GET ADMINS
 
getAdmins: createAsyncThunk(
  "superAdminAdminManagement/getAdmins",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("Authentication token missing");
      }

      const res = await superAdminAdminManagementApi.getAdmins(page, limit);

      const apiData = res?.data?.data;

      if (!apiData) {
        return rejectWithValue("Invalid admin response");
      }

      return {
        admins: (apiData.admins || []).map(normalizeAdmin),
        total: apiData.total || 0,
        totalPages: apiData.totalPages || 1,
        page: apiData.page || 1,
        limit: apiData.limit || 10,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Unable to load admins"
      );
    }
  }
),

 
// GET ADMIN BY ID
getAdminById: createAsyncThunk(
  "superAdminAdminManagement/getAdminById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await superAdminAdminManagementApi.getAdminById(id);
 
      if (!res?.data?.data) {
        return rejectWithValue("Invalid admin response");
      }
 
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch admin"
      );
    }
  }
),
 
 
  // CREATE ADMIN
 
  createAdmin: createAsyncThunk(
    "superAdminAdminManagement/createAdmin",
    async (data, { rejectWithValue }) => {
      try {
        const res = await superAdminAdminManagementApi.createAdmin(data);
 
        if (!res?.data?.data) {
          return rejectWithValue("Invalid create response");
        }
 
        return normalizeAdmin(res.data.data);
      } catch (err) {
        return rejectWithValue(
          err.response?.data?.message ||
            err.message ||
            "Failed to create admin"
        );
      }
    }
  ),
 
 
  // UPDATE ADMIN
 
  updateAdmin: createAsyncThunk(
    "superAdminAdminManagement/updateAdmin",
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const res = await superAdminAdminManagementApi.updateAdmin({ id, data });
 
 
        if (!res?.data?.data) {
          return rejectWithValue("Invalid update response");
        }
 
        return normalizeAdmin(res.data.data);
      } catch (err) {
        return rejectWithValue(
          err.response?.data?.message ||
            err.message ||
            "Failed to update admin"
        );
      }
    }
  ),
 
 
  // DELETE ADMIN
 
  deleteAdmin: createAsyncThunk(
    "superAdminAdminManagement/deleteAdmin",
    async (id, { rejectWithValue }) => {
      try {
        await superAdminAdminManagementApi.deleteAdmin(id);
        return id;
      } catch (err) {
        return rejectWithValue(
          err.response?.data?.message ||
            err.message ||
            "Failed to delete admin"
        );
      }
    }
  ),
};
 
export default superAdminAdminManagementThunk;
 