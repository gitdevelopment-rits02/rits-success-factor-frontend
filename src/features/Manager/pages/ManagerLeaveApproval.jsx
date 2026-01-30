import React, { useMemo, useState } from "react";
import {
  FaClipboardList,
  FaCalendarTimes,
  FaCheckCircle,
  FaCheck,
  FaTimes,
  FaTimesCircle,
  FaEllipsisV
} from "react-icons/fa";

/* ------------------ DATA (Unchanged) ------------------ */
const employees = [
  { id: "EMP001", name: "Chaitanya", avatar: "https://i.pravatar.cc/40?img=32" },
  { id: "EMP002", name: "Aishwarya Patil", avatar: "https://i.pravatar.cc/40?img=45" },
  { id: "EMP003", name: "Umashankar", avatar: "https://i.pravatar.cc/40?img=12" },
  { id: "EMP004", name: "Mahallapa", avatar: "https://i.pravatar.cc/40?img=8" },
  { id: "EMP005", name: "Rohit Sharma", avatar: "https://i.pravatar.cc/40?img=59" },
];

const initialLeaves = [
  { id: 1, empId: "EMP001", type: "Sick", start: "2026-01-21", end: "2026-01-22", reason: "Fever", status: "Pending", rejectReason: "" },
  { id: 2, empId: "EMP002", type: "Casual", start: "2026-01-21", end: "2026-01-21", reason: "Personal work", status: "Pending", rejectReason: "" },
  { id: 3, empId: "EMP003", type: "Paid", start: "2026-01-21", end: "2026-01-25", reason: "Vacation", status: "Approved", rejectReason: "" },
  { id: 4, empId: "EMP004", type: "Sick", start: "2026-01-21", end: "2026-01-21", reason: "Cold", status: "Rejected", rejectReason: "" },
  { id: 5, empId: "EMP005", type: "Paid", start: "2026-01-21", end: "2026-01-21", reason: "Family event", status: "Pending", rejectReason: "" },
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
  const [openMenuId, setOpenMenuId] = useState(null);
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
  const rejectedThisMonth = leaves.filter(l => l.status === "Rejected").length;
  const approve = id => {
    setLeaves(prev =>
      prev.map(l => (l.id === id ? { ...l, status: "Approved" } : l))
    );
  };

  const undoToPending = id => {
    setLeaves(prev =>
      prev.map(l =>
        l.id === id
          ? { ...l, status: "Pending", rejectReason: "" }
          : l
      )
    );
  };

  const reject = id => {
    const reason = prompt("Enter rejection reason");

    if (!reason) return;

    setLeaves(prev =>
      prev.map(l =>
        l.id === id
          ? { ...l, status: "Rejected", rejectReason: reason }
          : l
      )
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
              ${tab === t
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 border"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Summary Cards - Adjusted grid breakpoints */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <SummaryCard
          title="Pending Requests"
          value={pendingCount}
          icon={<FaClipboardList />}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
        />

        <SummaryCard
          title="People on Leave Today"
          value={todaysLeaves.length}
          icon={<FaCalendarTimes />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <SummaryCard
          title="Approved This Month"
          value={approvedThisMonth}
          icon={<FaCheckCircle />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <SummaryCard
          title="Rejected This Month"
          value={rejectedThisMonth}
          icon={<FaTimesCircle />}
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
      </div>
      {/* Mobile View (Cards) */}
      <div className="block md:hidden space-y-4">
        {filteredLeaves.map(l => {
          const emp = employees.find(e => e.id === l.empId);
          return (
            <div key={l.id} className="bg-white rounded-xl p-4 shadow border space-y-2">
              <div className="flex items-center gap-3">
                <img src={emp.avatar} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold">{emp.name}</p>
                  <p className="text-xs text-slate-500">
                    {l.start} → {l.end}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 text-xs rounded-full ${typeStyles[l.type]}`}>
                  {l.type}
                </span>

                <div className="flex flex-col items-end gap-1">
                  <span className={`px-3 py-1 rounded-full text-xs ${statusStyles[l.status]}`}>
                    {l.status}
                  </span>

                  {l.status === "Rejected" && l.rejectReason && (
                    <span className="text-xs text-red-600 max-w-[180px] text-right">
                      Reason: {l.rejectReason}
                    </span>
                  )}
                </div>

              </div>

              <p className="text-sm text-slate-600 truncate">{l.reason}</p>

              {l.status === "Pending" ? (
                <button
                  onClick={() => approve(l.id)}
                  className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg text-sm"
                >
                  Approve
                </button>
              ) : (
                <button
                  onClick={() => changeStatus(l.id)}
                  className="w-full mt-2 border py-2 rounded-lg text-sm"
                >
                  Change
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Table Wrapper - Added overflow-x-auto for mobile scrolling */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden block">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-slate-100 text-slate-600 text-sm">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-14 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map(l => {
                const emp = employees.find(e => e.id === l.empId);
                return (
                  <React.Fragment key={l.id}>
                    <tr className="border-t hover:bg-slate-50">

                      <td className="px-3 py-4 flex items-center gap-3">
                        <img src={emp.avatar} alt="" className="w-9 h-9 rounded-full" />
                        <span className="font-medium">{emp.name}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                        {l.start} → {l.end}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeStyles[l.type]}`}>
                          {l.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-[150px] truncate">
                        {l.reason}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[l.status]}`}>
                          {l.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <div className="flex justify-end gap-3">
                          {/* Approved button */}
                          {/* Approve */}
                          <button
                            onClick={() => approve(l.id)}
                            title="Approve"
                            className="text-green-600 hover:text-green-800"
                          >
                            <FaCheckCircle size={18} />
                          </button>

                          {/* Reject */}
                          <button
                            onClick={() => reject(l.id)}
                            title="Reject"
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTimesCircle size={18} />
                          </button>

                          {/* 3 dots */}
                          <button
                            onClick={() =>
                              setOpenMenuId(openMenuId === l.id ? null : l.id)
                            }
                            title="More"
                            className="text-slate-500 hover:text-slate-700"
                          >
                            <FaEllipsisV size={16} />
                          </button>
                        </div>

                        {/* 3 dots dropdown */}
                        {openMenuId === l.id && (
                          <div className="absolute right-6 mt-2 w-32 bg-white border rounded-lg shadow-lg z-20">
                            {l.status !== "Pending" && (
                              <button
                                onClick={() => {
                                  undoToPending(l.id);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                              >
                                Undo
                              </button>
                            )}
                          </div>
                        )}

                      </td>

                    </tr>

                    {l.status === "Rejected" && l.rejectReason && (
                      <tr className="bg-red-50">
                        <td colSpan="6" className="px-6 py-3 text-sm text-red-700">
                          <strong>Rejection Reason:</strong> {l.rejectReason}
                        </td>
                      </tr>
                    )}

                  </React.Fragment>
                );

              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Today Panel */}
      <div className="bg-white rounded-xl p-6 shadow">
        {/* HEADER — KEEP THIS */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-800">
            {todaysLeaves.length} People on Leave Today
          </h3>
        </div>

        {/* CARDS — UPDATED */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {todaysLeaves.map(l => {
            const emp = employees.find(e => e.id === l.empId);
            return (
              <div
                key={l.id}
                className="flex justify-between items-center border rounded-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <img src={emp.avatar} className="w-8 h-8 rounded-full" alt="" />
                  <div>
                    <p className="font-medium text-sm md:text-base">{emp.name}</p>
                    <p className="text-xs text-slate-500">
                      {l.type} • Full Day
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${statusStyles[l.status]}`}
                  >
                    {l.status}
                  </span>

                  {l.status === "Rejected" && l.rejectReason && (
                    <span className="text-xs text-red-600 max-w-[160px] text-right">
                      Reason: {l.rejectReason}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>

  );
}

function SummaryCard({ title, value, icon, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between border">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
          {title}
        </p>
        <p className="text-3xl font-bold text-slate-800">
          {String(value).padStart(2, "0")}
        </p>
      </div>

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}
      >
        <span className={`text-xl ${iconColor}`}>{icon}</span>
      </div>
    </div>
  );
}  