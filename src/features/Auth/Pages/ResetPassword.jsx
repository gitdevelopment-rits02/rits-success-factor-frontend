import React, { useState } from "react";
import background from "../../../assets/background.png";
import theme from "../../../assets/theme1.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordThunk } from "../../../features/Auth/Redux/authThunk";


const EyeOpen = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosed = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" />
    <path d="M9.9 9.9a3 3 0 104.2 4.2" />
  </svg>
);

function Reset() {
const navigate = useNavigate();
const dispatch = useDispatch();
const location = useLocation();

const email = location.state?.email;  

const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const { resetLoading, resetError } = useSelector((state) => state.auth);

const handleResetPassword = async () => {
  if (!email) {
    navigate("/login");
    return;
  }

  if (!password || !confirmPassword) {
    alert("Both fields are required");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const result = await dispatch(
    resetPasswordThunk({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    })
  );

  if (resetPasswordThunk.fulfilled.match(result)) {
    navigate("/login");
  }
};



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
                Reset your {" "}
                <span className="text-blue-700">password</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Choose a strong password that you haven't used before.
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
                Password
              </label>
  <div className="relative mt-2">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter New Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-500 focus:bg-white outline-none text-sm sm:text-base transition-all"
  />

{password && (
  <button
    type="button"
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeClosed size={18} /> : <EyeOpen size={18} />}
  </button>
)}


</div>

            </div>

            {/* Password */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] sm:text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>

              </div>
    <div className="relative">
  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Re-Enter New Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-orange-400 focus:border-orange-500 focus:bg-white outline-none text-sm sm:text-base transition-all"
  />

  {confirmPassword && (
  <button
    type="button"
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    {showConfirmPassword ? <EyeClosed size={18} /> : <EyeOpen size={18} />}
  </button>
)}


</div>


            </div>
{resetError && (
  <p className="text-red-600 text-sm text-center mb-3">
    {resetError}
  </p>
)}

            {/* Login Button */}
            <button
  onClick={handleResetPassword}
  disabled={resetLoading}
  className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-blue-900 to-blue-600 text-white font-semibold text-sm sm:text-base shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all"
>
  {resetLoading ? "Resetting..." : "Reset Password"}
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

export default Reset;