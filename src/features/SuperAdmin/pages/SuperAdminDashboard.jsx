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
  FiTrendingUp,
} from "react-icons/fi";
import {
  HiUsers,
  HiUserPlus,
  HiCalendarDays,
} from "react-icons/hi2";
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
import SuperAdminDashboardSkeleton from
  "../SuperAdminSkeleton/SuperAdminDashboardSkeleton";





ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const OFFICE_START_TIME = 9 * 60; // 9:00 AM

function parseTimeToMinutes(time) {
  if (!time || time === "—") return null;

  const [clock, meridian] = time.split(" ");
  let [hour, minute] = clock.split(":").map(Number);

  if (meridian === "PM" && hour !== 12) hour += 12;
  if (meridian === "AM" && hour === 12) hour = 0;

  return hour * 60 + minute;
}

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("attendance");
  const [showSkeleton, setShowSkeleton] = useState(true);

  const {
    getAttendanceDataLoading,
    getDashboardDataLoading,
  } = useSelector((state) => state.superAdmin?.dashboard || {});

useEffect(() => {
  if (
    (activeTab === "attendance" && !getAttendanceDataLoading) ||
    (activeTab === "analytics" && !getDashboardDataLoading)
  ) {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(timer);
  } else {
    setShowSkeleton(true);
  }
}, [activeTab,getAttendanceDataLoading, getDashboardDataLoading]);

  return (

    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans text-slate-700">

  {showSkeleton && (
      <div className="absolute inset-0 z-50 bg-[#F8FAFC]">
        <SuperAdminDashboardSkeleton />
      </div>
    )}




      {/* TOGGLE NAVIGATION */}
      <div className="flex justify-center mb-10">
        <div className="bg-white p-1 rounded-2xl flex gap-1 border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === "analytics"
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-500 hover:bg-slate-50"
              }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === "attendance"
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-500 hover:bg-slate-50"
              }`}
          >
            Attendance
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto">
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

  const deptIcons = {
    Sales: <FiTrendingUp className="text-blue-500" />,
    IT: <FiServer className="text-indigo-500" />,
    Marketing: <FiActivity className="text-emerald-500" />,
    Finance: <FiActivity className="text-purple-500" />,
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-red-100 shadow-sm space-y-6">
      <h3 className="text-xl font-bold text-red-600 flex items-center gap-2">
        <FiActivity /> Late Check-In Monitor
      </h3>

      {lateCount === 0 ? (
        <p className="text-sm font-bold text-emerald-600">
          No late check-ins today ✓
        </p>
      ) : (
        <>
          <div className="text-2xl font-black text-red-600">
            {lateCount} {lateCount === 1 ? 'employee' : 'employees'} late
          </div>

          <hr className="border-red-100" />

          {/* Individual List */}
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {lateEmployees.map((emp, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-700">{emp.name || 'Unknown'}</p>
                  <p className="text-xs text-slate-400">{emp.department || 'N/A'}</p>
                </div>
                <span className="font-mono text-red-600 font-black">
                  {emp.checkInTime || '—'}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}


// VIEW 1: ATTENDANCE TRACKER 

function LiveAttendanceTracker() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  // GET ATTENDANCE DATA (NOT DASHBOARD DATA!)
  const {
    attendanceData,
    getAttendanceDataLoading,
  } = useSelector((state) => state.superAdmin?.dashboard || {});
  // GET DASHBOARD DATA FOR DEPARTMENTS LIST
  const { dashboardData } = useSelector(
    (state) => state.superAdmin?.dashboard || {}
  );

 
  useEffect(() => {
    // Fetch attendance data
    dispatch(superAdminDashboardThunk.getAttendanceDataThunk())
      .unwrap()
      .then((res) => {
        console.log("Attendance data:", res);
      })
      .catch((err) => {
        console.log("Error fetching attendance:", err);
      });

    // Fetch dashboard data for departments
    dispatch(superAdminDashboardThunk.getDashboardDataThunk())
      .unwrap()
      .then((res) => {
        console.log("Dashboard data:", res);
      })
      .catch((err) => {
        console.log("Error fetching dashboard:", err);
      });
  }, [dispatch]);

  
  const stats = {
    total: attendanceData?.overview?.totalStaff || 0,
    present: attendanceData?.overview?.present || 0,
    remote: attendanceData?.overview?.wfh || 0,
    absence: attendanceData?.overview?.absent || 0,
  };


  const roster = attendanceData?.roster || [];
  const departments = dashboardData?.departmentHeadcount?.map(d => d.department) || [];

  const filteredData = roster.filter((emp) => {
    const matchesSearch = emp.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || emp.status === selectedStatus;
    const matchesDepartment = selectedDepartment === "All" || emp.department === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // if (getAttendanceDataLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-64">
  //       <div className="text-blue-600 text-lg font-bold">Loading...</div>
  //     </div>
  //   );
  // }


// if (getAttendanceDataLoading) {
//   return <SuperAdminDashboardSkeleton />;
// }
// if (showSkeleton) {
//   return <SuperAdminDashboardSkeleton />;
// }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-[#1E3A8A] tracking-tight">
          Live Attendance Tracker
        </h1>
        <p className="text-blue-500 font-semibold mt-1">
          Live updates from all departments
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search employees..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar Filters */}
        <aside className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3 text-[#1E3A8A] font-bold text-lg">
              <FiFilter /> <h2>Filters</h2>
            </div>

            <div>
              <label className="text-[11px] font-black uppercase tracking-widest text-blue-400">
                Department
              </label>
              <select
                className="mt-3 w-full rounded-xl border border-slate-200 p-3 bg-slate-50/50 text-sm outline-none focus:border-blue-500"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="All">All</option>
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-black uppercase tracking-widest text-blue-400">
                Quick Status
              </label>
              <div className="mt-4 space-y-2">
                <StatusFilterBtn
                  label="All"
                  active={selectedStatus === "All"}
                  onClick={() => setSelectedStatus("All")}
                />
                <StatusFilterBtn
                  icon={FiCheckCircle}
                  label="In Office"
                  active={selectedStatus === "In Office"}
                  onClick={() => setSelectedStatus("In Office")}
                  color="text-blue-500"
                />
                <StatusFilterBtn
                  icon={FiHome}
                  label="WFH"
                  active={selectedStatus === "WFH"}
                  onClick={() => setSelectedStatus("WFH")}
                  color="text-cyan-500"
                />
                <StatusFilterBtn
                  icon={FiXCircle}
                  label="Absent"
                  active={selectedStatus === "Absent"}
                  onClick={() => setSelectedStatus("Absent")}
                  color="text-slate-400"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Stats and Table */}
        <main className="col-span-12 lg:col-span-9 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ImgStatCard
              label="TOTAL STAFF"
              value={stats.total}
              icon={FiUsers}
              color="text-blue-600"
            />
            <ImgStatCard
              label="PRESENT"
              value={stats.present}
              icon={FiCheckCircle}
              color="text-blue-500"
            />
            <ImgStatCard
              label="REMOTE"
              value={stats.remote}
              icon={FiHome}
              color="text-cyan-500"
            />
            <ImgStatCard
              label="ABSENCE"
              value={stats.absence}
              icon={FiXCircle}
              color="text-slate-400"
            />
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 pb-4">
              <h3 className="text-xl font-bold text-[#1E3A8A]">
                Attendance Roster
              </h3>
            </div>
            <div className="overflow-x-auto">
              {filteredData.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>No attendance records found.</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="text-left text-[11px] font-black text-blue-400 uppercase tracking-[0.15em]">
                    <tr className="border-b border-slate-50">
                      <th className="px-8 py-5">Employee</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Department</th>
                      <th className="px-8 py-5 text-right">Check-In</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredData.map((emp, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        <td className="px-8 py-5 font-bold text-slate-700">
                          {emp.name}
                        </td>
                        <td className="px-8 py-5">
                          <div
                            className={`flex items-center gap-2 font-bold ${emp.status === "Present" ? "text-blue-500" :
                              emp.status === "WFH" ? "text-cyan-500" :
                                "text-slate-400"
                              }`}
                          >
                            {emp.status === "Present" ? (
                              <FiCheckCircle />
                            ) : emp.status === "WFH" ? (
                              <FiHome />
                            ) : (
                              <FiXCircle />
                            )}
                            {emp.status}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-slate-500 font-medium">
                          {emp.department || "N/A"}
                        </td>
                        <td className="px-8 py-5 text-right text-slate-400 font-mono text-sm">
                          {emp.checkInTime || "—"}
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

// VIEW 2: ANALYTICS (With Quick Insights)

function SuperAdminSystemDashboard() {
  const dispatch = useDispatch();
  const { dashboardData } = useSelector(
    (state) => state.superAdmin?.dashboard || {}
  );

  useEffect(() => {
    dispatch(superAdminDashboardThunk.getDashboardDataThunk())
      .unwrap()
      .then((res) => {
        console.log("Analytics dashboard data:", res);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, [dispatch]);

  // Extract department data for chart
  const departmentLabels = dashboardData?.departmentHeadcount?.map(d => d.department) || [];
  const departmentCounts = dashboardData?.departmentHeadcount?.map(d => d.count) || [];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ImgStatCard
          label="TOTAL STAFF"
          value={dashboardData?.totalStaff || "0"}
          icon={HiUsers}
          color="text-blue-600"
        />
        <ImgStatCard
          label="NEW HIRES"
          value={dashboardData?.newHires || "0"}
          icon={HiUserPlus}
          color="text-emerald-500"
        />
        <ImgStatCard
          label="ON LEAVE"
          value={dashboardData?.onLeave || "0"}
          icon={HiCalendarDays}
          color="text-amber-500"
        />
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-[#1E3A8A] mb-8">
            Department Headcount
          </h3>
          <div className="h-[350px]">
            {departmentLabels.length > 0 ? (
              <Bar
                data={{
                  labels: departmentLabels,
                  datasets: [
                    {
                      data: departmentCounts,
                      backgroundColor: "#3B82F6",
                      borderRadius: 12,
                      barThickness: 45,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No department data available
              </div>
            )}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* LATE CHECK-IN MONITOR */}
          <LateCheckInMonitor />
        </div>
      </div>
    </div>
  );
}



function StatusFilterBtn({ icon: Icon, label, active, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${active
        ? "bg-blue-600 text-white shadow-lg"
        : "text-slate-600 hover:bg-slate-50"
        }`}
    >
      {Icon && <Icon className={active ? "text-white" : color} size={18} />}
      {label}
    </button>
  );
}

function ImgStatCard({ label, value, icon: Icon, color }) {
  const gradientMap = {
    "text-blue-600": "from-blue-100 to-blue-50",
    "text-emerald-500": "from-emerald-100 to-emerald-50",
    "text-amber-500": "from-amber-100 to-amber-50",
    "text-indigo-500": "from-indigo-100 to-indigo-50",
    "text-blue-500": "from-blue-100 to-blue-50",
    "text-cyan-500": "from-cyan-100 to-cyan-50",
    "text-slate-400": "from-slate-100 to-slate-50",
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-[2.2rem] p-8 bg-gradient-to-br ${gradientMap[color] || "from-slate-100 to-white"
        } shadow-md transition-all duration-500 hover:shadow-xl`}
    >
      {/* WAVE BACKGROUND */}
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 left-0 w-[140%] h-full opacity-70 transition-transform duration-700 ease-out 
           group-hover:translate-x-[-14%] group-hover:scale-y-110"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            fillOpacity="0.6"
            d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,229.3C840,235,960,213,1080,192C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>

      {/* CONTENT */}
      <div className="relative flex justify-between items-start">
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4">
            {label}
          </p>
          <p className="text-4xl font-black text-slate-800">{value}</p>
        </div>

        <div className="bg-white/80 backdrop-blur p-3 rounded-xl shadow-sm transition-transform duration-500 group-hover:scale-110">
          <Icon className={`text-xl ${color}`} />
        </div>
      </div>
    </div>
  );
}
 