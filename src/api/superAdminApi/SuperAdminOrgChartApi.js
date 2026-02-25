import axiosInstance from "../axiosInstance";

const superAdminOrgChartApi = {
    getOrgChartApi: () => {
        return axiosInstance.get("/superadmin/orgchart/allchart");
    },
};

export default superAdminOrgChartApi;
