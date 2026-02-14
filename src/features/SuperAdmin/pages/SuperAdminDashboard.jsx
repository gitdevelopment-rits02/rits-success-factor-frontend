import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiHome,
  FiXCircle,
  FiCheckCircle,
  FiSearch,
  FiFilter,
  FiActivity,
  FiServer,
} from "react-icons/fi";
import { HiUsers, HiUserPlus, HiCalendarDays } from "react-icons/hi2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import superAdminDashboardThunk from "../Redux/thunks/superAdminDashboardThunk";
import SuperAdminDashboardSkeleton from "../SuperAdminSkeleton/SuperAdminDashboardSkeleton";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("attendance");
  const [showSkeleton, setShowSkeleton] = useState(true);

  const { getAttendanceDataLoading, getDashboardDataLoading } = useSelector(
    (state) => state.superAdmin?.dashboard || {}
  );

  useEffect(() => {
    if (
      (activeTab === "attendance" && !getAttendanceDataLoading) ||
      (activeTab === "analytics" && !getDashboardDataLoading)
    ) {
      const timer = setTimeout(() => setShowSkeleton(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(true);
    }
  }, [activeTab, getAttendanceDataLoading, getDashboardDataLoading]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {showSkeleton && (
        <div className="absolute inset-0 z-50 bg-gray-50">
          <SuperAdminDashboardSkeleton />
        </div>
      )}

      <div className="flex justify-center mb-8">
        <div className="bg-white p-1 rounded-xl inline-flex gap-1 border border-gray-200 shadow-sm">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-6 sm:px-8 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === "analytics"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={`px-6 sm:px-8 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === "attendance"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Attendance
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {activeTab === "analytics" ? (
          <SuperAdminSystemDashboard />
        ) : (
          <LiveAttendanceTracker />
        )}
      </div>
    </div>
  );
}

function LateCheckInMonitor() {
  const { dashboardData } = useSelector(
    (state) => state.superAdmin?.dashboard || {}
  );

  const lateEmployees = dashboardData?.lateCheckins?.employees || [];
  const lateCount = dashboardData?.lateCheckins?.count || 0;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-red-50 rounded-lg">
          <FiActivity className="text-red-500 text-lg" />
        </div>
        <h3 className="text-base font-semibold text-gray-800">Late Check-Ins</h3>
      </div>

      {lateCount === 0 ? (
        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-3 rounded-lg">
          <FiCheckCircle />
          <span className="text-sm font-medium">All on time today!</span>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <span className="text-3xl font-semibold text-red-500">{lateCount}</span>
            <span className="text-gray-500 ml-2 text-sm">
              {lateCount === 1 ? "employee late" : "employees late"}
            </span>
          </div>

          <hr className="border-gray-100 mb-4" />

          <div className="space-y-3 max-h-48 overflow-y-auto">
            {lateEmployees.map((emp, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-700 text-sm truncate">
                    {emp.name || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-400">{emp.department || "N/A"}</p>
                </div>
                <span className="font-mono text-red-500 font-medium text-sm ml-3 whitespace-nowrap">
                  {emp.checkInTime || "—"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function LiveAttendanceTracker() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const { attendanceData } = useSelector(
    (state) => state.superAdmin?.dashboard || {}
  );
  const { dashboardData } = useSelector(
    (state) => state.superAdmin?.dashboard || {}
  );

  useEffect(() => {
    dispatch(superAdminDashboardThunk.getAttendanceDataThunk())
      .unwrap()
      .then((res) => console.log("Attendance data:", res))
      .catch((err) => console.log("Error fetching attendance:", err));

    dispatch(superAdminDashboardThunk.getDashboardDataThunk())
      .unwrap()
      .then((res) => console.log("Dashboard data:", res))
      .catch((err) => console.log("Error fetching dashboard:", err));
  }, [dispatch]);

  const stats = {
    total: attendanceData?.overview?.totalStaff || 0,
    present: attendanceData?.overview?.present || 0,
    remote: attendanceData?.overview?.wfh || 0,
    absence: attendanceData?.overview?.absent || 0,
  };

  const roster = attendanceData?.roster || [];
  const departments =
    dashboardData?.departmentHeadcount?.map((d) => d.department) || [];

  const filteredData = roster.filter((emp) => {
    const matchesSearch = emp.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || emp.status === selectedStatus;
    const matchesDepartment =
      selectedDepartment === "All" || emp.department === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-semibold text-blue-600 mb-2">
          Live Attendance
        </h1>
        <p className="text-gray-500 font-normal text-sm sm:text-base">
          Real-time updates across all departments
        </p>
      </div>

      <div className="relative max-w-md">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or ID..."
          className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm lg:sticky lg:top-6">
            <div className="flex items-center gap-2 mb-6">
              <FiFilter className="text-gray-600" />
              <h2 className="font-semibold text-gray-800 text-base">Filters</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-2 block">
                  Department
                </label>
                <select
                  className="w-full rounded-lg border border-gray-200 p-2.5 bg-white text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  {departments.map((dept, idx) => (
                    <option key={idx} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 mb-3 block">
                  Status
                </label>
                <div className="space-y-2">
                  <FilterButton
                    label="All Status"
                    active={selectedStatus === "All"}
                    onClick={() => setSelectedStatus("All")}
                  />
                  <FilterButton
                    icon={FiCheckCircle}
                    label="In Office"
                    active={selectedStatus === "In Office"}
                    onClick={() => setSelectedStatus("In Office")}
                    color="text-blue-500"
                  />
                  <FilterButton
                    icon={FiHome}
                    label="Remote"
                    active={selectedStatus === "WFH"}
                    onClick={() => setSelectedStatus("WFH")}
                    color="text-cyan-500"
                  />
                  <FilterButton
                    icon={FiXCircle}
                    label="Absent"
                    active={selectedStatus === "Absent"}
                    onClick={() => setSelectedStatus("Absent")}
                    color="text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-9 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickStatCard
              label="Total Staff"
              value={stats.total}
              icon={FiUsers}
              color="blue"
            />
            <QuickStatCard
              label="Present"
              value={stats.present}
              icon={FiCheckCircle}
              color="emerald"
            />
            <QuickStatCard
              label="Remote"
              value={stats.remote}
              icon={FiHome}
              color="cyan"
            />
            <QuickStatCard
              label="Absent"
              value={stats.absence}
              icon={FiXCircle}
              color="gray"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                Attendance Roster
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {filteredData.length}{" "}
                {filteredData.length === 1 ? "employee" : "employees"} shown
              </p>
            </div>

            <div className="overflow-x-auto">
              {filteredData.length === 0 ? (
                <div className="p-12 text-center">
                  <FiUsers className="mx-auto text-4xl text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium">No employees found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Try adjusting your filters
                  </p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="text-left bg-gray-50">
                    <tr className="border-b border-gray-100">
                      <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase hidden sm:table-cell">
                        Department
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase text-right">
                        Check-In
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredData.map((emp, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-700 text-sm">
                              {emp.name}
                            </p>
                            <p className="text-xs text-gray-400 sm:hidden mt-0.5">
                              {emp.department || "N/A"}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={emp.status} />
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-normal text-sm hidden sm:table-cell">
                          {emp.department || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-gray-500 font-mono text-sm">
                            {emp.checkInTime || "—"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SuperAdminSystemDashboard() {
  const dispatch = useDispatch();
  const { dashboardData } = useSelector(
    (state) => state.superAdmin?.dashboard || {}
  );

  useEffect(() => {
    dispatch(superAdminDashboardThunk.getDashboardDataThunk())
      .unwrap()
      .then((res) => console.log("Analytics dashboard data:", res))
      .catch((err) => console.log("Error:", err));
  }, [dispatch]);

  const departmentLabels =
    dashboardData?.departmentHeadcount?.map((d) => d.department) || [];
  const departmentCounts =
    dashboardData?.departmentHeadcount?.map((d) => d.count) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <BigStatCard
          label="Total Staff"
          value={dashboardData?.totalStaff || "0"}
          icon={HiUsers}
          color="blue"
        />
        <BigStatCard
          label="New Hires"
          value={dashboardData?.newHires || "0"}
          icon={HiUserPlus}
          color="emerald"
        />
        <BigStatCard
          label="On Leave"
          value={dashboardData?.onLeave || "0"}
          icon={HiCalendarDays}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Department Headcount
          </h3>
          <div className="h-[300px] sm:h-[350px]">
            {departmentLabels.length > 0 ? (
              <Bar
                data={{
                  labels: departmentLabels,
                  datasets: [
                    {
                      data: departmentCounts,
                      backgroundColor: "#3B82F6",
                      borderRadius: 8,
                      barThickness: 40,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      backgroundColor: "#1e293b",
                      padding: 12,
                      titleFont: { size: 13, weight: "600" },
                      bodyFont: { size: 13 },
                      cornerRadius: 6,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: { color: "#f3f4f6" },
                      ticks: { font: { size: 12 } },
                    },
                    x: {
                      grid: { display: false },
                      ticks: { font: { size: 12 } },
                    },
                  },
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <FiServer className="mx-auto text-4xl text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium">
                    No department data available
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4">
          <LateCheckInMonitor />
        </div>
      </div>
    </div>
  );
}

function FilterButton({ icon: Icon, label, active, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all font-medium text-sm ${
        active
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-200"
      }`}
    >
      {Icon && <Icon className={active ? "text-white" : color} size={16} />}
      {label}
    </button>
  );
}

function StatusBadge({ status }) {
  const configs = {
    Present: {
      icon: FiCheckCircle,
      bg: "bg-blue-50",
      text: "text-blue-600",
      label: "Office",
    },
    WFH: {
      icon: FiHome,
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      label: "Remote",
    },
    Absent: {
      icon: FiXCircle,
      bg: "bg-gray-100",
      text: "text-gray-500",
      label: "Absent",
    },
  };

  const config = configs[status] || configs.Absent;
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md ${config.bg} ${config.text} font-medium text-xs`}
    >
      <Icon size={13} />
      <span>{config.label}</span>
    </div>
  );
}

function QuickStatCard({ label, value, icon: Icon, color }) {
  const configs = {
    blue: { 
      bg: "bg-blue-50", 
      text: "text-blue-600",
      gradient: "from-blue-50 to-blue-100/50",
      iconBg: "bg-blue-100"
    },
    emerald: { 
      bg: "bg-emerald-50", 
      text: "text-emerald-600",
      gradient: "from-emerald-50 to-emerald-100/50",
      iconBg: "bg-emerald-100"
    },
    cyan: { 
      bg: "bg-cyan-50", 
      text: "text-cyan-600",
      gradient: "from-cyan-50 to-cyan-100/50",
      iconBg: "bg-cyan-100"
    },
    gray: { 
      bg: "bg-gray-100", 
      text: "text-gray-500",
      gradient: "from-gray-50 to-gray-100/50",
      iconBg: "bg-gray-200"
    },
  };

  const config = configs[color];

  return (
    <div className={`relative overflow-hidden p-5 rounded-xl bg-gradient-to-br ${config.gradient} border border-gray-200 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${config.iconBg}`}>
          <Icon className={`${config.text} text-xl`} />
        </div>
      </div>
      <div>
        <p className="text-3xl font-semibold text-gray-800">{value}</p>
        <p className="text-xs font-medium text-gray-500 mt-1 uppercase">
          {label}
        </p>
      </div>
    </div>
  );
}

function BigStatCard({ label, value, icon: Icon, color }) {
  const configs = {
    blue: {
      gradient: "from-blue-50 to-blue-100/50",
      iconBg: "bg-blue-100",
      text: "text-blue-600",
    },
    emerald: {
      gradient: "from-emerald-50 to-emerald-100/50",
      iconBg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    amber: {
      gradient: "from-amber-50 to-amber-100/50",
      iconBg: "bg-amber-100",
      text: "text-amber-600",
    },
  };

  const config = configs[color];

  return (
    <div
      className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${config.gradient} border border-gray-200 shadow-sm hover:shadow-md transition-all`}
    >
      <div className="relative flex justify-between items-start">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-3 uppercase">
            {label}
          </p>
          <p className="text-4xl font-semibold text-gray-800">{value}</p>
        </div>
        <div className={`${config.iconBg} p-3 rounded-lg shadow-sm`}>
          <Icon className={`text-2xl ${config.text}`} />
        </div>
      </div>
    </div>
  );
}