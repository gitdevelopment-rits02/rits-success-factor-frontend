import axiosInstance from "../axiosInstance";

const managerTimeSheetReviewApi = {

  //  Dashboard
  getDashboard: () => {
    return axiosInstance.get("/manager/timesheet/dashboard");
  },

  // Approve Single
 approveTimeSheet: (id) => {
  return axiosInstance.patch(
    `/manager/timesheet/${id}/status`,
    {
      status: "Approved", 
    }
  );
},


  rejectTimeSheet: (id) => {
  return axiosInstance.patch(
    `/manager/timesheet/${id}/status`,
    {
      status: "Rejected", //  MUST be this
    }
  );
},


  //  BULK APPROVE 
  bulkApproveTimeSheet: (ids) => {
  return axiosInstance.post(
    "/manager/timesheet/bulk-approve",
    {
      ids, // MUST be array
    }
  );
},

downloadExcel: (config) => {
  return axiosInstance.get(
    "/manager/timesheet/download/excel",
    {
      responseType: "blob", 
      ...config,
    }
  );
},
downloadPdf: () => {
  return axiosInstance.get(
    "/manager/timesheet/download/pdf",
    {
      responseType: "blob", 
    }
  );
},



};

export default managerTimeSheetReviewApi;