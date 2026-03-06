import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    *, *::before, *::after { font-family: 'Inter', sans-serif; box-sizing: border-box; margin: 0; padding: 0; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: #f0f7ff; }
    ::-webkit-scrollbar-thumb { background: #bfdbfe; border-radius: 99px; }
  `}</style>
);

/* ── DATA ── */
const attendanceData = [
  { month: "Aug", present: 88, absent: 12, late: 5 },
  { month: "Sep", present: 91, absent: 9,  late: 3 },
  { month: "Oct", present: 85, absent: 15, late: 8 },
  { month: "Nov", present: 93, absent: 7,  late: 2 },
  { month: "Dec", present: 87, absent: 13, late: 6 },
  { month: "Jan", present: 90, absent: 10, late: 4 },
];

const deptData = [
  { name: "Engineering", value: 42, color: "#3b82f6" },
  { name: "HR",          value: 15, color: "#06b6d4" },
  { name: "Sales",       value: 28, color: "#f59e0b" },
  { name: "Finance",     value: 18, color: "#10b981" },
  { name: "Operations",  value: 22, color: "#8b5cf6" },
  { name: "Design",      value: 11, color: "#f472b6" },
];

const allEmployees = [
  { id: 1,  name: "Priya Sharma",  dept: "Engineering", role: "Senior Developer",  status: "present", init: "PS" },
  { id: 2,  name: "Rahul Mehta",   dept: "HR",          role: "HR Manager",        status: "absent",  init: "RM" },
  { id: 3,  name: "Anil Kumar",    dept: "Sales",       role: "Sales Lead",        status: "present", init: "AK" },
  { id: 4,  name: "Sneha Patel",   dept: "Design",      role: "UI Designer",       status: "remote",  init: "SP" },
  { id: 5,  name: "Karan Singh",   dept: "Engineering", role: "Backend Engineer",  status: "present", init: "KS" },
  { id: 6,  name: "Divya Nair",    dept: "HR",          role: "Recruiter",         status: "remote",  init: "DN" },
  { id: 7,  name: "Vikram Joshi",  dept: "Finance",     role: "Financial Analyst", status: "absent",  init: "VJ" },
  { id: 8,  name: "Meena Rao",     dept: "Operations",  role: "Ops Manager",       status: "present", init: "MR" },
  { id: 9,  name: "Arjun Das",     dept: "Engineering", role: "DevOps Engineer",   status: "remote",  init: "AD" },
  { id: 10, name: "Pooja Iyer",    dept: "Sales",       role: "Account Executive", status: "present", init: "PI" },
  { id: 11, name: "Suresh Verma",  dept: "Finance",     role: "Accountant",        status: "absent",  init: "SV" },
  { id: 12, name: "Neha Kapoor",   dept: "Design",      role: "Product Designer",  status: "present", init: "NK" },
];

const announcements = [
  { id: 1, title: "Q1 Performance Reviews Starting Soon",  desc: "The review cycle kicks off March 1st. All managers need to submit evaluations by the 15th.", date: "Feb 20", type: "info"    },
  { id: 2, title: "Office Closed on Holi",                 desc: "We'll be closed on March 14th. Enjoy the long weekend!",                                      date: "Feb 18", type: "holiday" },
  { id: 3, title: "Updated Health Insurance Policy",       desc: "New benefits roll out April 1st — check the HR portal for a full breakdown.",                 date: "Feb 15", type: "policy"  },
  { id: 4, title: "Town Hall on March 5th",                desc: "Join us for the quarterly town hall with leadership. Register before Feb 28.",                 date: "Feb 12", type: "event"   },
];

const entitlements = [
  { type: "Casual Leave",    used: 4,  total: 12, color: "#3b82f6" },
  { type: "Sick Leave",      used: 1,  total: 8,  color: "#06b6d4" },
  { type: "Privilege Leave", used: 6,  total: 18, color: "#8b5cf6" },
  { type: "Comp Off",        used: 2,  total: 5,  color: "#f59e0b" },
];

const DEPARTMENTS = ["All Departments", "Engineering", "HR", "Sales", "Finance", "Operations", "Design"];
const STATUS_TABS  = [
  { key: "all",     label: "All"       },
  { key: "present", label: "In Office" },
  { key: "remote",  label: "Remote"    },
  { key: "absent",  label: "Absent"    },
];

const statusCfg = {
  present: { label: "In Office", cls: "text-emerald-700 bg-emerald-50 border border-emerald-200", dot: "bg-emerald-500" },
  remote:  { label: "Remote",    cls: "text-sky-700 bg-sky-50 border border-sky-200",             dot: "bg-sky-400"     },
  absent:  { label: "Absent",    cls: "text-slate-500 bg-slate-100 border border-slate-200",      dot: "bg-slate-400"   },
};

const avatarGrads = [
  "from-blue-400 to-blue-600",    "from-cyan-400 to-teal-500",
  "from-violet-400 to-purple-600","from-amber-400 to-orange-500",
  "from-pink-400 to-rose-500",    "from-emerald-400 to-green-600",
];

const annCfg = {
  info:    { bg: "bg-blue-50",   border: "border-blue-100",   dot: "bg-blue-400"   },
  holiday: { bg: "bg-rose-50",   border: "border-rose-100",   dot: "bg-rose-400"   },
  policy:  { bg: "bg-amber-50",  border: "border-amber-100",  dot: "bg-amber-400"  },
  event:   { bg: "bg-violet-50", border: "border-violet-100", dot: "bg-violet-400" },
};

const shadow = { boxShadow: "0 1px 6px rgba(15,23,42,0.04), 0 4px 14px rgba(59,130,246,0.05)" };

export default function AdminDashboard() {
  const [deptFilter,   setDeptFilter]   = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("all");

  const totalStaff   = allEmployees.length;
  const presentCount = allEmployees.filter(e => e.status === "present").length;
  const remoteCount  = allEmployees.filter(e => e.status === "remote").length;
  const absentCount  = allEmployees.filter(e => e.status === "absent").length;

  const filtered = useMemo(() => allEmployees.filter(e =>
    (deptFilter === "All Departments" || e.dept === deptFilter) &&
    (statusFilter === "all" || e.status === statusFilter)
  ), [deptFilter, statusFilter]);

  const KPI = [
    { label: "Total Staff",    val: totalStaff,   delta: "+3 this month",                               color:"#3b82f6", lbg:"#eff6ff", ltxt:"#1d4ed8" },
    { label: "In Office",      val: presentCount, delta: `${Math.round(presentCount/totalStaff*100)}% attendance`, color:"#10b981", lbg:"#ecfdf5", ltxt:"#065f46" },
    { label: "Working Remote", val: remoteCount,  delta: "From home today",                             color:"#f59e0b", lbg:"#fffbeb", ltxt:"#92400e" },
    { label: "Absent",         val: absentCount,  delta: "On leave or unplanned",                       color:"#94a3b8", lbg:"#f8fafc", ltxt:"#475569" },
  ];

  const card   = { background:"#fff", borderRadius:16, border:"1px solid #f1f5f9", padding:20, ...shadow };
  const h2     = { fontSize:14, fontWeight:600, color:"#1e293b" };
  const sub    = { fontSize:11, color:"#94a3b8", fontWeight:400, marginTop:2 };

  return (
    <div style={{ minHeight:"100vh", background:"#f4f8ff", fontFamily:"'Inter',sans-serif" }}>
      <FontLoader />

      {/* ── Topbar ── */}
      <header style={{
        height:56, background:"#fff", borderBottom:"1px solid #f1f5f9",
        display:"flex", alignItems:"center", padding:"0 28px", gap:12,
        position:"sticky", top:0, zIndex:10,
        boxShadow:"0 1px 4px rgba(15,23,42,0.05)",
      }}>
        {/* Brand */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginRight:8 }}>
          <div style={{
            width:30, height:30, borderRadius:9,
            background:"linear-gradient(135deg,#3b82f6,#1d4ed8)",
            display:"flex", alignItems:"center", justifyContent:"center",
            color:"#fff", fontSize:12, fontWeight:700, flexShrink:0,
          }}>A</div>
          <div>
            <p style={{ fontSize:13, fontWeight:700, color:"#1e293b", lineHeight:1.2 }}>Admin port</p>
            <p style={{ fontSize:10, color:"#60a5fa", fontWeight:500 }}></p>
          </div>
        </div>

        <div style={{ width:1, height:24, background:"#f1f5f9", margin:"0 4px" }}/>

        {/* <div style={{ flex:1 }}>
          <p style={{ fontSize:14, fontWeight:600, color:"#1e293b" }}>Dashboard</p>
          <p style={{ fontSize:11, color:"#94a3b8", fontWeight:400 }}>Friday, 27 February 2026</p>
        </div> */}

        {/* Search */}
        {/* <div style={{ position:"relative" }}>
          <svg viewBox="0 0 20 20" fill="currentColor" style={{ width:13, height:13, position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:"#cbd5e1", pointerEvents:"none" }}>
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
          </svg>
          <input style={{
            paddingLeft:30, paddingRight:14, paddingTop:7, paddingBottom:7,
            fontSize:12, background:"#f8fafc", border:"1px solid #e2e8f0",
            borderRadius:10, color:"#374151", width:190, outline:"none",
          }} placeholder="Search employees…"/>
        </div> */}

        {/* Bell */}
        {/* <button style={{
          width:32, height:32, borderRadius:10, background:"#f8fafc",
          border:"1px solid #e2e8f0", display:"flex", alignItems:"center",
          justifyContent:"center", color:"#94a3b8", cursor:"pointer", position:"relative",
        }}>
          <svg viewBox="0 0 20 20" fill="currentColor" style={{ width:15, height:15 }}>
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
          </svg>
          <span style={{ position:"absolute", top:6, right:6, width:5, height:5, borderRadius:"50%", background:"#f87171" }}/>
        </button> */}

        {/* Avatar */}
        {/* <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{
            width:30, height:30, borderRadius:9,
            background:"linear-gradient(135deg,#3b82f6,#1d4ed8)",
            display:"flex", alignItems:"center", justifyContent:"center",
            color:"#fff", fontSize:10, fontWeight:700,
          }}>AD</div>
          <div>
            <p style={{ fontSize:12, fontWeight:600, color:"#1e293b" }}>Aditi Desai</p>
            <p style={{ fontSize:10, color:"#94a3b8" }}>HR Admin</p>
          </div>
        </div> */}

        {/* <button style={{
          padding:"7px 16px", fontSize:12, fontWeight:600,
          color:"#fff", background:"#3b82f6", border:"none",
          borderRadius:10, cursor:"pointer", marginLeft:4,
        }}>+ Add Employee</button> */}
      </header>

      {/* ── Content ── */}
      <main style={{ padding:"24px 28px", display:"flex", flexDirection:"column", gap:16, maxWidth:1400, margin:"0 auto" }}>

        {/* Row 1 — KPI cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {KPI.map((k, i) => (
            <div key={i} style={card}>
              <div style={{ width:32, height:32, borderRadius:10, background:k.lbg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:k.color }}/>
              </div>
              <p style={{ fontSize:26, fontWeight:700, color:"#1e293b", lineHeight:1 }}>{k.val}</p>
              <p style={{ fontSize:12, fontWeight:500, color:"#64748b", marginTop:4 }}>{k.label}</p>
              <p style={{ fontSize:10, fontWeight:600, color:k.ltxt, background:k.lbg, display:"inline-block", padding:"2px 8px", borderRadius:99, marginTop:8 }}>
                {k.delta}
              </p>
            </div>
          ))}
        </div>

        {/* Row 2 — Attendance chart + Dept headcount */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:16 }}>

          {/* Attendance */}
          <div style={card}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20 }}>
              <div>
                <p style={h2}>Attendance Report</p>
                <p style={sub}>Last 6 months, as a percentage</p>
              </div>
              <span style={{ fontSize:10, fontWeight:600, color:"#3b82f6", background:"#eff6ff", border:"1px solid #dbeafe", padding:"4px 12px", borderRadius:99 }}>Monthly</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={attendanceData} barCategoryGap="32%" barGap={3}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
                <XAxis dataKey="month" tick={{ fontSize:11, fill:"#94a3b8", fontWeight:500, fontFamily:"Inter" }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize:11, fill:"#94a3b8", fontFamily:"Inter" }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ borderRadius:12, border:"1px solid #e2e8f0", fontSize:12, fontFamily:"Inter,sans-serif" }}/>
                <Bar dataKey="present" name="Present" fill="#3b82f6" radius={[5,5,0,0]}/>
                <Bar dataKey="absent"  name="Absent"  fill="#fca5a5" radius={[5,5,0,0]}/>
                <Bar dataKey="late"    name="Late"    fill="#fde68a" radius={[5,5,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display:"flex", gap:20, marginTop:12, paddingTop:12, borderTop:"1px solid #f8fafc" }}>
              {[{l:"Present",c:"#3b82f6"},{l:"Absent",c:"#fca5a5"},{l:"Late",c:"#fde68a"}].map(x => (
                <div key={x.l} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ width:8, height:8, borderRadius:"50%", background:x.c, display:"block" }}/>
                  <span style={{ fontSize:11, fontWeight:500, color:"#94a3b8" }}>{x.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dept headcount */}
          <div style={card}>
            <p style={h2}>Department Headcount</p>
            <p style={{ ...sub, marginBottom:16 }}>136 employees total</p>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
              <PieChart width={148} height={148}>
                <Pie data={deptData} cx={72} cy={72} innerRadius={42} outerRadius={66} dataKey="value" paddingAngle={3}>
                  {deptData.map((e, i) => <Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius:10, fontSize:12, fontFamily:"Inter,sans-serif" }}/>
              </PieChart>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              {deptData.map(d => (
                <div key={d.name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ width:7, height:7, borderRadius:"50%", background:d.color, display:"block", flexShrink:0 }}/>
                    <span style={{ fontSize:12, color:"#64748b", fontWeight:500 }}>{d.name}</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:56, height:5, borderRadius:99, background:"#f1f5f9", overflow:"hidden" }}>
                      <div style={{ width:`${(d.value/42)*100}%`, height:"100%", borderRadius:99, background:d.color }}/>
                    </div>
                    <span style={{ fontSize:12, fontWeight:600, color:"#374151", width:18, textAlign:"right" }}>{d.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3 — Announcements + Entitlements */}
        <div style={{ display:"grid", gridTemplateColumns:"1.6fr 1fr", gap:16 }}>

          {/* Announcements */}
          <div style={card}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
              <div>
                <p style={h2}>Announcements</p>
                <p style={sub}>Company-wide updates and notices</p>
              </div>
              <button style={{
                fontSize:12, fontWeight:600, color:"#3b82f6", background:"#eff6ff",
                border:"1px solid #dbeafe", padding:"7px 14px", borderRadius:10, cursor:"pointer",
              }}>Post New</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {announcements.map(a => {
                const cfg = annCfg[a.type];
                return (
                  <div key={a.id} className={`${cfg.bg} border ${cfg.border}`}
                    style={{ borderRadius:12, padding:"12px 14px", display:"flex", gap:12, cursor:"pointer" }}>
                    <div style={{ marginTop:5, flexShrink:0 }}>
                      <span className={`w-2 h-2 rounded-full block ${cfg.dot}`}/>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:3 }}>
                        <p style={{ fontSize:12, fontWeight:600, color:"#1e293b", lineHeight:1.4 }}>{a.title}</p>
                        <span style={{ fontSize:10, fontWeight:500, color:"#94a3b8", whiteSpace:"nowrap", flexShrink:0 }}>{a.date}</span>
                      </div>
                      <p style={{ fontSize:11, color:"#64748b", fontWeight:400, lineHeight:1.6 }}>{a.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button style={{
              width:"100%", marginTop:12, padding:"10px 0", fontSize:12, fontWeight:500,
              color:"#94a3b8", background:"transparent", border:"1px solid #f1f5f9",
              borderRadius:10, cursor:"pointer",
            }}>View all announcements</button>
          </div>

          {/* Entitlements */}
          <div style={card}>
            <p style={h2}>Leave Entitlements</p>
            <p style={{ ...sub, marginBottom:20 }}>Your leave balance at a glance</p>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {entitlements.map((e, i) => {
                const pct = Math.round((e.used / e.total) * 100);
                return (
                  <div key={i}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                      <p style={{ fontSize:12, fontWeight:500, color:"#374151" }}>{e.type}</p>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontSize:10, color:"#94a3b8", fontWeight:500 }}>{e.used}/{e.total} days</span>
                        <span style={{ fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:99, background:e.color+"18", color:e.color }}>
                          {e.total - e.used} left
                        </span>
                      </div>
                    </div>
                    <div style={{ height:6, borderRadius:99, background:"#f1f5f9", overflow:"hidden" }}>
                      <div style={{ width:`${pct}%`, height:"100%", borderRadius:99, background:e.color }}/>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:20, paddingTop:16, borderTop:"1px solid #f1f5f9" }}>
              {[
                { label:"Avg Used",  val:"3.3 days",   color:"#3b82f6", bg:"#eff6ff" },
                { label:"Pending",   val:"7 requests", color:"#f59e0b", bg:"#fffbeb" },
              ].map(s => (
                <div key={s.label} style={{ background:s.bg, borderRadius:12, padding:"10px 0", textAlign:"center" }}>
                  <p style={{ fontSize:13, fontWeight:700, color:s.color }}>{s.val}</p>
                  <p style={{ fontSize:10, fontWeight:500, color:"#94a3b8", marginTop:2 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4 — Attendance Roster */}
        <div style={{ background:"#fff", borderRadius:16, border:"1px solid #f1f5f9", overflow:"hidden", ...shadow }}>
          <div style={{ padding:"16px 20px", borderBottom:"1px solid #f8fafc" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <div>
                <p style={h2}>Attendance Roster</p>
                <p style={sub}>{filtered.length} employees shown</p>
              </div>
              <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
                style={{
                  fontSize:12, border:"1px solid #e2e8f0", borderRadius:10,
                  padding:"7px 12px", color:"#374151", fontWeight:500,
                  background:"#f8fafc", outline:"none", cursor:"pointer",
                }}>
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {STATUS_TABS.map(t => (
                <button key={t.key} onClick={() => setStatusFilter(t.key)}
                  style={{
                    padding:"6px 14px", borderRadius:8, fontSize:12, fontWeight:500,
                    cursor:"pointer",
                    border:     statusFilter===t.key ? "1px solid #3b82f6" : "1px solid #e2e8f0",
                    background: statusFilter===t.key ? "#3b82f6" : "#f8fafc",
                    color:      statusFilter===t.key ? "#fff"    : "#94a3b8",
                  }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowY:"auto", maxHeight:320 }}>
            {filtered.length === 0 ? (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"48px 0" }}>
                <p style={{ fontSize:13, fontWeight:500, color:"#94a3b8" }}>No employees match your filters</p>
                <p style={{ fontSize:11, color:"#cbd5e1", marginTop:4 }}>Try a different department or status</p>
              </div>
            ) : (
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:"#f8faff", borderBottom:"1px solid #f1f5f9" }}>
                    {["Employee","Department","Role","Status"].map(h => (
                      <th key={h} style={{ textAlign:"left", padding:"10px 20px", fontSize:10, fontWeight:600, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.06em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((emp, idx) => {
                    const sc = statusCfg[emp.status];
                    const gr = avatarGrads[idx % avatarGrads.length];
                    return (
                      <tr key={emp.id} style={{ borderBottom:"1px solid #f8fafc" }}
                        onMouseEnter={e => e.currentTarget.style.background="#f8fbff"}
                        onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                        <td style={{ padding:"12px 20px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <div className={`bg-gradient-to-br ${gr}`}
                              style={{ width:28, height:28, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:9, fontWeight:700, flexShrink:0 }}>
                              {emp.init}
                            </div>
                            <span style={{ fontSize:13, fontWeight:500, color:"#374151" }}>{emp.name}</span>
                          </div>
                        </td>
                        <td style={{ padding:"12px 20px", fontSize:12, color:"#64748b" }}>{emp.dept}</td>
                        <td style={{ padding:"12px 20px", fontSize:12, color:"#94a3b8" }}>{emp.role}</td>
                        <td style={{ padding:"12px 20px" }}>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${sc.cls}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}/>
                            {sc.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}