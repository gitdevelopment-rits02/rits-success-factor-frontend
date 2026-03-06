import React from "react";

const PageLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium animate-pulse">Loading RitsHRConnect...</p>
            </div>
        </div>
    );
};

export default PageLoader;
