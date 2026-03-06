import axiosInstance from "../axiosInstance";

const managerPayslipsApi = {

  /* GET PAYSLIP */
  getManagerPayslip: async (month, year) => {
    try {
      const response = await axiosInstance.get(
        `/manager/payslips/payslip?month=${month}&year=${year}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /* GET HISTORY */
  getManagerPayslipHistory: async ({ month, year }) => {
    const response = await axiosInstance.get(
      `/manager/payslips/history?year=${year}${month ? `&month=${month}` : ""}`
    );
    return response.data;
  },

  
};

export default managerPayslipsApi;
