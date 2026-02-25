import React from "react";

export default function ManagerPolicyDocumentSkeleton({ count = 5 }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="space-y-2 w-full md:w-auto">
            <div className="h-8 md:h-10 bg-slate-300 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-slate-300 rounded w-64 animate-pulse"></div>
          </div>
          <div className="relative w-full md:w-80">
            <div className="h-10 bg-slate-300 rounded animate-pulse w-full"></div>
          </div>
        </div>

        {/* List of Policy Skeletons */}
        <div className="grid gap-4">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 md:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm"
            >
              <div className="flex items-center gap-4">
                {/* Icon Skeleton */}
                <div className="p-3 rounded-xl bg-slate-200 w-12 h-12 animate-pulse"></div>

                {/* Title & Preview Skeleton */}
                <div className="flex flex-col gap-2">
                  <div className="h-4 bg-slate-300 rounded w-32 animate-pulse"></div>
                  <div className="h-3 bg-slate-200 rounded w-48 animate-pulse"></div>
                </div>
              </div>

              {/* Arrow Skeleton */}
              <div className="w-6 h-6 bg-slate-200 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}