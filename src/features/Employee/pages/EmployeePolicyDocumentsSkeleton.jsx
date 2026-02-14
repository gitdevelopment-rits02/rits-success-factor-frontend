import React from "react";

export default function EmployeePolicyDocumentsSkeleton({ type = "list" }) {
  if (type === "details") {
    return (
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="flex items-center gap-4 p-5 border-b bg-slate-50">
            <div className="w-14 h-14 bg-slate-200 rounded-xl" />
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-slate-200 rounded w-1/3" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
              <div className="h-3 bg-slate-200 rounded w-1/4" />
            </div>
          </div>

          <div className="p-5 md:p-6 space-y-4">
            <div className="h-4 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
            <div className="h-4 bg-slate-200 rounded w-2/3" />

            <div className="mt-4 grid gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-slate-200 rounded-xl">
                  <div className="w-8 h-8 bg-slate-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-full" />
                    <div className="h-4 bg-slate-200 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 animate-pulse">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 md:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm"
        >
          <div className="flex items-center gap-4 w-full">
            <div className="w-12 h-12 bg-slate-200 rounded-xl" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-3 bg-slate-200 rounded w-1/4" />
            </div>
          </div>
          <div className="w-6 h-6 bg-slate-200 rounded" />
        </div>
      ))}
    </div>
  );
}
