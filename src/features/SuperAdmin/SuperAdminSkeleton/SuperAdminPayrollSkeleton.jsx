import React from "react";

export default function SuperAdminPayrollSkeleton() {
  return (
    <div className="min-h-screen w-full p-8 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 animate-pulse">

      {/* Header Skeleton */}
      <div className="bg-white/90 rounded-[28px] p-7 shadow border border-blue-100 mb-10">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/5 mb-6"></div>

        <div className="flex gap-4">
          <div className="h-10 bg-gray-200 rounded-xl w-48"></div>
          <div className="h-10 bg-gray-200 rounded-xl w-40"></div>
          <div className="h-10 bg-gray-200 rounded-xl w-40"></div>
          <div className="h-10 bg-gray-200 rounded-xl w-64"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white/95 rounded-[28px] shadow border border-blue-100 p-6">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="grid grid-cols-6 gap-4 mb-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-8 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
 