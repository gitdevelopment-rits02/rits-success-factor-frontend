import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createAnnouncement, getAnnouncements } from "../Redux/thunks/AnnouncementThunk";
import { toast } from "react-toastify";
 
/* ─── Design tokens ─── */
const shadow = { boxShadow: "0 1px 6px rgba(15,23,42,0.04), 0 4px 14px rgba(59,130,246,0.05)" };
 
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}
 
function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 2) return "yesterday";
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
 
function initials(name = "") {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}
 
const GRADS = [
  "linear-gradient(135deg,#60a5fa,#3b82f6)",
  "linear-gradient(135deg,#34d399,#10b981)",
  "linear-gradient(135deg,#a78bfa,#7c3aed)",
  "linear-gradient(135deg,#fb923c,#ea580c)",
  "linear-gradient(135deg,#f472b6,#db2777)",
  "linear-gradient(135deg,#38bdf8,#0284c7)",
];
 
const MOCK = [
  {
    _id: "1",
    title: "Good news — Friday is a half day",
    description: "Hey everyone, just wanted to let you know that this Friday we're wrapping up at 1pm. It's been a solid quarter and the leadership team wanted to give everyone an early start to the weekend. No approvals needed, just log off by 1 and enjoy!",
    author: "Priya HR",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    _id: "2",
    title: "Performance review cycle starts next week",
    description: "Just a heads up that the Q1 performance reviews are kicking off on Monday. Managers — please have your 1:1s scheduled by Wednesday. Everyone else, your self-assessment form is in the HR portal. It should take about 15 minutes. Reach out if you have questions.",
    author: "Sarah HR",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    _id: "3",
    title: "Office will be closed on March 14th",
    description: "Just a reminder that the office is closed next Thursday for the public holiday. If you're working remotely, please update your status in Slack. Have a great long weekend!",
    author: "Admin",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    _id: "4",
    title: "New leave policy — effective April 1st",
    description: "We've updated the leave policy starting April 1st. The big changes: everyone gets 3 extra paid days, and the maternity/paternity provisions have been extended. Full details are in the HR portal under Policies. Feel free to ping me if anything's unclear.",
    author: "Priya HR",
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
  {
    _id: "5",
    title: "Company picnic — March 22nd at Cubbon Park",
    description: "Mark your calendars! We're doing the annual company picnic on March 22nd. Families are very welcome. We'll have food, some games, and hopefully good weather. Drop your name in the spreadsheet so we can get a headcount.",
    author: "Events Team",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    _id: "6",
    title: "Updated WFH guidelines",
    description: "As discussed in last week's all-hands, the WFH policy has been updated. You can now work from home up to 3 days a week without prior approval. Just keep your manager in the loop and make sure you're reachable during core hours (10am–4pm).",
    author: "Sarah HR",
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
];
 
export default function AnnouncementsPage() {
  const width = useWindowWidth();
  const isMobile = width < 640;
 
  /* form */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState("");
 
  /* list */
  const [announcements, setAnnouncements] = useState(MOCK);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [expandedId, setExpandedId] = useState(null);
 
  /* ── Wire Redux:
  const dispatch = useDispatch();
  const { list } = useSelector(s => s.hr.announcements);
  useEffect(() => { dispatch(getAnnouncements()); }, [dispatch]);
  ── */
 
  const validate = () => {
    let ok = true;
    if (!title.trim()) { setTitleErr("What's the announcement about?"); ok = false; }
    if (!description.trim()) { setDescErr("Add a message before sending."); ok = false; }
    return ok;
  };
 
  const handleSend = async () => {
    if (!validate()) return;
    setSending(true);
    try {
      /* await dispatch(createAnnouncement({ title, description })).unwrap(); */
      setAnnouncements((p) => [{
        _id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        author: "You (HR)",
        createdAt: new Date().toISOString(),
      }, ...p]);
      toast.success("Announcement sent!");
      setTitle(""); setDescription(""); setTitleErr(""); setDescErr("");
    } catch {
      toast.error("Couldn't send. Try again.");
    } finally {
      setSending(false);
    }
  };
 
  const filtered = announcements.filter((a) => {
    const d = new Date(a.createdAt);
    if (fromDate && d < new Date(fromDate)) return false;
    if (toDate && d > new Date(toDate + "T23:59:59")) return false;
    return true;
  });
 
  const inp = (err, isFocusedField) => ({
    width: "100%",
    background: isFocusedField ? "#fff" : err ? "#fff1f2" : "#f8fafc",
    border: `1.5px solid ${err ? "#fca5a5" : isFocusedField ? "#93c5fd" : "#e2e8f0"}`,
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "#1e293b",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "all 0.15s",
    boxShadow: isFocusedField ? "0 0 0 3px rgba(59,130,246,0.08)" : "none",
  });
 
  return (
<div style={{ minHeight: "100vh", background: "#f4f8ff", fontFamily: "'Inter', sans-serif" }}>
<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f0f7ff; }
        ::-webkit-scrollbar-thumb { background: #bfdbfe; border-radius: 99px; }
        input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.4; cursor: pointer; }
        .ann-item { transition: background 0.12s; }
        .ann-item:hover { background: #f8fbff !important; }
        .send-btn { transition: background 0.15s, transform 0.1s, box-shadow 0.15s; }
        .send-btn:hover:not(:disabled) { background: #2563eb !important; box-shadow: 0 4px 16px rgba(37,99,235,0.3) !important; }
        .send-btn:active:not(:disabled) { transform: scale(0.98); }
      `}</style>
 
      {/* ── Header ── */}
<header style={{
        height: 56, background: "#f4f8ff", borderBottom: "1px solid #f1f5f9",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", position: "sticky", top: 0, zIndex: 10,
        boxShadow: "0 1px 4px rgba(15,23,42,0.05)",
      }}>
<img src="/src/assets/logo.png" alt="HR Connect" style={{ height: 34, objectFit: "contain" }} />
<button
          onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
          style={{
            display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
            borderRadius: 10, fontSize: 12, fontWeight: 600,
            color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", cursor: "pointer",
          }}
>
<svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 13, height: 13 }}>
<path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h6a1 1 0 100-2H4V5h5a1 1 0 100-2H3zm10.293 3.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L14.586 11H8a1 1 0 110-2h6.586l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
</svg>
          {!isMobile && "Logout"}
</button>
</header>
 
      <main style={{
        padding: isMobile ? "20px 16px" : "28px 28px",
        maxWidth: 820,
        margin: "0 auto",
      }}>
 
        {/* Page title */}
<div style={{ marginBottom: 28 }}>
<h1 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Announcements
</h1>
<p style={{ fontSize: 13, color: "#94a3b8", marginTop: 5, marginBottom: 0 }}>
            Write and send updates to the whole team.
</p>
</div>
 
        {/* ═══════════════════════
            COMPOSE CARD — TOP
        ═══════════════════════ */}
<div style={{
          background: "#fff", borderRadius: 18, border: "1px solid #f1f5f9",
          padding: isMobile ? 18 : 26,
          marginBottom: 24,
          ...shadow,
        }}>
          {/* Card header */}
<div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
<div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: "#eff6ff", border: "1px solid #dbeafe",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
<svg viewBox="0 0 20 20" fill="#3b82f6" style={{ width: 16, height: 16 }}>
<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
</svg>
</div>
<div>
<p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", margin: 0 }}>
                New announcement
</p>
<p style={{ fontSize: 11, color: "#94a3b8", margin: 0, marginTop: 1 }}>
                This will be visible to all employees
</p>
</div>
</div>
 
          {/* Form fields */}
<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
 
            {/* Title */}
<div>
<label style={{
                fontSize: 11, fontWeight: 600, color: "#64748b",
                textTransform: "uppercase", letterSpacing: "0.05em",
                display: "block", marginBottom: 7,
              }}>Title</label>
<input
                type="text"
                placeholder="e.g. Office closed this Friday"
                value={title}
                onChange={(e) => { setTitle(e.target.value); if (e.target.value) setTitleErr(""); }}
                onFocus={() => setFocused("title")}
                onBlur={() => setFocused("")}
                style={inp(titleErr, focused === "title")}
              />
              {titleErr && (
<p style={{ fontSize: 11, color: "#ef4444", marginTop: 5, marginBottom: 0 }}>{titleErr}</p>
              )}
</div>
 
            {/* Message */}
<div>
<label style={{
                fontSize: 11, fontWeight: 600, color: "#64748b",
                textTransform: "uppercase", letterSpacing: "0.05em",
                display: "block", marginBottom: 7,
              }}>Message</label>
<textarea
                placeholder="Write your message here. Keep it conversational — your team will appreciate it."
                value={description}
                rows={isMobile ? 5 : 6}
                onChange={(e) => { setDescription(e.target.value); if (e.target.value) setDescErr(""); }}
                onFocus={() => setFocused("desc")}
                onBlur={() => setFocused("")}
                style={{ ...inp(descErr, focused === "desc"), resize: "vertical", lineHeight: 1.7 }}
              />
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                {descErr
                  ? <p style={{ fontSize: 11, color: "#ef4444", margin: 0 }}>{descErr}</p>
                  : <span />
                }
<span style={{ fontSize: 11, color: "#cbd5e1", marginLeft: "auto" }}>
                  {description.length} chars
</span>
</div>
</div>
 
            {/* Send button */}
<button
              className="send-btn"
              onClick={handleSend}
              disabled={sending}
              style={{
                padding: "12px 0", borderRadius: 11, width: "100%",
                background: sending ? "#93c5fd" : "#3b82f6",
                border: "none", color: "#fff", fontSize: 13, fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: "0 2px 10px rgba(59,130,246,0.25)",
                cursor: sending ? "not-allowed" : "pointer",
              }}
>
<svg viewBox="0 0 20 20" fill="currentColor" style={{ width: 15, height: 15 }}>
<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
</svg>
              {sending ? "Sending…" : "Send to everyone"}
</button>
</div>
</div>
 
        {/* ═══════════════════════
            PAST ANNOUNCEMENTS
        ═══════════════════════ */}
<div>
 
          {/* Section label + date filter */}
<div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 14,
          }}>
<div>
<p style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", margin: 0 }}>
                Past announcements
</p>
<p style={{ fontSize: 12, color: "#94a3b8", marginTop: 3, marginBottom: 0 }}>
                {filtered.length} {filtered.length === 1 ? "announcement" : "announcements"}
                {(fromDate || toDate) && " in selected range"}
</p>
</div>
 
            {/* Date pickers */}
<div style={{
              display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8,
              width: isMobile ? "100%" : "auto",
            }}>
<div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10,
                padding: "7px 12px", ...shadow,
              }}>
<svg viewBox="0 0 20 20" fill="#94a3b8" style={{ width: 13, height: 13, flexShrink: 0 }}>
<path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
</svg>
<span style={{ fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap" }}>From</span>
<input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={{
                    background: "transparent", border: "none", outline: "none",
                    fontSize: 12, color: "#374151", cursor: "pointer", fontFamily: "inherit",
                    width: isMobile ? "auto" : 120,
                  }}
                />
</div>
 
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10,
                padding: "7px 12px", ...shadow,
              }}>
<span style={{ fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap" }}>To</span>
<input
                  type="date"
                  value={toDate}
                  min={fromDate}
                  onChange={(e) => setToDate(e.target.value)}
                  style={{
                    background: "transparent", border: "none", outline: "none",
                    fontSize: 12, color: "#374151", cursor: "pointer", fontFamily: "inherit",
                    width: isMobile ? "auto" : 120,
                  }}
                />
</div>
 
              {(fromDate || toDate) && (
<button
                  onClick={() => { setFromDate(""); setToDate(""); }}
                  style={{
                    fontSize: 12, fontWeight: 600, color: "#ef4444",
                    background: "#fff1f2", border: "1px solid #fecaca",
                    borderRadius: 9, padding: "7px 14px", cursor: "pointer",
                  }}
>
                  Clear
</button>
              )}
</div>
</div>
 
          {/* Empty state */}
          {filtered.length === 0 ? (
<div style={{
              background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9",
              padding: "52px 24px", textAlign: "center", ...shadow,
            }}>
<div style={{
                width: 44, height: 44, borderRadius: 12, background: "#f8fafc",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 14px",
              }}>
<svg viewBox="0 0 20 20" fill="#cbd5e1" style={{ width: 20, height: 20 }}>
<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
</svg>
</div>
<p style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8", margin: 0 }}>
                Nothing in this date range
</p>
<p style={{ fontSize: 12, color: "#cbd5e1", marginTop: 6 }}>
                Try widening the filter or clearing it.
</p>
</div>
          ) : (
 
            /* Announcements list */
<div style={{
              background: "#fff", borderRadius: 16,
              border: "1px solid #f1f5f9", overflow: "hidden", ...shadow,
            }}>
              {filtered.map((ann, idx) => {
                const isExpanded = expandedId === ann._id;
                const isLast = idx === filtered.length - 1;
                const grad = GRADS[idx % GRADS.length];
                const isLong = ann.description.length > 140;
 
                return (
<div
                    key={ann._id}
                    className="ann-item"
                    style={{
                      borderBottom: isLast ? "none" : "1px solid #f1f5f9",
                      padding: isMobile ? "16px" : "20px 24px",
                      cursor: isLong ? "pointer" : "default",
                    }}
                    onClick={() => isLong && setExpandedId(isExpanded ? null : ann._id)}
>
<div style={{ display: "flex", gap: isMobile ? 12 : 16, alignItems: "flex-start" }}>
 
                      {/* Avatar */}
<div style={{
                        width: 38, height: 38, borderRadius: 11, flexShrink: 0,
                        background: grad,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: 12, fontWeight: 700,
                        marginTop: 1,
                      }}>
                        {initials(ann.author)}
</div>
 
                      {/* Content */}
<div style={{ flex: 1, minWidth: 0 }}>
 
                        {/* Title row */}
<div style={{
                          display: "flex", justifyContent: "space-between",
                          alignItems: "flex-start", gap: 10, marginBottom: 4,
                        }}>
<p style={{
                            fontSize: isMobile ? 13 : 14,
                            fontWeight: 700, color: "#0f172a",
                            margin: 0, lineHeight: 1.4,
                          }}>
                            {ann.title}
</p>
                          {isLong && (
<svg
                              viewBox="0 0 20 20" fill="currentColor"
                              style={{
                                width: 14, height: 14, color: "#cbd5e1",
                                flexShrink: 0, marginTop: 3,
                                transform: isExpanded ? "rotate(90deg)" : "none",
                                transition: "transform 0.2s",
                              }}
>
<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
</svg>
                          )}
</div>
 
                        {/* Author + date */}
<div style={{
                          display: "flex", alignItems: "center",
                          flexWrap: "wrap", gap: 4, marginBottom: 10,
                        }}>
<span style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>
                            {ann.author}
</span>
<span style={{ fontSize: 12, color: "#e2e8f0" }}>·</span>
<span style={{ fontSize: 12, color: "#94a3b8" }}>
                            {new Date(ann.createdAt).toLocaleDateString("en-GB", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
</span>
<span style={{ fontSize: 12, color: "#e2e8f0" }}>·</span>
<span style={{ fontSize: 12, color: "#94a3b8" }}>
                            {timeAgo(ann.createdAt)}
</span>
</div>
 
                        {/* Description */}
<p style={{
                          fontSize: 13, color: "#64748b", margin: 0,
                          lineHeight: 1.7,
                          display: "-webkit-box",
                          WebkitLineClamp: isExpanded ? "unset" : 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}>
                          {ann.description}
</p>
 
                        {isLong && !isExpanded && (
<p style={{
                            fontSize: 12, color: "#3b82f6", fontWeight: 500,
                            marginTop: 6, marginBottom: 0,
                          }}>
                            Read more
</p>
                        )}
                        {isLong && isExpanded && (
<p style={{
                            fontSize: 12, color: "#94a3b8",
                            marginTop: 6, marginBottom: 0,
                          }}>
                            Show less
</p>
                        )}
</div>
</div>
</div>
                );
              })}
</div>
          )}
</div>
 
        <div style={{ paddingTop: 32, paddingBottom: 8, textAlign: "center" }}>
<p style={{ fontSize: 11, color: "#cbd5e1", margin: 0 }}>
            © 2024 RevAppayya IT Services · RitsHRConnect
</p>
</div>
</main>
</div>
  );
}