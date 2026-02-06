import React, { useState, useMemo } from "react";
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
  HiArrowTrendingUp,
} from "react-icons/hi2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const INITIAL_DATA = [
  { id: 1, name: "John Smith", dept: "Sales", time: "9:05 AM", status: "In Office", color: "text-blue-600" },
  { id: 2, name: "Emily Davis", dept: "Marketing", time: "—", status: "WFH", color: "text-cyan-500" },
  { id: 3, name: "Michael Lee", dept: "HR", time: "—", status: "Absent", color: "text-slate-400" },
  { id: 4, name: "Sarah Johnson", dept: "IT", time: "8:55 AM", status: "In Office", color: "text-blue-600" },
  { id: 5, name: "David Chen", dept: "IT", time: "9:15 AM", status: "In Office", color: "text-blue-600" },
  { id: 6, name: "Angela Moss", dept: "Finance", time: "—", status: "On Leave", color: "text-indigo-400" },
  { id: 7, name: "Chris Evans", dept: "Sales", time: "—", status: "WFH", color: "text-cyan-500" },
  { id: 8, name: "Jessica Alba", dept: "Marketing", time: "9:02 AM", status: "In Office", color: "text-blue-600" },
  { id: 9, name: "Robert Fox", dept: "Finance", time: "—", status: "Absent", color: "text-slate-400" },
  { id: 10, name: "Linda Blair", dept: "IT", time: "8:30 AM", status: "In Office", color: "text-blue-600" },
];
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans text-slate-700">

      {/* TOGGLE NAVIGATION */}
      <div className="flex justify-center mb-10">
        <div className="bg-white p-1 rounded-2xl flex gap-1 border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === "analytics" ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
              }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === "attendance" ? "bg-blue-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
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
  const lateEmployees = INITIAL_DATA.filter(emp => {
    if (emp.status !== "In Office") return false;
    const minutes = parseTimeToMinutes(emp.time);
    return minutes !== null && minutes > OFFICE_START_TIME;
  });

  const deptCounts = lateEmployees.reduce((acc, emp) => {
    acc[emp.dept] = (acc[emp.dept] || 0) + 1;
    return acc;
  }, {});
  const deptIcons = {
    Sales: <FiTrendingUp className="text-blue-500" />,
    IT: <FiServer className="text-indigo-500" />,
    Marketing: <FiActivity className="text-emerald-500" />,
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-red-100 shadow-sm space-y-6">
      <h3 className="text-xl font-bold text-red-600 flex items-center gap-2">
        <FiActivity /> Late Check-In Monitor
      </h3>

      {lateEmployees.length === 0 ? (
        <p className="text-sm font-bold text-emerald-600">
          No late check-ins today
        </p>
      ) : (
        <>
          {/* Department Summary */}
          <div className="space-y-2">
            {Object.entries(deptCounts).map(([dept, count]) => (
              <div
                key={dept}
                className="flex items-center justify-between text-sm font-bold"
              >
                <div className="flex items-center gap-2 text-slate-600">
                  {deptIcons[dept]}
                  <span>{dept}</span>
                </div>
                <span className="text-red-500">{count}</span>
              </div>
            ))}

          </div>

          <hr className="border-red-100" />

          {/* Individual List */}
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {lateEmployees.map(emp => (
              <div key={emp.id} className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-700">{emp.name}</p>
                  <p className="text-xs text-slate-400">{emp.dept}</p>
                </div>
                <span className="font-mono text-red-600 font-black">
                  {emp.time}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}


// ==========================================
// VIEW 1: ATTENDANCE TRACKER (Matches Image)
// ==========================================
function LiveAttendanceTracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const stats = {
    total: 10,
    present: 5,
    remote: 2,
    absence: 2,
  };
  const OFFICE_START_TIME = 9 * 60; // 9:00 AM in minutes

  function parseTimeToMinutes(time) {
    if (!time || time === "—") return null;

    const [clock, meridian] = time.split(" ");
    let [hour, minute] = clock.split(":").map(Number);

    if (meridian === "PM" && hour !== 12) hour += 12;
    if (meridian === "AM" && hour === 12) hour = 0;

    return hour * 60 + minute;
  }

  const filteredData = INITIAL_DATA.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || emp.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });



  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-[#1E3A8A] tracking-tight">Live Attendance Tracker</h1>
        <p className="text-blue-500 font-semibold mt-1">Live updates from all departments</p>
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
              <label className="text-[11px] font-black uppercase tracking-widest text-blue-400">Department</label>
              <select className="mt-3 w-full rounded-xl border border-slate-200 p-3 bg-slate-50/50 text-sm outline-none focus:border-blue-500">
                <option>All</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-black uppercase tracking-widest text-blue-400">Quick Status</label>
              <div className="mt-4 space-y-2">
                <StatusFilterBtn label="All" active={selectedStatus === "All"} onClick={() => setSelectedStatus("All")} />
                <StatusFilterBtn icon={FiCheckCircle} label="In Office" active={selectedStatus === "In Office"} onClick={() => setSelectedStatus("In Office")} color="text-blue-500" />
                <StatusFilterBtn icon={FiHome} label="WFH" active={selectedStatus === "WFH"} onClick={() => setSelectedStatus("WFH")} color="text-cyan-500" />
                <StatusFilterBtn icon={FiXCircle} label="Absent" active={selectedStatus === "Absent"} onClick={() => setSelectedStatus("Absent")} color="text-slate-400" />
              </div>
            </div>
          </div>
        </aside>

        {/* Stats and Table */}
        <main className="col-span-12 lg:col-span-9 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ImgStatCard label="TOTAL STAFF" value={stats.total} icon={FiUsers} color="text-blue-600" />
            <ImgStatCard label="PRESENT" value={stats.present} icon={FiCheckCircle} color="text-blue-500" />
            <ImgStatCard label="REMOTE" value={stats.remote} icon={FiHome} color="text-cyan-500" />
            <ImgStatCard label="ABSENCE" value={stats.absence} icon={FiXCircle} color="text-slate-400" />
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 pb-4">
              <h3 className="text-xl font-bold text-[#1E3A8A]">Attendance Roster</h3>
            </div>
            <div className="overflow-x-auto">
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
                  {filteredData.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-8 py-5 font-bold text-slate-700">{emp.name}</td>
                      <td className="px-8 py-5">
                        <div className={`flex items-center gap-2 font-bold ${emp.color}`}>
                          {emp.status === "In Office" ? <FiCheckCircle /> : emp.status === "WFH" ? <FiHome /> : <FiXCircle />}
                          {emp.status}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-slate-500 font-medium">{emp.dept}</td>
                      <td className="px-8 py-5 text-right text-slate-400 font-mono text-sm">{emp.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ==========================================
// VIEW 2: ANALYTICS (With Quick Insights)
// ==========================================
function SuperAdminSystemDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <ImgStatCard label="TOTAL STAFF" value="1,284" icon={HiUsers} color="text-blue-600" />
        <ImgStatCard label="NEW HIRES" value="24" icon={HiUserPlus} color="text-emerald-500" />
        <ImgStatCard label="ON LEAVE" value="12" icon={HiCalendarDays} color="text-amber-500" />
        {/* <ImgStatCard label="EFFICIENCY" value="94%" icon={HiArrowTrendingUp} color="text-indigo-500" /> */}
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-[#1E3A8A] mb-8">Department Headcount</h3>
          <div className="h-[350px]">
            <Bar
              data={{
                labels: ["Design", "Dev", "Marketing", "Sales", "Ops"],
                datasets: [{ data: [45, 110, 65, 85, 30], backgroundColor: "#3B82F6", borderRadius: 12, barThickness: 45 }],
              }}
              options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">

          {/* LATE CHECK-IN MONITOR */}
          <LateCheckInMonitor />

          {/* SYSTEM INSIGHTS */}


        </div>

      </div>
    </div>
  );
}

// --- SHARED COMPONENTS ---

function StatusFilterBtn({ icon: Icon, label, active, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${active ? "bg-blue-600 text-white shadow-lg" : "text-slate-600 hover:bg-slate-50"
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
          <p className="text-4xl font-black text-slate-800">
            {value}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur p-3 rounded-xl shadow-sm transition-transform duration-500 group-hover:scale-110">
          <Icon className={`text-xl ${color}`} />
        </div>
      </div>
    </div>
  );
}
 