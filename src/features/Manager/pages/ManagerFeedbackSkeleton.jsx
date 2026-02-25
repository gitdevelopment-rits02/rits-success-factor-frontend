import React from "react";

const ManagerFeedbackSkeleton = () => {
  return (
    <div className="min-h-screen p-6 animate-pulse bg-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-10 w-72 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded"></div>
        </div>

        <div className="h-10 w-40 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-gray-100 rounded-xl p-5 shadow-sm"
          >
            <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-gray-100 rounded-2xl shadow p-6">

        {/* Table Header */}
        <div className="flex justify-between mb-6">
          <div className="h-6 w-40 bg-gray-200 rounded"></div>
          <div className="h-8 w-60 bg-gray-200 rounded-full"></div>
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4, 5].map((row) => (
          <div
            key={row}
            className="grid grid-cols-5 gap-4 mb-4"
          >
            <div className="h-6 bg-gray-200 rounded col-span-1"></div>
            <div className="h-6 bg-gray-200 rounded col-span-1"></div>
            <div className="h-6 bg-gray-200 rounded col-span-1"></div>
            <div className="h-6 bg-gray-200 rounded col-span-1"></div>
            <div className="h-6 bg-gray-200 rounded col-span-1"></div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ManagerFeedbackSkeleton;
