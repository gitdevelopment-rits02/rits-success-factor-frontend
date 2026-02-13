import React from "react";

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 rounded ${className}`} />
);

const EmployeeDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="container mx-auto px-4 py-3 space-y-4">

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* ================= CALENDAR ================= */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <SkeletonBox className="h-4 w-40" />
              <SkeletonBox className="h-8 w-8 rounded-xl" />
            </div>

            <div className="flex justify-between items-center mb-4">
              <SkeletonBox className="h-3 w-28" />
              <div className="flex gap-2">
                <SkeletonBox className="h-6 w-6 rounded-md" />
                <SkeletonBox className="h-6 w-6 rounded-md" />
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {[...Array(42)].map((_, i) => (
                <SkeletonBox key={i} className="h-12 rounded-xl" />
              ))}
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="space-y-4">

            {/* Monthly Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <SkeletonBox className="h-4 w-36 mb-4" />

              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="p-3 border border-gray-100 rounded-xl space-y-2">
                    <div className="flex justify-between">
                      <SkeletonBox className="h-6 w-6 rounded-lg" />
                      <SkeletonBox className="h-3 w-6" />
                    </div>
                    <SkeletonBox className="h-3 w-16" />
                    <SkeletonBox className="h-5 w-10" />
                    <SkeletonBox className="h-1 w-full rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Leave Overview */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-4">
              <SkeletonBox className="h-4 w-40" />

              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between">
                    <SkeletonBox className="h-3 w-24" />
                    <SkeletonBox className="h-3 w-20" />
                  </div>
                  <div className="flex justify-between">
                    <SkeletonBox className="h-2 w-16" />
                    <SkeletonBox className="h-2 w-16" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ================= ANNOUNCEMENTS ================= */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <SkeletonBox className="h-4 w-48 mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <SkeletonBox className="h-10 w-10 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <SkeletonBox className="h-3 w-32" />
                    <SkeletonBox className="h-2 w-24" />
                  </div>
                </div>
                <SkeletonBox className="h-3 w-full" />
                <SkeletonBox className="h-3 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= BOTTOM NAV ================= */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2 px-4">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-1">
              <SkeletonBox className="h-8 w-8 rounded-lg" />
              <SkeletonBox className="h-2 w-12" />
            </div>
          ))}
        </div>
      </nav>

      {/* ================= FOOTER ================= */}
      <footer className="pb-16 pt-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-xs">
            <SkeletonBox className="h-3 w-40" />
            <div className="flex gap-3">
              <SkeletonBox className="h-3 w-10" />
              <SkeletonBox className="h-3 w-16" />
              <SkeletonBox className="h-3 w-10" />
              <SkeletonBox className="h-3 w-20" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmployeeDashboardSkeleton;

