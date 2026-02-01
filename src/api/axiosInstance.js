// function name(params) {
    
// }
// export const injectStore = name

// import axios from "axios";
// import { BASE_URL } from "../constants/baseUrl";
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default axiosInstance;


import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
