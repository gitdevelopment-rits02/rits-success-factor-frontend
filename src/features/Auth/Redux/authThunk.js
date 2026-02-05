import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../../api/authApi";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.register(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Registration failed" }
      );
    }
  }
);


export const verifyEmailThunk = createAsyncThunk(
  "auth/verify-email",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.verifyEmail(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Email verification failed" }
      );
    }
  }
);


export const resendOtpThunk = createAsyncThunk(
  "auth/resendOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.resendOtp(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Resend OTP failed" }
      );
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.login(payload);

      console.log("LOGIN RESPONSE:", res.data);   

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);




export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgot-password",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.forgotPassword(payload);
      return res.data;   
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Forgot password failed" }
      );
    }
  }
);



export const verifyForgotPasswordOtpThunk = createAsyncThunk(
  "auth/verify-forgot-password-otp",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.verifyForgotPasswordOtp(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "OTP verification failed" }
      );
    }
  }
);



export const resetPasswordThunk = createAsyncThunk(
  "auth/reset-password",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.resetPassword(payload);
      return res.data;   // expect { message: "Password reset successful" }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Password reset failed" }
      );
    }
  }
);
 