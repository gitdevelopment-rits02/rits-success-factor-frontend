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
  ArcElement,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import superAdminDashboardThunk from "../Redux/thunks/superAdminDashboardThunk";
import SuperAdminDashboardSkeleton from "../SuperAdminSkeleton/SuperAdminDashboardSkeleton";
// import theme from "../../../assets/theme1.png";
import logo from "../../../assets/logo.png";
// then use: src={logo}
ChartJS.register(
  CategoryScale, LinearScale, BarElement,
  ArcElement, LineElement, PointElement, Filler, Tooltip
);

/* ─── Design tokens ─── */
const shadow = { boxShadow: "0 1px 6px rgba(15,23,42,0.04), 0 4px 14px rgba(59,130,246,0.05)" };
const card = { background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", padding: 20, ...shadow };
const h2 = { fontSize: 14, fontWeight: 600, color: "#1e293b", margin: 0 };
const sub = { fontSize: 11, color: "#94a3b8", fontWeight: 400, marginTop: 2, marginBottom: 0 };

const GRADS = [
  "linear-gradient(135deg,#60a5fa,#3b82f6)",
  "linear-gradient(135deg,#34d399,#10b981)",
  "linear-gradient(135deg,#a78bfa,#7c3aed)",
  "linear-gradient(135deg,#fb923c,#ea580c)",
  "linear-gradient(135deg,#f472b6,#db2777)",
  "linear-gradient(135deg,#38bdf8,#0284c7)",
];

const PIE_COLORS = ["#3b82f6", "#06b6d4", "#f59e0b", "#10b981", "#8b5cf6", "#f472b6"];

/* ─── SVG Icons ─── */
const Ic = {
  users: <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>,
  plus: <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" /></svg>,
  cal: <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14 }}><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>,
  check: <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14 }}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
  home: <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14 }}><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
  x: <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14 }}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>,
  search: <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 13, height: 13 }}><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>,
  trend: <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14 }}><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>,
  clock: <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14 }}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>,
};

/* ─── Status config ─── */
const statusCfg = {
  "In Office": { dot: "#10b981", label: "In Office", bg: "#ecfdf5", border: "#a7f3d0", txt: "#065f46" },
  "Present": { dot: "#10b981", label: "In Office", bg: "#ecfdf5", border: "#a7f3d0", txt: "#065f46" },
  "WFH": { dot: "#38bdf8", label: "Remote", bg: "#f0f9ff", border: "#bae6fd", txt: "#0369a1" },
  "Absent": { dot: "#94a3b8", label: "Absent", bg: "#f8fafc", border: "#e2e8f0", txt: "#475569" },
};

const STATUS_TABS = [
  { key: "All", label: "All" },
  { key: "In Office", label: "In Office" },
  { key: "WFH", label: "Remote" },
  { key: "Absent", label: "Absent" },
];

/* ─── Static data (used until API returns real data) ─── */
const TREND_DATA = [
  { month: "Aug", present: 88, absent: 12, late: 5 },
  { month: "Sep", present: 91, absent: 9, late: 3 },
  { month: "Oct", present: 85, absent: 15, late: 8 },
  { month: "Nov", present: 93, absent: 7, late: 2 },
  { month: "Dec", present: 87, absent: 13, late: 6 },
  { month: "Jan", present: 90, absent: 10, late: 4 },
];

const LEAVE_TYPES = [
  { type: "Casual Leave", used: 4, total: 12, color: "#3b82f6" },
  { type: "Sick Leave", used: 1, total: 8, color: "#06b6d4" },
  { type: "Privilege Leave", used: 6, total: 18, color: "#8b5cf6" },
  { type: "Comp Off", used: 2, total: 5, color: "#f59e0b" },
];

const ANNOUNCEMENTS = [
  { id: 1, title: "Q1 Performance Reviews Kick Off", desc: "Review cycle starts March 1st. Managers must submit evaluations by the 15th.", date: "Feb 20", type: "info" },
  { id: 2, title: "Office Closed — Public Holiday", desc: "The office will be closed March 14th. Enjoy the long weekend!", date: "Feb 18", type: "holiday" },
  { id: 3, title: "Updated HR Policy Released", desc: "New leave benefits roll out April 1st — check the HR portal for the full breakdown.", date: "Feb 15", type: "policy" },
  { id: 4, title: "All-Hands Town Hall — March 5th", desc: "Quarterly town hall with leadership. Register before Feb 28.", date: "Feb 12", type: "event" },
];

const ANN_CFG = {
  info: { bg: "#eff6ff", border: "#dbeafe", dot: "#3b82f6" },
  holiday: { bg: "#fff1f2", border: "#fecdd3", dot: "#f43f5e" },
  policy: { bg: "#fffbeb", border: "#fde68a", dot: "#f59e0b" },
  event: { bg: "#f5f3ff", border: "#ddd6fe", dot: "#7c3aed" },
};

/* ══════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════ */
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
    <div style={{ minHeight: "100vh", background: "#f4f8ff", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #f0f7ff; }
        ::-webkit-scrollbar-thumb { background: #bfdbfe; border-radius: 99px; }
        button { cursor: pointer; }
      `}</style>

  {showSkeleton && (
      <div className="absolute inset-0 z-50 bg-[#F8FAFC]">
        <SuperAdminDashboardSkeleton />
      </div>
    )}

      {/* Topbar */}
      {/* <header style={{
        height: 56, background: "#fff", borderBottom: "1px solid #f1f5f9",
        display: "flex", alignItems: "center", padding: "0 28px", gap: 16,
        position: "sticky", top: 0, zIndex: 10,
        boxShadow: "0 1px 4px rgba(15,23,42,0.05)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 9,
            background: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 12, fontWeight: 700,
          }}>S</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", lineHeight: 1.2 }}>Super Admin</p>
            <p style={{ fontSize: 10, color: "#60a5fa", fontWeight: 500 }}>Control Panel</p>
          </div>
        </div>

        <div style={{ width: 1, height: 24, background: "#f1f5f9" }} />

        <div style={{
          display: "flex", gap: 4, background: "#f8fafc",
          border: "1px solid #e2e8f0", borderRadius: 10, padding: 3,
        }}>
          {[{ key: "analytics", label: "Analytics" }, { key: "attendance", label: "Attendance" }].map((t) => (
            <button key={t.key}
              onClick={() => { setActiveTab(t.key); setShowSkeleton(true); }}
              style={{
                padding: "6px 18px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                border: "none",
                background: activeTab === t.key ? "#3b82f6" : "transparent",
                color:      activeTab === t.key ? "#fff"    : "#94a3b8",
                transition: "all 0.15s",
              }}
            >{t.label}</button>
          ))}
        </div> */}
      {/* </header> */}
      {/* ── TOP NAV ── */}
      <header style={{
        height: 56, background: "#f4f8ff", borderBottom: "1px solid #f1f5f9",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px",
        position: "sticky", top: 0, zIndex: 10,
        boxShadow: "0 1px 4px rgba(15,23,42,0.05)",
      }}>
        {/* Logo */}
        <img
          src="/src/assets/logo.png"
          alt="HR Connect"
          style={{ height: 36, objectFit: "contain" }}
        />

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login"; // adjust to your login route
          }}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 16px", borderRadius: 10, fontSize: 12, fontWeight: 600,
            color: "#ef4444", background: "#fef2f2",
            border: "1px solid #fecaca", cursor: "pointer",
          }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 14, height: 14 }}>
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h6a1 1 0 100-2H4V5h5a1 1 0 100-2H3zm10.293 3.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L14.586 11H8a1 1 0 110-2h6.586l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Logout
        </button>
      </header>

      {/* ── SUB NAV (Analytics / Attendance toggle) ── */}
      <div style={{
        background: "#f4f8ff", borderBottom: "1px solid #f1f5f9",
        display: "flex", justifyContent: "center", alignItems: "center",
        padding: "0 28px", height: 48,
        position: "sticky", top: 56, zIndex: 9,
      }}>
        <div style={{
          display: "flex", gap: 4, background: "#f8fafc",
          border: "1px solid #e2e8f0", borderRadius: 10, padding: 3,
        }}>
          {[{ key: "analytics", label: "Analytics" }, { key: "attendance", label: "Attendance" }].map((t) => (
            <button key={t.key}
              onClick={() => { setActiveTab(t.key); setShowSkeleton(true); }}
              style={{
                padding: "6px 18px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                border: "none",
                background: activeTab === t.key ? "#3b82f6" : "transparent",
                color: activeTab === t.key ? "#fff" : "#94a3b8",
                transition: "all 0.15s",
              }}
            >{t.label}</button>
          ))}
        </div>
      </div>

      <main style={{ padding: "24px 28px", maxWidth: 1400, margin: "0 auto" }}>
        {activeTab === "analytics" ? <AnalyticsView /> : <AttendanceView />}
      </main>
    </div>
  );
}

function LateCheckInMonitor() {
  const { dashboardData } = useSelector(
    (state) => state.superAdmin?.dashboard || {}
  );

  const deptLabels = dashboardData?.departmentHeadcount?.map((d) => d.department) || [];
  const deptCounts = dashboardData?.departmentHeadcount?.map((d) => d.count) || [];
  const lateList = dashboardData?.lateCheckins?.employees || [];
  const lateCount = dashboardData?.lateCheckins?.count || 0;
  const totalStaff = dashboardData?.totalStaff || 0;
  const newHires = dashboardData?.newHires || 0;
  const onLeave = dashboardData?.onLeave || 0;
  const attRate = totalStaff > 0 ? Math.round(((totalStaff - onLeave) / totalStaff) * 100) : 0;

  const KPI = [
    { label: "Total Staff", val: totalStaff, delta: "All employees", color: "#3b82f6", lbg: "#eff6ff", ltxt: "#1d4ed8", icon: Ic.users },
    { label: "New Hires", val: newHires, delta: "This month", color: "#10b981", lbg: "#ecfdf5", ltxt: "#065f46", icon: Ic.plus },
    { label: "On Leave", val: onLeave, delta: "Currently away", color: "#f59e0b", lbg: "#fffbeb", ltxt: "#92400e", icon: Ic.cal },
    { label: "Attendance Rate", val: `${attRate}%`, delta: "Org-wide today", color: "#8b5cf6", lbg: "#f5f3ff", ltxt: "#6d28d9", icon: Ic.trend },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Row 1 — KPI */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {KPI.map((k, i) => <KpiCard key={i} {...k} />)}
      </div>

      {/* Row 2 — Trend chart + Dept doughnut */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>

        {/* 6-month attendance trend */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <p style={h2}>Attendance Report</p>
              <p style={sub}>Last 6 months — present vs absent vs late</p>
            </div>
            <span style={{
              fontSize: 10, fontWeight: 600, color: "#3b82f6",
              background: "#eff6ff", border: "1px solid #dbeafe",
              padding: "4px 12px", borderRadius: 99,
            }}>Monthly</span>
          </div>
          <div style={{ height: 220 }}>
            <Bar
              data={{
                labels: TREND_DATA.map((d) => d.month),
                datasets: [
                  { label: "Present", data: TREND_DATA.map((d) => d.present), backgroundColor: "#3b82f6", borderRadius: [5, 5, 0, 0], barThickness: 14 },
                  { label: "Absent", data: TREND_DATA.map((d) => d.absent), backgroundColor: "#fca5a5", borderRadius: [5, 5, 0, 0], barThickness: 14 },
                  { label: "Late", data: TREND_DATA.map((d) => d.late), backgroundColor: "#fde68a", borderRadius: [5, 5, 0, 0], barThickness: 14 },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ` ${c.dataset.label}: ${c.parsed.y}%` } } },
                scales: {
                  x: { grid: { display: false }, ticks: { font: { size: 11, family: "Inter" }, color: "#94a3b8" } },
                  y: { grid: { color: "#f1f5f9" }, ticks: { font: { size: 11, family: "Inter" }, color: "#94a3b8" }, beginAtZero: true },
                },
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 14, paddingTop: 12, borderTop: "1px solid #f8fafc" }}>
            {[{ l: "Present", c: "#3b82f6" }, { l: "Absent", c: "#fca5a5" }, { l: "Late", c: "#fde68a" }].map((x) => (
              <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: x.c, display: "block" }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: "#94a3b8" }}>{x.l}</span>
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

        {/* Dept doughnut */}
        <div style={card}>
          <p style={h2}>Department Headcount</p>
          <p style={{ ...sub, marginBottom: 16 }}>{totalStaff || "—"} employees total</p>
          {deptLabels.length > 0 ? (
            <>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <div style={{ width: 148, height: 148 }}>
                  <Doughnut
                    data={{
                      labels: deptLabels,
                      datasets: [{ data: deptCounts, backgroundColor: PIE_COLORS, borderWidth: 2, borderColor: "#fff", hoverOffset: 4 }],
                    }}
                    options={{
                      cutout: "62%",
                      plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.parsed}` } } },
                    }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {deptLabels.map((dept, i) => (
                  <div key={dept} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: PIE_COLORS[i % PIE_COLORS.length], display: "block", flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>{dept}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 56, height: 5, borderRadius: 99, background: "#f1f5f9", overflow: "hidden" }}>
                        <div style={{ width: `${Math.round((deptCounts[i] / Math.max(...deptCounts, 1)) * 100)}%`, height: "100%", borderRadius: 99, background: PIE_COLORS[i % PIE_COLORS.length] }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", width: 20, textAlign: "right" }}>{deptCounts[i]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "32px 0", color: "#94a3b8", fontSize: 13 }}>No data yet</div>
          )}
        </div>
      </div>

      {/* Row 3 — Announcements + (Leave Overview + Late Check-In) */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 }}>

        {/* Announcements */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <p style={h2}>Announcements</p>
              <p style={sub}>Company-wide updates and notices</p>
            </div>
            <button style={{
              fontSize: 12, fontWeight: 600, color: "#3b82f6", background: "#eff6ff",
              border: "1px solid #dbeafe", padding: "7px 14px", borderRadius: 10,
            }}>Post New</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ANNOUNCEMENTS.map((a) => {
              const cfg = ANN_CFG[a.type];
              return (
                <div key={a.id} style={{
                  borderRadius: 12, padding: "12px 14px", display: "flex", gap: 12,
                  background: cfg.bg, border: `1px solid ${cfg.border}`, cursor: "pointer",
                }}>
                  <div style={{ marginTop: 6, flexShrink: 0 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.dot, display: "block" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "#1e293b", lineHeight: 1.4 }}>{a.title}</p>
                      <span style={{ fontSize: 10, fontWeight: 500, color: "#94a3b8", whiteSpace: "nowrap", flexShrink: 0 }}>{a.date}</span>
                    </div>
                    <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6 }}>{a.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button style={{
            width: "100%", marginTop: 12, padding: "10px 0", fontSize: 12, fontWeight: 500,
            color: "#94a3b8", background: "transparent", border: "1px solid #f1f5f9", borderRadius: 10,
          }}>View all announcements</button>
        </div>

        {/* Right: Leave overview + Late monitor stacked */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Leave overview */}
          <div style={card}>
            <p style={h2}>Leave Overview</p>
            <p style={{ ...sub, marginBottom: 16 }}>Org-wide leave balance at a glance</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {LEAVE_TYPES.map((e) => {
                const pct = Math.round((e.used / e.total) * 100);
                return (
                  <div key={e.type}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                      <p style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{e.type}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500 }}>{e.used}/{e.total} days</span>
                        <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 99, background: e.color + "18", color: e.color }}>
                          {e.total - e.used} left
                        </span>
                      </div>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: "#f1f5f9", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", borderRadius: 99, background: e.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16, paddingTop: 14, borderTop: "1px solid #f1f5f9" }}>
              {[
                { label: "Avg Used", val: "3.3 days", color: "#3b82f6", bg: "#eff6ff" },
                { label: "Pending", val: "7 requests", color: "#f59e0b", bg: "#fffbeb" },
              ].map((s) => (
                <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: "10px 0", textAlign: "center" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.val}</p>
                  <p style={{ fontSize: 10, fontWeight: 500, color: "#94a3b8", marginTop: 2 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Late check-in monitor */}
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <p style={h2}>Late Check-Ins</p>
                <p style={sub}>Today's tardiness</p>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600,
                color: lateCount > 0 ? "#dc2626" : "#10b981",
                background: lateCount > 0 ? "#fef2f2" : "#ecfdf5",
                border: `1px solid ${lateCount > 0 ? "#fecaca" : "#a7f3d0"}`,
                padding: "3px 10px", borderRadius: 99,
              }}>
                {lateCount > 0 ? `${lateCount} late` : "All on time ✓"}
              </span>
            </div>
            {lateCount === 0 ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#10b981" }}>No late arrivals today</p>
                <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>Everyone checked in on time</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 200, overflowY: "auto" }}>
                {lateList.map((emp, idx) => (
                  <div key={idx} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "9px 12px", borderRadius: 10, background: "#fef2f2", border: "1px solid #fecaca",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{
                        width: 27, height: 27, borderRadius: 8, flexShrink: 0,
                        background: "linear-gradient(135deg,#fca5a5,#ef4444)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: 9, fontWeight: 700,
                      }}>
                        {(emp.name || "?").split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{emp.name || "Unknown"}</p>
                        <p style={{ fontSize: 10, color: "#94a3b8" }}>{emp.department || "N/A"}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", fontFamily: "monospace" }}>
                      {emp.checkInTime || "—"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ATTENDANCE VIEW
══════════════════════════════════════════════ */
function AttendanceView() {
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

  const overview = attendanceData?.overview || {};
  const roster = attendanceData?.roster || [];

  const departments = useMemo(() => [
    "All",
    ...(dashboardData?.departmentHeadcount?.map((d) => d.department) || []),
  ], [dashboardData]);

  /* Absent-by-dept breakdown (derived) */
  const absentByDept = useMemo(() => {
    const map = {};
    roster.forEach((e) => {
      if (e.status === "Absent") map[e.department] = (map[e.department] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([dept, count]) => ({ dept, count }));
  }, [roster]);

  const total = overview.totalStaff || 0;
  const present = (overview.present || 0) + (overview.wfh || 0);
  const attPct = total > 0 ? Math.round((present / total) * 100) : 0;
  const circumference = 2 * Math.PI * 46;

  const KPI = [
    { label: "Total Staff", val: total, delta: "All employees", color: "#3b82f6", lbg: "#eff6ff", ltxt: "#1d4ed8", icon: Ic.users },
    { label: "In Office", val: overview.present || 0, delta: "Checked in", color: "#10b981", lbg: "#ecfdf5", ltxt: "#065f46", icon: Ic.check },
    { label: "Remote", val: overview.wfh || 0, delta: "Work from home", color: "#f59e0b", lbg: "#fffbeb", ltxt: "#92400e", icon: Ic.home },
    { label: "Absent", val: overview.absent || 0, delta: "Not checked in", color: "#94a3b8", lbg: "#f8fafc", ltxt: "#475569", icon: Ic.x },
  ];

  const filtered = useMemo(() => roster.filter((emp) => {
    const matchSearch = (emp.name || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "All" || emp.status === statusFilter;
    const matchDept = deptFilter === "All" || emp.department === deptFilter;
    return matchSearch && matchStatus && matchDept;
  }), [roster, searchTerm, statusFilter, deptFilter]);

  const BAR_COLORS = ["#ef4444", "#f97316", "#f59e0b", "#94a3b8", "#cbd5e1"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Row 1 — KPI */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {KPI.map((k, i) => <KpiCard key={i} {...k} />)}
      </div>

      {/* Row 2 — Attendance ring + Absent by dept */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Ring summary */}
        <div style={{ ...card, display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
            <svg viewBox="0 0 110 110" style={{ width: 120, height: 120, transform: "rotate(-90deg)" }}>
              <circle cx="55" cy="55" r="46" fill="none" stroke="#f1f5f9" strokeWidth="10" />
              <circle cx="55" cy="55" r="46" fill="none" stroke="#3b82f6" strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - attPct / 100)}
                strokeLinecap="round"
              />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#1e293b", lineHeight: 1 }}>{attPct}%</p>
              <p style={{ fontSize: 9, color: "#94a3b8", fontWeight: 500, marginTop: 2 }}>present</p>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={h2}>Today's Attendance Rate</p>
            <p style={{ ...sub, marginBottom: 16 }}>Across all departments</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "In Office", val: overview.present || 0, color: "#10b981", bg: "#ecfdf5" },
                { label: "Remote", val: overview.wfh || 0, color: "#38bdf8", bg: "#f0f9ff" },
                { label: "Absent", val: overview.absent || 0, color: "#94a3b8", bg: "#f8fafc" },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: row.color, display: "block" }} />
                    <span style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>{row.label}</span>
                  </div>
                  <span style={{
                    fontSize: 12, fontWeight: 700, color: row.color,
                    background: row.bg, padding: "2px 10px", borderRadius: 99,
                  }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Absent by department */}
        <div style={card}>
          <p style={h2}>Absent by Department</p>
          <p style={{ ...sub, marginBottom: 16 }}>Which teams are most affected today</p>
          {absentByDept.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#10b981" }}>No absences recorded</p>
              <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>Full attendance today </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {absentByDept.map((row, i) => {
                const pct = Math.round((row.count / absentByDept[0].count) * 100);
                return (
                  <div key={row.dept}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{row.dept}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: BAR_COLORS[i] }}>{row.count} absent</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: "#f1f5f9", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", borderRadius: 99, background: BAR_COLORS[i] }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Row 3 — Roster */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden", ...shadow }}>

        {/* Controls */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f8fafc" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <p style={h2}>Attendance Roster</p>
              <p style={sub}>{filtered.length} employees shown</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#cbd5e1", display: "flex" }}>
                  {Ic.search}
                </span>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search employees…"
                  style={{
                    paddingLeft: 30, paddingRight: 12, paddingTop: 7, paddingBottom: 7,
                    fontSize: 12, background: "#f8fafc", border: "1px solid #e2e8f0",
                    borderRadius: 10, color: "#374151", width: 180, outline: "none",
                  }}
                />
              </div>
              <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}
                style={{
                  fontSize: 12, border: "1px solid #e2e8f0", borderRadius: 10,
                  padding: "7px 12px", color: "#374151", fontWeight: 500,
                  background: "#f8fafc", outline: "none", cursor: "pointer",
                }}>
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {STATUS_TABS.map((t) => (
              <button key={t.key} onClick={() => setStatusFilter(t.key)}
                style={{
                  padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                  border: statusFilter === t.key ? "1px solid #3b82f6" : "1px solid #e2e8f0",
                  background: statusFilter === t.key ? "#3b82f6" : "#f8fafc",
                  color: statusFilter === t.key ? "#fff" : "#94a3b8",
                  transition: "all 0.15s",
                }}>{t.label}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowY: "auto", maxHeight: 420 }}>
          {filtered.length === 0 ? (
            <div style={{ padding: "48px 0", textAlign: "center" }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#94a3b8" }}>No employees match your filters</p>
              <p style={{ fontSize: 11, color: "#cbd5e1", marginTop: 4 }}>Try adjusting the search or status</p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8faff", borderBottom: "1px solid #f1f5f9" }}>
                  {["Employee", "Department", "Status", "Check-In"].map((h) => (
                    <th key={h} style={{
                      textAlign: "left", padding: "10px 20px",
                      fontSize: 10, fontWeight: 600, color: "#94a3b8",
                      textTransform: "uppercase", letterSpacing: "0.06em",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp, idx) => {
                  const sc = statusCfg[emp.status] || statusCfg["Absent"];
                  const initials = (emp.name || "?").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                  return (
                    <tr key={idx}
                      style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.1s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fbff")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "12px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                            background: GRADS[idx % GRADS.length],
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", fontSize: 9, fontWeight: 700,
                          }}>{initials}</div>
                          <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{emp.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 20px", fontSize: 12, color: "#64748b" }}>{emp.department || "N/A"}</td>
                      <td style={{ padding: "12px 20px" }}>
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 500,
                          background: sc.bg, border: `1px solid ${sc.border}`, color: sc.txt,
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: sc.dot, display: "block" }} />
                          {sc.label}
                        </span>
                      </td>
                      <td style={{ padding: "12px 20px", fontSize: 12, color: "#94a3b8", fontFamily: "monospace" }}>
                        {emp.checkInTime || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
 