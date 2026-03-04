import React from "react";

const HrOrgChartSkeleton = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-3rem)] w-full overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 rounded-[2rem] border border-blue-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative animate-pulse">
      
      {/* Header Skeleton */}
      <div className="h-20 border-b flex items-center justify-between px-8 bg-white/90 backdrop-blur-xl border-blue-50 shrink-0">
        <div className="h-8 w-64 bg-slate-200 rounded-lg"></div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-blue-50 p-1 rounded-xl border border-blue-100 shadow-inner">
            <div className="h-9 w-24 bg-white rounded-lg"></div>
            <div className="h-9 w-24 bg-blue-100 rounded-lg ml-2"></div>
          </div>
        </div>
      </div>

      {/* Chart Area Skeleton */}
      <div className="flex-1 relative overflow-hidden flex">
        <div className="flex-1 relative overflow-auto bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]">

          <div className="absolute inset-0 p-20 min-w-max min-h-max flex justify-center items-start">
            <div className="flex flex-col items-center gap-16">

              {/* Top Node */}
              <div className="w-72 bg-white rounded-2xl p-4 shadow-sm border border-blue-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-32"></div>
                    <div className="h-2 bg-slate-200 rounded w-24"></div>
                    <div className="h-2 bg-slate-200 rounded w-20"></div>
                  </div>
                </div>
              </div>

              {/* Children Nodes */}
              <div className="flex gap-12">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="w-64 bg-white rounded-2xl p-4 shadow-sm border border-blue-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-28"></div>
                        <div className="h-2 bg-slate-200 rounded w-20"></div>
                        <div className="h-2 bg-slate-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HrOrgChartSkeleton;
