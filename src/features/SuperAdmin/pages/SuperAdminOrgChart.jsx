import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrgChart from '../../../components/OrgChart/OrgChart';
import superAdminOrgChartThunk from '../Redux/thunks/superAdminOrgChartThunk';

const SuperAdminOrgChart = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.superAdmin.orgChart);

    useEffect(() => {
        dispatch(superAdminOrgChartThunk.getOrgChart());
    }, [dispatch]);

    return <OrgChart data={data} loading={loading} error={error} />;
};

export default SuperAdminOrgChart;
