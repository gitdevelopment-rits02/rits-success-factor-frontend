import React, { useRef, useState } from "react";
import background from "../../../assets/background.png";
import theme from "../../../assets/theme1.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyForgotPasswordOtpThunk } from "../../../features/Auth/Redux/authThunk";

function ForgotPasswordOtp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  /* ---------------- OTP INPUT HANDLERS ---------------- */
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
const dispatch = useDispatch();
const { verifyForgotOtpLoading, verifyForgotOtpError } = useSelector(
  (state) => state.auth
);

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

    newOtp.forEach((val, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = val;
      }
    });

    inputRefs.current[Math.min(pasted.length, 5)].focus();
  };

  const isComplete = otp.every((d) => d !== "");

  /* ---------------- VERIFY OTP (FRONTEND ONLY) ---------------- */
const handleVerify = async () => {
  if (!email) {
    alert("Session expired. Please try again.");
    navigate("/reset-password");
    return;
  }

  const payload = {
    email: email,
    otp: otp.join(""),
  };

  const result = await dispatch(verifyForgotPasswordOtpThunk(payload));

  if (verifyForgotPasswordOtpThunk.fulfilled.match(result)) {
    navigate("/reset-password", { state: { email } });
  }
};


  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center">

        {/* LEFT SECTION */}
        <div className="w-full lg:w-1/2 flex flex-col items-center px-6">
          <img src={theme} alt="illustration" className="max-w-md mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Secure Password Recovery
          </h2>
          <p className="text-sm text-gray-600 text-center mt-2 max-w-md">
            Enter the 6-digit code sent to your registered email.
          </p>
        </div>

        {/* RIGHT OTP CARD */}
        <div className="w-full lg:w-1/2 flex justify-center px-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-xl px-8 py-10">

            <h1 className="text-2xl font-bold text-center mb-2">
              Verify OTP
            </h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              OTP sent to <span className="font-medium">{email}</span>
            </p>

            {/* OTP INPUTS */}
            <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-xl border rounded-lg
                  focus:ring-2 focus:ring-blue-600 outline-none"
                />
              ))}
            </div>
{verifyForgotOtpError && (
  <p className="text-red-600 text-sm text-center mb-3">
    {verifyForgotOtpError}
  </p>
)}

            <button
              disabled={!isComplete}
              onClick={handleVerify}
              className={`w-full py-3 rounded-xl font-semibold text-white
              ${isComplete
                  ? "bg-blue-700 hover:bg-blue-800"
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

export default ForgotPasswordOtp;
 