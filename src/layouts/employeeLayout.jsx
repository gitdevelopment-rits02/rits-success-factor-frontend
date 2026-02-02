import React, { useState } from "react";
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
  HiOutlineBookOpen,
} from "react-icons/hi2";

import EmployeeSideNav from "../features/Employee/components/EmployeeSideNav";

const EmployeeLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch(); // keep if needed later

  const navItems = [
    {
      name: "Clock My Time",
      path: "/employee/clockmytime",
      icon: HiOutlineClock,
    },
    {
      name: "Request Time Off",
      path: "/employee/requesttimeoff",
      icon: HiOutlineCalendarDays,
    },
    {
      name: "My Profile",
      path: "/employee/profile",
      icon: HiOutlineUserCircle,
    },
    {
      name: "Org Chart",
      path: "/employee/orgchart",
      icon: HiOutlineBuildingOffice2,
    },
    {
      name: "Growth Portfolio",
      path: "/employee/growthportfolio",
      icon: HiOutlineChartBar,
    },
    {
      name: "Insurance",
      path: "/employee/insurance",
      icon: HiOutlineUsers,
    },
    {
      name: "Learning",
      path: "/employee/learning",
      icon: HiOutlineBookOpen,
    },
    {
      name: "Payslips",
      path: "/employee/payslips",
      icon: HiOutlineClipboardDocumentList,
    },
    {
      name: "Timesheet",
      path: "/employee/timesheet",
      icon: HiOutlineClipboardDocumentList,
    },
    {
      name: "Dashboard",
      path: "/employee/dashboard",
      icon: HiOutlineClipboardDocumentList,
    },
    {
        name: "Notification",
      path: "/employee/notification",
      icon: HiOutlineClipboardDocumentList,
    },
     {
        name: "Policy Documents",
      path: "/employee/policydocuments",
      icon: HiOutlineClipboardDocumentList,
    },




    
  ];

  return (
    <div className={`flex h-screen ${collapsed ? "md:ml-20" : "md:ml-64"}`}>
      <EmployeeSideNav
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

export default EmployeeLayout;
