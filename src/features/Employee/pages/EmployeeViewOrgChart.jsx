import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrgChart from '../../../components/OrgChart/OrgChart';
import employeeOrgChartThunk from '../Redux/thunks/EmployeeOrgChartThunk';

const EmployeeViewOrgChart = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.employee.orgChart);

    useEffect(() => {
        dispatch(employeeOrgChartThunk.getOrgChart());
    }, [dispatch]);

    return <OrgChart data={data} loading={loading} error={error} />;
};

export default EmployeeViewOrgChart;
