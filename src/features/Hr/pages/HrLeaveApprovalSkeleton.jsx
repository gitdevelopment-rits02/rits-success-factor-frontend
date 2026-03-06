import React from "react";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export default function HrLeaveApprovalSkeleton() {
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-8 w-32 rounded-full" />
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm border p-5 space-y-3"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>

        {/* TOOLBAR */}
        <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-wrap gap-4 items-center">
          <Skeleton className="h-8 w-32 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-40 rounded-full" />
          <Skeleton className="h-8 flex-1 min-w-[200px]" />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="p-4 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-6 gap-4 items-center"
              >
                <Skeleton className="h-10 col-span-2" />
                <Skeleton className="h-6 col-span-1" />
                <Skeleton className="h-6 col-span-1" />
                <Skeleton className="h-6 col-span-1" />
                <Skeleton className="h-8 col-span-1" />
              </div>
            ))}
          </div>
        </div>

        {/* TODAY PANEL */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
          <Skeleton className="h-5 w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}