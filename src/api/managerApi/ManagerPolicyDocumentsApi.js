import axiosInstance from "../axiosInstance";

const managerPolicyDocumentsApi = {

  // GET All Policy Documents
  getAllPolicyDocuments: async () => {
    try {
      const response = await axiosInstance.get("/manager/policies"); 
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
   getPolicyById: async (id) => {
    try {
    const response = await axiosInstance.get(`/manager/policies/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
},

};

export default managerPolicyDocumentsApi;