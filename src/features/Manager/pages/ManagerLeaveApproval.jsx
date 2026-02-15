import React, { useMemo, useState } from "react";
import {
  FaClipboardList,
  FaCalendarDay,
  FaCheckCircle,
  FaTimesCircle,
  FaEllipsisV,
  FaFilter,
  FaUserSlash,
  FaChevronLeft,
  FaChevronRight,
  FaTrashRestore
} from "react-icons/fa";

/* ------------------ MOCK DATA ------------------ */
const employees = [
  { id: "EMP001", name: "Chaitanya", avatar: "https://i.pravatar.cc/40?img=32" },
  { id: "EMP002", name: "Aishwarya Patil", avatar: "https://i.pravatar.cc/40?img=45" },
  { id: "EMP003", name: "Umashankar", avatar: "https://i.pravatar.cc/40?img=12" },
  { id: "EMP004", name: "Mahallapa", avatar: "https://i.pravatar.cc/40?img=8" },
  { id: "EMP005", name: "Rohit Sharma", avatar: "https://i.pravatar.cc/40?img=59" },
  { id: "EMP006", name: "Virat K", avatar: "https://i.pravatar.cc/40?img=11" },
  { id: "EMP007", name: "Hardik P", avatar: "https://i.pravatar.cc/40?img=14" },
];

const initialLeaves = [
  { id: 1, empId: "EMP001", type: "Sick", start: "2026-01-21", end: "2026-01-22", reason: "Fever", status: "Pending", rejectReason: "" },
  { id: 2, empId: "EMP002", type: "Casual", start: "2026-01-21", end: "2026-01-21", reason: "Personal work", status: "Pending", rejectReason: "" },
  { id: 3, empId: "EMP003", type: "Paid", start: "2026-01-21", end: "2026-01-25", reason: "Vacation", status: "Approved", rejectReason: "" },
  { id: 4, empId: "EMP004", type: "Sick", start: "2026-01-20", end: "2026-01-21", reason: "Cold", status: "Rejected", rejectReason: "No medical certificate" },
  { id: 5, empId: "EMP005", type: "Paid", start: "2026-01-23", end: "2026-01-24", reason: "Family event", status: "Pending", rejectReason: "" },
  { id: 6, empId: "EMP006", type: "Casual", start: "2026-01-25", end: "2026-01-26", reason: "Trip", status: "Approved", rejectReason: "" },
];

const REAL_TODAY = "2026-01-21";

export default function SuperAdminLeavePortal() {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState(""); // Default empty as requested
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  /* 1. TOP PANEL: Strictly for Today (ignores all filters) */
  const absenteesToday = useMemo(() => {
    return leaves.filter(l => l.start <= REAL_TODAY && l.end >= REAL_TODAY && l.status === "Approved");
  }, [leaves]);

  /* 2. TABLE LOGIC: Combined Status + Optional Date Filter */
  const filteredData = useMemo(() => {
    return leaves.filter(l => {
      const matchStatus = statusFilter === "All" || l.status === statusFilter;
      const matchDate = dateFilter === "" || (l.start <= dateFilter && l.end >= dateFilter);
      return matchStatus && matchDate;
    });
  }, [leaves, statusFilter, dateFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleApprove = id => setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: "Approved" } : l));
  const handleReject = id => {
    const msg = prompt("Reason for rejection?");
    if (msg) setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: "Rejected", rejectReason: msg } : l));
  };

  return (
    <div className="min-h-screen bg-[#f3f7fa] p-4 md:p-10 text-slate-800 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-blue-900 tracking-tight">Leave Control Center</h1>
            <p className="text-slate-500 font-medium">Super Admin Dashboard</p>
          </div>
        </div>

        {/* 4 Cards Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatBox title="Pending" val={leaves.filter(l => l.status === "Pending").length} color="amber" />
          <StatBox title="On Leave Today" val={absenteesToday.length} color="blue" />
          <StatBox title="Approved" val={leaves.filter(l => l.status === "Approved").length} color="emerald" />
          <StatBox title="Rejected" val={leaves.filter(l => l.status === "Rejected").length} color="rose" />
        </div>

        {/* Today's Absentees (Locked Section) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
            <FaUserSlash className="text-blue-500"/> People On Leave Today (15/2/26)
          </h2>
          <div className="flex flex-wrap gap-3">
            {absenteesToday.length > 0 ? absenteesToday.map(l => {
              const emp = employees.find(e => e.id === l.empId);
              return (
                <div key={l.id} className="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                  <img src={emp.avatar} className="w-6 h-6 rounded-full" alt="" />
                  <span className="text-sm font-bold text-blue-800">{emp.name}</span>
                </div>
              );
            }) : <p className="text-slate-400 text-sm italic">No confirmed absences for today.</p>}
          </div>
        </div>

        {/* Leave Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Controls Header */}
          <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-6 bg-slate-50/50">
            
            {/* Status Tabs */}
            <div className="flex bg-white p-1 rounded-xl border shadow-sm">
              {["All", "Pending", "Approved", "Rejected"].map(s => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                  className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${statusFilter === s ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Date Filter */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <input 
                  type="date" 
                  value={dateFilter}
                  onChange={(e) => { setDateFilter(e.target.value); setCurrentPage(1); }}
                  className="bg-white border rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 focus:ring-2 ring-blue-500/20 outline-none transition-all shadow-sm"
                />
                {dateFilter && (
                  <button 
                    onClick={() => setDateFilter("")}
                    className="absolute -right-2 -top-2 bg-rose-500 text-white p-1 rounded-full hover:scale-110 transition-transform"
                    title="Clear Date"
                  >
                    <FaTrashRestore size={10}/>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50">
                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em]">
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedData.map(l => {
                  const emp = employees.find(e => e.id === l.empId);
                  return (
                    <tr key={l.id} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <img src={emp.avatar} className="w-8 h-8 rounded-full border border-slate-200" alt="" />
                          <span className="font-bold text-slate-700">{emp.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-500">
                        {l.start} <span className="text-slate-300 mx-1">→</span> {l.end}
                      </td>
                      <td className="px-6 py-5 text-xs font-bold uppercase text-blue-600">{l.type}</td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${l.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : l.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        {l.status === "Pending" ? (
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleApprove(l.id)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"><FaCheckCircle/></button>
                            <button onClick={() => handleReject(l.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><FaTimesCircle/></button>
                          </div>
                        ) : (
                          <button className="text-slate-300"><FaEllipsisV/></button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-6 bg-slate-50/50 border-t flex justify-between items-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Showing {paginatedData.length} of {filteredData.length} requests
            </p>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-2 bg-white border rounded-lg shadow-sm disabled:opacity-30 hover:bg-blue-50 text-blue-600 transition-all"
              >
                <FaChevronLeft size={14}/>
              </button>
              <div className="flex items-center px-4 text-sm font-bold text-blue-900 bg-white border rounded-lg">
                {currentPage} / {totalPages || 1}
              </div>
              <button 
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-2 bg-white border rounded-lg shadow-sm disabled:opacity-30 hover:bg-blue-50 text-blue-600 transition-all"
              >
                <FaChevronRight size={14}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ title, val, color }) {
  const styles = {
    amber: "border-amber-100 text-amber-600",
    blue: "border-blue-100 text-blue-600",
    emerald: "border-emerald-100 text-emerald-600",
    rose: "border-rose-100 text-rose-600",
  };
  return (
    <div className={`bg-white p-5 rounded-2xl border-b-4 ${styles[color]} shadow-sm`}>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{title}</p>
      <p className="text-2xl font-black text-slate-800">{String(val).padStart(2, '0')}</p>
    </div>
  );
}