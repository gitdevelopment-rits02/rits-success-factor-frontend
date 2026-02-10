import React from "react";

const Skeleton = ({ className = "" }) => (
  <div className={`animate-shimmer rounded-xl ${className}`} />
);

const SuperAdminDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 space-y-10">

      {/* TOGGLE TABS */}
      <div className="flex justify-center">
        <div className="bg-white p-2 rounded-2xl flex gap-3 border shadow-sm">
          <Skeleton className="h-10 w-32 rounded-xl" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto space-y-10">

        {/* PAGE HEADER */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* SEARCH BAR */}
        <Skeleton className="h-12 w-[360px] rounded-2xl" />

        <div className="grid grid-cols-12 gap-8">

          {/* SIDEBAR FILTERS */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 border shadow-sm space-y-8">
              <Skeleton className="h-6 w-32" />

              <div className="space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>

              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-xl" />
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="col-span-12 lg:col-span-9 space-y-8">

            {/* STAT CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-[2rem] p-8 bg-white shadow-sm space-y-6"
                >
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-10 w-20" />
                </div>
              ))}
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-[2rem] border shadow-sm overflow-hidden">
              <div className="p-8">
                <Skeleton className="h-6 w-48" />
              </div>

              <div className="px-8 space-y-5 pb-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-4 gap-6 items-center"
                  >
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-20 ml-auto" />
                  </div>
                ))}
              </div>
            </div>

          </main>
        </div>

        {/* ANALYTICS VIEW SKELETON */}
        <div className="grid grid-cols-12 gap-8">

          {/* BAR CHART */}
          <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[2rem] shadow-sm space-y-6">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-[300px] w-full rounded-xl" />
          </div>

          {/* LATE CHECK-IN CARD */}
          <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[2rem] shadow-sm space-y-6">
            <Skeleton className="h-6 w-48" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default SuperAdminDashboardSkeleton;



