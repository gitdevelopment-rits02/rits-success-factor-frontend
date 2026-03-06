import { useState } from "react";
import {
  FiUsers,
  FiUserPlus,
  FiTrendingDown,
  FiBriefcase,
  FiBell,
  FiSearch,
  FiHome,
  FiCalendar,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiMenu,
  FiX,
  FiArrowUpRight,
  FiArrowDownRight,
  FiMapPin,
  FiFilter,
} from "react-icons/fi";
import { FaAward, FaBirthdayCake } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { toast } from "react-toastify";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHrDashboard } from "../Redux/thunks/HrDashboardThunk";
import HRDashboardSkeleton from "./HrDashboardSkeleton";

const attendanceData = [
  { month: "Aug", present: 88, absent: 12 },
  { month: "Sep", present: 91, absent: 9 },
  { month: "Oct", present: 85, absent: 15 },
  { month: "Nov", present: 93, absent: 7 },
  { month: "Dec", present: 87, absent: 13 },
  { month: "Jan", present: 90, absent: 10 },
];

const headcountData = [
  { name: "Engineering", value: 42, color: "#ADD8E6" },
  { name: "HR", value: 15, color: "#34d399" },
  { name: "Sales", value: 28, color: "#f59e0b" },
  { name: "Finance", value: 18, color: "#60a5fa" },
  { name: "Operations", value: 22, color: "#f472b6" },
];

const allEmployees = [
  {
    id: 1,
    name: "Priya Sharma",
    dept: "Engineering",
    role: "Senior Developer",
    status: "present",
    avatar: "PS",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    dept: "HR",
    role: "HR Manager",
    status: "absent",
    avatar: "RM",
  },
  {
    id: 3,
    name: "Anil Kumar",
    dept: "Sales",
    role: "Sales Lead",
    status: "present",
    avatar: "AK",
  },
  {
    id: 4,
    name: "Sneha Patel",
    dept: "Design",
    role: "UI Designer",
    status: "remote",
    avatar: "SP",
  },
  {
    id: 5,
    name: "Karan Singh",
    dept: "Engineering",
    role: "Backend Engineer",
    status: "present",
    avatar: "KS",
  },
  {
    id: 6,
    name: "Divya Nair",
    dept: "HR",
    role: "Recruiter",
    status: "remote",
    avatar: "DN",
  },
  {
    id: 7,
    name: "Vikram Joshi",
    dept: "Finance",
    role: "Financial Analyst",
    status: "absent",
    avatar: "VJ",
  },
  {
    id: 8,
    name: "Meena Rao",
    dept: "Operations",
    role: "Ops Manager",
    status: "present",
    avatar: "MR",
  },
  {
    id: 9,
    name: "Arjun Das",
    dept: "Engineering",
    role: "DevOps Engineer",
    status: "remote",
    avatar: "AD",
  },
  {
    id: 10,
    name: "Pooja Iyer",
    dept: "Sales",
    role: "Account Executive",
    status: "present",
    avatar: "PI",
  },
  {
    id: 11,
    name: "Suresh Verma",
    dept: "Finance",
    role: "Accountant",
    status: "absent",
    avatar: "SV",
  },
  {
    id: 12,
    name: "Neha Kapoor",
    dept: "Design",
    role: "Product Designer",
    status: "present",
    avatar: "NK",
  },
];

const statusConfig = {
  present: {
    label: "In Office",
    color: "text-emerald-700 bg-emerald-50",
    dot: "bg-emerald-500",
  },
  remote: {
    label: "Remote",
    color: "text-cyan-700 bg-cyan-50",
    dot: "bg-cyan-500",
  },
  absent: {
    label: "Absent",
    color: "text-slate-500 bg-slate-100",
    dot: "bg-slate-400",
  },
};

/* ── Avatar gradient pool ── */
const avatarGradients = [
  "from-violet-400 to-purple-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-sky-400 to-blue-500",
  "from-pink-400 to-rose-500",
  "from-indigo-400 to-blue-600",
];

export default function HRDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [selectedStatus, setSelectedStatus] = useState("all");
  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.hr?.dashboard || {});
  useEffect(() => {
    const hasShownToast = sessionStorage.getItem("dashboardToastShown");

    if (!hasShownToast) {
      toast.success("Dashboard loaded successfully", { toastId: "dashboard-login" });
      sessionStorage.setItem("dashboardToastShown", "true");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchHrDashboard());
  }, [dispatch]);
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const userName =
    storedUser?.name ||
    storedUser?.fullName ||
    storedUser?.email?.split("@")[0] ||
    "";

  const userInitial = userName.charAt(0).toUpperCase();

  const employees = data?.attendanceRoster || [];
  // const employees =
  //   data?.attendanceRoster && data.attendanceRoster.length > 0
  //     ? data.attendanceRoster
  //     : allEmployees.map((emp) => ({
  //         id: emp.id,
  //         employeeName: emp.name,
  //         department: emp.dept,
  //         designation: emp.role,
  //         status: emp.status,
  //       }));
  const departments = [
    "All Departments",
    ...new Set(employees.map((emp) => emp.department).filter(Boolean)),
  ];
  const totalStaff = data?.summaryCards?.totalStaff || 0;
  const presentCount = data?.summaryCards?.present || 0;
  const remoteCount = data?.summaryCards?.remote || 0;
  const absentCount = data?.summaryCards?.absent || 0;

  const attendanceChartData = (data?.monthlyAttendanceAnalytics || []).map(
    (m) => ({
      month: m.month,
      attendance: m.attendancePercentage,
    }),
  );

  const departmentChartData = (data?.departmentHeadcount || []).map((d) => ({
    name: d.department,
    value: d.count,
  }));

  const filteredEmployees = employees.filter((emp) => {
    const deptMatch =
      selectedDept === "All Departments" || emp.department === selectedDept;
    const statusMatch =
      selectedStatus === "all" ||
      (emp.status || "").toLowerCase() === selectedStatus;
    return deptMatch && statusMatch;
  });
  // -------- PAGINATION LOGIC --------
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  /* KPI cards — each with its own distinct palette (mirrors screenshot style) */
  const kpiCards = [
    {
      title: "Total Staff",
      value: totalStaff,
      icon: FiUsers,
      bg: "from-blue-50 to-blue-100/60",
      border: "border-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      valColor: "text-blue-700",
    },
    {
      title: "Present",
      value: presentCount,
      icon: FiCheckCircle,
      bg: "from-emerald-50 to-emerald-100/60",
      border: "border-emerald-100",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      valColor: "text-emerald-700",
    },
    {
      title: "Remote",
      value: remoteCount,
      icon: FiHome,
      bg: "from-amber-50 to-yellow-100/60",
      border: "border-amber-100",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      valColor: "text-amber-700",
    },
    {
      title: "Absent",
      value: absentCount,
      icon: FiX,
      bg: "from-slate-50 to-slate-100/60",
      border: "border-slate-200",
      iconBg: "bg-slate-200",
      iconColor: "text-slate-500",
      valColor: "text-slate-600",
    },
  ];

  return (
    <div
      className="flex h-screen font-sans overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #eef2ff 0%, #e0f2fe 50%, #f0fdf4 100%)",
      }}
    >
      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <div className="h-16 bg-white/80 backdrop-blur border-b border-slate-100 flex items-center px-6 gap-4 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <FiMenu size={18} />
          </button>
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <FiSearch
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
              />
              <input
                type="text"
                placeholder="Search employees..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
              <FiBell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            {/* <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              {userInitial}
            </div> */}
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">

          {loading ? (
            <div className="px-6 py-5">
              <HRDashboardSkeleton />
            </div>
          ) : (
            <div className="px-6 py-5">
              {/* Page Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                    HR Dashboard
                  </h1>
                  <p className="text-sm text-slate-400 mt-0.5 font-normal">
                    Welcome back, {userName} · {formattedDate}
                  </p>
                </div>
                {/* <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
              <FiUserPlus size={15} />
              Add Employee
            </button> */}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                {/* Attendance Bar Chart */}
                <div
                  className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-white/80"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-bold text-gray-800 tracking-tight">
                        Attendance Overview
                      </h2>
                      <p className="text-xs text-slate-400 font-normal">
                        Last 6 months (%)
                      </p>
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-3 py-1 rounded-full">
                      Monthly
                    </span>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={attendanceChartData} barCategoryGap="30%">
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f1f5f9"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      {/* <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} /> */}
                      <Tooltip
                        formatter={(value) => `${value}%`}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid #e2e8f0",
                          fontSize: 12,
                        }}
                      />

                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid #e2e8f0",
                          fontSize: 12,
                        }}
                        cursor={{ fill: "#f0f9ff" }}
                      />
                      {/* <Bar dataKey="present" name="Present" fill="#ADD8E6" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="absent"  name="Absent"  fill="#fca5a5" radius={[6, 6, 0, 0]} /> */}

                      <Bar
                        dataKey="attendance"
                        name="Attendance %"
                        fill="#60a5fa"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Department Pie Chart */}
                <div
                  className="bg-white rounded-2xl p-5 shadow-sm border border-white/80"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                >
                  <div className="mb-4">
                    <h2 className="text-sm font-bold text-gray-800 tracking-tight">
                      Dept. Headcount
                    </h2>
                    <p className="text-xs text-slate-400 font-normal">
                      Total: 125 employees
                    </p>
                  </div>
                  <ResponsiveContainer width="100%" height={140}>
                    {/* <PieChart>
                 <Pie data={data?.departmentStats || []}cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                    {headcountData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "10px", fontSize: 12 }} />
                </PieChart> */}
                    <PieChart>
                      <Pie
                        data={departmentChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={65}
                        dataKey="value"
                        paddingAngle={3}
                      >
                        {departmentChartData.map((entry, i) => (
                          <Cell
                            key={i}
                            fill={
                              [
                                "#60a5fa",
                                "#34d399",
                                "#f59e0b",
                                "#f472b6",
                                "#a78bfa",
                                "#fb7185",
                              ][i % 6]
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-1.5 mt-2">
                    {departmentChartData.map((d, i) => (
                      <div
                        key={d.name}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              background: [
                                "#60a5fa",
                                "#34d399",
                                "#f59e0b",
                                "#f472b6",
                                "#a78bfa",
                                "#fb7185",
                              ][i % 6],
                            }}
                          />
                          <span className="text-slate-500 font-normal">
                            {d.name}
                          </span>
                        </div>
                        <span className="font-bold text-gray-700">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Attendance Roster Section */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Filter Panel */}
                <div
                  className="bg-white rounded-2xl p-5 shadow-sm border border-white/80 h-fit"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <FiFilter size={14} className="text-slate-400" />
                    <h2 className="text-sm font-bold text-gray-800 tracking-tight">
                      Filters
                    </h2>
                  </div>

                  <div className="mb-5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                      Department
                    </p>
                    <select
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                      className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 text-slate-600 font-normal focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 bg-slate-50 transition-colors"
                    >
                      {departments.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                      Status
                    </p>
                    <div className="space-y-1.5">
                      {[
                        {
                          key: "all",
                          label: "All Status",
                          icon: FiUsers,
                          color: "text-blue-600",
                          activeBg: "bg-blue-600",
                        },
                        {
                          key: "present",
                          label: "In Office",
                          icon: FiCheckCircle,
                          color: "text-emerald-500",
                          activeBg: "bg-emerald-500",
                        },
                        {
                          key: "remote",
                          label: "Remote",
                          icon: FiHome,
                          color: "text-amber-500",
                          activeBg: "bg-amber-500",
                        },
                        {
                          key: "absent",
                          label: "Absent",
                          icon: FiX,
                          color: "text-slate-400",
                          activeBg: "bg-slate-500",
                        },
                      ].map(({ key, label, icon: Icon, color, activeBg }) => (
                        <button
                          key={key}
                          onClick={() => setSelectedStatus(key)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${selectedStatus === key
                              ? `${activeBg} text-white`
                              : "text-slate-500 hover:bg-slate-50"
                            }`}
                        >
                          <Icon
                            size={15}
                            className={
                              selectedStatus === key ? "text-white" : color
                            }
                          />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Roster Panel */}
                <div
                  className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-white/80 overflow-hidden"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                >
                  {/* KPI Cards — colorful, like the Monthly Summary screenshot */}
                  <div className="grid grid-cols-4 divide-x divide-slate-100 border-b border-slate-100">
                    {kpiCards.map((card) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={card.title}
                          className={`p-4 bg-gradient-to-br ${card.bg} flex flex-col gap-1`}
                        >
                          <div
                            className={`w-8 h-8 rounded-xl ${card.iconBg} flex items-center justify-center mb-2`}
                          >
                            <Icon size={15} className={card.iconColor} />
                          </div>
                          <p className={`text-2xl font-bold ${card.valColor}`}>
                            {card.value}
                          </p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {card.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Roster Header */}
                  <div className="px-5 pt-4 pb-3 border-b border-slate-50">
                    <h2 className="text-sm font-bold text-gray-800 tracking-tight">
                      Attendance Roster
                    </h2>
                    <p className="text-xs text-slate-400 font-normal">
                      Showing{" "}
                      {filteredEmployees.length === 0
                        ? 0
                        : indexOfFirstEmployee + 1}
                      –{Math.min(indexOfLastEmployee, filteredEmployees.length)} of{" "}
                      {filteredEmployees.length} employees
                    </p>
                  </div>

                  {/* Roster Table */}
                  {filteredEmployees.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <FiUsers size={26} className="text-slate-300" />
                      </div>
                      <p className="text-sm font-semibold text-slate-500">
                        No employees found
                      </p>
                      <p className="text-xs text-slate-300 mt-1 font-normal">
                        Try adjusting your filters
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-auto max-h-72">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-100 bg-slate-50/70">
                            <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Employee
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Department
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider hidden md:table-cell">
                              Role
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        {/* <tbody>
                      {filteredEmployees.map((emp, idx) => { */}
                        <tbody>
                          {currentEmployees.map((emp, idx) => {
                            const sc =
                              statusConfig[(emp.status || "").toLowerCase()] ||
                              statusConfig.absent;
                            const grad =
                              avatarGradients[idx % avatarGradients.length];

                            return (
                              <tr
                                key={emp.id}
                                className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors"
                              >
                                <td className="px-5 py-3">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={`w-8 h-8 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                                    >
                                      {emp.employeeName
                                        ?.split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </div>
                                    <span className="font-semibold text-gray-700">
                                      {emp.employeeName}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-5 py-3 text-slate-500 font-normal">
                                  {emp.department}
                                </td>
                                <td className="px-5 py-3 text-slate-400 font-normal hidden md:table-cell">
                                  {emp.designation}
                                </td>
                                <td className="px-5 py-3">
                                  <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.color}`}
                                  >
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}
                                    />
                                    {sc.label}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {totalPages > 1 && (
                    <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
                      <button
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 text-sm rounded-lg bg-slate-100 disabled:opacity-40 hover:bg-slate-200"
                      >
                        Previous
                      </button>

                      <div className="flex gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-8 h-8 rounded-lg text-sm font-semibold ${currentPage === i + 1
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 hover:bg-slate-200"
                              }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 text-sm rounded-lg bg-slate-100 disabled:opacity-40 hover:bg-slate-200"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}      