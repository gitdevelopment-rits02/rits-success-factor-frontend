import React, { useRef, useState } from "react";
import background from "../../../assets/background.png";
import theme from "../../../assets/theme1.png";

function OtpVerify() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

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

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
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

          <img
            src={theme}
            alt="Illustration"
            className="max-w-md mb-4"
          />

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
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all
                ${
                  isComplete
                    ? "bg-gradient-to-r from-blue-900 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              Verify & Continue
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
