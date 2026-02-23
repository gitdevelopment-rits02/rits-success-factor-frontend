import axiosInstance from "../axiosInstance";

const managerFeedBackOfEmployeeApi = {

  // CREATE FEEDBACK
  createFeedback: async (data) => {
    const response = await axiosInstance.post(
      "/manager/feedback/create",
      data
    );
    return response.data;
  },

  // GET FEEDBACK LIST
  getFeedbackList: async () => {
    const response = await axiosInstance.get(
      "/manager/feedback/list"
    );
    return response.data;
  },
};

export default managerFeedBackOfEmployeeApi;
