import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiHome,
  FiXCircle,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
  FiSearch,
  FiFilter
} from "react-icons/fi";
import {
  HiUsers,
  HiUserPlus,
  HiCalendarDays,
  HiCheckBadge,
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

// Register ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

// Shared Dummy Data
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
// ==============================
// REPORT DOWNLOAD (CSV)
// ==============================
function downloadAttendanceReport(data) {
  const headers = ["Name", "Department", "Status", "Check-In"];
  const rows = data.map(emp =>
    [emp.name, emp.dept, emp.status, emp.time].join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "attendance_report.csv";
  a.click();

  URL.revokeObjectURL(url);
}


export default function SuperAdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 space-y-16">

      {/* SECTION 1: SYSTEM & HR ANALYTICS */}
      <section>
        <SuperAdminSystemDashboard />
      </section>

      {/* DIVIDER LINE */}
      <div className="border-t-2 border-blue-100/50 w-full" />

      {/* SECTION 2: WORKFORCE & ATTENDANCE */}
      <section>
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">Live Attendance Tracker</h2>
          <p className="text-blue-500 font-medium">Live updates from all departments</p>
        </div>
        <SuperAdminWorkforceWithHRAnalytics />
      </section>

    </div>
  );
}

// ==========================================
// COMPONENT 1: System & HR Analytics (Stacked Top)
// ==========================================
function SuperAdminSystemDashboard() {
  return (
    <div className="font-sans">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-blue-500 font-medium">Metrics for April 2024</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => downloadAttendanceReport(INITIAL_DATA)}
            className="px-4 py-2 bg-white border border-blue-100 text-blue-600 rounded-xl font-semibold shadow-sm hover:bg-blue-50 transition-all"
          >
            Download Report
          </button>

          <Link
            to="/superadmin/adminmanagement"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all inline-block"
          >
            + Add Employee
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <SystemStatCard icon={HiUsers} label="Total Staff" value="1,284" />
          <SystemStatCard icon={HiUserPlus} label="New Hires" value="24" />
          <SystemStatCard icon={HiCalendarDays} label="On Leave" value="12" sub="Currently out" />
          {/* <SystemStatCard icon={HiCheckBadge} label="Retention" value="98.2%" /> */}
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-6">
          <SystemCard title="Department Headcount">
            <div className="h-[300px] w-full mt-4">
              <Bar
                data={{
                  labels: ["Design", "Dev", "Marketing", "Sales", "Ops"],
                  datasets: [{
                    data: [45, 110, 65, 85, 30],
                    backgroundColor: "#60a5fa",
                    borderRadius: 12,
                    hoverBackgroundColor: "#2563eb",
                    barThickness: 40,
                  }],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { border: { display: false }, grid: { color: "#f1f5f9" } },
                    x: { border: { display: false }, grid: { display: false } }
                  }
                }}
              />
            </div>
          </SystemCard>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <SystemCard title="Pending Approvals" highlight>
            <div className="space-y-4">
              <ApprovalRow name="Marcus Finn" type="Annual Leave" days="3 Days" />
              <ApprovalRow name="Elena Rodriguez" type="Sick Leave" days="1 Day" />
              <ApprovalRow name="Kevin Vark" type="Maternity" days="4 Months" />
              <button className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors mt-2">
                Go to Approval Center
              </button>
            </div>
          </SystemCard>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENT 2: Workforce & Attendance (Stacked Bottom)
// ==========================================
function SuperAdminWorkforceWithHRAnalytics() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredEmployees = useMemo(() => {
    return INITIAL_DATA.filter((emp) => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDept === "All" || emp.dept === selectedDept;
      const matchesStatus = selectedStatus === "All" || emp.status === selectedStatus;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [searchTerm, selectedDept, selectedStatus]);

  const stats = {
    total: INITIAL_DATA.length,
    inOffice: INITIAL_DATA.filter(e => e.status === "In Office").length,
    wfh: INITIAL_DATA.filter(e => e.status === "WFH").length,
    absent: INITIAL_DATA.filter(e => e.status === "Absent").length,
  };

  return (
    <div className="text-slate-700 font-sans">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative group">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            placeholder="Search employees..."
            className="pl-10 pr-4 py-2 rounded-xl border border-blue-100 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 outline-none w-full md:w-64 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-3 space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-blue-50">
            <div className="flex items-center gap-2 mb-6 text-blue-900 font-bold">
              <FiFilter />
              <h2>Filters</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-blue-400">Department</label>
                <select
                  className="mt-2 w-full rounded-lg border border-blue-100 bg-blue-50/30 p-2.5 text-sm outline-none focus:border-blue-400"
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  <option>All</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>IT</option>
                  <option>Finance</option>
                  <option>HR</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-blue-400">Quick Status</label>
                <div className="mt-3 space-y-1">
                  <FilterButton label="All" active={selectedStatus === "All"} onClick={() => setSelectedStatus("All")} />
                  <FilterButton icon={FiCheckCircle} label="In Office" active={selectedStatus === "In Office"} onClick={() => setSelectedStatus("In Office")} color="text-blue-600" />
                  <FilterButton icon={FiHome} label="WFH" active={selectedStatus === "WFH"} onClick={() => setSelectedStatus("WFH")} color="text-cyan-500" />
                  <FilterButton icon={FiXCircle} label="Absent" active={selectedStatus === "Absent"} onClick={() => setSelectedStatus("Absent")} color="text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-9 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <WorkforceStat title="Total Staff" value={stats.total} icon={FiUsers} color="text-blue-600" />
            <WorkforceStat title="Present" value={stats.inOffice} icon={FiCheckCircle} color="text-blue-500" />
            <WorkforceStat title="Remote" value={stats.wfh} icon={FiHome} color="text-cyan-500" />
            <WorkforceStat title="Absence" value={stats.absent} icon={FiXCircle} color="text-slate-400" />
          </div>

          <section className="rounded-2xl bg-white shadow-sm border border-blue-50 overflow-hidden">
            <div className="p-6 border-b border-blue-50 flex justify-between items-center">
              <h2 className="font-bold text-blue-900">Attendance Roster</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-50/50 text-left text-blue-400 uppercase text-[10px] font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Check-In</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-50">
                  {filteredEmployees.map((emp) => (
                    <WorkforceTableRow key={emp.id} {...emp} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// --- SHARED REUSABLE COMPONENTS ---

function WorkforceStat({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-blue-50 hover:border-blue-200 transition-colors">
      <div className="flex justify-between items-start">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</p>
        <Icon className={`text-xl ${color}`} />
      </div>
      <p className="mt-3 text-3xl font-bold text-slate-800">{value}</p>
    </div>
  );
}

function WorkforceTableRow({ name, status, dept, time, color }) {
  const getIcon = () => {
    if (status === "In Office") return FiCheckCircle;
    if (status === "WFH") return FiHome;
    if (status === "Absent") return FiXCircle;
    return FiAlertTriangle;
  };
  const Icon = getIcon();
  return (
    <tr className="hover:bg-blue-50/30 transition-colors group">
      <td className="px-6 py-4 font-semibold text-slate-700">{name}</td>
      <td className="px-6 py-4">
        <div className={`flex items-center gap-2 font-medium ${color}`}>
          <Icon />
          {status}
        </div>
      </td>
      <td className="px-6 py-4 text-slate-500">{dept}</td>
      <td className="px-6 py-4 text-slate-400 font-mono">{time}</td>
    </tr>
  );
}

function FilterButton({ icon: Icon, label, active, onClick, color = "text-slate-600" }) {
  return (
    <button onClick={onClick} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${active ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-slate-600 hover:bg-blue-50"}`}>
      {Icon && <Icon className={active ? "text-white" : color} />}
      <span className={active ? "font-bold" : "font-medium"}>{label}</span>
    </button>
  );
}

const SystemStatCard = ({ icon: Icon, label, value, sub }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-blue-100/50 hover:shadow-xl transition-all group">
    <div className={`w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
    <div className="flex items-baseline justify-between mt-1">
      <h3 className="text-2xl font-black text-slate-800">{value}</h3>
      {sub && <span className="text-xs text-slate-400">{sub}</span>}
    </div>
  </div>
);

const SystemCard = ({ title, children, highlight }) => (
  <div className={`bg-white p-6 rounded-3xl shadow-sm border ${highlight ? 'border-blue-200' : 'border-blue-100/50'}`}>
    <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
    {children}
  </div>
);

const ApprovalRow = ({ name, type, days }) => (
  <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-50 hover:border-blue-100 transition-colors group cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white overflow-hidden">
        <img src={`https://i.pravatar.cc/100?u=${name}`} alt="" />
      </div>
      <div>
        <p className="text-sm font-bold text-slate-800">{name}</p>
        <p className="text-[11px] text-slate-400 font-medium">{type}</p>
      </div>
    </div>
    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{days}</span>
  </div>
);