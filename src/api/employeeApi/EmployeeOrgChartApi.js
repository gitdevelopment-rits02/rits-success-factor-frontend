import axiosInstance from "../axiosInstance";

const employeeOrgChartApi = {
    getOrgChart: () => {
        return axiosInstance.get("/employee/org-chart");
    },
};

export default employeeOrgChartApi;
