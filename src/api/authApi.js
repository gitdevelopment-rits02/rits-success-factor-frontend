// import axiosInstance from "./axiosInstance";

// const authApi = {
//   // placeholder – add real APIs later
// };

// export default authApi;

// import axiosInstance from "./axiosInstance";


// import axiosInstance from "./axiosInstance";

// const authApi = {};

// authApi.register = (payload) => {
//   return axiosInstance.post("/api/auth/register", payload);
// };

// export default authApi;


import axiosInstance from "./axiosInstance";

const authApi = {};

authApi.register = (payload) => {
  return axiosInstance.post("/auth/register", payload);
};

authApi.verifyEmail = (payload) => {
  return axiosInstance.post("/auth/verify-email", payload);
};

authApi.resendOtp = (payload) => {
  return axiosInstance.post("/auth/resend-otp", payload);
};

authApi.login = (payload) => {
  return axiosInstance.post("/auth/login", payload);
};

authApi.forgotPassword = (payload) => {
  return axiosInstance.post("/auth/forgot-password-otp", payload);
};

authApi.verifyForgotPasswordOtp = (payload) => {
  return axiosInstance.post("/auth/forgot-password-otp-verify", payload);
};

authApi.resetPassword = (payload) => {
  return axiosInstance.post("/auth/reset-password", payload);
};


export default authApi;
 