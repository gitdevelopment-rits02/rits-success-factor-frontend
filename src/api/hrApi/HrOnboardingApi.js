import axiosInstance from "../axiosInstance";
 
const BASE_URL = "/hr";
 
const hrOnboardingApi = {
 
  // GET ALL EMPLOYEES (WITH FILTER + PAGINATION)
 
  getEmployees: (params = {}) =>
    axiosInstance.get(`${BASE_URL}/employees`, { params }),
 
 
  // DASHBOARD CARDS
 
  getDashboardCards: () =>
    axiosInstance.get(`${BASE_URL}/dashboard-cards`),
 
 
  // GET SINGLE EMPLOYEE
 
  getEmployeeById: (id) =>
    axiosInstance.get(`${BASE_URL}/employees/${id}`),
 
 
  // CREATE EMPLOYEE
 
  createEmployee: (formData) =>
  axiosInstance.post(
    `${BASE_URL}/employees`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  ),
 
 
  // UPDATE EMPLOYEE
updateEmployee: (id, formData) =>
  axiosInstance.put(
    `${BASE_URL}/employees/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  ),
 
 
  // DELETE EMPLOYEE
 
  deleteEmployee: (id) =>
    axiosInstance.delete(`${BASE_URL}/employees/${id}`),
 
 
  // RETURN ASSET
 
  returnAsset: (employeeId, assetId) =>
    axiosInstance.patch(
      `${BASE_URL}/employees/${employeeId}/assets/${assetId}/return`
    ),
 
  //undoAsset
  undoReturnAsset: (employeeId, assetId) =>
    axiosInstance.patch(
      `${BASE_URL}/employees/${employeeId}/assets/${assetId}/undo`
    ),
 
  // REPLACE DOCUMENT
 
  replaceDocument: (employeeId, documentId, formData) =>
    axiosInstance.patch(
      `${BASE_URL}/employees/${employeeId}/documents/${documentId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ),
 
 
 
  // UPDATE LEAVE ALLOCATION
 
  updateLeaveAllocation: (employeeId, data) =>
    axiosInstance.patch(
      `${BASE_URL}/employees/${employeeId}/leave-allocation`,
      data
    ),
};
 
export default hrOnboardingApi;

