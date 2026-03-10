import React from "react";

const Shimmer = ({ className = "", style = {} }) => (
  <div
    className={className}
    style={{
      borderRadius: 10,
      background: "linear-gradient(90deg, #e8f0fe 25%, #d1e3ff 50%, #e8f0fe 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s infinite",
      ...style,
    }}
  />
);

const OrgCardSkeleton = ({ width = 256 }) => (
  <div
    style={{
      width,
      background: "#fff",
      borderRadius: 16,
      border: "1px solid #e0eaff",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      boxShadow: "0 2px 8px rgba(59,130,246,0.06)",
    }}
  >
    <Shimmer style={{ width: 48, height: 48, borderRadius: 12, flexShrink: 0 }} />
    <div style={{ flex: 1 }}>
      <Shimmer style={{ width: "70%", height: 11, borderRadius: 6, marginBottom: 6 }} />
      <Shimmer style={{ width: "55%", height: 9, borderRadius: 6, marginBottom: 5 }} />
      <Shimmer style={{ width: "45%", height: 9, borderRadius: 6 }} />
    </div>
  </div>
);

const VerticalLine = ({ height = 24 }) => (
  <div style={{ width: 1, height, background: "#bfdbfe", margin: "0 auto" }} />
);

const HorizontalLine = ({ width }) => (
  <div style={{ width, height: 1, background: "#bfdbfe" }} />
);

const SuperAdminOrgChartSkeleton = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 3rem)",
      width: "100%",
      background: "linear-gradient(135deg, #f1f5f9, #eff6ff, #eef2ff)",
      borderRadius: 24,
      border: "1px solid #dbeafe",
      overflow: "hidden",
      position: "relative",
      fontFamily: "Inter, sans-serif",
    }}
  >
    <style>{`
      @keyframes shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>

    {/* ── HEADER ── */}
    <div
      style={{
        height: 80,
        background: "rgba(255,255,255,0.9)",
        borderBottom: "1px solid #eff6ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        flexShrink: 0,
      }}
    >
      {/* Title */}
      <Shimmer style={{ width: 220, height: 28, borderRadius: 8 }} />

      {/* Chart / List toggle */}
      <div
        style={{
          display: "flex",
          gap: 4,
          background: "#eff6ff",
          border: "1px solid #dbeafe",
          borderRadius: 12,
          padding: 4,
        }}
      >
        <Shimmer style={{ width: 80, height: 32, borderRadius: 8 }} />
        <Shimmer style={{ width: 80, height: 32, borderRadius: 8 }} />
      </div>
    </div>

    {/* ── CHART AREA (dotted bg) ── */}
    <div
      style={{
        flex: 1,
        overflow: "hidden",
        background:
          "radial-gradient(#b8d0f0 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 60,
        position: "relative",
      }}
    >
      {/* ROOT node */}
      <OrgCardSkeleton width={280} />
      <VerticalLine height={24} />

      {/* Horizontal connector spanning all children */}
      <div style={{ display: "flex", alignItems: "flex-start", position: "relative" }}>
        {/* left arm */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <HorizontalLine width={160} />
            <div style={{ width: 1, height: 24, background: "#bfdbfe" }} />
          </div>
          <OrgCardSkeleton width={256} />
        </div>

        {/* center arm */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 0 }}>
          <VerticalLine height={24} />
          <OrgCardSkeleton width={256} />

          {/* Second level children under center */}
          <VerticalLine height={24} />
          <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <VerticalLine height={24} />
                <OrgCardSkeleton width={220} />
              </div>
            ))}
          </div>
        </div>

        {/* right arm */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 1, height: 24, background: "#bfdbfe" }} />
            <HorizontalLine width={160} />
          </div>
          <OrgCardSkeleton width={256} />
        </div>
      </div>

      {/* ── ZOOM CONTROLS (bottom-left) ── */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: 32,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          background: "rgba(255,255,255,0.75)",
          borderRadius: 16,
          border: "1px solid #dbeafe",
          padding: 6,
        }}
      >
        <Shimmer style={{ width: 36, height: 36, borderRadius: 10 }} />
        <Shimmer style={{ width: 36, height: 36, borderRadius: 10 }} />
      </div>
    </div>
  </div>
);

export default SuperAdminOrgChartSkeleton;