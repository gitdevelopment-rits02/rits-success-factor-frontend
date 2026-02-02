import React, { useState } from "react";
import SuperAdminWorkforceWithHRAnalytics from "./SuperAdminWorkforceWithHRAnalytics";
import SuperAdminSystemDashboard from "./SuperAdminSystemDashboard";

export default function SuperAdminDashboard() {
  const [view, setView] = useState("workforce");

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">

      {/* HEADER + TOGGLE */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-900">
            {view === "workforce"
              ? "Workforce Analytics"
              : "System Dashboard"}
          </h1>

          <p className="text-slate-500 font-medium">
            {view === "workforce"
              ? "Real-time personnel monitoring & retention insights"
              : "Monitor the health of your platform and company activity"}
          </p>
        </div>

        {/* TOGGLE BUTTON */}
        <div className="flex bg-white border border-blue-100 rounded-xl overflow-hidden">
          <button
            onClick={() => setView("workforce")}
            className={`px-5 py-2 text-sm font-semibold transition ${
              view === "workforce"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-blue-50"
            }`}
          >
            Workforce
          </button>

          <button
            onClick={() => setView("system")}
            className={`px-5 py-2 text-sm font-semibold transition ${
              view === "system"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-blue-50"
            }`}
          >
            System
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {view === "workforce" && <SuperAdminWorkforceWithHRAnalytics />}

      {view === "system" && <SuperAdminSystemDashboard />}
    </div>
  );
}
