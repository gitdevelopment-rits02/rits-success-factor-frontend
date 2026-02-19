import axiosInstance from "../axiosInstance";

const managerTaskAssignmentApi = {
  getHeader: async () => 
    (await axiosInstance.get("/manager/tasks/header")).data,

  getTeam: async () =>
    (await axiosInstance.get("/manager/tasks/team")).data,

  createTask: async (payload) =>
    (await axiosInstance.post("/manager/tasks/create-task", payload)).data,

  getCurrentTasks: async (employeeId) =>
    (await axiosInstance.get(`/manager/tasks/current-task?employeeId=${employeeId}`)).data,

  completeTask: async (taskId, action) =>
    (await axiosInstance.patch(`/manager/tasks/${taskId}/complete`, { action })).data,

  getHistory: async (employeeId) =>
    (await axiosInstance.get(`/manager/tasks/history?employeeId=${employeeId}`)).data,

  updateTask: async (taskId, payload) =>
    (await axiosInstance.put(`/manager/tasks/${taskId}`, payload)).data,

  deleteTask: async (taskId) =>
    (await axiosInstance.delete(`/manager/tasks/${taskId}`)).data,
};

export default managerTaskAssignmentApi;
 