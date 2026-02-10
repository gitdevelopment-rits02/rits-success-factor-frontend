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
import { FiHome } from "react-icons/fi";
import { FiBarChart2 } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FiGitBranch } from "react-icons/fi"

import AdminSideNav from "../features/SuperAdmin/components/SuperAdminSideNav";
// import adminHomeThunk from "../features/Admin/Redux/thunks/adminHomeThunk";


const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch(); 
  const navItems = [
    {
    name: "Dashboard",
    path: "/superadmin/dashboard",
    icon:  FiBarChart2,
  },
  //  {
  //   name: "Admin Creation",
  //   path: "/superadmin/admincreation",
  //   icon: HiOutlineClock,
  // },

   {
    name: "Admin Management",
    path: "/superadmin/adminmanagement",
    icon: FiUsers,
  },
  // {
  //   name: "Timesheet Approval",
  //   path: "/superadmin/timesheetapproval",
  //   icon: HiOutlineClipboardDocumentList,
  // },
  // {
  //   name: "Request Time Off",
  //   path: "/superadmin/requesttimeoff",
  //   icon: HiOutlineCalendarDays,
  // },
  // {
  //   name: "My Profile",
  //   path: "/superadmin/profile",
  //   icon: HiOutlineUserCircle,
  // },

// {
//     name: "Approval Flow",
//     path: "/superadmin/approvalflow",
//     icon: HiOutlineUsers,
//   },



  // {
  //   name: "Manage My Team",
  //   path: "/superadmin/managemyteam",
  //   icon: HiOutlineUsers,
  // },
  {
    name: "Org Chart",
    path: "/superadmin/orgchart",
    icon: HiOutlineChartBar,
  },
  // {
  //   name: "Growth Portfolio",
  //   path: "/superadmin/growthportfolio",
  //   icon: HiOutlineChartBar,
  // },
  // {
  //   name: "Manage Leave",
  //   path: "/superadmin/manageleave",
  //   icon: HiOutlineCalendarDays,
  // },
  // {
  //   name: "Personal Timesheet",
  //   path: "/superadmin/personaltimesheet",
  //   icon: HiOutlineClock,
  // },
  // {
  //   name: "Organization",
  //   path: "/superadmin/org",
  //   icon: HiOutlineClock,
  // },
 {
    name: "Policies",
    path: "/superadmin/policies",
    icon: HiOutlineClipboardDocumentList,
  },
  {
    name: "Payroll",
    path: "/superadmin/payroll",
    icon: HiOutlineClock,
  },
  {
    name: "Feedback",
    path: "/superadmin/feedback",
    icon: HiOutlineClipboardDocumentList,
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

        
        <main className="flex-1 min-h-0 overflow-y-auto  bg-white">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
