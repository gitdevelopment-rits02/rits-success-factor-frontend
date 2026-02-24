import axiosInstance from "../axiosInstance";

const hrOrgChartApi = {
    getOrgChartApi: () => {
        return axiosInstance.get("/hr/org-chart"); // Placeholder endpoint
    },
};

export default hrOrgChartApi;
