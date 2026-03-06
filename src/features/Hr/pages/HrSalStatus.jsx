
import { useState } from "react";

const employees = [
  { id:1,  name:"Aarav Mehta",   role:"Sr. Developer",   dept:"Engineering", emp:"EMP-2024-0011", ctc:1140000, status:"credited",       pf:7600,  tds:14200, pension:9500  },
  { id:2,  name:"Priya Sharma",  role:"HR Manager",       dept:"HR",          emp:"EMP-2024-0022", ctc:864000,  status:"in_transaction", pf:5760,  tds:9800,  pension:7200  },
  { id:3,  name:"Rohan Gupta",   role:"Analyst",          dept:"Finance",     emp:"EMP-2024-0033", ctc:816000,  status:"hold",           pf:5440,  tds:8600,  pension:6800  },
  { id:4,  name:"Sneha Patel",   role:"Frontend Dev",     dept:"Engineering", emp:"EMP-2024-0044", ctc:1020000, status:"credited",       pf:6800,  tds:12400, pension:8500  },
  { id:5,  name:"Vikram Nair",   role:"Sales Lead",       dept:"Sales",       emp:"EMP-2024-0055", ctc:936000,  status:"in_transaction", pf:6240,  tds:10200, pension:7800  },
  { id:6,  name:"Divya Iyer",    role:"Brand Manager",    dept:"Marketing",   emp:"EMP-2024-0066", ctc:888000,  status:"credited",       pf:5920,  tds:9400,  pension:7400  },
  { id:7,  name:"Karan Joshi",   role:"Backend Dev",      dept:"Engineering", emp:"EMP-2024-0077", ctc:1080000, status:"credited",       pf:7200,  tds:13600, pension:9000  },
  { id:8,  name:"Meera Rao",     role:"CFO",              dept:"Finance",     emp:"EMP-2024-0088", ctc:1560000, status:"hold",           pf:10400, tds:24800, pension:13000 },
  { id:9,  name:"Arjun Singh",   role:"Recruiter",        dept:"HR",          emp:"EMP-2024-0099", ctc:744000,  status:"credited",       pf:4960,  tds:7200,  pension:6200  },
  { id:10, name:"Pooja Desai",   role:"Account Exec",     dept:"Sales",       emp:"EMP-2024-0101", ctc:852000,  status:"credited",       pf:5680,  tds:9000,  pension:7100  },
  { id:11, name:"Nikhil Kumar",  role:"SEO Specialist",   dept:"Marketing",   emp:"EMP-2024-0112", ctc:720000,  status:"in_transaction", pf:4800,  tds:6800,  pension:6000  },
  { id:12, name:"Ananya Bose",   role:"QA Engineer",      dept:"Engineering", emp:"EMP-2024-0123", ctc:948000,  status:"credited",       pf:6320,  tds:10600, pension:7900  },
];

const depts = ["All","Engineering","HR","Finance","Sales","Marketing"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const avatarColors = [
  {bg:"#e8f0fe",color:"#4f6ef7"},
  {bg:"#fce8e6",color:"#e05245"},
  {bg:"#e6f4ea",color:"#34a853"},
  {bg:"#fef7e0",color:"#f9ab00"},
  {bg:"#f3e8fd",color:"#9334e6"},
  {bg:"#e8f5e9",color:"#2e7d32"},
  {bg:"#e3f2fd",color:"#1976d2"},
  {bg:"#fce4ec",color:"#c2185b"},
  {bg:"#e0f7fa",color:"#0097a7"},
  {bg:"#fff3e0",color:"#ef6c00"},
  {bg:"#ede7f6",color:"#5e35b1"},
  {bg:"#f9fbe7",color:"#689f38"},
];

const f = n => "₹" + Number(n).toLocaleString("en-IN");

function initials(name) {
  return name.split(" ").map(w=>w[0]).join("").toUpperCase();
}

function calc(e) {
  const g       = Math.round(e.ctc / 12);
  const basic   = Math.round(g * .40);
  const hra     = Math.round(g * .20);
  const special = Math.round(g * .18);
  const conv    = Math.round(g * .08);
  const gross   = basic + hra + special + conv;
  const pt      = Math.round(g * .005);
  const ded     = e.pf + e.tds + pt;
  const net     = gross - ded;
  return { gross, basic, hra, special, conv, pt, ded, net };
}

// ── CARD view (grid) ──
function EmpCard({ emp, onClick }) {
  const av = avatarColors[(emp.id - 1) % avatarColors.length];
  const dot = emp.status === "credited" ? "#34a853" : emp.status === "hold" ? "#f9ab00" : "#9334e6";
  const dotLabel = emp.status === "credited" ? "Paid" : emp.status === "hold" ? "On Hold" : "Processing";

  return (
    <div onClick={onClick} style={{
      background:"#fff",
      borderRadius:16,
      padding:"20px",
      border:"1.5px solid #e8f0fe",
      cursor:"pointer",
      transition:"all .18s",
      position:"relative",
    }}
    onMouseEnter={e=>{ e.currentTarget.style.borderColor="#93c5fd"; e.currentTarget.style.boxShadow="0 4px 18px rgba(59,130,246,.1)"; e.currentTarget.style.transform="translateY(-2px)"; }}
    onMouseLeave={e=>{ e.currentTarget.style.borderColor="#e8f0fe"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="translateY(0)"; }}
    >
      <div style={{position:"absolute",top:14,right:14,color:"#cbd5e1",fontSize:18,letterSpacing:2,lineHeight:1}}>···</div>

      <div style={{
        width:54,height:54,borderRadius:14,
        background:av.bg,
        color:av.color,
        fontSize:17,fontWeight:700,
        display:"flex",alignItems:"center",justifyContent:"center",
        marginBottom:12,letterSpacing:".5px",
      }}>{initials(emp.name)}</div>

      <div style={{fontWeight:700,fontSize:15,color:"#0f172a",marginBottom:3}}>{emp.name}</div>
      <div style={{fontSize:12,color:"#94a3b8",marginBottom:14}}>{emp.role}</div>

      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
        <span style={{fontSize:11.5,color:"#64748b"}}>{emp.dept}</span>
      </div>

      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:16}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span style={{fontSize:11.5,color:"#64748b"}}>{f(Math.round(emp.ctc/12))} / mo</span>
      </div>

      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button style={{
          background:"#f0f7ff",
          color:"#2563eb",
          border:"1px solid #bfdbfe",
          borderRadius:8,
          padding:"7px 16px",
          fontSize:12,fontWeight:600,
          cursor:"pointer",
        }}>View Profile</button>
        <div style={{display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:dot}}></div>
          <span style={{fontSize:11,color:dot,fontWeight:600}}>{dotLabel}</span>
        </div>
      </div>
    </div>
  );
}

// ── DETAIL view ──
function EmpDetail({ emp, mo, statuses, txnIds, onMark, onSaveStatus, onBack }) {
  const av  = avatarColors[(emp.id - 1) % avatarColors.length];
  const c   = calc(emp);
  const cur = statuses[emp.id];

  // Local state for transaction ID input and pending status
  const [txnInput, setTxnInput]       = useState(txnIds[emp.id] || "");
  const [pendingStatus, setPendingStatus] = useState(cur);
  const [saved, setSaved]             = useState(false);

  const statusColor = cur==="credited"?"#34a853":cur==="hold"?"#f9ab00":"#9334e6";
  const statusBg    = cur==="credited"?"#e6f4ea":cur==="hold"?"#fef7e0":"#f3e8fd";
  const statusLabel = cur==="credited"?"salary credited ✓":cur==="hold"?"salary on hold ⏸":"in transaction 🔄";

  const handleSave = () => {
    onSaveStatus(emp.id, pendingStatus, txnInput.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const hasChanges = pendingStatus !== cur || txnInput.trim() !== (txnIds[emp.id] || "");

  return (
    <div style={{maxWidth:700,margin:"0 auto"}}>

      {/* back */}
      <button onClick={onBack} style={{
        display:"flex",alignItems:"center",gap:6,
        background:"none",border:"none",cursor:"pointer",
        color:"#64748b",fontSize:13,fontWeight:500,
        marginBottom:22,padding:0,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        back to all employees
      </button>

      {/* top card */}
      <div style={{background:"#fff",borderRadius:16,padding:"22px 24px",border:"1.5px solid #e8f0fe",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
          <div style={{
            width:62,height:62,borderRadius:16,
            background:av.bg,color:av.color,
            fontSize:20,fontWeight:700,
            display:"flex",alignItems:"center",justifyContent:"center",
            flexShrink:0,letterSpacing:".5px",
          }}>{initials(emp.name)}</div>

          <div style={{flex:1,minWidth:160}}>
            <div style={{fontWeight:700,fontSize:20,color:"#0f172a",letterSpacing:"-.3px"}}>{emp.name}</div>
            <div style={{fontSize:13,color:"#64748b",marginTop:3}}>{emp.role} · {emp.dept}</div>
            <div style={{marginTop:8}}>
              <span style={{
                background:"#e8f0fe",color:"#4f6ef7",
                fontSize:11,fontWeight:700,
                padding:"3px 10px",borderRadius:99,
              }}>{emp.emp}</span>
            </div>
          </div>

          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:10.5,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:".6px"}}>Net Monthly Pay</div>
            <div style={{fontSize:30,fontWeight:800,color:"#2563eb",letterSpacing:"-1px",marginTop:2}}>
              {f(c.net)}
            </div>
            <div style={{fontSize:11,color:"#94a3b8",marginTop:3}}>Payment Period: {FULL[mo]}</div>
          </div>
        </div>
      </div>

      {/* earnings + deductions */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>

        <div style={{background:"#fff",borderRadius:16,padding:"20px 22px",border:"1.5px solid #e8f0fe"}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:16}}>
            <div style={{width:22,height:22,borderRadius:99,background:"#e8f0fe",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <span style={{fontWeight:700,fontSize:14,color:"#0f172a"}}>Earnings Breakdown</span>
          </div>

          {[
            {l:"Basic Pay",                v:c.basic},
            {l:"House Rent Allowance (HRA)",v:c.hra},
            {l:"Special Allowance",        v:c.special},
            {l:"Conveyance Allowance",     v:c.conv},
          ].map(r=>(
            <div key={r.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #f8faff"}}>
              <span style={{fontSize:13,color:"#475569"}}>{r.l}</span>
              <span style={{fontSize:13,fontWeight:600,color:"#0f172a"}}>{f(r.v)}</span>
            </div>
          ))}

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12,paddingTop:10,borderTop:"1.5px solid #e8f0fe"}}>
            <span style={{fontSize:13,fontWeight:700,color:"#0f172a"}}>Gross Salary</span>
            <span style={{fontSize:15,fontWeight:800,color:"#2563eb"}}>{f(c.gross)}</span>
          </div>
        </div>

        <div style={{background:"#fff",borderRadius:16,padding:"20px 22px",border:"1.5px solid #e8f0fe"}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:16}}>
            <div style={{width:22,height:22,borderRadius:99,background:"#fce8e6",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e05245" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <span style={{fontWeight:700,fontSize:14,color:"#0f172a"}}>Deductions</span>
          </div>

          {[
            {l:"Professional Tax",      v:c.pt},
            {l:"Provident Fund (PF)",   v:emp.pf},
            {l:"Income Tax (TDS)",      v:emp.tds},
          ].map(r=>(
            <div key={r.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #f8faff"}}>
              <span style={{fontSize:13,color:"#475569"}}>{r.l}</span>
              <span style={{fontSize:13,fontWeight:600,color:"#0f172a"}}>{f(r.v)}</span>
            </div>
          ))}

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12,paddingTop:10,borderTop:"1.5px solid #fce8e6"}}>
            <span style={{fontSize:13,fontWeight:700,color:"#0f172a"}}>Total Deductions</span>
            <span style={{fontSize:15,fontWeight:800,color:"#e05245"}}>{f(c.ded)}</span>
          </div>
        </div>
      </div>

      {/* payroll actions */}
      <div style={{background:"#f0f7ff",borderRadius:16,padding:"22px 24px",border:"1.5px solid #dbeafe"}}>
        <div style={{fontSize:14,fontWeight:700,color:"#0f172a",textAlign:"center",marginBottom:18}}>Payroll Actions</div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
          {[
            {
              key:"credited",
              icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
              label:"Credited",
            },
            {
              key:"hold",
              icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
              label:"On Hold",
            },
            {
              key:"in_transaction",
              icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
              label:"Transaction",
            },
            {
              key:"advance",
              icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="9 9 12 6 15 9"/><line x1="12" y1="6" x2="12" y2="15"/><line x1="9" y1="18" x2="15" y2="18"/></svg>,
              label:"Advance Paid",
            },
          ].map(btn=>{
            const isActive = pendingStatus === btn.key;
            return (
              <button key={btn.key}
                onClick={()=>btn.key!=="advance" && setPendingStatus(btn.key)}
                style={{
                  background: isActive ? "#2563eb" : "#fff",
                  color:      isActive ? "#fff"    : "#475569",
                  border:`1.5px solid ${isActive?"#2563eb":"#dbeafe"}`,
                  borderRadius:14,
                  padding:"16px 10px",
                  display:"flex",flexDirection:"column",alignItems:"center",gap:8,
                  cursor:"pointer",
                  transition:"all .15s",
                  fontWeight: isActive ? 700 : 500,
                  fontSize:12.5,
                  boxShadow: isActive ? "0 4px 14px rgba(37,99,235,.3)" : "none",
                }}
                onMouseEnter={e=>{ if(!isActive){ e.currentTarget.style.borderColor="#93c5fd"; e.currentTarget.style.background="#f8fbff"; }}}
                onMouseLeave={e=>{ if(!isActive){ e.currentTarget.style.borderColor="#dbeafe"; e.currentTarget.style.background="#fff"; }}}
              >
                <div style={{opacity: isActive ? 1 : .55}}>{btn.icon}</div>
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* ── Transaction ID + Save Status row ── */}
        <div style={{
          background:"#fff",
          border:"1.5px solid #dbeafe",
          borderRadius:14,
          padding:"16px 18px",
          display:"flex",
          alignItems:"center",
          gap:12,
          flexWrap:"wrap",
          marginBottom:14,
        }}>
          {/* icon */}
          <div style={{
            width:36,height:36,borderRadius:10,
            background:"#eff6ff",border:"1.5px solid #bfdbfe",
            display:"flex",alignItems:"center",justifyContent:"center",
            flexShrink:0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
          </div>

          {/* label + input */}
          <div style={{flex:1,minWidth:180}}>
            <div style={{fontSize:11,fontWeight:600,color:"#64748b",textTransform:"uppercase",letterSpacing:".5px",marginBottom:5}}>
              Transaction ID
            </div>
            <input
              value={txnInput}
              onChange={e => { setTxnInput(e.target.value); setSaved(false); }}
              placeholder="e.g. TXN-2025-0348291"
              style={{
                width:"100%",
                border:"1.5px solid #dbeafe",
                borderRadius:9,
                padding:"9px 12px",
                fontSize:13,
                color:"#0f172a",
                background:"#f8fbff",
                fontFamily:"'Plus Jakarta Sans','Helvetica Neue',sans-serif",
                transition:"border-color .15s",
                outline:"none",
              }}
              onFocus={e => e.target.style.borderColor="#2563eb"}
              onBlur={e  => e.target.style.borderColor="#dbeafe"}
            />
          </div>

          {/* save button */}
          <button
            onClick={handleSave}
            disabled={!hasChanges && !saved}
            style={{
              background: saved ? "#34a853" : hasChanges ? "#2563eb" : "#e2e8f0",
              color:       saved || hasChanges ? "#fff" : "#94a3b8",
              border:"none",
              borderRadius:11,
              padding:"0 22px",
              height:42,
              fontSize:13,
              fontWeight:700,
              cursor: hasChanges || saved ? "pointer" : "default",
              display:"flex",alignItems:"center",gap:7,
              flexShrink:0,
              transition:"all .2s",
              boxShadow: saved ? "0 4px 14px rgba(52,168,83,.3)" : hasChanges ? "0 4px 14px rgba(37,99,235,.25)" : "none",
            }}
          >
            {saved ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Saved!
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                Save Status
              </>
            )}
          </button>
        </div>

        {/* saved transaction ID display */}
        {txnIds[emp.id] && (
          <div style={{
            display:"flex",alignItems:"center",gap:8,
            background:"#f0fdf4",border:"1px solid #d1fae5",
            borderRadius:9,padding:"9px 14px",marginBottom:12,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34a853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span style={{fontSize:12,color:"#166534"}}>
              Last saved Transaction ID: <strong style={{letterSpacing:".3px"}}>{txnIds[emp.id]}</strong>
            </span>
          </div>
        )}

        {/* nudge messages */}
        {cur==="in_transaction" && (
          <div style={{marginTop:4,background:"#f5f3ff",border:"1px solid #ddd6fe",borderRadius:10,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <span style={{fontSize:12.5,color:"#6d28d9"}}>still waiting on the bank — mark credited once it clears</span>
            <button onClick={()=>{ setPendingStatus("credited"); }} style={{background:"#7c3aed",color:"#fff",border:"none",borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0}}>
              yes, it cleared →
            </button>
          </div>
        )}
        {cur==="hold" && (
          <div style={{marginTop:4,background:"#fffbeb",border:"1px solid #fef3c7",borderRadius:10,padding:"12px 16px"}}>
            <span style={{fontSize:12.5,color:"#92400e"}}>salary paused for {emp.name.split(" ")[0]} — resolve any issues before releasing</span>
          </div>
        )}
        {cur==="credited" && !saved && (
          <div style={{marginTop:4,background:"#f0fdf4",border:"1px solid #d1fae5",borderRadius:10,padding:"12px 16px"}}>
            <span style={{fontSize:12.5,color:"#166534"}}>all good — {emp.name.split(" ")[0]} has been paid for {FULL[mo]}</span>
          </div>
        )}
      </div>

    </div>
  );
}

// ── MAIN ──
export default function App() {
  const [q, setQ]       = useState("");
  const [dept, setDept] = useState("All");
  const [mo, setMo]     = useState(2);
  const [sel, setSel]   = useState(null);
  const [statuses, setStatuses] = useState(() => Object.fromEntries(employees.map(e=>[e.id,e.status])));
  const [txnIds, setTxnIds]     = useState({});

  const list = employees.filter(e=>
    (dept==="All"||e.dept===dept) &&
    (e.name.toLowerCase().includes(q.toLowerCase())||e.role.toLowerCase().includes(q.toLowerCase()))
  );

  const mark = (id, s) => setStatuses(p=>({...p,[id]:s}));

  const saveStatus = (id, s, txn) => {
    setStatuses(p=>({...p,[id]:s}));
    if (txn) setTxnIds(p=>({...p,[id]:txn}));
  };

  return (
    <div style={{minHeight:"100vh",background:"#f0f7ff",fontFamily:"'Plus Jakarta Sans','Helvetica Neue',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input,button{font-family:inherit}
        input:focus{outline:none}
        button:focus{outline:none}
      `}</style>

      {/* header */}
      <div style={{background:"#fff",borderBottom:"1px solid #dbeafe",padding:"12px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,borderRadius:10,background:"#eff6ff",border:"1.5px solid #bfdbfe",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:15,color:"#0f172a"}}>Payroll</div>
            <div style={{fontSize:10.5,color:"#94a3b8"}}>FY 2025–26</div>
          </div>
        </div>

        <div style={{display:"flex",gap:2,background:"#f0f7ff",border:"1px solid #dbeafe",borderRadius:10,padding:"3px"}}>
          {MONTHS.map((m,i)=>(
            <button key={m} onClick={()=>setMo(i)} style={{
              background: mo===i?"#2563eb":"transparent",
              color:      mo===i?"#fff":"#64748b",
              border:"none",borderRadius:7,padding:"5px 9px",fontSize:11,
              fontWeight: mo===i?700:500,cursor:"pointer",transition:"all .12s",
            }}>{m}</button>
          ))}
        </div>
      </div>

      <div style={{padding:"28px 32px",maxWidth:1200,margin:"0 auto"}}>

        {!sel ? (
          <>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24,flexWrap:"wrap"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,background:"#fff",border:"1.5px solid #dbeafe",borderRadius:11,padding:"9px 14px",flex:"1",minWidth:220,maxWidth:360}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="find someone..." style={{border:"none",background:"transparent",flex:1,fontSize:13,color:"#334155"}}/>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {depts.map(d=>(
                  <button key={d} onClick={()=>setDept(d)} style={{
                    background: dept===d?"#2563eb":"#fff",
                    color:      dept===d?"#fff":"#64748b",
                    border:`1.5px solid ${dept===d?"#2563eb":"#dbeafe"}`,
                    borderRadius:99,padding:"6px 14px",fontSize:12,fontWeight:600,
                    cursor:"pointer",transition:"all .12s",
                  }}>{d}</button>
                ))}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:16}}>
              {list.map((emp)=>(
                <EmpCard key={emp.id} emp={{...emp,status:statuses[emp.id]}} onClick={()=>setSel(emp)}/>
              ))}
              {list.length===0 && (
                <div style={{gridColumn:"1/-1",textAlign:"center",padding:"60px 0",color:"#94a3b8",fontSize:14}}>
                  no one found — try a different search
                </div>
              )}
            </div>
          </>
        ) : (
          <EmpDetail
            emp={sel}
            mo={mo}
            statuses={statuses}
            txnIds={txnIds}
            onMark={mark}
            onSaveStatus={saveStatus}
            onBack={()=>setSel(null)}
          />
        )}
      </div>
    </div>
  );
}