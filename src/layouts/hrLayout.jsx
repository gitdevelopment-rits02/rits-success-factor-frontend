import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  HiOutlineClock,
  HiOutlineUserCircle,
  HiOutlineUsers,
  HiOutlineBuildingOffice2,
  HiOutlineChartBar,
  HiOutlineCalendarDays,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { FiClock } from "react-icons/fi";
import { FiShield } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { FiBell } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";

import { FiCalendar } from "react-icons/fi";
import { FiDollarSign } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";



// import AdminSideNav from "../features/SuperAdmin/components/SuperAdminSideNav";
// import adminHomeThunk from "../features/Admin/Redux/thunks/adminHomeThunk";
import HrSideNav from "../features/Hr/components/HrSideNav";

const HrLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch(); 
  const navItems = [
    {
        name: "Dashboard",
        path: "/hr/dashboard",
        icon: MdDashboard,
    },
    {
        name:"ClockMyTime",
        path:"/hr/clockmytime",
        icon:FiClock

    },
    {
        name:"Insurance",
        path:"/hr/insurance",
        icon:FiShield
    },
    {
        name:"Notifications",
        path:"/hr/notification",
        icon:FiBell
    },
    {
        name:"OnBoarding",
        path:"/hr/onboarding",
        icon:FiUserPlus
    },
    {
        name:"Payslips",
        path:"/hr/payslips",
        icon:HiOutlineDocumentText
    },
    {
        name:"PolicyAndInsuranceCreation",
        path:"/hr/policyandinsurancecreation",
        icon:FiShield
    },
    {
        name:"Policy Documents",
        path:"/hr/policydocuments",
        icon:FiShield
    },
    {
        name:"Request Time Off",
        path:"/hr/requesttimeoff",
        icon:FiCalendar
    },
    {
        name:"Salary Creation",
        path:"/hr/salarycreation",
        icon:FiDollarSign
    },
    {
        name:"TimeSheet",
        path:"/hr/timesheet",
        icon:FiClock
    },
    {
        name:"Organization Chart",
        path:"/hr/orgchart",
        icon:FiUsers
    },
    {
        name:"OffBoarding",
        path:"/hr/offboarding",
        icon:FiUserPlus
    }



    


 
];


  return (

    
    <div className={`flex h-screen ${collapsed ? "md:ml-20" : "md:ml-64"}`}>
      
        <HrSideNav
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        navItems={navItems}
      />
      

      <div className="flex flex-col flex-1 min-h-0">

        
        <main className="flex-1 min-h-0 overflow-y-auto p-6 bg-white">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default HrLayout;
