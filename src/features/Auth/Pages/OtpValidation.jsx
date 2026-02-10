import React, { useRef, useState, useEffect } from "react";
import background from "../../../assets/background.png";
import theme from "../../../assets/theme1.png";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmailThunk, resendOtpThunk } from "../../../features/Auth/Redux/authThunk";
import { toast } from "react-toastify";


function OtpVerify() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;

    const newOtp = pasted.split("");
    setOtp(newOtp);

    newOtp.forEach((_, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = newOtp[i];
      }
    });

    inputRefs.current[Math.min(pasted.length, 5)].focus();
  };

  const isComplete = otp.every((digit) => digit !== "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [resendButtonDisabled, setResendButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
  const handleResendOtpTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    setResendButtonDisabled(true);
    setTimeLeft(120);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setResendButtonDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Session expired. Please register again.");
      navigate("/register");
      return;
    }

    try {
      handleResendOtpTimer();

      const result = await dispatch(resendOtpThunk({ email }));

      if (resendOtpThunk.fulfilled.match(result)) {
        toast.success("OTP resent successfully");
      } else {
        toast.error(result?.payload || "Failed to resend OTP");
      }
    } catch (err) {
      toast.error("Something went wrong while resending OTP");
    }
  };



  const email = location.state?.email;
  const handleVerify = async () => {
    if (!email) {
      toast.error("Session expired. Please register again.");
      navigate("/register");
      return;
    }

    if (!isComplete) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    try {
      await dispatch(
        verifyEmailThunk({
          email,
          otp: otp.join(""),
        })
      ).unwrap();

      // ✅ ONLY runs on real success
      toast.success("Email verified successfully");
      navigate("/login");

    } catch (err) {
      // ✅ ALWAYS runs on wrong OTP
      toast.error(err?.message || "Invalid OTP");
      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
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
                Rits<span className="text-blue-900">HrConnect</span>
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

        {/* LEFT SECTION */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-6">
          <div className="flex gap-3 mb-6">
            {["Time & Attendance", "Performance", "Reports"].map((item) => (
              <span
                key={item}
                className="px-4 py-2 bg-blue-100 text-sm font-semibold rounded-full"
              >
                {item}
              </span>
            ))}
          </div>

          {/* <img
            src={theme}
            alt="Illustration"
            className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-2xl mb-4"
          /> */}
          <div className="w-full flex justify-center mb-3 sm:mb-5">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto scale-[0.85] sm:scale-100 md:scale-[1.05] lg:scale-[1.15] xl:scale-[1.2] transition-transform">
              <img
                src={theme}
                alt="Illustration"
                className="w-full h-auto object-contain drop-shadow-md"
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Complete HR Management Solution
          </h2>
          <p className="text-sm text-gray-600 text-center mt-2 max-w-md">
            Manage hiring, onboarding, performance, and analytics in one platform.
          </p>
        </div>

        {/* RIGHT SECTION — OTP CARD */}
        <div className="w-full lg:w-1/2 flex justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl px-8 py-10">

            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Verify your email
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            {/* OTP INPUTS */}
            <div className="mb-6">
              <div
                className="flex justify-center gap-3"
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center text-xl border rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                ))}
              </div>
            </div>

            <button
              disabled={!isComplete}
              onClick={handleVerify}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all
              ${isComplete
                  ? "bg-gradient-to-r from-blue-900 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              Verify & Continue
            </button>
            <button
              type="button"
              disabled={resendButtonDisabled}
              onClick={handleResendOtp}
              className={`font-semibold ${resendButtonDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:underline"
                }`}
            >
              {resendButtonDisabled
                ? `Resend in ${formatTime(timeLeft)}`
                : "Resend OTP"}
            </button>




            <p className="text-center text-gray-400 text-xs mt-6">
              © 2026 Success Factor. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default OtpVerify;
