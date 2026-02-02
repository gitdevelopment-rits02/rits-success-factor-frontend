import React from "react";
import background from "../../../assets/background.png";
import theme from "../../../assets/theme1.png";
import { useNavigate } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../../features/Auth/Redux/authThunk";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.(?:com|in|org|net|co\.in|io|gov\.in|edu|co|dev|xyz|info|biz)$/i;

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const { registerLoading, registerError } = useSelector(
    (state) => state.auth.main
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Mobile number must be 10 digits";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Min 8 chars, include letter, number & special character";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const passwordsMismatch =
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;
  const [passwordError, setPasswordError] = useState("");


  const handleRegister = async () => {
    const isValid = validate();
    if (!isValid) return;

    const payload = {
      name: formData.name,
      username: formData.username,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      role: "superadmin",
    };

    const result = await dispatch(registerThunk(payload));

    if (registerThunk.fulfilled.match(result)) {
      navigate("/verify-email", {
        state: { email: formData.email },
      });
    }
  };



  return (

    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >



      <div className="w-full backdrop-blur-md bg-red/60 border-b border-blue/70">
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
            Already using HRConnect?{" "}
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
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-6">
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
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto">
              {/* <img
                src={theme}
                alt="Illustration"
                className="w-full h-auto object-contain drop-shadow-md"
              /> */}
              <div className="w-full flex justify-center mb-3 sm:mb-5">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto scale-[0.85] sm:scale-100 md:scale-[1.05] lg:scale-[1.15] xl:scale-[1.2] transition-transform">
                  <img
                    src={theme}
                    alt="Restaurant Management Illustration"
                    className="w-full h-auto object-contain drop-shadow-md"
                  />
                </div>
              </div>
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
          <div className="w-full max-w-md lg:max-w-lg bg-white rounded-3xl shadow-xl px-6 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-8">


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
              <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">Name</label>

              <input
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 
                    text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                    focus:border-blue-500 transition-all placeholder:text-gray-300"
              />

              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">Username</label>

              <input
                placeholder="john"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 
                    text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                    focus:border-blue-500 transition-all placeholder:text-gray-300"
              />

              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username}
                </p>
              )}
            </div>


            <div className="mb-4">
              <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">Phone</label>

              <input
                type="tel"
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value.replace(/\D/g, "")
                  })
                }
                maxLength={10}
                className="w-full border border-gray-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 
                    text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                    focus:border-blue-500 transition-all placeholder:text-gray-300"
              />

              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">Email</label>

              <input
                type="email"
                placeholder="john@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border border-gray-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 
                    text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                    focus:border-blue-500 transition-all placeholder:text-gray-300"
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>


            {/* Password */}
            <div className="mb-4">
              <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                Enter Password
              </label>

              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 
                    text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                    focus:border-blue-500 transition-all placeholder:text-gray-300"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>





            <div className="mb-4">
              <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1">
                Confirm Password
              </label>

              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 
                    text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                    focus:border-blue-500 transition-all placeholder:text-gray-300"
                />

                <span
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>







            {/* Login Button */}
            <button
              onClick={handleRegister}
              disabled={registerLoading}
              className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-blue-900 to-blue-600 text-white font-semibold text-sm sm:text-base shadow-lg"
            >
              {registerLoading ? "Creating..." : "Create Account"}
            </button>
            {registerError && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {registerError}
              </p>
            )}


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
