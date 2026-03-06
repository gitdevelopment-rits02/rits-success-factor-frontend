import axiosInstance from "../axiosInstance";

const hrOrgChartApi = {
    getOrgChartApi: () => {
        return axiosInstance.get("/hr/orgchart/allcharts"); // Updated endpoint
    },
};

export default hrOrgChartApi;