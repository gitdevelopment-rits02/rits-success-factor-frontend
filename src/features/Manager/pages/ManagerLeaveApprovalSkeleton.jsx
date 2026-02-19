import React from "react";

const ManagerLeaveApprovalSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 animate-pulse">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="h-8 w-64 bg-slate-200 rounded"></div>
        <div className="h-8 w-32 bg-slate-200 rounded-full"></div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <div className="h-10 w-20 bg-slate-200 rounded-lg"></div>
        <div className="h-10 w-24 bg-slate-200 rounded-lg"></div>
        <div className="h-10 w-28 bg-slate-200 rounded-lg"></div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 shadow-sm flex justify-between items-center"
          >
            <div className="space-y-3">
              <div className="h-3 w-24 bg-slate-200 rounded"></div>
              <div className="h-8 w-16 bg-slate-300 rounded"></div>
            </div>
            <div className="h-12 w-12 bg-slate-200 rounded-xl"></div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <th key={i} className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((row) => (
                <tr key={row} className="border-t">
                  {[1, 2, 3, 4, 5, 6].map((col) => (
                    <td key={col} className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Today Panel */}
      <div className="bg-white rounded-xl p-6 shadow">
        <div className="h-6 w-48 bg-slate-200 rounded mb-4"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center border rounded-lg p-4"
            >
              <div className="space-y-2">
                <div className="h-4 w-32 bg-slate-200 rounded"></div>
                <div className="h-3 w-20 bg-slate-200 rounded"></div>
              </div>
              <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ManagerLeaveApprovalSkeleton;
