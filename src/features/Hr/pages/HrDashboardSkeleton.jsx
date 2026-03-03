const HRDashboardSkeleton = () => {
    return (
        <div className="animate-pulse">
            {/* Header */}
            <div className="mb-6">
                <div className="h-6 w-48 bg-slate-200 rounded mb-2"></div>
                <div className="h-4 w-72 bg-slate-100 rounded"></div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm">
                    <div className="h-4 w-40 bg-slate-200 rounded mb-4"></div>
                    <div className="h-48 bg-slate-100 rounded-xl"></div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="h-4 w-32 bg-slate-200 rounded mb-4"></div>
                    <div className="h-36 bg-slate-100 rounded-xl"></div>
                </div>
            </div>

            {/* Roster Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <div className="h-4 w-24 bg-slate-200 rounded mb-4"></div>
                    <div className="h-10 bg-slate-100 rounded-xl mb-3"></div>
                    <div className="h-10 bg-slate-100 rounded-xl"></div>
                </div>

                <div className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-16 bg-slate-100 rounded-xl"></div>
                        ))}
                    </div>

                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b">
                            <div className="h-4 w-32 bg-slate-200 rounded"></div>
                            <div className="h-4 w-24 bg-slate-200 rounded"></div>
                            <div className="h-4 w-20 bg-slate-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default HRDashboardSkeleton;
