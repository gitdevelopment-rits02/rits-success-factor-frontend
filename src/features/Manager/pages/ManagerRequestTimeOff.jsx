import React, { useState } from "react";

// --- Configuration & Mock Data ---
const LEAVE_QUOTAS = {
  "Sick Leave": 12,
  "Casual Leave": 10,
  "Paid Leave": 15,
};

const initialHistory = [
  { id: 1, type: "Sick Leave", from: "2026-01-10", to: "2026-01-10", days: 1, dayType: "Full Day", reason: "Fever", status: "Approved" },
  { id: 2, type: "Casual Leave", from: "2026-01-12", to: "2026-01-12", days: 1, dayType: "Full Day", reason: "Family work", status: "Pending" },
];

// --- Helper Functions ---
const formatDate = (d) => d.toISOString().split("T")[0];

export default function LeaveManagementSystem() {
  // State
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dayType, setDayType] = useState("Full Day");
  const [reason, setReason] = useState("");
  const [history, setHistory] = useState(initialHistory);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  const minDate = formatDate(new Date(new Date().setDate(new Date().getDate() + 1)));

  // Logic: Calculate Balance
  const getUsedBalance = () => {
    const used = { "Sick Leave": 0, "Casual Leave": 0, "Paid Leave": 0 };
    history.forEach((h) => {
      if (h.status !== "Rejected") {
        used[h.type] = (used[h.type] || 0) + h.days;
      }
    });
    return used;
  };

  const used = getUsedBalance();

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return 0;

    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return dayType === "Half Day" ? 0.5 : diffDays;
  };

  const appliedDays = calculateDays();

  // Logic: Form Submission
  const handleSubmit = () => {
    if (!leaveType || !startDate || !endDate || !reason) {
      setError("Please fill in all fields, including a reason.");
      return;
    }
    const currentBalance = LEAVE_QUOTAS[leaveType] - (used[leaveType] || 0);
    if (appliedDays > currentBalance) {
      setError(`Insufficient balance. Only ${currentBalance} days remaining.`);
      return;
    }
    setError("");

    const newRequest = {
      id: Date.now(),
      type: leaveType,
      from: startDate,
      to: endDate,
      days: appliedDays,
      dayType,
      reason,
      status: "Pending",
    };

    setHistory([newRequest, ...history]);
    // Reset form
    setLeaveType(""); setStartDate(""); setEndDate(""); setReason(""); setDayType("Full Day");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-12 text-[#1E293B] font-['Inter',_sans-serif]">
      {/* Google Font Import */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');`}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0F172A]">Time Off</h1>
          <p className="text-slate-500 font-medium mt-2">Plan your leave and track your balances.</p>
        </header>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Object.entries(LEAVE_QUOTAS).map(([type, total]) => {
            const remaining = total - (used[type] || 0);
            const progress = (remaining / total) * 100;
            return (
              <div key={type} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className={`p-2 rounded-lg text-xs font-bold uppercase tracking-wider ${type === 'Sick Leave' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                    {type}
                  </span>
                  <span className="text-2xl font-black text-slate-900">{remaining}</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 ${type === 'Sick Leave' ? 'bg-rose-500' : 'bg-blue-500'}`} 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[11px] font-bold text-slate-400 mt-3 uppercase tracking-widest">
                  Used: {used[type]} / {total} Days
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Form Area */}
          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[32px] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-800">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              Request Details
            </h2>

            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Leave Type</label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                  >
                    <option value="">Choose category...</option>
                    {Object.keys(LEAVE_QUOTAS).map(q => <option key={q} value={q}>{q}</option>)}
                  </select>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center border border-dashed border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estimated</p>
                  <p className="text-3xl font-black text-blue-600">{appliedDays} <span className="text-sm">Days</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                  <input type="date" min={minDate} value={startDate} onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">End Date</label>
                  <input type="date" min={startDate || minDate} value={endDate} onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Duration Type</label>
                <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
                  {["Full Day", "Half Day"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setDayType(type)}
                      className={`px-8 py-2.5 text-xs font-bold rounded-lg transition-all ${
                        dayType === type ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submission Sidebar */}
          <div className="bg-[#0ffffee p-8 md:p-10 rounded-[32px] text-white flex flex-col shadow-xl shadow-blue-900/10">
            <h2 className="text-xl font-bold mb-2">Reason</h2>
            <p className="text-slate-400 text-xs mb-6 font-medium italic">Why are you requesting time off?</p>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Briefly explain your request..."
              className="flex-1 w-full 
             bg-white 
             text-black 
             placeholder:text-slate-400
             border border-white/10 
             rounded-2xl p-5 text-sm resize-none 
             focus:ring-2 focus:ring-blue-500/50 
             outline-none mb-6 font-medium"
            />

            {error && (
              <div className="bg-rose-500/10 text-rose-400 text-[11px] font-bold mb-6 p-4 rounded-xl border border-rose-500/20 text-center">
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
            >
              Submit Application
            </button>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800">Leave History</h2>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {["All", "Approved", "Pending"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 text-[11px] font-bold rounded-lg transition-all ${
                    filter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Leave Type</th>
                  <th className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Timeline</th>
                  <th className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-center">Days</th>
                  <th className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {history.filter(h => filter === "All" || h.status === filter).map((h) => (
                  <tr key={h.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-10 py-6 text-sm font-bold text-slate-700">{h.type}</td>
                    <td className="px-10 py-6 text-sm text-slate-500 font-medium">{h.from} <span className="mx-2 text-slate-300">→</span> {h.to}</td>
                    <td className="px-10 py-6 text-sm text-center font-black text-slate-700">{h.days}</td>
                    <td className="px-10 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        h.status === "Approved" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                        h.status === "Pending" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                        "bg-rose-50 text-rose-600 border border-rose-100"
                      }`}>
                        {h.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
 