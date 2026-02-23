import axiosInstance from "../axiosInstance";

const superAdminOrgChartApi = {
    getOrgChart: () => {
        return axiosInstance.get("/superadmin/orgchart/allchart");
    },
};

export default superAdminOrgChartApi;
