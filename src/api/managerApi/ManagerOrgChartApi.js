import axiosInstance from "../axiosInstance";

const managerOrgChartApi = {
    getOrgChart: () => {
        return axiosInstance.get("/manager/organization-chart");
    },
};

export default managerOrgChartApi;
