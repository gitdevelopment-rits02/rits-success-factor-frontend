import React from "react";

/* Reusable Skeleton Block */
const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-md ${className}`} />
);

export default function EmployeeRequestTimeOffSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* ===== Header ===== */}
        <div className="mb-10">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* ===== Leave Balance Cards ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100/50"
            >
              <Skeleton className="h-4 w-32 mb-3" />
              <Skeleton className="h-10 w-20 mb-2" />
              <Skeleton className="h-3 w-40 mb-4" />

              <Skeleton className="h-2 w-full mb-3" />
              <Skeleton className="h-3 w-36" />
            </div>
          ))}
        </div>

        {/* ===== Request Form + Reason ===== */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">

          {/* Left Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-blue-100/50">
            <Skeleton className="h-6 w-52 mb-8" />

            <div className="space-y-6">
              {/* Leave Type + Days */}
              <div className="grid md:grid-cols-5 gap-5">
                <Skeleton className="h-11 md:col-span-3" />
                <Skeleton className="h-24 md:col-span-2" />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-5">
                <Skeleton className="h-11" />
                <Skeleton className="h-11" />
              </div>

              {/* Duration Toggle */}
              <Skeleton className="h-10 w-60" />
            </div>
          </div>

          {/* Right Reason */}
          <div className="bg-blue-100 rounded-2xl p-8 shadow-sm border border-blue-200">
            <Skeleton className="h-6 w-32 mb-3" />
            <Skeleton className="h-4 w-56 mb-6" />
            <Skeleton className="h-32 w-full mb-6" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>

        {/* ===== Leave History Table ===== */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100/50 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-8 w-48" />
          </div>

          <div className="divide-y divide-slate-100">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="grid grid-cols-4 gap-4 px-6 py-5"
              >
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-6 w-16 mx-auto" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
