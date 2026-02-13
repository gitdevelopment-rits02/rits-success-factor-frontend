import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import superAdminOrgChartThunk from "../Redux/thunks/superAdminOrgChartThunk";
import OrgChart from '../../../components/common/OrgChart/OrgChart';

const SuperAdminOrgChart = () => {
    const dispatch = useDispatch();

    const { loading, data, error } = useSelector(
        (state) => state.superAdmin?.orgChart || {}
    );

    useEffect(() => {
        dispatch(superAdminOrgChartThunk());
    }, [dispatch]);

    return (
        <OrgChart
            data={data}
            loading={loading}
            error={error}
            title="SuperAdmin Organization Chart"
            showCount={true}
        />
    );
};

export default SuperAdminOrgChart;
