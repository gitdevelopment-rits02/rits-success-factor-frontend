
import React from "react";

function HrPolicyAndInsuranceSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6 animate-pulse">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="h-8 w-72 bg-slate-300 rounded mb-2"></div>
            <div className="h-4 w-56 bg-slate-200 rounded"></div>
          </div>

          <div className="h-10 w-48 bg-slate-300 rounded-lg"></div>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-6">
          <div className="h-12 w-full bg-slate-200 rounded-xl"></div>
        </div>

        {/* POLICY CARDS */}
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white p-5 rounded-2xl border shadow-sm flex justify-between"
            >
              <div className="flex gap-4 w-full">
                <div className="h-12 w-12 bg-slate-200 rounded-xl"></div>

                <div className="flex-1">
                  <div className="h-4 w-48 bg-slate-300 rounded mb-2"></div>
                  <div className="h-3 w-72 bg-slate-200 rounded"></div>
                </div>
              </div>

              <div className="h-6 w-6 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default HrPolicyAndInsuranceSkeleton;