import axiosInstance from "../axiosInstance";

export const SuperAdminPayrollApi = {
 getPayrollList: async ({ month, year, page, limit }) => {
  const res = await axiosInstance.get("/superadmin/payroll/getall", {
    params: {
      action: "list",
      month,
      year,
      page,
      limit
    },
  });

  return res.data;
},

  // Breakdown Api
  getPayrollBreakdown: async (payrollId) => {
    const res = await axiosInstance.get("/superadmin/payroll/getall", {
      params: {
        action: "breakdown",
        payrollId,
      },
    });

    return res.data;
  },

//pdf
   getPayslipPdf: async (payrollId) => {
  const res = await axiosInstance.get("/superadmin/payroll/getall", {
    params: {
      action: "payslip",
      payrollId,
    },
  });
  return res.data;
},

//report 
    downloadPayrollReport: async ({ month, year }) => {
    const res = await axiosInstance.get("/superadmin/payroll/getall", {
      params: { action: "report", month, year },
      responseType: "blob",
    });
    return res.data;
  },
};
 