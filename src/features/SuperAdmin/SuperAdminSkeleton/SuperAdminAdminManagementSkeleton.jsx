import React, { useEffect, useState } from "react";

const DummySkeleton = () => {
  const [show, setShow] = useState(true);

  //  Show skeleton only for 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="animate-pulse p-6 space-y-6">
      
      {/* ===== Stats Skeleton ===== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border bg-white p-6 shadow"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-slate-200"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-slate-200 rounded"></div>
                <div className="h-6 w-16 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Search Bar Skeleton ===== */}
      <div className="h-12 w-full rounded-xl bg-slate-200"></div>

      {/* ===== Table Skeleton ===== */}
      <div className="rounded-2xl border bg-white p-6 shadow space-y-4">
        
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-slate-200 rounded"></div>
          ))}
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="grid grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-slate-100 rounded"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DummySkeleton;