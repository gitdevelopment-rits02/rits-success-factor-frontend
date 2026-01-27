import React, { useState, useMemo } from "react";
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

// --- Extended Dummy Data ---
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

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // --- Logic: Filtering ---
  const filteredEmployees = useMemo(() => {
    return INITIAL_DATA.filter((emp) => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDept === "All" || emp.dept === selectedDept;
      const matchesStatus = selectedStatus === "All" || emp.status === selectedStatus;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [searchTerm, selectedDept, selectedStatus]);

  // --- Logic: Stats Calculation ---
  const stats = {
    total: INITIAL_DATA.length,
    inOffice: INITIAL_DATA.filter(e => e.status === "In Office").length,
    wfh: INITIAL_DATA.filter(e => e.status === "WFH").length,
    absent: INITIAL_DATA.filter(e => e.status === "Absent").length,
  };

  return (
    <div className="min-h-screen bg-blue-50/50 p-4 md:p-8 text-slate-700 font-sans">
      {/* Header */}
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
        {/* Sidebar Filters */}
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
                  <FilterButton 
                    label="All" 
                    active={selectedStatus === "All"} 
                    onClick={() => setSelectedStatus("All")} 
                  />
                  <FilterButton 
                    icon={FiCheckCircle} 
                    label="In Office" 
                    active={selectedStatus === "In Office"} 
                    onClick={() => setSelectedStatus("In Office")} 
                    color="text-blue-600" 
                  />
                  <FilterButton 
                    icon={FiHome} 
                    label="WFH" 
                    active={selectedStatus === "WFH"} 
                    onClick={() => setSelectedStatus("WFH")} 
                    color="text-cyan-500" 
                  />
                  <FilterButton 
                    icon={FiXCircle} 
                    label="Absent" 
                    active={selectedStatus === "Absent"} 
                    onClick={() => setSelectedStatus("Absent")} 
                    color="text-slate-400" 
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-12 lg:col-span-9 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Stat title="Total Staff" value={stats.total} icon={FiUsers} color="text-blue-600" />
            <Stat title="Present" value={stats.inOffice} icon={FiCheckCircle} color="text-blue-500" />
            <Stat title="Remote" value={stats.wfh} icon={FiHome} color="text-cyan-500" />
            <Stat title="Absence" value={stats.absent} icon={FiXCircle} color="text-slate-400" />
          </div>

          {/* Attendance Table */}
          <section className="rounded-2xl bg-white shadow-sm border border-blue-50 overflow-hidden">
            <div className="p-6 border-b border-blue-50 flex justify-between items-center">
              <h2 className="font-bold text-blue-900">Attendance Roster</h2>
              <span className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {filteredEmployees.length} Results
              </span>
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
                    <TableRow key={emp.id} {...emp} />
                  ))}
                  {filteredEmployees.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-12 text-center text-slate-400">
                        No employees found matching those filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// --- Sub-Components ---

function Stat({ title, value, icon: Icon, color }) {
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

function TableRow({ name, status, dept, time, color }) {
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
    <button 
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
        active 
          ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
          : "text-slate-600 hover:bg-blue-50"
      }`}
    >
      {Icon && <Icon className={active ? "text-white" : color} />}
      <span className={active ? "font-bold" : "font-medium"}>{label}</span>
    </button>
  );
}