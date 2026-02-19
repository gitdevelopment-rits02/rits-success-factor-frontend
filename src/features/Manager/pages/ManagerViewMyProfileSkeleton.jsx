import React from "react";

const shimmerStyle = {
  background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%)",
  backgroundSize: "1000px 100%",
  animation: "shimmer 1.8s infinite linear",
};

export default function ManagerViewProfileSkeleton() {
  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
        `}
      </style>

      <div className="min-h-screen p-6 bg-gray-50">
        {/*  HEADER  */}
        <div className="bg-white rounded-3xl shadow-sm p-6 flex gap-8 items-center">
          <div className="w-36 h-36 rounded-2xl" style={shimmerStyle} />

          <div className="flex-1 space-y-4">
            <div className="h-8 w-1/3 rounded" style={shimmerStyle} />
            <div className="h-4 w-1/4 rounded" style={shimmerStyle} />
            <div className="h-4 w-1/2 rounded" style={shimmerStyle} />
          </div>
        </div>

        {/*  GRID  */}
        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* LEFT SECTION */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Professional Matrix */}
            <CardSkeleton>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array(4)
                  .fill()
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-20 rounded-xl"
                      style={shimmerStyle}
                    />
                  ))}
              </div>
            </CardSkeleton>

            {/* Qualifications */}
            <CardSkeleton>
              <div className="space-y-6">
                {Array(3)
                  .fill()
                  .map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={shimmerStyle}
                      />
                      <div className="flex-1 space-y-2">
                        <div
                          className="h-4 w-1/3 rounded"
                          style={shimmerStyle}
                        />
                        <div
                          className="h-3 w-1/2 rounded"
                          style={shimmerStyle}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </CardSkeleton>

            {/* Experience */}
            <CardSkeleton>
              <div className="space-y-6">
                {Array(2)
                  .fill()
                  .map((_, i) => (
                    <div key={i} className="space-y-3">
                      <div className="h-4 w-1/3 rounded" style={shimmerStyle} />
                      <div className="h-3 w-1/2 rounded" style={shimmerStyle} />
                      <div className="h-16 rounded-xl" style={shimmerStyle} />
                    </div>
                  ))}
              </div>
            </CardSkeleton>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <CardSkeleton>
              {Array(4)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-10 mb-4 rounded"
                    style={shimmerStyle}
                  />
                ))}
            </CardSkeleton>

            <CardSkeleton>
              {Array(3)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-16 mb-4 rounded-xl"
                    style={shimmerStyle}
                  />
                ))}
            </CardSkeleton>

            <CardSkeleton>
              {Array(2)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-14 mb-4 rounded-xl"
                    style={shimmerStyle}
                  />
                ))}
            </CardSkeleton>
          </div>
        </div>
      </div>
    </>
  );
}

/* REUSABLE CARD SKELETON */
function CardSkeleton({ children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="h-4 w-1/4 mb-6 rounded bg-gray-200" />
      {children}
    </div>
  );
}
