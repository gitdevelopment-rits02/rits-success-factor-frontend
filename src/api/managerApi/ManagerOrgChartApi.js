import axiosInstance from "../axiosInstance";

const managerOrgChartApi = {
    getOrgChartApi: () => {
        return axiosInstance.get("/manager/organization-chart");
    },
};

export default managerOrgChartApi;
