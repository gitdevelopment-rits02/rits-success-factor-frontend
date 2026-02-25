import React from "react";

const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-300 animate-pulse rounded ${className}`}></div>
);

const ManagerTaskAssignmentSkeleton = () => {
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex justify-between">
          <div className="flex gap-4 items-center">
            <SkeletonBox className="w-14 h-14" />
            <div className="space-y-2">
              <SkeletonBox className="w-40 h-5" />
              <SkeletonBox className="w-28 h-4" />
            </div>
          </div>
          <SkeletonBox className="w-24 h-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Team list */}
          <div className="bg-white p-5 rounded-lg space-y-4 shadow-sm">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-center gap-3">
                <SkeletonBox className="w-10 h-10" />
                <div className="space-y-2 flex-1">
                  <SkeletonBox className="w-32 h-4" />
                  <SkeletonBox className="w-24 h-3" />
                </div>
              </div>
            ))}
          </div>

          {/* Main section */}
          <div className="lg:col-span-3 space-y-6">

            {/* Task form */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <SkeletonBox className="w-32 h-5" />
              <SkeletonBox className="w-48 h-4" />

              <div className="flex gap-3">
                <SkeletonBox className="flex-1 h-10" />
                <SkeletonBox className="w-28 h-10" />
                <SkeletonBox className="w-24 h-10" />
              </div>
            </div>

            {/* Current tasks */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <SkeletonBox className="w-40 h-5" />

              {[1,2,3].map(i => (
                <div key={i} className="border rounded-lg p-4 space-y-3">
                  <SkeletonBox className="w-64 h-4" />
                  <SkeletonBox className="w-20 h-3" />
                </div>
              ))}
            </div>

            {/* History */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <SkeletonBox className="w-32 h-5" />

              {[1,2].map(i => (
                <div key={i} className="border rounded-lg p-4 space-y-2">
                  <SkeletonBox className="w-56 h-4" />
                  <SkeletonBox className="w-24 h-3" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerTaskAssignmentSkeleton;
 