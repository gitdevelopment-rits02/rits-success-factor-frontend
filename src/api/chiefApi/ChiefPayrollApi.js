import axiosInstance from "../axiosInstance";

const chiefPayrollApi = {

  /* GET PAYSLIP */
  getChiefPayslip: async (month, year) => {
    const response = await axiosInstance.get(
      `/admin/payslip?month=${month}&year=${year}`
    );
    return response.data;
  },

  /* GET HISTORY */
  getChiefPayslipHistory: async ({ month, year }) => {
    const response = await axiosInstance.get(
      `/admin/payslip/history?year=${year}${month ? `&month=${month}` : ""}`
    );
    return response.data;
  },



};

export default chiefPayrollApi;