import axiosInstance from "../axiosInstance";

const employeePaySlipsApi = {
  getMyPayslip: async (month, year) => {
    try {
      const response = await axiosInstance.get(
        `/employee/my-payslip?month=${month}&year=${year}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMyPayslipHistory: async ({ month, year }) => {
  const response = await axiosInstance.get(
    `/employee/my-history?month=${month}&year=${year}`
  );
  return response.data;   // <-- this is an ARRAY
},

getMyPayslipPdf: async (month, year) => {
  const response = await axiosInstance.get(
    `/employee/my-payslip-pdf?month=${month}&year=${year}`,
    {
      responseType: "blob",   // <-- VERY IMPORTANT for PDF
    }
  );
  return response.data; // this is the PDF file
},



};



export default employeePaySlipsApi;
