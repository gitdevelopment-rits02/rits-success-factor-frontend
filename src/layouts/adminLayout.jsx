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

import AdminSideNav from "../features/SuperAdmin/components/SuperAdminSideNav";
// import adminHomeThunk from "../features/Admin/Redux/thunks/adminHomeThunk";


const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch(); 0
  const navItems = [
  {
    name: "Timesheet Approval",
    path: "/superadmin/timesheetapproval",
    icon: HiOutlineClipboardDocumentList,
  },
  {
    name: "Request Time Off",
    path: "/superadmin/requesttimeoff",
    icon: HiOutlineCalendarDays,
  },
  {
    name: "My Profile",
    path: "/superadmin/profile",
    icon: HiOutlineUserCircle,
  },
  {
    name: "Manage My Team",
    path: "/superadmin/managemyteam",
    icon: HiOutlineUsers,
  },
  {
    name: "Org Chart",
    path: "/superadmin/orgchart",
    icon: HiOutlineBuildingOffice2,
  },
  {
    name: "Growth Portfolio",
    path: "/superadmin/growthportfolio",
    icon: HiOutlineChartBar,
  },
  {
    name: "Manage Leave",
    path: "/superadmin/manageleave",
    icon: HiOutlineCalendarDays,
  },
  {
    name: "Personal Timesheet",
    path: "/superadmin/personaltimesheet",
    icon: HiOutlineClock,
  },
];


  return (

    
    <div className={`flex h-screen ${collapsed ? "md:ml-20" : "md:ml-64"}`}>
      
        <AdminSideNav
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

export default AdminLayout;
