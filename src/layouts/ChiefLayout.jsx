
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

import ChiefSideNav from "../features/Chief/components/ChiefSideNav";
// import adminHomeThunk from "../features/Admin/Redux/thunks/adminHomeThunk";


const ChiefLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const dispatch = useDispatch();
    const navItems = [
        {
            name: "Dashboard",
            path: "/chief/dashboard",
            icon: HiOutlineClipboardDocumentList,
        },
        // {
        //     name: "Admin Creation",
        //     path: "/chief/admincreation",
        //     icon: HiOutlineClock,
        // },

        {
            name: "Hr Management",
            path: "/chief/adminmanagement",
            icon: HiOutlineClock,
        },
        {
            name: "Timesheet Approval",
            path: "/chief/timesheetapproval",
            icon: HiOutlineClipboardDocumentList,
        },
        {
            name: "Request Time Off",
            path: "/chief/requesttimeoff",
            icon: HiOutlineCalendarDays,
        },
        {
            name: "My Profile",
            path: "/chief/profile",
            icon: HiOutlineUserCircle,
        },

        // {
        //     name: "Approval Flow",
        //     path: "/chief/approvalflow",
        //     icon: HiOutlineUsers,
        // },



        // {
        //     name: "Manage My Team",
        //     path: "/chief/managemyteam",
        //     icon: HiOutlineUsers,
        // },
        {
            name: "Org Chart",
            path: "/chief/orgchart",
            icon: HiOutlineBuildingOffice2,
        },
        // {
        //     name: "Growth Portfolio",
        //     path: "/chief/growthportfolio",
        //     icon: HiOutlineChartBar,
        // },
        {
            name: "Manage Leave",
            path: "/chief/manageleave",
            icon: HiOutlineCalendarDays,
        },
        // {
        //     name: "Personal Timesheet",
        //     path: "/chief/personaltimesheet",
        //     icon: HiOutlineClock,
        // },
        // {
        //     name: "Organization",
        //     path: "/chief/org",
        //     icon: HiOutlineClock,
        // },
        {
            name: "Policies",
            path: "/chief/policies",
            icon: HiOutlineClock,
        },
        {
            name: "Payslip",
            path: "/chief/payroll",
            icon: HiOutlineClock,
        },
        // {
        //     name: "Feedback",
        //     path: "/chief/feedback",
        //     icon: HiOutlineClock,
        // },

    ];


    return (


        <div className={`flex h-screen ${collapsed ? "md:ml-20" : "md:ml-64"}`}>

            <ChiefSideNav
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

export default ChiefLayout;
