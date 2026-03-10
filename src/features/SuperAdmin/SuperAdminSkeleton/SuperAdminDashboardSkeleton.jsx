import React from "react";

const Shimmer = ({ style = {} }) => (
  <div style={{
    borderRadius: 10,
    background: "linear-gradient(90deg, #e8f0fe 25%, #d1e3ff 50%, #e8f0fe 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
    ...style,
  }} />
);

const SuperAdminDashboardSkeleton = () => (
  <div style={{ minHeight: "100vh", background: "#f4f8ff", fontFamily: "Inter, sans-serif" }}>
    <style>{`
      @keyframes shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>

    {/* TOP NAV */}
    <div style={{
      height: 56, background: "#f4f8ff", borderBottom: "1px solid #e2e8f0",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px",
    }}>
      <Shimmer style={{ width: 120, height: 32, borderRadius: 8 }} />
      <Shimmer style={{ width: 80, height: 32, borderRadius: 10 }} />
    </div>

    {/* SUB NAV */}
    <div style={{
      height: 48, background: "#f4f8ff", borderBottom: "1px solid #e2e8f0",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Shimmer style={{ width: 220, height: 34, borderRadius: 10 }} />
    </div>

    {/* MAIN */}
    <div style={{ padding: "24px 28px", maxWidth: 1400, margin: "0 auto" }}>

      {/* KPI ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #f1f5f9" }}>
            <Shimmer style={{ width: 32, height: 32, borderRadius: 10, marginBottom: 12 }} />
            <Shimmer style={{ width: 70, height: 28, borderRadius: 6, marginBottom: 8 }} />
            <Shimmer style={{ width: 90, height: 14, borderRadius: 6, marginBottom: 8 }} />
            <Shimmer style={{ width: 70, height: 18, borderRadius: 99 }} />
          </div>
        ))}
      </div>

      {/* ROW 2 — ring + absent by dept */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

        {/* Ring card */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 24 }}>
          <Shimmer style={{ width: 120, height: 120, borderRadius: "50%", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <Shimmer style={{ width: 160, height: 14, borderRadius: 6, marginBottom: 8 }} />
            <Shimmer style={{ width: 120, height: 11, borderRadius: 6, marginBottom: 20 }} />
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <Shimmer style={{ width: 80, height: 12, borderRadius: 6 }} />
                <Shimmer style={{ width: 36, height: 20, borderRadius: 99 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Absent by dept */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 20, border: "1px solid #f1f5f9" }}>
          <Shimmer style={{ width: 160, height: 14, borderRadius: 6, marginBottom: 8 }} />
          <Shimmer style={{ width: 200, height: 11, borderRadius: 6, marginBottom: 20 }} />
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <Shimmer style={{ width: 100, height: 12, borderRadius: 6 }} />
                <Shimmer style={{ width: 60, height: 12, borderRadius: 6 }} />
              </div>
              <Shimmer style={{ width: "100%", height: 6, borderRadius: 99 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ROW 3 — Roster table */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f1f5f9", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f8fafc" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <Shimmer style={{ width: 140, height: 14, borderRadius: 6, marginBottom: 8 }} />
              <Shimmer style={{ width: 100, height: 11, borderRadius: 6 }} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Shimmer style={{ width: 180, height: 32, borderRadius: 10 }} />
              <Shimmer style={{ width: 100, height: 32, borderRadius: 10 }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[...Array(4)].map((_, i) => (
              <Shimmer key={i} style={{ width: 70, height: 30, borderRadius: 8 }} />
            ))}
          </div>
        </div>
        <div style={{ padding: "0 20px" }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 16, padding: "14px 0", borderBottom: "1px solid #f8fafc" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Shimmer style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0 }} />
                <Shimmer style={{ width: 120, height: 13, borderRadius: 6 }} />
              </div>
              <Shimmer style={{ width: 80, height: 12, borderRadius: 6, alignSelf: "center" }} />
              <Shimmer style={{ width: 70, height: 22, borderRadius: 99, alignSelf: "center" }} />
              <Shimmer style={{ width: 55, height: 12, borderRadius: 6, alignSelf: "center" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default SuperAdminDashboardSkeleton;