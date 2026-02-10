import axiosInstance from "../axiosInstance";

const superAdminOrgChartApi = {
  // GET all org charts
  getAllOrgChart: (params) => {
    return axiosInstance.get(
      "/superadmin/orgchart/allchart",
      { params }
    );
  },
};

export default superAdminOrgChartApi;
