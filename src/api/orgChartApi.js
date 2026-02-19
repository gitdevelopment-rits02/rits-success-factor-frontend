import axiosInstance from "./axiosInstance";

const orgChartApi = {
    // GET all org charts
    getAllOrgChart: (params) => {
        return axiosInstance.get(
            "/superadmin/orgchart/allchart",
            { params }
        );
    },
};

export default orgChartApi;
