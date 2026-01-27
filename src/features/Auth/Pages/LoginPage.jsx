import React from "react";
import background from "../../../assets/background.png";
import theme from "../../../assets/theme1.png";

function Login() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center lg:pl-20 xl:pl-28">

        {/* LEFT SECTION — Illustration */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-6">
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            {["Time & Attendance", "Performance", "Reports"].map((item) => (
              <div
                key={item}
                className="px-4 py-2 bg-blue-100 text-black-600 rounded-full text-xs sm:text-sm font-semibold border border-blue-100 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>

          
<div className="w-full flex justify-center mb-3 sm:mb-5">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto scale-[0.85] sm:scale-100 md:scale-[1.05] lg:scale-[1.15] xl:scale-[1.2] transition-transform">
                <img
                  src={theme}
                  alt="Restaurant Illustration"
                  className="w-full h-auto object-contain drop-shadow-md"
                />
              </div>
            </div>


          {/* Text */}
          <div className="text-center max-w-md px-2">
            <h2 className="flex items-center justify-center gap-2 text-sm sm:text-lg md:text-2xl font-semibold text-gray-900 mb-2">
              Complete HR Management Solution
            </h2>
            <p className="text-[11px] sm:text-sm md:text-base text-gray-600 leading-relaxed">
              Manage hiring, onboarding, performance, and workforce analytics in one platform.
            </p>
          </div>
        </div>

        {/* RIGHT SECTION — Login Card */}
        <div className="w-full lg:w-1/2 flex justify-center items-center px-4 sm:px-6 py-6">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl px-6 sm:px-8 py-8 sm:py-10">

            {/* Header */}
            <div className="text-center mb-5 sm:mb-6">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Sign in to your{" "}
                <span className="text-blue-700">account</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Log in to access your dashboard.
              </p>
            </div>

            {/* Role Switch */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 sm:mb-6">
              <button className="py-2.5 sm:py-3 rounded-xl bg-orange-500 text-white font-semibold text-xs sm:text-sm shadow-md">
                Admin Login
              </button>
              <button className="py-2.5 sm:py-3 rounded-xl bg-gray-50 text-gray-700 font-semibold text-xs sm:text-sm border border-gray-200 hover:bg-gray-100">
                Staff Login
              </button>
            </div> */}

            {/* Email */}
            <div className="mb-4">
              <label className="text-[11px] sm:text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-500 focus:bg-white outline-none text-sm sm:text-base transition-all"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] sm:text-sm font-semibold text-gray-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[11px] sm:text-xs text-orange-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-500 focus:bg-white outline-none text-sm sm:text-base transition-all"
              />
            </div>

            {/* Login Button */}
            <button className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-blue-900 to-blue-600 text-white font-semibold text-sm sm:text-base shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all">
              Login
            </button>

            {/* Footer */}
            <p className="text-center text-gray-400 text-[10px] sm:text-xs mt-5">
              © 2026 Sucess Factor. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
