import React, { useMemo, useState } from "react";

/* ------------------ DATA (Unchanged) ------------------ */
const employees = [
  { id: "EMP001", name: "Chaitanya", avatar: "https://i.pravatar.cc/40?img=32" },
  { id: "EMP002", name: "Aishwarya Patil", avatar: "https://i.pravatar.cc/40?img=45" },
  { id: "EMP003", name: "Umashankar", avatar: "https://i.pravatar.cc/40?img=12" },
  { id: "EMP004", name: "Mahallapa", avatar: "https://i.pravatar.cc/40?img=8" },
  { id: "EMP005", name: "Rohit Sharma", avatar: "https://i.pravatar.cc/40?img=59" },
];

const initialLeaves = [
  { id: 1, empId: "EMP001", type: "Sick", start: "2026-01-21", end: "2026-01-22", reason: "Fever", status: "Pending" },
  { id: 2, empId: "EMP002", type: "Casual", start: "2026-01-21", end: "2026-01-21", reason: "Personal work", status: "Pending" },
  { id: 3, empId: "EMP003", type: "Paid", start: "2026-01-21", end: "2026-01-25", reason: "Vacation", status: "Approved" },
  { id: 4, empId: "EMP004", type: "Sick", start: "2026-01-21", end: "2026-01-21", reason: "Cold", status: "Rejected" },
  { id: 5, empId: "EMP005", type: "Paid", start: "2026-01-21", end: "2026-01-21", reason: "Family event", status: "Pending" },
];

const TODAY = "2026-01-21";

/* ------------------ HELPERS (Unchanged) ------------------ */
const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const typeStyles = {
  Sick: "bg-orange-100 text-orange-700",
  Casual: "bg-blue-100 text-blue-700",
  Paid: "bg-green-100 text-green-700",
};

/* ------------------ COMPONENT ------------------ */
export default function SuperAdminLeaveRequests() {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [tab, setTab] = useState("All");

  const filteredLeaves = useMemo(() => {
    if (tab === "Today") {
      return leaves.filter(l => l.start <= TODAY && l.end >= TODAY);
    }
    return leaves;
  }, [leaves, tab]);

  const todaysLeaves = useMemo(
    () => leaves.filter(l => l.start <= TODAY && l.end >= TODAY),
    [leaves]
  );

  const pendingCount = leaves.filter(l => l.status === "Pending").length;
  const approvedThisMonth = leaves.filter(l => l.status === "Approved").length;

  const approve = id => {
    setLeaves(prev =>
      prev.map(l => (l.id === id ? { ...l, status: "Approved" } : l))
    );
  };

  const changeStatus = id => {
    setLeaves(prev =>
      prev.map(l => l.id === id ? { ...l, status: "Pending" } : l)
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Header - Made responsive with flex-col on mobile */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Super Admin Leave Requests
        </h1>
        <span className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm">
          Super Admin
        </span>
      </div>

      {/* Tabs - Added flex-wrap for small screens */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["All", "Today", "This Week"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition
              ${
                tab === t
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 border"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Summary Cards - Adjusted grid breakpoints */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <SummaryCard title="Pending Requests" value={pendingCount} />
        <SummaryCard title="People on Leave Today" value={todaysLeaves.length} />
        <SummaryCard title="Approved This Month" value={approvedThisMonth} />
      </div>

      {/* Table Wrapper - Added overflow-x-auto for mobile scrolling */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-slate-100 text-slate-600 text-sm">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map(l => {
                const emp = employees.find(e => e.id === l.empId);
                return (
                  <tr key={l.id} className="border-t hover:bg-slate-50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={emp.avatar} alt="" className="w-9 h-9 rounded-full" />
                      <span className="font-medium">{emp.name}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                      {l.start} → {l.end}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeStyles[l.type]}`}>
                        {l.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-[150px] truncate">
                      {l.reason}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[l.status]}`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {l.status === "Pending" ? (
                        <button
                          onClick={() => approve(l.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => changeStatus(l.id)}
                          className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-50 transition"
                        >
                          Change
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Today Panel */}
      <div className="mt-10 bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4">
          {todaysLeaves.length} people on leave today
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {todaysLeaves.map(l => {
            const emp = employees.find(e => e.id === l.empId);
            return (
              <div key={l.id} className="flex justify-between items-center border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <img src={emp.avatar} className="w-8 h-8 rounded-full" alt="" />
                  <div>
                    <p className="font-medium text-sm md:text-base">{emp.name}</p>
                    <p className="text-xs text-slate-500">{l.type} • Full Day</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${statusStyles[l.status]}`}>
                  {l.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-transparent hover:border-blue-100 transition">
      <p className="text-sm text-slate-500 mb-1">{title}</p>
      <p className="text-2xl md:text-3xl font-bold text-slate-800">{value}</p>
    </div>
  );
}