import React, { useMemo, useState, useEffect } from "react";
import {
  FiClipboard, FiCalendar, FiCheckCircle, FiXCircle,
  FiMoreVertical, FiUser, FiSearch, FiCheck, FiRotateCcw,
} from "react-icons/fi";

/* ── data ── */
const employees = [
  { id:"EMP001", name:"Chaitanya",       initials:"CH" },
  { id:"EMP002", name:"Aishwarya Patil", initials:"AP" },
  { id:"EMP003", name:"Umashankar",      initials:"UM" },
  { id:"EMP004", name:"Mahallapa",       initials:"MA" },
  { id:"EMP005", name:"Rohit Sharma",    initials:"RS" },
];

const TODAY = "2026-01-21";

const initialLeaves = [
  { id:1, empId:"EMP001", type:"Sick",   start:"2026-01-21", end:"2026-01-22", reason:"Down with fever, need a couple of days",     status:"Pending",  rejectReason:"" },
  { id:2, empId:"EMP002", type:"Casual", start:"2026-01-21", end:"2026-01-21", reason:"Some personal errands to sort out",           status:"Pending",  rejectReason:"" },
  { id:3, empId:"EMP003", type:"Paid",   start:"2026-01-21", end:"2026-01-25", reason:"Family vacation, planned months in advance",  status:"Approved", rejectReason:"" },
  { id:4, empId:"EMP004", type:"Sick",   start:"2026-01-21", end:"2026-01-21", reason:"Bad cold, doctor said rest at home",          status:"Rejected", rejectReason:"Team sprint this week, can't be spared" },
  { id:5, empId:"EMP005", type:"Paid",   start:"2026-01-21", end:"2026-01-21", reason:"Sister's wedding reception",                  status:"Pending",  rejectReason:"" },
];

/* ── style maps ── */
const STATUS = {
  Pending  : { bg:"#fef9c3", color:"#a16207", dot:"#ca8a04"  },
  Approved : { bg:"#dcfce7", color:"#15803d", dot:"#16a34a"  },
  Rejected : { bg:"#fee2e2", color:"#b91c1c", dot:"#ef4444"  },
};
const TYPE = {
  Sick   : { bg:"#ffedd5", color:"#9a3412" },
  Casual : { bg:"#dbeafe", color:"#1e40af" },
  Paid   : { bg:"#dcfce7", color:"#15803d" },
};
const AV_PAL = [
  { bg:"#e8f0fe", color:"#1d4ed8" },
  { bg:"#fce7f3", color:"#be185d" },
  { bg:"#d1fae5", color:"#065f46" },
  { bg:"#fef3c7", color:"#92400e" },
  { bg:"#ede9fe", color:"#5b21b6" },
];
const avStyle = name => AV_PAL[name.charCodeAt(0) % AV_PAL.length];

/* ── helpers ── */
const daysBetween = (s, e) => {
  const diff = (new Date(e) - new Date(s)) / 86400000 + 1;
  return diff === 1 ? "1 day" : `${diff} days`;
};

/* ── component ── */
export default function SuperAdminLeaveRequests() {
  const [leaves,      setLeaves]      = useState(initialLeaves);
  const [tab,         setTab]         = useState("All");
  const [search,      setSearch]      = useState("");
  const [statusTab,   setStatusTab]   = useState("All");
  const [openMenuId,  setOpenMenuId]  = useState(null);
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectInput, setRejectInput] = useState("");

  useEffect(() => {
    const close = () => setOpenMenuId(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const filtered = useMemo(() => {
    let list = [...leaves];
    if (tab === "Today")     list = list.filter(l => l.start <= TODAY && l.end >= TODAY);
    if (tab === "This Week") list = list.filter(l => l.start >= "2026-01-19" && l.start <= "2026-01-25");
    if (statusTab !== "All") list = list.filter(l => l.status === statusTab);
    if (search.trim())       list = list.filter(l => {
      const emp = employees.find(e => e.id === l.empId);
      return emp?.name.toLowerCase().includes(search.toLowerCase()) ||
             l.type.toLowerCase().includes(search.toLowerCase()) ||
             l.reason.toLowerCase().includes(search.toLowerCase());
    });
    return list;
  }, [leaves, tab, statusTab, search]);

  const todaysLeaves   = useMemo(() => leaves.filter(l => l.start <= TODAY && l.end >= TODAY), [leaves]);
  const pendingCount   = leaves.filter(l => l.status === "Pending").length;
  const approvedCount  = leaves.filter(l => l.status === "Approved").length;
  const rejectedCount  = leaves.filter(l => l.status === "Rejected").length;

  const approve = id => setLeaves(p => p.map(l => l.id===id ? {...l, status:"Approved"} : l));
  const undoToPending = id => setLeaves(p => p.map(l => l.id===id ? {...l, status:"Pending", rejectReason:""} : l));
  const openReject = id => { setRejectModal({ id }); setRejectInput(""); };
  const confirmReject = () => {
    if (!rejectInput.trim()) return;
    setLeaves(p => p.map(l => l.id===rejectModal.id ? {...l, status:"Rejected", rejectReason:rejectInput.trim()} : l));
    setRejectModal(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        .lr { min-height:100vh; background:#f4f8ff; padding:28px 20px;
          font-family:'Inter',system-ui,sans-serif; color:#1e293b; }
        .lr-wrap { max-width:1200px; margin:0 auto; display:flex; flex-direction:column; gap:18px; }

        /* header */
        .lr-head { background:#fff; border-radius:16px; padding:20px 26px;
          display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;
          box-shadow:0 1px 4px rgba(37,99,235,.08); border:1px solid #e0eaff; }
        .lr-head h1 { font-size:22px; font-weight:700; color:#1e293b; letter-spacing:-.3px; }
        .lr-head p  { font-size:13px; color:#64748b; margin-top:3px; }
        .lr-badge   { display:inline-flex; align-items:center; gap:7px; padding:8px 18px;
          background:#2563eb; color:#fff; border-radius:40px; font-size:13px; font-weight:600; border:none; }

        /* stats */
        .lr-stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:14px; }
        .lr-stat  { border-radius:14px; padding:18px 20px;
          display:flex; align-items:center; justify-content:space-between;
          box-shadow:0 1px 3px rgba(0,0,0,.06); transition:transform .18s,box-shadow .18s; }
        .lr-stat:hover { transform:translateY(-3px); box-shadow:0 6px 18px rgba(0,0,0,.1); }
        .lr-stat-ico { width:46px; height:46px; border-radius:12px;
          display:flex; align-items:center; justify-content:center; font-size:19px; flex-shrink:0; }
        .lr-stat-label { font-size:11.5px; color:#64748b; font-weight:500; margin-bottom:5px; }
        .lr-stat-val   { font-size:30px; font-weight:700; color:#1e293b; line-height:1; }
        .lr-stat-sub   { font-size:11px; color:#94a3b8; margin-top:3px; }

        /* toolbar */
        .lr-toolbar { background:#fff; border-radius:14px; padding:13px 18px;
          display:flex; align-items:center; gap:9px; flex-wrap:wrap;
          box-shadow:0 1px 3px rgba(37,99,235,.07); border:1px solid #e0eaff; }
        .lr-tab { padding:7px 16px; border-radius:40px; font-size:13px; font-weight:600;
          border:none; cursor:pointer; transition:all .15s; font-family:inherit; }
        .lr-tab.on  { background:#2563eb; color:#fff; box-shadow:0 3px 10px rgba(37,99,235,.28); }
        .lr-tab.off { background:#eef4ff; color:#2563eb; }
        .lr-tab.off:hover { background:#dbeafe; }

        /* status filter pills */
        .lr-status-filters { display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
        .lr-sf { padding:5px 14px; border-radius:40px; font-size:12px; font-weight:600;
          border:2px solid transparent; cursor:pointer; transition:all .15s; }
        .lr-sf.active { border-color:currentColor; }

        .lr-search-wrap { flex:1; min-width:180px; position:relative; }
        .lr-search-ico  { position:absolute; left:12px; top:50%; transform:translateY(-50%);
          color:#94a3b8; pointer-events:none; font-size:14px; }
        .lr-search { width:100%; padding:8px 12px 8px 36px; border-radius:40px;
          border:1.5px solid #e0eaff; font-size:13px; color:#1e293b; background:#f8faff;
          outline:none; font-family:inherit; transition:border-color .15s,box-shadow .15s; }
        .lr-search:focus { border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,.1); }
        .lr-search::placeholder { color:#94a3b8; }

        /* table card */
        .lr-card { background:#fff; border-radius:16px; overflow:hidden;
          box-shadow:0 1px 4px rgba(37,99,235,.08); border:1px solid #e0eaff; }
        .lr-scroll { overflow-x:auto; }
        table { width:100%; border-collapse:collapse; font-size:13px; }
        thead tr { background:#f7faff; }
        thead th { padding:11px 16px; text-align:left; font-size:10.5px; font-weight:700;
          color:#64748b; letter-spacing:.06em; text-transform:uppercase; white-space:nowrap;
          border-bottom:2px solid #e0eaff; }
        tbody tr { border-bottom:1px solid #f1f5f9; transition:background .1s; }
        tbody tr:last-child:not(.rr) { border-bottom:none; }
        tbody tr:hover:not(.rr) { background:#f5f9ff; }
        tbody td { padding:12px 16px; color:#1e293b; vertical-align:middle; }

        /* avatar */
        .lr-av { width:34px; height:34px; border-radius:9px; font-size:12px; font-weight:700;
          display:flex; align-items:center; justify-content:center; flex-shrink:0; }

        /* pill */
        .pill { display:inline-flex; align-items:center; gap:4px; padding:3px 10px;
          border-radius:40px; font-size:11px; font-weight:600; white-space:nowrap; }
        .pill-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }

        /* rejection row */
        .rr td { background:#fff8f8 !important; padding:7px 16px; border-bottom:1px solid #fde8e8; }
        .rr-inner { display:flex; align-items:flex-start; gap:7px; font-size:12px; color:#b91c1c; }
        .rr-label { font-weight:700; white-space:nowrap; flex-shrink:0; }

        /* action buttons */
        .lb { width:30px; height:30px; border-radius:8px; border:none;
          display:flex; align-items:center; justify-content:center; font-size:15px;
          cursor:pointer; transition:background .12s,transform .12s; }
        .lb:hover { transform:scale(1.1); }
        .lb-ok   { background:#dcfce7; color:#16a34a; }
        .lb-ok:hover   { background:#bbf7d0; }
        .lb-rej  { background:#fee2e2; color:#b91c1c; }
        .lb-rej:hover  { background:#fecaca; }
        .lb-more { background:#eef4ff; color:#2563eb; }
        .lb-more:hover { background:#dbeafe; }

        /* dropdown */
        .lr-drop { position:absolute; right:0; top:34px; background:#fff;
          border:1px solid #e0eaff; border-radius:12px;
          box-shadow:0 8px 24px rgba(37,99,235,.12); z-index:100; min-width:150px; overflow:hidden; }
        .lr-di { display:flex; align-items:center; gap:8px; padding:9px 14px;
          font-size:13px; cursor:pointer; color:#1e293b; transition:background .1s; }
        .lr-di:hover { background:#eef4ff; }

        /* footer */
        .lr-footer { padding:11px 16px; border-top:1px solid #f1f5f9;
          display:flex; align-items:center; justify-content:space-between;
          font-size:12px; color:#64748b; background:#fafcff; flex-wrap:wrap; gap:6px; }

        /* today panel */
        .lr-today { background:#fff; border-radius:16px; padding:22px;
          box-shadow:0 1px 4px rgba(37,99,235,.08); border:1px solid #e0eaff; }
        .lr-today-title { font-size:15px; font-weight:700; color:#1e293b; margin-bottom:14px;
          display:flex; align-items:center; gap:8px; }
        .lr-today-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:12px; }
        .lr-today-card { border:1px solid #e0eaff; border-radius:12px; padding:14px 16px;
          display:flex; align-items:center; justify-content:space-between; gap:10px;
          transition:box-shadow .15s; }
        .lr-today-card:hover { box-shadow:0 4px 14px rgba(37,99,235,.1); }

        /* modal */
        .lr-overlay { position:fixed; inset:0; background:rgba(15,23,42,.35);
          display:flex; align-items:center; justify-content:center; z-index:999; padding:20px; }
        .lr-modal { background:#fff; border-radius:16px; padding:28px; width:100%; max-width:400px;
          box-shadow:0 20px 60px rgba(0,0,0,.18); }
        .lr-modal h2 { font-size:17px; font-weight:700; margin-bottom:6px; }
        .lr-modal p  { font-size:13px; color:#64748b; margin-bottom:16px; }
        .lr-modal textarea { width:100%; padding:10px 14px; border:1.5px solid #e0eaff;
          border-radius:10px; font-size:13px; font-family:inherit; outline:none; color:#1e293b;
          resize:vertical; min-height:80px; }
        .lr-modal textarea:focus { border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,.1); }
        .lr-modal-btns { display:flex; gap:10px; margin-top:16px; justify-content:flex-end; }
        .btn-cancel  { padding:9px 20px; border-radius:40px; border:1.5px solid #e0eaff;
          background:#f8faff; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; }
        .btn-cancel:hover { background:#e0eaff; }
        .btn-reject  { padding:9px 20px; border-radius:40px; border:none;
          background:#ef4444; color:#fff; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; }
        .btn-reject:hover { background:#dc2626; }
        .btn-reject:disabled { background:#fca5a5; cursor:not-allowed; }

        /* empty */
        .lr-empty { padding:52px 20px; text-align:center; color:#94a3b8; }
        .lr-empty-ic { font-size:28px; color:#cbd5e1; margin-bottom:8px; display:flex; justify-content:center; }

        @media (max-width:700px) {
          .lr { padding:14px 10px; }
          .hide-sm { display:none !important; }
          .lr-head h1 { font-size:19px; }
        }
        @media (max-width:960px) { .hide-md { display:none !important; } }
        ::-webkit-scrollbar { height:5px; width:5px; }
        ::-webkit-scrollbar-track { background:#f1f5f9; }
        ::-webkit-scrollbar-thumb { background:#bfdbfe; border-radius:10px; }
      `}</style>

      <div className="lr">
        <div className="lr-wrap">

          {/* HEADER */}
          <div className="lr-head">
            <div>
              <h1>Leave Requests</h1>
              <p>Keep track of who's in, who's out, and what's pending.</p>
            </div>
            <div className="lr-badge"><FiUser size={13} /> Super Admin</div>
          </div>

          {/* STAT CARDS */}
          <div className="lr-stats">
            {[
              { label:"Waiting on you",       value:pendingCount,        sub:"pending",   Icon:FiClipboard,    bg:"#fefce8", iconBg:"#fef9c3", iconColor:"#a16207" },
              { label:"Out today",             value:todaysLeaves.length, sub:"employees", Icon:FiCalendar,     bg:"#eef4ff", iconBg:"#dbeafe", iconColor:"#2563eb" },
              { label:"Approved this month",   value:approvedCount,       sub:"requests",  Icon:FiCheckCircle,  bg:"#f0fdf4", iconBg:"#dcfce7", iconColor:"#16a34a" },
              { label:"Rejected this month",   value:rejectedCount,       sub:"requests",  Icon:FiXCircle,      bg:"#fff5f5", iconBg:"#fee2e2", iconColor:"#b91c1c" },
            ].map((st, i) => (
              <div key={i} className="lr-stat" style={{ background:st.bg }}>
                <div>
                  <div className="lr-stat-label">{st.label}</div>
                  <div className="lr-stat-val">{String(st.value).padStart(2,"0")}</div>
                  <div className="lr-stat-sub">{st.sub}</div>
                </div>
                <div className="lr-stat-ico" style={{ background:st.iconBg, color:st.iconColor }}>
                  <st.Icon />
                </div>
              </div>
            ))}
          </div>

          {/* TOOLBAR */}
          <div className="lr-toolbar">
            {/* period tabs */}
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {["All","Today","This Week"].map(t => (
                <button key={t} className={`lr-tab ${tab===t?"on":"off"}`} onClick={() => setTab(t)}>{t}</button>
              ))}
            </div>

            <div className="lr-divider" style={{ width:1, height:22, background:"#e0eaff", margin:"0 4px" }} />

            {/* status filter */}
            <div className="lr-status-filters">
              {[
                { key:"All",      label:"All",      bg:"#eef4ff", color:"#2563eb" },
                { key:"Pending",  label:"Pending",  bg:"#fef9c3", color:"#a16207" },
                { key:"Approved", label:"Approved", bg:"#dcfce7", color:"#15803d" },
                { key:"Rejected", label:"Rejected", bg:"#fee2e2", color:"#b91c1c" },
              ].map(sf => (
                <button key={sf.key}
                  className={`lr-sf ${statusTab===sf.key?"active":""}`}
                  style={{ background:sf.bg, color:sf.color }}
                  onClick={() => setStatusTab(sf.key)}>
                  {sf.label}
                </button>
              ))}
            </div>

            {/* search */}
            <div className="lr-search-wrap">
              <FiSearch className="lr-search-ico" />
              <input className="lr-search" placeholder="Search by name, type or reason…"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          {/* TABLE */}
          <div className="lr-card">
            <div className="lr-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th className="hide-sm">Duration</th>
                    <th>Type</th>
                    <th className="hide-md">Why they're out</th>
                    <th>Status</th>
                    <th style={{ textAlign:"right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={6}>
                      <div className="lr-empty">
                        <div className="lr-empty-ic"><FiSearch /></div>
                        <p style={{ fontSize:14 }}>Nothing here — try adjusting your filters</p>
                      </div>
                    </td></tr>
                  ) : filtered.map(l => {
                    const emp = employees.find(e => e.id === l.empId);
                    const a   = avStyle(emp.name);
                    const sp  = STATUS[l.status]  || STATUS.Pending;
                    const tp  = TYPE[l.type]      || { bg:"#f1f5f9", color:"#475569" };
                    return (
                      <React.Fragment key={l.id}>
                        <tr>
                          {/* employee */}
                          <td>
                            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                              <div className="lr-av" style={{ background:a.bg, color:a.color }}>
                                {emp.initials}
                              </div>
                              <div>
                                <div style={{ fontWeight:600, fontSize:13 }}>{emp.name}</div>
                                <div style={{ fontSize:11, color:"#94a3b8" }}>{emp.id}</div>
                              </div>
                            </div>
                          </td>

                          {/* duration */}
                          <td className="hide-sm">
                            <div style={{ fontSize:12, color:"#334155" }}>
                              {l.start === l.end
                                ? l.start
                                : <>{l.start} <span style={{ color:"#94a3b8" }}>→</span> {l.end}</>}
                            </div>
                            <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>
                              {daysBetween(l.start, l.end)}
                            </div>
                          </td>

                          {/* type */}
                          <td>
                            <span className="pill" style={{ background:tp.bg, color:tp.color }}>{l.type}</span>
                          </td>

                          {/* reason */}
                          <td className="hide-md" style={{ fontSize:12, color:"#64748b", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                            {l.reason}
                          </td>

                          {/* status */}
                          <td>
                            <span className="pill" style={{ background:sp.bg, color:sp.color }}>
                              <span className="pill-dot" style={{ background:sp.dot }} />
                              {l.status}
                            </span>
                          </td>

                          {/* actions */}
                          <td style={{ textAlign:"right" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:5, justifyContent:"flex-end", position:"relative" }}>
                              <button className="lb lb-ok"  onClick={() => approve(l.id)}    title="Approve"><FiCheck /></button>
                              <button className="lb lb-rej" onClick={() => openReject(l.id)} title="Reject"><FiXCircle /></button>
                              <div style={{ position:"relative" }}>
                                <button className="lb lb-more"
                                  onClick={e => { e.stopPropagation(); setOpenMenuId(openMenuId===l.id?null:l.id); }}
                                  title="More">
                                  <FiMoreVertical />
                                </button>
                                {openMenuId === l.id && (
                                  <div className="lr-drop" onClick={e => e.stopPropagation()}>
                                    {l.status !== "Pending" && (
                                      <div className="lr-di" onClick={() => { undoToPending(l.id); setOpenMenuId(null); }}>
                                        <FiRotateCcw size={13} style={{ color:"#64748b" }} /> Undo to Pending
                                      </div>
                                    )}
                                    {l.status === "Pending" && (
                                      <div style={{ padding:"10px 14px", fontSize:12, color:"#94a3b8" }}>
                                        No actions available
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>

                        {/* rejection reason row */}
                        {l.status === "Rejected" && l.rejectReason && (
                          <tr className="rr">
                            <td colSpan={6}>
                              <div className="rr-inner">
                                <span className="rr-label">Reason for rejection:</span>
                                <span>{l.rejectReason}</span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filtered.length > 0 && (
              <div className="lr-footer">
                <span>
                  {filtered.length} request{filtered.length!==1?"s":""} shown
                  {statusTab !== "All" && <> &middot; filtered by <strong>{statusTab}</strong></>}
                </span>
                <span style={{ color:"#94a3b8" }}>{tab}</span>
              </div>
            )}
          </div>

          {/* TODAY PANEL */}
          <div className="lr-today">
            <div className="lr-today-title">
              <FiCalendar style={{ color:"#2563eb" }} />
              {todaysLeaves.length === 0
                ? "Everyone's in today"
                : `${todaysLeaves.length} ${todaysLeaves.length===1?"person":"people"} out today`}
            </div>
            {todaysLeaves.length === 0 ? (
              <p style={{ fontSize:13, color:"#94a3b8" }}>Full house — no leaves today.</p>
            ) : (
              <div className="lr-today-grid">
                {todaysLeaves.map(l => {
                  const emp = employees.find(e => e.id === l.empId);
                  const a   = avStyle(emp.name);
                  const sp  = STATUS[l.status]  || STATUS.Pending;
                  const tp  = TYPE[l.type]      || { bg:"#f1f5f9", color:"#475569" };
                  return (
                    <div key={l.id} className="lr-today-card">
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div className="lr-av" style={{ background:a.bg, color:a.color }}>{emp.initials}</div>
                        <div>
                          <div style={{ fontWeight:600, fontSize:13 }}>{emp.name}</div>
                          <div style={{ fontSize:11, color:"#94a3b8", marginTop:2, display:"flex", alignItems:"center", gap:5 }}>
                            <span className="pill" style={{ background:tp.bg, color:tp.color, padding:"2px 8px" }}>{l.type}</span>
                            &middot; {daysBetween(l.start, l.end)}
                          </div>
                        </div>
                      </div>
                      <span className="pill" style={{ background:sp.bg, color:sp.color }}>
                        <span className="pill-dot" style={{ background:sp.dot }} />
                        {l.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* REJECT MODAL */}
      {rejectModal && (
        <div className="lr-overlay" onClick={() => setRejectModal(null)}>
          <div className="lr-modal" onClick={e => e.stopPropagation()}>
            <h2>Reject this request?</h2>
            <p>Give a quick reason — the employee will see this, so keep it clear and fair.</p>
            <textarea
              placeholder="e.g. Team sprint this week, can't spare anyone right now…"
              value={rejectInput}
              onChange={e => setRejectInput(e.target.value)}
              autoFocus
            />
            <div className="lr-modal-btns">
              <button className="btn-cancel" onClick={() => setRejectModal(null)}>Cancel</button>
              <button className="btn-reject" onClick={confirmReject} disabled={!rejectInput.trim()}>
                Yes, reject it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}