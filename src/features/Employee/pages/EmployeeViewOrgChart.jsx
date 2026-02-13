import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import employeeViewOrgChartThunk from "../Redux/thunks/EmployeeViewOrgChartThunk";
import OrgChart from '../../../components/common/OrgChart/OrgChart';

const EmployeeViewOrgChart = () => {
    const dispatch = useDispatch();

    const { loading, data, error } = useSelector(
        (state) => state.employee?.viewOrgChart || {}
    );

    useEffect(() => {
        dispatch(employeeViewOrgChartThunk());
    }, [dispatch]);

    return (
        <OrgChart
            data={data}
            loading={loading}
            error={error}
            title="Employee Organization Chart"
            showCount={true}
        />
    );
};

export default EmployeeViewOrgChart;
