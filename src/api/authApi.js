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
  return axiosInstance.post("/api/auth/register", payload);
};

authApi.verifyEmail = (payload) => {
  return axiosInstance.post("/api/auth/verify-email", payload);
};

authApi.resendOtp = (payload) => {
  return axiosInstance.post("/api/auth/resend-otp", payload);
};

authApi.login = (payload) => {
  return axiosInstance.post("/api/auth/login", payload);
};




export default authApi;
