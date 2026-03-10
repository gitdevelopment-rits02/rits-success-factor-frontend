import axiosInstance from "../axiosInstance";

export const SuperAdminPayrollApi = {
  getPayrollList: async ({ month, year }) => {
    const res = await axiosInstance.get("/superadmin/payroll/getall", {
      params: {
        action: "list",
        month,
        year,
      },
    });
    return res.data;
  },

  // NEW BREAKDOWN API 
  getPayrollBreakdown: async (payrollId) => {
    const res = await axiosInstance.get("/superadmin/payroll/getall", {
      params: {
        action: "breakdown",
        payrollId,
      },
    });

    return res.data;
  },

   getPayslipPdf: async (payrollId) => {
  const res = await axiosInstance.get("/superadmin/payroll/getall", {
    params: {
      action: "payslip",
      payrollId,
    },
  });

  return res.data;
},

    downloadPayrollReport: async ({ month, year }) => {
    const res = await axiosInstance.get("/superadmin/payroll/getall", {
      params: { action: "report", month, year },
      responseType: "blob",
    });
    return res.data;
  },
};
 