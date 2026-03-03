export default function EmployeePayslipSkeleton() {
  return (
    <div className="min-h-screen p-6 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg flex justify-between">
          <div className="space-y-3">
            <div className="h-6 w-52 bg-slate-200 rounded"></div>
            <div className="h-4 w-40 bg-slate-200 rounded"></div>
            <div className="h-4 w-32 bg-slate-200 rounded"></div>
          </div>
          <div className="space-y-3 text-right">
            <div className="h-4 w-24 bg-slate-200 rounded ml-auto"></div>
            <div className="h-8 w-32 bg-slate-200 rounded ml-auto"></div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-md space-y-3">
              <div className="h-4 w-24 bg-slate-200 rounded"></div>
              <div className="h-6 w-32 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Salary Breakdown */}
        <div className="bg-white rounded-3xl p-6 shadow-lg space-y-6">
          <div className="h-5 w-40 bg-slate-200 rounded"></div>

          <div className="grid md:grid-cols-2 gap-8">
            {[1,2].map(i => (
              <div key={i} className="bg-slate-50 rounded-2xl p-4 space-y-3">
                <div className="h-4 w-24 bg-slate-200 rounded"></div>
                {[1,2,3,4].map(r => (
                  <div key={r} className="flex justify-between">
                    <div className="h-4 w-32 bg-slate-200 rounded"></div>
                    <div className="h-4 w-20 bg-slate-200 rounded"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-3xl p-6 shadow-lg space-y-4">
          <div className="h-5 w-40 bg-slate-200 rounded"></div>

          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex justify-between items-center bg-slate-50 rounded-xl p-4">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-slate-200 rounded"></div>
                <div className="h-3 w-20 bg-slate-200 rounded"></div>
              </div>
              <div className="h-4 w-24 bg-slate-200 rounded"></div>
              <div className="h-4 w-16 bg-slate-200 rounded"></div>
              <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
              <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
