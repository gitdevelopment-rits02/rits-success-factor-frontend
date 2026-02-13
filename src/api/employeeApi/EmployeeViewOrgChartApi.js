import axiosInstance from "../axiosInstance";

const employeeViewOrgChartApi = {
    getOrgChart: (params) => {
        return axiosInstance.get(
            "/employee/org-chart",
            { params }
        );
    },
};

export default employeeViewOrgChartApi;
