import React from "react";

export default function SkeletonHrOnBoard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4 sm:p-6 lg:p-8 animate-pulse">
      <div className="max-w-7xl mx-auto">

        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="h-8 w-64 bg-slate-300 rounded mb-2"></div>
            <div className="h-4 w-96 bg-slate-200 rounded"></div>
          </div>
          <div className="h-10 w-40 bg-slate-300 rounded-xl"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
            >
              <div className="h-6 w-24 bg-slate-200 rounded mb-3"></div>
              <div className="h-8 w-16 bg-slate-300 rounded mb-2"></div>
              <div className="h-4 w-20 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Filters Skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4">
          <div className="flex gap-3">
            <div className="flex-1 h-10 bg-slate-200 rounded-xl"></div>
            <div className="w-40 h-10 bg-slate-200 rounded-xl"></div>
            <div className="w-32 h-10 bg-slate-200 rounded-xl"></div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="hidden md:block">
            <div className="p-5 space-y-4">
              {[1, 2, 3, 4, 5].map((row) => (
                <div
                  key={row}
                  className="grid grid-cols-8 gap-4 items-center"
                >
                  <div className="h-6 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-6 bg-slate-200 rounded"></div>
                  <div className="h-6 bg-slate-200 rounded"></div>
                  <div className="h-6 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-6 bg-slate-200 rounded"></div>
                  <div className="h-6 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Skeleton */}
          <div className="md:hidden p-4 space-y-4">
            {[1, 2, 3, 4].map((card) => (
              <div key={card} className="space-y-2">
                <div className="h-6 w-40 bg-slate-300 rounded"></div>
                <div className="h-4 w-64 bg-slate-200 rounded"></div>
                <div className="h-4 w-32 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
