
import { useState } from "react";

const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MSHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MFULL  = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const seed = y => ({
  [`${y}-0-14`]: {name:"Makar Sankranti",  type:"national"},
  [`${y}-0-26`]: {name:"Republic Day",     type:"national"},
  [`${y}-2-14`]: {name:"Holi",             type:"national"},
  [`${y}-3-14`]: {name:"Ambedkar Jayanti", type:"national"},
  [`${y}-7-15`]: {name:"Independence Day", type:"national"},
  [`${y}-9-2`]:  {name:"Gandhi Jayanti",   type:"national"},
  [`${y}-9-24`]: {name:"Dussehra",         type:"national"},
  [`${y}-10-20`]:{name:"Diwali",           type:"national"},
  [`${y}-11-25`]:{name:"Christmas",        type:"national"},
});

const typeC = {
  national:  {bg:"#fef9ee",border:"#fde68a",text:"#b45309",dot:"#f59e0b",label:"National"},
  optional:  {bg:"#eff6ff",border:"#bfdbfe",text:"#1d4ed8",dot:"#3b82f6",label:"Optional"},
  restricted:{bg:"#f0fdf4",border:"#bbf7d0",text:"#166534",dot:"#22c55e",label:"Restricted"},
};

const dkey = (y,m,d) => `${y}-${m}-${d}`;

export default function HRCalendarPage() {
  const today = new Date();
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [holidays, setHols] = useState(() => seed(today.getFullYear()));
  const [modal,  setModal]  = useState(null);
  const [hName,  setHName]  = useState("");
  const [hType,  setHType]  = useState("national");
  const [showList, setShowList] = useState(false); // mobile: toggle sidebar

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const cells = [];
  for(let i=0;i<firstDay;i++) cells.push(null);
  for(let d=1;d<=daysInMonth;d++) cells.push(d);
  while(cells.length%7!==0) cells.push(null);

  const isToday = d => d===today.getDate()&&month===today.getMonth()&&year===today.getFullYear();

  const prevM = () => { if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); };
  const nextM = () => { if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1); };

  const openDay = d => {
    if(!d) return;
    const k = dkey(year,month,d);
    const ex = holidays[k];
    setHName(ex?.name||""); setHType(ex?.type||"national");
    setModal({day:d,key:k});
  };

  const save = () => {
    if(hName.trim()) setHols(p=>({...p,[modal.key]:{name:hName.trim(),type:hType}}));
    setModal(null);
  };

  const remove = () => {
    setHols(p=>{const n={...p};delete n[modal.key];return n;});
    setModal(null);
  };

  const monthHols = Object.entries(holidays)
    .filter(([k])=>k.startsWith(`${year}-${month}-`))
    .map(([k,v])=>({...v,day:parseInt(k.split("-")[2]),key:k}))
    .sort((a,b)=>a.day-b.day);

  const yearTotal = Object.keys(holidays).filter(k=>k.startsWith(`${year}-`)).length;

  return (
    <div style={{minHeight:"100vh",background:"#f0f7ff",fontFamily:"'Plus Jakarta Sans','Helvetica Neue',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input,button,select{font-family:inherit}
        input:focus,select:focus,button:focus{outline:none}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:#bfdbfe;border-radius:9px}

        .day-cell{transition:background .1s}
        .day-cell:hover{ background:#f0f7ff !important; }

        /* responsive grid layout */
        .cal-layout {
          display: grid;
          grid-template-columns: 1fr 260px;
          gap: 18px;
          align-items: start;
        }
        @media(max-width:700px){
          .cal-layout{ grid-template-columns: 1fr; }
          .sidebar-panel{ display: none; }
          .sidebar-panel.open{ display: block !important; }
        }

        /* calendar grid cells shrink on mobile */
        .day-cell { min-height: 80px; }
        @media(max-width:500px){
          .day-cell { min-height: 52px; padding: 5px 4px !important; }
          .day-num  { width: 24px !important; height: 24px !important; font-size: 11px !important; }
          .hol-chip { font-size: 9px !important; padding: 2px 4px !important; }
        }
        @media(max-width:380px){
          .day-cell { min-height: 42px; }
        }
      `}</style>

      {/* header */}
      <div style={{background:"#fff",borderBottom:"1px solid #dbeafe",padding:"11px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap",position:"sticky",top:0,zIndex:20}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,borderRadius:10,background:"#eff6ff",border:"1.5px solid #bfdbfe",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:15,color:"#0f172a"}}>Holiday Calendar</div>
            <div style={{fontSize:10.5,color:"#94a3b8"}}>HR · {year}</div>
          </div>
        </div>

        {/* month nav */}
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <button onClick={prevM} style={{width:32,height:32,borderRadius:8,background:"#fff",border:"1.5px solid #dbeafe",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div style={{fontWeight:700,fontSize:15,color:"#0f172a",minWidth:130,textAlign:"center"}}>
            {MFULL[month]} {year}
          </div>
          <button onClick={nextM} style={{width:32,height:32,borderRadius:8,background:"#fff",border:"1.5px solid #dbeafe",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button onClick={()=>{setMonth(today.getMonth());setYear(today.getFullYear());}} style={{background:"#f0f7ff",color:"#2563eb",border:"1.5px solid #bfdbfe",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer"}}>today</button>
          {/* mobile: toggle list */}
          <button onClick={()=>setShowList(s=>!s)} style={{display:"none",background:showList?"#2563eb":"#f0f7ff",color:showList?"#fff":"#2563eb",border:"1.5px solid #bfdbfe",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer"}}
            className="show-list-btn">
            {monthHols.length} holiday{monthHols.length!==1?"s":""}
          </button>
        </div>
      </div>

      <style>{`@media(max-width:700px){.show-list-btn{display:inline-flex !important}}`}</style>

      <div style={{padding:"20px 16px",maxWidth:1200,margin:"0 auto"}}>
        <div className="cal-layout">

          {/* ── calendar ── */}
          <div style={{background:"#fff",borderRadius:18,border:"1.5px solid #dbeafe",overflow:"hidden",boxShadow:"0 2px 14px rgba(37,99,235,.06)"}}>
            {/* day headers */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",background:"#f0f7ff",borderBottom:"1px solid #dbeafe"}}>
              {DAYS.map((d,i)=>(
                <div key={d} style={{padding:"10px 0",textAlign:"center",fontSize:11.5,fontWeight:700,color:i===0?"#ef4444":"#64748b",letterSpacing:".3px"}}
                  className="day-hdr">{d}</div>
              ))}
            </div>
            <style>{`@media(max-width:440px){.day-hdr{font-size:9.5px!important;padding:7px 0!important}}`}</style>

            {/* date cells */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
              {cells.map((d,i)=>{
                const k   = d ? dkey(year,month,d) : null;
                const hol = k ? holidays[k] : null;
                const tc  = hol ? typeC[hol.type] : null;
                const tod = isToday(d);
                const sun = i%7===0;
                return (
                  <div key={i} className={d?"day-cell":""} onClick={()=>openDay(d)}
                    style={{
                      padding:"8px 7px",
                      borderRight:(i+1)%7===0?"none":"1px solid #f0f7ff",
                      borderBottom:i<cells.length-7?"1px solid #f0f7ff":"none",
                      cursor:d?"pointer":"default",
                      background:tod?"#eff6ff":hol?tc.bg:"#fff",
                      position:"relative",
                    }}
                  >
                    {d&&(
                      <>
                        <div className="day-num" style={{
                          width:28,height:28,borderRadius:8,
                          background:tod?"#2563eb":"transparent",
                          color:tod?"#fff":sun?"#ef4444":"#334155",
                          fontWeight:tod?700:hol?600:400,fontSize:13,
                          display:"flex",alignItems:"center",justifyContent:"center",
                          marginBottom:4,
                        }}>{d}</div>
                        {hol&&(
                          <div className="hol-chip" style={{
                            background:tc.border,borderRadius:5,
                            padding:"2px 6px",fontSize:10,fontWeight:600,
                            color:tc.text,lineHeight:1.35,wordBreak:"break-word",
                          }}>{hol.name}</div>
                        )}
                        {!hol&&(
                          <div style={{position:"absolute",bottom:5,right:5,width:16,height:16,borderRadius:"50%",background:"#f0f7ff",border:"1px solid #bfdbfe",display:"flex",alignItems:"center",justifyContent:"center",opacity:.35}}>
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── sidebar ── */}
          <div className={`sidebar-panel${showList?" open":""}`}>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>

              {/* stats */}
              <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #dbeafe",padding:"16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div>
                    <div style={{fontSize:11,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:".5px",marginBottom:4}}>{MSHORT[month]} total</div>
                    <div style={{fontSize:28,fontWeight:800,color:"#2563eb",lineHeight:1}}>{monthHols.length}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:11,color:"#94a3b8",marginBottom:3}}>{year} total</div>
                    <div style={{fontSize:18,fontWeight:700,color:"#0f172a"}}>{yearTotal}</div>
                  </div>
                </div>
                <div style={{fontSize:11.5,color:"#94a3b8"}}>click any date on the calendar to add a holiday</div>
              </div>

              {/* type legend */}
              <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #dbeafe",padding:"14px 16px"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:".5px",marginBottom:11}}>types</div>
                {Object.entries(typeC).map(([type,col])=>(
                  <div key={type} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <span style={{width:8,height:8,borderRadius:"50%",background:col.dot,display:"inline-block",flexShrink:0}}></span>
                    <span style={{fontSize:12.5,color:"#475569",fontWeight:500}}>{col.label}</span>
                  </div>
                ))}
              </div>

              {/* month list */}
              <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #dbeafe",padding:"14px 16px"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#64748b",textTransform:"uppercase",letterSpacing:".5px",marginBottom:13}}>{MSHORT[month]} holidays</div>
                {monthHols.length===0
                  ? <div style={{fontSize:12.5,color:"#94a3b8",lineHeight:1.6}}>nothing yet —<br/>click a date to add</div>
                  : monthHols.map(h=>{
                      const tc = typeC[h.type];
                      const dow = new Date(year,month,h.day).getDay();
                      return (
                        <div key={h.key} onClick={()=>openDay(h.day)}
                          style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:"1px solid #f0f7ff",cursor:"pointer"}}
                          onMouseEnter={e=>e.currentTarget.style.opacity=".7"}
                          onMouseLeave={e=>e.currentTarget.style.opacity="1"}
                        >
                          <div style={{width:38,height:38,borderRadius:10,background:tc.bg,border:`1.5px solid ${tc.border}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                            <div style={{fontSize:13,fontWeight:700,color:tc.text,lineHeight:1}}>{h.day}</div>
                            <div style={{fontSize:9,color:tc.text,opacity:.7,fontWeight:600}}>{DAYS[dow]}</div>
                          </div>
                          <div style={{minWidth:0}}>
                            <div style={{fontSize:12.5,fontWeight:600,color:"#334155",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{h.name}</div>
                            <div style={{fontSize:10.5,color:tc.dot,fontWeight:600,marginTop:2}}>{tc.label}</div>
                          </div>
                        </div>
                      );
                    })
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── modal ── */}
      {modal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(15,23,42,.3)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50,padding:16}} onClick={()=>setModal(null)}>
          <div style={{background:"#fff",borderRadius:20,padding:"26px 22px",width:"100%",maxWidth:390,boxShadow:"0 24px 64px rgba(15,23,42,.18)"}} onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:700,fontSize:17,color:"#0f172a",marginBottom:4}}>{MFULL[month]} {modal.day}, {year}</div>
            <div style={{fontSize:12.5,color:"#94a3b8",marginBottom:20}}>
              {holidays[modal.key]?"edit or remove this holiday":"what's happening on this day?"}
            </div>

            <label style={{display:"block",fontSize:12,fontWeight:600,color:"#475569",marginBottom:7}}>Holiday name</label>
            <input
              value={hName} onChange={e=>setHName(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&hName.trim()&&save()}
              placeholder="e.g. Diwali, Republic Day..."
              autoFocus
              style={{width:"100%",border:"1.5px solid #bfdbfe",borderRadius:10,padding:"11px 13px",fontSize:14,color:"#0f172a",background:"#f8faff",marginBottom:16}}
            />

            <label style={{display:"block",fontSize:12,fontWeight:600,color:"#475569",marginBottom:8}}>Type</label>
            <div style={{display:"flex",gap:8,marginBottom:22}}>
              {Object.entries(typeC).map(([type,col])=>(
                <button key={type} onClick={()=>setHType(type)} style={{
                  flex:1,padding:"8px 4px",borderRadius:10,fontSize:11.5,fontWeight:600,
                  background:hType===type?col.bg:"#f8faff",
                  color:hType===type?col.text:"#94a3b8",
                  border:`1.5px solid ${hType===type?col.border:"#e8f0fe"}`,
                  cursor:"pointer",transition:"all .12s",
                }}>{col.label}</button>
              ))}
            </div>

            <div style={{display:"flex",gap:8}}>
              {holidays[modal.key]&&(
                <button onClick={remove} style={{flex:1,background:"#fff5f5",color:"#ef4444",border:"1.5px solid #fecaca",borderRadius:10,padding:"11px",fontSize:13,fontWeight:600,cursor:"pointer"}}>remove</button>
              )}
              <button onClick={()=>setModal(null)} style={{flex:1,background:"#f0f7ff",color:"#2563eb",border:"1.5px solid #bfdbfe",borderRadius:10,padding:"11px",fontSize:13,fontWeight:600,cursor:"pointer"}}>cancel</button>
              <button onClick={save} disabled={!hName.trim()} style={{flex:1,background:hName.trim()?"#2563eb":"#bfdbfe",color:"#fff",border:"none",borderRadius:10,padding:"11px",fontSize:13,fontWeight:700,cursor:hName.trim()?"pointer":"default",boxShadow:hName.trim()?"0 3px 10px rgba(37,99,235,.28)":"none",transition:"all .13s"}}>save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}