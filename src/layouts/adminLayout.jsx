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
      icon: FiBarChart2,
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


  // return (


  //   <div className={`flex h-screen ${collapsed ? "md:ml-20" : "md:ml-64"}`}>

  //       <AdminSideNav
  //       collapsed={collapsed}
  //       setCollapsed={setCollapsed}
  //       mobileOpen={mobileOpen}
  //       setMobileOpen={setMobileOpen}
  //       navItems={navItems}
  //     />


  //     <div className="flex flex-col flex-1 min-h-0">


  //       <main className="flex-1 min-h-0 overflow-y-auto  bg-white">
  //         <Outlet />
  //       </main>

  //     </div>
  //   </div>
  // );
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <AdminSideNav
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        navItems={navItems}
      />

      {/* Main content — shifts right based on sidebar width */}
      <div
        className={`flex flex-col flex-1 min-h-0 transition-all duration-300 ease-in-out
        ${collapsed ? "md:ml-20" : "md:ml-64"}
        ml-0
      `}
      >
        {/* Mobile top bar with hamburger */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition"
          >
            {/* Hamburger — 3 lines */}
            <div className="flex flex-col gap-1 w-5">
              <span className="block h-0.5 w-full bg-gray-700 rounded" />
              <span className="block h-0.5 w-full bg-gray-700 rounded" />
              <span className="block h-0.5 w-full bg-gray-700 rounded" />
            </div>
          </button>
          <span className="text-sm font-bold text-gray-800">Super Admin</span>
        </div>

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-white bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
