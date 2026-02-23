import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrgChart from '../../../components/OrgChart/OrgChart';
import managerOrgChartThunk from '../Redux/thunks/ManagerOrgChartThunk';

const ManagerOrgChart = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.manager.orgChart);

    useEffect(() => {
        dispatch(managerOrgChartThunk.getOrgChart());
    }, [dispatch]);

    return <OrgChart data={data} loading={loading} error={error} />;
};

export default ManagerOrgChart;
