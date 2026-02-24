import axiosInstance from "./axiosInstance";

const orgChartApi = {
    // Basic boilerplate for reference
    getAllOrgChart: () => {
        return axiosInstance.get("/superadmin/orgchart/allchart");
    },
};

export default orgChartApi;
