import { useState, useEffect, useMemo } from "react";
import {
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiAlertTriangle,
  FiZap,
  FiClipboard,
  FiUser,
  FiMoreVertical,
  FiFileText,
  FiDownload,
} from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import hrTimeSheetThunk from "../Redux/thunks/HrTimeSheetThunk";

/* helpers */
const calcHours = (inT, outT, date) => {
  if (!inT || inT === "--") return 0;

  const start = new Date(`${date} ${inT}`);

  const end = outT && outT !== "--" ? new Date(`${date} ${outT}`) : new Date();

  return Math.max((end - start) / 3600000, 0);
};

const initials = (n = "") =>
  n
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const AVATAR_PAL = [
  { bg: "#e8f0fe", color: "#1d4ed8" },
  { bg: "#fce7f3", color: "#be185d" },
  { bg: "#d1fae5", color: "#065f46" },
  { bg: "#fef3c7", color: "#92400e" },
  { bg: "#ede9fe", color: "#5b21b6" },
  { bg: "#ffedd5", color: "#9a3412" },
];
const av = (name) =>
  AVATAR_PAL[(name?.charCodeAt?.(0) || 0) % AVATAR_PAL.length];

const STATUS_STYLE = {
  Approved: { bg: "#dcfce7", color: "#15803d" },
  "On Time": { bg: "#dcfce7", color: "#15803d" },
  Pending: { bg: "#fef9c3", color: "#a16207" },
  Late: { bg: "#fef3c7", color: "#b45309" },
  Absent: { bg: "#fee2e2", color: "#b91c1c" },
};

const DEPT_STYLE = {
  Sales: { bg: "#dbeafe", color: "#1e40af" },
  HR: { bg: "#fce7f3", color: "#9d174d" },
  IT: { bg: "#ede9fe", color: "#4c1d95" },
  Finance: { bg: "#fef3c7", color: "#78350f" },
  Marketing: { bg: "#ffedd5", color: "#7c2d12" },
  Engineering: { bg: "#d1fae5", color: "#064e3b" },
  "cloud aws": { bg: "#e0f2fe", color: "#0369a1" },
};

/*  component */
export default function SuperAdminTimeSheet() {
  const dispatch = useDispatch();

  const records = useSelector((state) => state.hr?.timesheet?.data || []);
  const loading = useSelector((state) => state.hr?.timesheet?.loading || false);
  const error = useSelector((state) => state.hr?.timesheet?.error || null);

  const [filter, setFilter] = useState("This Month");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAction, setOpenAction] = useState(null);
  const [bulkFlash, setBulkFlash] = useState(false);

  // Fetch Timesheets
  useEffect(() => {
    dispatch(hrTimeSheetThunk.fetchTimeSheets());
  }, [dispatch]);

  const exportPDFStub = () => {
    dispatch(hrTimeSheetThunk.downloadPDF());
  };

  const exportExcelStub = () => {
    dispatch(hrTimeSheetThunk.downloadExcel());
  };

  const matchDate = (dateStr) => {
    if (!dateStr) return true;

    const d = new Date(dateStr);
    const today = new Date();

    if (filter === "Today") {
      return d.toDateString() === today.toDateString();
    }

    if (filter === "This Week") {
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay());
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);

      return d >= start && d <= end;
    }

    if (filter === "This Month") {
      return (
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    }

    return true;
  };

  const filtered = useMemo(() => {
    const safeRecords = Array.isArray(records) ? records : [];

    return records.filter((r) => {
      const q =
        `${r.name || ""} ${r.employeeNo || ""} ${r.department || ""}`.toLowerCase();

      const searchMatch = q.includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" ||
        r.approvalStatus === statusFilter ||
        r.attendanceStatus === statusFilter;

      const dateMatch = matchDate(r.date);

      return searchMatch && statusMatch && dateMatch;
    });
  }, [records, search, statusFilter, filter]);

  const stats = useMemo(() => {
    let totalMinutes = 0;
    let overtimeMinutes = 0;
    let discrepancies = 0;
    let pending = 0;

    filtered.forEach((r) => {
      const minutes = r.totalMinutes || 0;

      totalMinutes += minutes;

      if (minutes > 480) {
        overtimeMinutes += minutes - 480;
      }

      if (["Late", "Absent"].includes(r.attendanceStatus)) {
        discrepancies++;
      }

      if (r.approvalStatus === "Pending") {
        pending++;
      }
    });

    return [
      {
        label: "Total Hours Worked",
        value: (totalMinutes / 60).toFixed(1),
        sub: "hrs",
        Icon: FiClock,
        bg: "#eef4ff",
        iconBg: "#dbeafe",
        iconColor: "#2563eb",
      },
      {
        label: "Active Discrepancies",
        value: discrepancies,
        sub: "flags",
        Icon: FiAlertTriangle,
        bg: "#fff8f0",
        iconBg: "#ffedd5",
        iconColor: "#ea580c",
      },
      {
        label: "Overtime Hours",
        value: (overtimeMinutes / 60).toFixed(1),
        sub: "hrs",
        Icon: FiZap,
        bg: "#f6f2ff",
        iconBg: "#ede9fe",
        iconColor: "#7c3aed",
      },
      {
        label: "Pending Approvals",
        value: pending,
        sub: "tasks",
        Icon: FiClipboard,
        bg: "#f0fdf4",
        iconBg: "#dcfce7",
        iconColor: "#16a34a",
      },
    ];
  }, [filtered]);

  const isMonthly = filter === "This Month";
  const isToday = filter === "Today";

  const updateStatus = (idx, status) => {
    const rec = filtered[idx];

    if (!rec) return;

    dispatch(
      hrTimeSheetThunk.updateStatus({
        id: rec._id,
        status,
      }),
    );
  };

  const bulkApprove = () => {
    if (!selectedRows.length) return;

    selectedRows.forEach((i) => {
      const rec = filtered[i];

      if (!rec) return;

      dispatch(
        hrTimeSheetThunk.updateStatus({
          id: rec._id,
          status: "Approved",
        }),
      );
    });

    setSelectedRows([]);
    setBulkFlash(true);

    setTimeout(() => {
      setBulkFlash(false);
    }, 1500);
  };

  useEffect(() => {
    const close = () => setOpenAction(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading Timesheets...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: 40, color: "red" }}>Failed to load timesheets</div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ts-root { min-height: 100vh; background: #f4f8ff; padding: 28px 20px;
          font-family: 'Inter', system-ui, sans-serif; color: #1e293b; }
        .ts-wrap { max-width: 1300px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }

        /* ── header ── */
        .ts-header { background: #fff; border-radius: 16px; padding: 22px 28px;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;
          box-shadow: 0 1px 4px rgba(37,99,235,.08); border: 1px solid #e0eaff; }
        .ts-header-title { font-size: 24px; font-weight: 700; color: #1e293b; letter-spacing: -.3px; }
        .ts-header-sub   { font-size: 13px; color: #64748b; margin-top: 3px; }
        .ts-badge { display: inline-flex; align-items: center; gap: 7px; padding: 8px 18px;
          background: #2563eb; color: #fff; border-radius: 40px;
          font-size: 13px; font-weight: 600; border: none; cursor: default; white-space: nowrap; }

        /* ── stat cards ── */
        .ts-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
        .ts-stat  { border-radius: 14px; padding: 18px 20px; border: 1px solid transparent;
          display: flex; align-items: center; justify-content: space-between;
          box-shadow: 0 1px 3px rgba(0,0,0,.06); transition: transform .18s, box-shadow .18s; }
        .ts-stat:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(0,0,0,.1); }
        .ts-stat-icon  { width: 46px; height: 46px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; font-size: 19px; flex-shrink: 0; }
        .ts-stat-label { font-size: 11.5px; color: #64748b; font-weight: 500; margin-bottom: 5px; }
        .ts-stat-value { font-size: 30px; font-weight: 700; color: #1e293b; line-height: 1; }
        .ts-stat-sub   { font-size: 11px; color: #94a3b8; margin-top: 3px; }

        /* ── toolbar ── */
        .ts-toolbar { background: #fff; border-radius: 14px; padding: 13px 18px;
          display: flex; align-items: center; gap: 9px; flex-wrap: wrap;
          box-shadow: 0 1px 3px rgba(37,99,235,.07); border: 1px solid #e0eaff; }

        .ts-period { padding: 7px 16px; border-radius: 40px; font-size: 13px; font-weight: 600;
          border: none; cursor: pointer; transition: all .15s; font-family: inherit; }
        .ts-period.on  { background: #2563eb; color: #fff; box-shadow: 0 3px 10px rgba(37,99,235,.28); }
        .ts-period.off { background: #eef4ff; color: #2563eb; }
        .ts-period.off:hover { background: #dbeafe; }

        .ts-search-wrap { flex: 1; min-width: 180px; position: relative; }
        .ts-search-ico  { position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          color: #94a3b8; pointer-events: none; font-size: 14px; }
        .ts-search { width: 100%; padding: 8px 12px 8px 36px; border-radius: 40px;
          border: 1.5px solid #e0eaff; font-size: 13px; color: #1e293b; background: #f8faff;
          outline: none; font-family: inherit; transition: border-color .15s, box-shadow .15s; }
        .ts-search:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
        .ts-search::placeholder { color: #94a3b8; }

        .ts-select { padding: 8px 13px; border-radius: 40px; border: 1.5px solid #e0eaff;
          font-size: 13px; color: #1e293b; background: #f8faff; outline: none;
          cursor: pointer; font-family: inherit; }
        .ts-select:focus { border-color: #2563eb; }

        .ts-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px;
          border-radius: 40px; border: none; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: opacity .15s, transform .15s; font-family: inherit; white-space: nowrap; }
        .ts-btn:hover { opacity: .86; transform: translateY(-1px); }
        .ts-btn-blue  { background: #2563eb; color: #fff; }
        .ts-btn-red   { background: #ef4444; color: #fff; }
        .ts-btn-green { background: #16a34a; color: #fff; }
        .ts-btn-outline { background: #f0f6ff; color: #2563eb; border: 1.5px solid #c7deff; }
        .ts-btn-dis  { background: #f1f5f9; color: #94a3b8; border: 1.5px solid #e2e8f0;
          cursor: not-allowed; }
        .ts-btn-dis:hover { opacity: 1; transform: none; }

        /* ── table card ── */
        .ts-card { background: #fff; border-radius: 16px; overflow: hidden;
          box-shadow: 0 1px 4px rgba(37,99,235,.08); border: 1px solid #e0eaff; }
        .ts-scroll { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; }

        thead tr  { background: #f7faff; }
        thead th  { padding: 11px 14px; text-align: left; font-size: 10.5px; font-weight: 700;
          color: #64748b; letter-spacing: .06em; text-transform: uppercase; white-space: nowrap;
          border-bottom: 2px solid #e0eaff; }

        tbody tr  { border-bottom: 1px solid #f1f5f9; transition: background .1s; }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: #f5f9ff; }
        tbody td  { padding: 11px 14px; color: #1e293b; vertical-align: middle; }

        .ts-av { width: 34px; height: 34px; border-radius: 9px;
          font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ts-name  { font-weight: 600; font-size: 13px; }
        .ts-role  { font-size: 11px; color: #94a3b8; margin-top: 1px; }

        .ts-pill  { display: inline-flex; align-items: center; padding: 3px 10px;
          border-radius: 40px; font-size: 11px; font-weight: 600; white-space: nowrap; }

        .ts-ib { width: 30px; height: 30px; border-radius: 8px; border: none;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; cursor: pointer; transition: background .12s, transform .12s; }
        .ts-ib:hover { transform: scale(1.1); }
        .ts-ib-ok  { background: #dcfce7; color: #16a34a; }
        .ts-ib-ok:hover  { background: #bbf7d0; }
        .ts-ib-pend{ background: #fef3c7; color: #b45309; }
        .ts-ib-pend:hover { background: #fde68a; }
        .ts-ib-more{ background: #eef4ff; color: #2563eb; }
        .ts-ib-more:hover { background: #dbeafe; }
        .ts-ib-off { background: #f1f5f9; color: #cbd5e1; cursor: not-allowed; }
        .ts-ib-off:hover { transform: none; }

        .ts-drop { position: absolute; right: 0; top: 34px; background: #fff;
          border: 1px solid #e0eaff; border-radius: 10px;
          box-shadow: 0 8px 24px rgba(37,99,235,.12); z-index: 100; min-width: 140px; overflow: hidden; }
        .ts-drop-item { display: flex; align-items: center; gap: 8px; padding: 9px 13px;
          font-size: 13px; cursor: pointer; color: #1e293b; transition: background .1s; }
        .ts-drop-item:hover { background: #eef4ff; }
        .ts-drop-item + .ts-drop-item { border-top: 1px solid #f1f5f9; }

        .ts-footer { padding: 11px 16px; border-top: 1px solid #f1f5f9;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 12px; color: #64748b; background: #fafcff; flex-wrap: wrap; gap: 6px; }

        .ts-empty { padding: 60px 20px; text-align: center; color: #94a3b8; }
        .ts-empty-ic { display: flex; justify-content: center; margin-bottom: 10px; font-size: 32px; color: #cbd5e1; }
        .ts-empty p  { font-size: 14px; }

        .ts-mono { font-family: 'Courier New', monospace; font-size: 12px; }

        input[type="checkbox"] { width: 15px; height: 15px; cursor: pointer; accent-color: #2563eb; }

        @media (max-width: 700px) {
          .ts-root { padding: 14px 10px; }
          .hide-sm { display: none !important; }
          .ts-header-title { font-size: 20px; }
        }
        @media (max-width: 960px) { .hide-md { display: none !important; } }

        ::-webkit-scrollbar { height: 5px; width: 5px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #bfdbfe; border-radius: 10px; }
      `}</style>

      <div className="ts-root">
        <div className="ts-wrap">
          {/* HEADER */}
          <div className="ts-header">
            <div>
              <div className="ts-header-title">Time Sheet Dashboard</div>
              <div className="ts-header-sub">
                Manage and approve attendance records
              </div>
            </div>
            <div className="ts-badge">
              <FiUser size={13} /> Super Admin
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="ts-stats">
            {stats.map((st, i) => (
              <div key={i} className="ts-stat" style={{ background: st.bg }}>
                <div>
                  <div className="ts-stat-label">{st.label}</div>
                  <div className="ts-stat-value">{st.value}</div>
                  <div className="ts-stat-sub">{st.sub}</div>
                </div>
                <div
                  className="ts-stat-icon"
                  style={{ background: st.iconBg, color: st.iconColor }}
                >
                  <st.Icon />
                </div>
              </div>
            ))}
          </div>

          {/* TOOLBAR */}
          <div className="ts-toolbar">
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["Today", "This Week", "This Month"].map((f) => (
                <button
                  key={f}
                  className={`ts-period ${filter === f ? "on" : "off"}`}
                  onClick={() => {
                    setFilter(f);
                    setSelectedRows([]);
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="ts-search-wrap">
              <FiSearch className="ts-search-ico" />
              <input
                className="ts-search"
                placeholder="Search by name, ID or department…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="ts-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {["All", "Approved", "Pending", "Late", "On Time", "Absent"].map(
                (v) => (
                  <option key={v} value={v}>
                    {v === "All" ? "All Status" : v}
                  </option>
                ),
              )}
            </select>

            {isMonthly && (
              <button
                className={`ts-btn ${selectedRows.length ? "ts-btn-outline" : "ts-btn-dis"}`}
                onClick={bulkApprove}
                disabled={!selectedRows.length}
              >
                <FiCheckCircle size={13} />
                {bulkFlash
                  ? "Approved!"
                  : `Bulk Approve (${selectedRows.length})`}
              </button>
            )}

            <button className="ts-btn ts-btn-red" onClick={exportPDFStub}>
              <FiFileText size={13} /> PDF
            </button>
            <button className="ts-btn ts-btn-green" onClick={exportExcelStub}>
              <FiDownload size={13} /> Excel
            </button>
          </div>

          {/* TABLE */}
          <div className="ts-card">
            <div className="ts-scroll">
              <table>
                <thead>
                  <tr>
                    {isMonthly && (
                      <th style={{ width: 36 }}>
                        <input
                          type="checkbox"
                          checked={
                            selectedRows.length === filtered.length &&
                            filtered.length > 0
                          }
                          onChange={(e) =>
                            setSelectedRows(
                              e.target.checked ? filtered.map((_, i) => i) : [],
                            )
                          }
                        />
                      </th>
                    )}
                    <th>Employee</th>
                    <th className="hide-sm">Department</th>
                    <th className="hide-md">Location</th>
                    <th>Date</th>
                    {isToday && (
                      <>
                        <th className="hide-sm">Clock In</th>
                        <th className="hide-sm">Clock Out</th>
                      </>
                    )}
                    <th>Total Hrs</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={12}>
                        <div className="ts-empty">
                          <div className="ts-empty-ic">
                            <FiSearch />
                          </div>
                          <p>No records match your filters</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((r, i) => {
                      const hrs =
                        r.totalMinutes !== undefined
                          ? r.totalMinutes / 60
                          : calcHours(r.clockIn, r.clockOut, r.date);
                      const a = av(r.name);
                      const sp = STATUS_STYLE[r.attendanceStatus] ||
                        STATUS_STYLE[r.approvalStatus] || {
                          bg: "#f1f5f9",
                          color: "#475569",
                        };
                      const dp = DEPT_STYLE[r.department] || {
                        bg: "#f1f5f9",
                        color: "#475569",
                      };
                      return (
                        <tr key={r._id}>
                          {isMonthly && (
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(i)}
                                onChange={(e) =>
                                  setSelectedRows((prev) =>
                                    prev.includes(i)
                                      ? prev.filter((x) => x !== i)
                                      : [...prev, i],
                                  )
                                }
                              />
                            </td>
                          )}

                          {/* employee */}
                          <td>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                              }}
                            >
                              <div
                                className="ts-av"
                                style={{ background: a.bg, color: a.color }}
                              >
                                {initials(r.name)}
                              </div>
                              <div>
                                <div className="ts-name">{r.name}</div>
                                <div className="ts-role">{r.employeeNo}</div>
                              </div>
                            </div>
                          </td>

                          <td className="hide-sm">
                            <span
                              className="ts-pill"
                              style={{ background: dp.bg, color: dp.color }}
                            >
                              {r.department}
                            </span>
                          </td>

                          <td
                            className="hide-md"
                            style={{
                              fontSize: 12,
                              color: "#64748b",
                              fontWeight: 500,
                            }}
                          >
                            {r.location}
                          </td>

                          <td style={{ fontSize: 12, color: "#64748b" }}>
                            {r.date}
                          </td>

                          {isToday && (
                            <>
                              <td
                                className="ts-mono hide-sm"
                                style={{
                                  color:
                                    r.clockIn === "--" ? "#cbd5e1" : "#334155",
                                }}
                              >
                                {r.clockIn}
                              </td>
                              <td
                                className="ts-mono hide-sm"
                                style={{
                                  color:
                                    r.clockOut === "--" ? "#cbd5e1" : "#334155",
                                }}
                              >
                                {r.clockOut}
                              </td>
                            </>
                          )}

                          <td
                            style={{
                              fontWeight: 700,
                              fontSize: 13,
                              color: hrs > 8 ? "#7c3aed" : "#1e293b",
                            }}
                          >
                            {hrs.toFixed(2)}
                          </td>

                          <td>
                            <span
                              className="ts-pill"
                              style={{ background: sp.bg, color: sp.color }}
                            >
                              {r.approvalStatus}
                            </span>
                          </td>

                          {/* actions */}
                          <td>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                                position: "relative",
                              }}
                            >
                              <button
                                className={`ts-ib ${isMonthly ? "ts-ib-ok" : "ts-ib-off"}`}
                                onClick={() =>
                                  isMonthly && updateStatus(i, "Approved")
                                }
                                title="Approve"
                              >
                                <FiCheckCircle />
                              </button>
                              <button
                                className={`ts-ib ${isMonthly ? "ts-ib-pend" : "ts-ib-off"}`}
                                onClick={() =>
                                  isMonthly && updateStatus(i, "Pending")
                                }
                                title="Mark Pending"
                              >
                                <FiXCircle />
                              </button>
                              <div style={{ position: "relative" }}>
                                <button
                                  className={`ts-ib ${isMonthly ? "ts-ib-more" : "ts-ib-off"}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    isMonthly &&
                                      setOpenAction(
                                        openAction === i ? null : i,
                                      );
                                  }}
                                  title="More"
                                >
                                  <FiMoreVertical />
                                </button>
                                {openAction === i && isMonthly && (
                                  <div
                                    className="ts-drop"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div
                                      className="ts-drop-item"
                                      onClick={() => {
                                        exportPDFStub();
                                        setOpenAction(null);
                                      }}
                                    >
                                      <FiFileText
                                        style={{ color: "#ef4444" }}
                                      />{" "}
                                      Export PDF
                                    </div>
                                    <div
                                      className="ts-drop-item"
                                      onClick={() => {
                                        exportExcelStub();
                                        setOpenAction(null);
                                      }}
                                    >
                                      <FiDownload
                                        style={{ color: "#16a34a" }}
                                      />{" "}
                                      Export Excel
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {filtered.length > 0 && (
              <div className="ts-footer">
                <span>
                  Showing <strong>{filtered.length}</strong> record
                  {filtered.length !== 1 ? "s" : ""}
                </span>
                <span style={{ color: "#2563eb", fontWeight: 600 }}>
                  {filter} &middot;{" "}
                  {statusFilter !== "All" ? statusFilter : "All Statuses"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
