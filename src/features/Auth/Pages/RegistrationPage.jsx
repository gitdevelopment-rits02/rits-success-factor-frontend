import React from "react";
import background from "../../../assets/background.png";
import theme from "../../../assets/theme1.png";
import { useNavigate } from "react-router-dom";
function Register() {
   const navigate = useNavigate();
  return (
    
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >

      {/* TOP NAVBAR */}
{/* <div className="w-full bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    
   
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center text-white font-bold text-lg">
        R
      </div>
      <div>
        <p className="text-lg font-bold text-gray-900">
          Rits<span className="text-blue-900">SucessFactor</span>
        </p>
        <p className="text-xs text-gray-500"></p>
      </div>
    </div> */}

    {/* Right Action */}
    {/* <div className="text-sm text-gray-600">
      New here?{" "}
      <span className="text-blue-500 font-medium cursor-pointer">
        Already using RestroManage
      </span>
    </div>

  </div>
</div> */}

<div className="w-full backdrop-blur-md bg-white/60 border-b border-white/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT: Logo + Brand */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">R</span>
          </div>

          <div>
            <p className="text-lg font-bold text-gray-900">
              Rits<span className="text-blue-900">RestaurantSuite</span>
            </p>
            <p className="text-xs text-gray-500">Enterprise Solution</p>
          </div>
        </div>

        {/* RIGHT: Sign in */}

        <div className="text-sm text-gray-600">
          Already using RestroManage?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-900 font-medium cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </div>

      </div>
    </div>

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
                alt="Illustration"
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
        <div className="w-full lg:w-1/2 flex justify-center items-start px-4 sm:px-6 py-6">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl px-6 sm:px-8 py-8 sm:py-10">

            {/* Header */}
            {/* <div className="text-center mb-5 sm:mb-6">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Create your{" "}
                <span className="text-blue-700">account</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Log in to access your dashboard.
              </p>
            </div> */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Create your <span className="text-blue-900">account</span>
              </h1>
              {/* <p className="text-sm text-gray-500 mt-1">
                Already have an account?{" "}
                <span className="text-blue-900 cursor-pointer">Sign in</span>
              </p> */}
            </div>
                <div className="mb-4">
  <label className="text-sm font-medium text-gray-700">Name</label>
  <input
    placeholder="John Doe"
    className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200/70 bg-white focus:ring-1 focus:ring-blue-900 outline-none"
  />
</div>

<div className="mb-4">
  <label className="text-sm font-medium text-gray-700">Username</label>
  <input
    placeholder="john"
    className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-orange-400 outline-none"
  />
</div>

<div className="mb-4">
  <label className="text-sm font-medium text-gray-700">Phone Number</label>
  <input
    placeholder="+91 98765 43210"
    className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-orange-400 outline-none"
  />
</div>


            
            
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="john@email.com"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
  <label className="text-sm font-medium text-gray-700">
    Enter Password
  </label>
  <input
    type="password"
    placeholder="Enter your password"
    className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-orange-400 outline-none"
  />
</div>

<div className="mb-6">
  <label className="text-sm font-medium text-gray-700">
    Confirm Password
  </label>
  <input
    type="password"
    placeholder="Re-enter your password"
    className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-orange-400 outline-none"
  />
</div>


            {/* Login Button */}
            <button className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-blue-900 to-blue-600 text-white font-semibold text-sm sm:text-base shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all">
              Create Account
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

export default Register;

