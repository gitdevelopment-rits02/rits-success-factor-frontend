import { useState, useRef } from "react";

const employees = [
    { id: 1, name: "Aarav Mehta", role: "Engineering Head", dept: "Engineering", manager: null },
    { id: 2, name: "Priya Sharma", role: "HR Manager", dept: "HR", manager: null },
    { id: 3, name: "Rohan Gupta", role: "CFO", dept: "Finance", manager: null },
    { id: 4, name: "Sneha Patel", role: "Frontend Dev", dept: "Engineering", manager: 1 },
    { id: 5, name: "Vikram Nair", role: "Sales Lead", dept: "Sales", manager: null },
    { id: 6, name: "Divya Iyer", role: "Brand Manager", dept: "Marketing", manager: null },
    { id: 7, name: "Karan Joshi", role: "Backend Dev", dept: "Engineering", manager: 1 },
    { id: 8, name: "Meera Rao", role: "Analyst", dept: "Finance", manager: 3 },
    { id: 9, name: "Arjun Singh", role: "Recruiter", dept: "HR", manager: 2 },
    { id: 10, name: "Pooja Desai", role: "Account Exec", dept: "Sales", manager: 5 },
    { id: 11, name: "Nikhil Kumar", role: "SEO Specialist", dept: "Marketing", manager: 6 },
    { id: 12, name: "Ananya Bose", role: "QA Engineer", dept: "Engineering", manager: 1 },
];

const avatarPalette = [
    { bg: "#e8f0fe", color: "#4f6ef7" }, { bg: "#fce8e6", color: "#e05245" },
    { bg: "#e6f4ea", color: "#34a853" }, { bg: "#fef7e0", color: "#f9ab00" },
    { bg: "#f3e8fd", color: "#9334e6" }, { bg: "#e8f5e9", color: "#2e7d32" },
    { bg: "#e3f2fd", color: "#1976d2" }, { bg: "#fce4ec", color: "#c2185b" },
    { bg: "#e0f7fa", color: "#0097a7" }, { bg: "#fff3e0", color: "#ef6c00" },
    { bg: "#ede7f6", color: "#5e35b1" }, { bg: "#f9fbe7", color: "#689f38" },
];

const deptColors = {
    Engineering: { bg: "#e8f0fe", color: "#4f6ef7" },
    HR: { bg: "#e6f4ea", color: "#34a853" },
    Finance: { bg: "#fef7e0", color: "#f9ab00" },
    Sales: { bg: "#fce8e6", color: "#e05245" },
    Marketing: { bg: "#f3e8fd", color: "#9334e6" },
};

const ini = n => n.split(" ").map(w => w[0]).join("").toUpperCase();

function Card({ emp, isExpanded, hasChildren, onToggle }) {
    const av = avatarPalette[(emp.id - 1) % avatarPalette.length];
    const dc = deptColors[emp.dept] || { bg: "#e8f0fe", color: "#4f6ef7" };
    const children = employees.filter(e => e.manager === emp.id);
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            <div
                onClick={hasChildren ? onToggle : undefined}
                style={{
                    background: "#fff", border: "1.5px solid #dbeafe", borderRadius: 14,
                    padding: "16px 14px 12px", width: "clamp(140px, 18vw, 176px)",
                    textAlign: "center", cursor: hasChildren ? "pointer" : "default",
                    transition: "all .16s", boxShadow: "0 2px 10px rgba(37,99,235,.06)",
                    position: "relative",
                }}
                onMouseEnter={e => { if (hasChildren) { e.currentTarget.style.borderColor = "#93c5fd"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(37,99,235,.13)"; } }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#dbeafe"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(37,99,235,.06)"; }}
            >
                <div style={{ width: 42, height: 42, borderRadius: 12, background: av.bg, color: av.color, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 9px" }}>{ini(emp.name)}</div>
                <div style={{ fontWeight: 700, fontSize: 12.5, color: "#0f172a", marginBottom: 3, lineHeight: 1.3 }}>{emp.name}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8, lineHeight: 1.3 }}>{emp.role}</div>
                <span style={{ background: dc.bg, color: dc.color, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>{emp.dept}</span>
                {hasChildren && (
                    <div style={{ fontSize: 9.5, color: "#94a3b8", marginTop: 6 }}>{children.length} report{children.length !== 1 ? "s" : ""}</div>
                )}
                {hasChildren && (
                    <div style={{
                        position: "absolute", bottom: -11, left: "50%", transform: "translateX(-50%)",
                        width: 22, height: 22, borderRadius: "50%",
                        background: isExpanded ? "#2563eb" : "#fff",
                        border: `2px solid ${isExpanded ? "#2563eb" : "#bfdbfe"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 1px 6px rgba(37,99,235,.18)", transition: "all .15s", zIndex: 2,
                    }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={isExpanded ? "#fff" : "#2563eb"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            {isExpanded ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
}

function TreeNode({ emp, expanded, onToggle }) {
    const children = employees.filter(e => e.manager === emp.id);
    const isExpanded = expanded.has(emp.id);
    const cardW = 186;

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Card emp={emp} isExpanded={isExpanded} hasChildren={children.length > 0} onToggle={() => onToggle(emp.id)} />
            {isExpanded && children.length > 0 && (
                <>
                    <div style={{ width: 2, height: 26, background: "#bfdbfe", marginTop: 10 }} />
                    <div style={{ position: "relative", display: "flex", alignItems: "flex-start" }}>
                        {children.length > 1 && (
                            <div style={{
                                position: "absolute", top: 0,
                                left: cardW / 2,
                                width: (children.length - 1) * cardW,
                                height: 2, background: "#bfdbfe", zIndex: 0,
                            }} />
                        )}
                        {children.map(child => (
                            <div key={child.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: cardW }}>
                                <div style={{ width: 2, height: 22, background: "#bfdbfe" }} />
                                <TreeNode emp={child} expanded={expanded} onToggle={onToggle} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default function HROrgPage() {
    const [orgName, setOrgName] = useState("");
    const [orgLogo, setOrgLogo] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [saved, setSaved] = useState(false);
    const [expanded, setExpanded] = useState(new Set([1, 2, 3, 5, 6]));
    const fileRef = useRef();

    const roots = employees.filter(e => !e.manager);

    const toggle = id => setExpanded(prev => {
        const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;
    });

    const handleFile = e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => setOrgLogo(ev.target.result);
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        if (nameInput.trim()) { setOrgName(nameInput.trim()); setSaved(true); }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f0f7ff", fontFamily: "'Plus Jakarta Sans','Helvetica Neue',sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input,button{font-family:inherit}
        input:focus{outline:none}
        button:focus{outline:none}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:#bfdbfe;border-radius:9px}
      `}</style>

            {/* header */}
            <div style={{ background: "#fff", borderBottom: "1px solid #dbeafe", padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", position: "sticky", top: 0, zIndex: 20 }}>
                {orgLogo
                    ? <img src={orgLogo} alt="logo" style={{ width: 34, height: 34, borderRadius: 9, objectFit: "contain", border: "1px solid #dbeafe", flexShrink: 0 }} />
                    : <div style={{ width: 34, height: 34, borderRadius: 9, background: "#eff6ff", border: "1.5px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                    </div>
                }
                <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>{orgName || "Your Organisation"}</div>
                    <div style={{ fontSize: 10.5, color: "#94a3b8" }}>HR · Organisation Chart</div>
                </div>
            </div>

            <div style={{ padding: "24px 20px", maxWidth: 1300, margin: "0 auto" }}>

                {/* org setup card */}
                <div style={{ background: "#fff", border: "1.5px solid #dbeafe", borderRadius: 16, padding: "22px", marginBottom: 28 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 4 }}>
                        {saved ? "Organisation info" : "Set up your organisation"}
                    </div>
                    <div style={{ fontSize: 12.5, color: "#94a3b8", marginBottom: 18 }}>
                        {saved ? "tap edit to update name or logo" : "add your org name and logo to personalise the chart"}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                        {/* logo preview / upload */}
                        <label style={{
                            width: 64, height: 64, borderRadius: 14, flexShrink: 0,
                            background: orgLogo ? "transparent" : "#f0f7ff",
                            border: orgLogo ? "1px solid #dbeafe" : "2px dashed #bfdbfe",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", overflow: "hidden",
                        }}>
                            {orgLogo
                                ? <img src={orgLogo} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                                : (
                                    <div style={{ textAlign: "center" }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", margin: "0 auto 4px" }}><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                        <div style={{ fontSize: 9.5, color: "#93c5fd", fontWeight: 600 }}>logo</div>
                                    </div>
                                )
                            }
                            <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} ref={fileRef} />
                        </label>

                        <div style={{ flex: 1, minWidth: 180 }}>
                            {saved ? (
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 17, color: "#0f172a" }}>{orgName}</div>
                                    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 3 }}>{employees.length} employees</div>
                                </div>
                            ) : (
                                <input
                                    value={nameInput}
                                    onChange={e => setNameInput(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleSave()}
                                    placeholder="e.g. Acme Technologies"
                                    style={{
                                        width: "100%", border: "1.5px solid #bfdbfe", borderRadius: 10,
                                        padding: "10px 13px", fontSize: 13.5, color: "#0f172a", background: "#f8faff",
                                    }}
                                />
                            )}
                        </div>

                        {saved ? (
                            <button onClick={() => { setNameInput(orgName); setSaved(false); }} style={{ background: "#f0f7ff", color: "#2563eb", border: "1.5px solid #bfdbfe", borderRadius: 10, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                                edit
                            </button>
                        ) : (
                            <button onClick={handleSave} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 3px 10px rgba(37,99,235,.3)", whiteSpace: "nowrap" }}>
                                save
                            </button>
                        )}
                    </div>
                </div>

                <div style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginBottom: 20 }}>
                    click on any card to expand or collapse their team
                </div>

                {/* tree */}
                {/* <div style={{ overflowX: "auto", paddingBottom: 36 }}>
                    <div style={{ minWidth: "max-content", display: "flex", justifyContent: "center", gap: 32, paddingTop: 4, paddingLeft: 16, paddingRight: 16 }}>
                        {roots.map(root => (
                            <TreeNode key={root.id} emp={root} expanded={expanded} onToggle={toggle} />
                        ))}
                    </div>
                </div> */}

            </div>
        </div>
    );
}