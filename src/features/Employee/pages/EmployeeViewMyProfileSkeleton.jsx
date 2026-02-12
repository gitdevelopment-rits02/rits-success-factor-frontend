import React from "react";
 
export default function EmployeeViewMyProfileSkeleton() {
  return (
    <div className="min-h-screen p-6 bg-slate-50 animate-pulse">
      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-3xl shadow-sm p-6 flex gap-8 items-center">
        <div className="w-36 h-36 bg-slate-200 rounded-2xl" />
 
        <div className="flex-1 space-y-3">
          <div className="h-7 w-56 bg-slate-200 rounded" />
          <div className="flex gap-3">
            <div className="h-5 w-28 bg-slate-200 rounded-full" />
            <div className="h-5 w-20 bg-slate-200 rounded-full" />
            <div className="h-5 w-20 bg-slate-200 rounded-full" />
          </div>
          <div className="flex gap-6">
            <div className="h-4 w-44 bg-slate-200 rounded" />
            <div className="h-4 w-36 bg-slate-200 rounded" />
            <div className="h-4 w-28 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
 
      {/* ================= CONTENT GRID ================= */}
      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* LEFT SECTION */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Professional Matrix */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="h-5 w-48 bg-slate-200 rounded mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl"
                >
                  <div className="w-10 h-10 bg-slate-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-28 bg-slate-200 rounded" />
                    <div className="h-4 w-40 bg-slate-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
 
          {/* Qualifications */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="h-5 w-40 bg-slate-200 rounded mb-6" />
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-3 h-3 bg-slate-200 rounded-full mt-1" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-64 bg-slate-200 rounded" />
                    <div className="h-3 w-48 bg-slate-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
 
          {/* Experience */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="h-5 w-40 bg-slate-200 rounded mb-6" />
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-3 h-3 bg-slate-200 rounded-full mt-1" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-72 bg-slate-200 rounded" />
                    <div className="h-3 w-52 bg-slate-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* RIGHT SECTION */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Identity Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="h-5 w-40 bg-slate-200 rounded mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-32 bg-slate-200 rounded" />
                  <div className="h-4 w-56 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>
 
          {/* Compliance Docs */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="h-5 w-40 bg-slate-200 rounded mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center"
                >
                  <div className="h-4 w-48 bg-slate-200 rounded" />
                  <div className="h-4 w-16 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>
 
          {/* Assigned Assets */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="h-5 w-40 bg-slate-200 rounded mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-slate-50 p-3 rounded-xl"
                >
                  <div className="space-y-2">
                    <div className="h-4 w-36 bg-slate-200 rounded" />
                    <div className="h-3 w-24 bg-slate-200 rounded" />
                  </div>
                  <div className="h-4 w-16 bg-slate-200 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}