import React, { useState } from "react";
import {
  FiPlus, FiX, FiAlertTriangle, FiThermometer,
  FiSun, FiNavigation, FiArrowRight, FiCalendar
} from "react-icons/fi";

// --- Config & Data ---
const LEAVE_QUOTAS = {
  "Sick Leave": 12,
  "Casual Leave": 10,
  "Paid Leave": 15,
};

const initialHistory = [
  { id: 1, type: "Sick Leave", from: "2026-01-10", to: "2026-01-10", days: 1, dayType: "Full Day", reason: "Fever", status: "Approved" },
  { id: 2, type: "Casual Leave", from: "2026-01-12", to: "2026-01-12", days: 1, dayType: "Full Day", reason: "Family work", status: "Pending" },
];

const formatDate = (d) => d.toISOString().split("T")[0];

const TILE_STYLES = {
  "Sick Leave":   { bg: "#FFF3E8", iconBg: "#FFD8B0", iconColor: "#C2630A", bar: "#F97316", Icon: FiThermometer },
  "Casual Leave": { bg: "#E8F5E9", iconBg: "#B8E6BA", iconColor: "#2E7D32", bar: "#43A047", Icon: FiSun },
  "Paid Leave":   { bg: "#EAF0FF", iconBg: "#C7D7FF", iconColor: "#1A4BD6", bar: "#3B6EF8", Icon: FiNavigation },
};

function Label({ children }) {
  return (
    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 7 }}>
      {children}
    </label>
  );
}

function fieldStyle(filled) {
  return {
    width: "100%",
    padding: "11px 14px",
    background: "#F8FAFC",
    border: "1.5px solid #E2E8F0",
    borderRadius: 12,
    fontSize: 14,
    color: filled ? "#0F172A" : "#94A3B8",
    fontWeight: filled ? 600 : 400,
    fontFamily: "inherit",
  };
}

export default function LeaveManagementSystem() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dayType, setDayType] = useState("Full Day");
  const [reason, setReason] = useState("");
  const [history, setHistory] = useState(initialHistory);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const minDate = formatDate(new Date(new Date().setDate(new Date().getDate() + 1)));

  const getUsed = () => {
    const used = { "Sick Leave": 0, "Casual Leave": 0, "Paid Leave": 0 };
    history.forEach((h) => {
      if (h.status !== "Rejected") used[h.type] = (used[h.type] || 0) + h.days;
    });
    return used;
  };

  const used = getUsed();

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return 0;
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return dayType === "Half Day" ? 0.5 : diff;
  };

  const appliedDays = calculateDays();

  const handleSubmit = () => {
    if (!leaveType || !startDate || !endDate || !reason) {
      setError("Please fill in all fields, including a reason.");
      return;
    }
    const balance = LEAVE_QUOTAS[leaveType] - (used[leaveType] || 0);
    if (appliedDays > balance) {
      setError(`Insufficient balance. Only ${balance} days remaining.`);
      return;
    }
    setError("");
    setHistory([
      { id: Date.now(), type: leaveType, from: startDate, to: endDate, days: appliedDays, dayType, reason, status: "Pending" },
      ...history,
    ]);
    setLeaveType(""); setStartDate(""); setEndDate(""); setReason(""); setDayType("Full Day");
    setShowModal(false);
  };

  const closeModal = () => { setShowModal(false); setError(""); };

  const filtered = history.filter(h => filter === "All" || h.status === filter);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#F4F6FB", padding: "32px 24px", color: "#1C2B4A" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.4; cursor: pointer; }
        .row-hover:hover { background: #F8FAFF !important; }
        .modal-bg { position: fixed; inset: 0; background: rgba(15,25,60,0.3); backdrop-filter: blur(5px); z-index: 50; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .modal-card { background: #fff; border-radius: 24px; width: 100%; max-width: 520px; padding: 32px; box-shadow: 0 24px 80px rgba(15,25,60,0.18); animation: fadeUp 0.17s ease; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        button { font-family: inherit; cursor: pointer; border: none; }
        select, input, textarea { font-family: inherit; outline: none; }
        select:focus, input:focus, textarea:focus { border-color: #93C5FD !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.1); }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.4px" }}>Leave Management</h1>
            <p style={{ color: "#64748B", fontSize: 14, marginTop: 5, fontWeight: 500 }}>Track your time off and submit leave requests.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 12, fontWeight: 700, fontSize: 14, background: "#2563EB", color: "#fff" }}
          >
            <FiPlus size={16} strokeWidth={2.5} />
            Apply for Leave
          </button>
        </div>

        {/* Stat Tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
          {Object.entries(LEAVE_QUOTAS).map(([type, total]) => {
            const remaining = total - (used[type] || 0);
            const pct = Math.round((remaining / total) * 100);
            const s = TILE_STYLES[type];
            const Icon = s.Icon;
            return (
              <div key={type} style={{ background: s.bg, borderRadius: 18, padding: "20px 22px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={17} color={s.iconColor} strokeWidth={2.2} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#475569", letterSpacing: "0.05em", textTransform: "uppercase" }}>{type}</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 10 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", lineHeight: 1 }}>{remaining}</span>
                  <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>/ {total} left</span>
                </div>
                <div style={{ height: 5, background: "rgba(0,0,0,0.09)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: s.bar, borderRadius: 99 }} />
                </div>
                <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 6, fontWeight: 500 }}>Used: {used[type] || 0} days</p>
              </div>
            );
          })}
        </div>

        {/* History Table */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #E8EDF5", overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: "1px solid #F1F5FB", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>Leave History</h2>
            <div style={{ display: "flex", background: "#F1F5FB", borderRadius: 10, padding: 3, gap: 2 }}>
              {["All", "Approved", "Pending", "Rejected"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                    background: filter === f ? "#fff" : "transparent",
                    color: filter === f ? "#1C2B4A" : "#94A3B8",
                    boxShadow: filter === f ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#FAFBFE" }}>
                  {["Leave Type", "Timeline", "Days", "Day Type", "Reason", "Status"].map(h => (
                    <th key={h} style={{ padding: "12px 22px", fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#94A3B8", fontSize: 14 }}>No records found.</td>
                  </tr>
                ) : filtered.map((h) => {
                  const ss =
                    h.status === "Approved" ? { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" } :
                    h.status === "Pending"  ? { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" } :
                                             { bg: "#FEF2F2", color: "#DC2626", border: "#FCA5A5" };
                  return (
                    <tr key={h.id} className="row-hover" style={{ borderTop: "1px solid #F1F5FB" }}>
                      <td style={{ padding: "15px 22px", fontWeight: 700, color: "#1E293B" }}>{h.type}</td>
                      <td style={{ padding: "15px 22px", color: "#64748B", fontWeight: 500, whiteSpace: "nowrap" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {h.from}
                          <FiArrowRight size={11} color="#CBD5E1" />
                          {h.to}
                        </span>
                      </td>
                      <td style={{ padding: "15px 22px", fontWeight: 800, color: "#0F172A", textAlign: "center" }}>{h.days}</td>
                      <td style={{ padding: "15px 22px" }}>
                        <span style={{ background: "#F1F5FB", color: "#475569", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{h.dayType}</span>
                      </td>
                      <td style={{ padding: "15px 22px", color: "#64748B", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.reason}</td>
                      <td style={{ padding: "15px 22px" }}>
                        <span style={{ padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>
                          {h.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-bg" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontSize: 19, fontWeight: 800, color: "#0F172A" }}>Apply for Leave</h2>
              <button
                onClick={closeModal}
                style={{ background: "#F1F5FB", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}
              >
                <FiX size={15} strokeWidth={2.5} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              {/* Leave Type */}
              <div>
                <Label>Leave Type</Label>
                <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} style={fieldStyle(!!leaveType)}>
                  <option value="">Select type...</option>
                  {Object.keys(LEAVE_QUOTAS).map(q => (
                    <option key={q} value={q}>{q} ({LEAVE_QUOTAS[q] - (used[q] || 0)} remaining)</option>
                  ))}
                </select>
              </div>

              {/* Dates */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[["Start Date", startDate, setStartDate, minDate], ["End Date", endDate, setEndDate, startDate || minDate]].map(([label, val, setter, min]) => (
                  <div key={label}>
                    <Label>{label}</Label>
                    <div style={{ position: "relative" }}>
                      <FiCalendar size={13} color="#CBD5E1" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                      <input type="date" min={min} value={val} onChange={(e) => setter(e.target.value)}
                        style={{ ...fieldStyle(!!val), paddingLeft: 34 }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Duration Toggle */}
              <div>
                <Label>Duration Type</Label>
                <div style={{ display: "flex", background: "#F1F5FB", padding: 4, borderRadius: 10, width: "fit-content", gap: 2 }}>
                  {["Full Day", "Half Day"].map(t => (
                    <button
                      key={t}
                      onClick={() => setDayType(t)}
                      style={{
                        padding: "7px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700,
                        background: dayType === t ? "#fff" : "transparent",
                        color: dayType === t ? "#2563EB" : "#94A3B8",
                        boxShadow: dayType === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Days */}
              {appliedDays > 0 && (
                <div style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1D4ED8" }}>Estimated duration</span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: "#2563EB" }}>
                    {appliedDays} <span style={{ fontSize: 13, fontWeight: 600 }}>day{appliedDays !== 1 ? "s" : ""}</span>
                  </span>
                </div>
              )}

              {/* Reason */}
              <div>
                <Label>Reason</Label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Briefly describe your reason..."
                  rows={3}
                  style={{ ...fieldStyle(!!reason), resize: "none", lineHeight: 1.6 }}
                />
              </div>

              {/* Error */}
              {error && (
                <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#DC2626", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                  <FiAlertTriangle size={14} strokeWidth={2.5} />
                  {error}
                </div>
              )}

              {/* Buttons */}
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button
                  onClick={closeModal}
                  style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1.5px solid #E2E8F0", background: "#fff", color: "#64748B", fontWeight: 700, fontSize: 14 }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  style={{ flex: 2, padding: "12px", borderRadius: 12, background: "#2563EB", color: "#fff", fontWeight: 700, fontSize: 14 }}
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}