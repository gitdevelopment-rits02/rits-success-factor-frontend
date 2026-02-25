import axiosInstance from "../axiosInstance";

const employeeOrgChartApi = {
    getOrgChartApi: () => {
        return axiosInstance.get("/employee/org-chart");
    },
};

export default employeeOrgChartApi;
