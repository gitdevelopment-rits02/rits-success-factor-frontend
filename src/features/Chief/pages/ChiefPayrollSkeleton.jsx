export function SkeletonBox({ className = "" }) {
  return (
    <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
  );
}

export function HeaderSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="space-y-3 w-full">
        <SkeletonBox className="h-6 w-48" />
        <SkeletonBox className="h-4 w-40" />
        <SkeletonBox className="h-4 w-32" />
      </div>

      <div className="text-right space-y-3">
        <SkeletonBox className="h-4 w-24" />
        <SkeletonBox className="h-6 w-32" />
      </div>
    </div>
  );
}

export function KPISkeleton() {
  return (
    <div className="rounded-2xl p-5 shadow-md bg-white space-y-3 animate-pulse">
      <div className="h-4 w-24 bg-slate-200 rounded"></div>
      <div className="h-6 w-32 bg-slate-200 rounded"></div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-3">
      {[1,2,3,4].map((i)=>(
        <div key={i} className="grid grid-cols-5 gap-4 bg-slate-50 p-3 rounded-xl animate-pulse">
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}