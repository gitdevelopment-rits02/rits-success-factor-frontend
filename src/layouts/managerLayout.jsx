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

// import adminHomeThunk from "../features/Admin/Redux/thunks/adminHomeThunk";

import ManagerSideNav from "../features/Manager/components/ManagerSideNav";


const ManagerLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navItems = [
    {
    name: "ClockMyTime",
    path: "/manager/clockmytime",
    icon: HiOutlineClipboardDocumentList,
  },
   {
    name: "RequestTimeOff",
    path: "/manager/requesttimeoff",
    icon: HiOutlineClock,
  },
  {
    name:"Task Assignment",
    path:"/manager/taskassignment",
    icon: HiOutlineClock,

  },

   {
    name: "Profile",
    path: "/manager/profile",
    icon: HiOutlineClock,
  },
  {
    name: "Notification",
    path: "/manager/notification",
    icon: HiOutlineClock,
  },
  {
    name: "PolicyDocuments",
    path: "/manager/policydocuments",
    icon: HiOutlineClock,
  },

  {
    name: "Org Chart",
    path: "/manager/orgchart",
    icon: HiOutlineClipboardDocumentList,
  },
  {
    name: "Insurance",
    path: "/manager/insurance",
    icon: HiOutlineCalendarDays,
  },
  {
    name: "LeaveApproval",
    path: "/manager/leaveapproval",
    icon: HiOutlineUserCircle,
  },

{
    name: "Payslips",
    path: "/manager/payslips",
    icon: HiOutlineUsers,
  },


  {
    name: "timesheet",
    path: "/manager/timesheet",
    icon: HiOutlineUsers,
  },
  
  {
    name: "Dashboard",
    path: "/manager/dashboard",
    icon: HiOutlineChartBar,
  },
  // {
  //   name: "Manage Leave",
  //   path: "/manager/manageleave",
  //   icon: HiOutlineCalendarDays,
  // },
  // {
  //   name: "Personal Timesheet",
  //   path: "/manager/personaltimesheet",
  //   icon: HiOutlineClock,
  // },
 
 {
    name: "Policies",
    path: "/manager/policies",
    icon: HiOutlineClock,
  },
  {
    name: "FeedBackOfEmployee",
    path: "/manager/feedback",
    icon: HiOutlineClock,
  },
  {
    name: "TimeSheetReview",
    path: "/manager/timesheetreview",
    icon: HiOutlineClock,
  },
  
 
];


  return (

    
    <div className={`flex h-screen ${collapsed ? "md:ml-20" : "md:ml-64"}`}>
      
        <ManagerSideNav
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

export default ManagerLayout;
