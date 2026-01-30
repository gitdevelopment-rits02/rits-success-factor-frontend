import React from "react";
import { NavLink } from "react-router-dom";
// import {
//   FaThLarge, FaCube, FaChevronLeft, FaChevronRight, FaTimes,
// } from "react-icons/fa";
// import { FcManager } from "react-icons/fc";
// import { MdOutlineMenuBook, MdOutlinePlace, MdOutlineLockPerson } from "react-icons/md";
// import { VscListOrdered } from "react-icons/vsc";
import {
    HiOutlineSquares2X2,
    HiOutlineBuildingStorefront,
    HiOutlineClipboardDocumentList,
    HiOutlineBookOpen,
    HiOutlineMapPin,
    HiOutlineUsers,
    HiOutlineShieldCheck,
} from "react-icons/hi2";

import {
    FaChevronLeft,
    FaChevronRight,
    FaTimes,
} from "react-icons/fa";
// import logo from "../assets/logo.png";




const ManagerSideNav = ({
    collapsed,
    setCollapsed,
    mobileOpen,
    setMobileOpen,
    navItems,
}) => {
    return (
        <aside
            className={`
        fixed top-0 left-0 h-screen bg-white text-gray-800 shadow-xl z-40
        flex flex-col border-r border-gray-200 transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"}
        md:translate-x-0
        ${mobileOpen ? "translate-x-0" : "max-md:-translate-x-full"}

      `}
        >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div
                    className={`transition-all duration-300 overflow-hidden ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                        }`}
                >
                    <div className="flex flex-row items-center gap-2">
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/052/792/818/non_2x/restaurant-logo-design-vector.jpg"
                            alt=""
                            width={44}
                            className="rounded-full border border-gray-200"
                        />
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 leading-tight">
                                SUCESS FACTOR
                            </h1>
                            <p className="text-xs text-gray-500">Manager</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 transition md:block hidden"
                    >
                        {collapsed ? (
                            <FaChevronRight className="h-4 w-4 text-gray-700" />
                        ) : (
                            <FaChevronLeft className="h-4 w-4 text-gray-700" />
                        )}
                    </button>

                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-2 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 transition md:hidden block"
                    >
                        <FaTimes className="h-4 w-4 text-gray-700" />
                    </button>
                </div>
            </div>

            <nav className="flex-1 mt-3 space-y-1 px-2 overflow-y-auto scrollbar-none">
                {navItems.map(({ name, path, icon: Icon }) => (
                    //   <NavLink
                    //     key={path}
                    //     to={path}
                    //     className={({ isActive }) =>
                    //       `
                    //       flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all
                    //       text-sm font-medium
                    //       ${
                    //         isActive
                    //           ? "text-orange-500 bg-orange-100 shadow-sm"
                    //           : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                    //       }
                    //     `
                    //     }
                    //     onClick={() => setMobileOpen(false)}
                    //   >
                    <NavLink key={path} to={path} onClick={() => setMobileOpen(false)}>
  {({ isActive }) => (
    <div
      className={`
        group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all
        text-sm font-medium
        ${
          isActive
            ? "text-blue-600 bg-blue-50 shadow-sm"
            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        }
      `}
    >
      <div
        className={`
          flex items-center justify-center h-9 w-9 rounded-xl border transition
          ${
            isActive
              ? "bg-blue-100 border-blue-200 text-blue-600"
              : "bg-white border-gray-100 text-gray-500 group-hover:text-blue-600"
          }
        `}
      >
        <Icon className="text-lg" />
      </div>

      <span
        className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
          collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
        }`}
      >
        {name}
      </span>
    </div>
  )}
</NavLink>

                ))}
            </nav>
        </aside>
    );
};

export default ManagerSideNav;
