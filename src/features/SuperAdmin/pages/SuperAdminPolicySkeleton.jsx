import React from "react";

export default function SuperAdminPolicySkeleton({
  type = "list",
  count = 5,
  previewData = [],
}) {
  if (type === "list") {
    const items = previewData.length
      ? previewData
      : Array.from({ length: count });

    return (
      <>
        {items.map((_, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border shadow-sm flex justify-between animate-pulse"
          >
            <div className="flex gap-4">
              <div className="p-3 bg-blue-100 rounded-xl w-12 h-12" />
              <div className="flex flex-col gap-2">
                <div className="w-40 h-4 bg-slate-200 rounded" />
                <div className="w-64 h-3 bg-slate-200 rounded" />
              </div>
            </div>
            <div className="w-6 h-6 bg-slate-200 rounded-full" />
          </div>
        ))}
      </>
    );
  }

  if (type === "detail") {
    return (
      <div className="bg-white rounded-2xl border shadow-lg p-6 animate-pulse">
        <div className="w-72 h-6 bg-slate-200 rounded mb-2" />
        <div className="w-40 h-4 bg-slate-200 rounded mb-6" />

        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx}>
              <div className="w-56 h-4 bg-slate-200 rounded mb-2" />
              <div className="w-full h-3 bg-slate-200 rounded mb-1" />
              <div className="w-11/12 h-3 bg-slate-200 rounded mb-1" />
              <div className="w-10/12 h-3 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
