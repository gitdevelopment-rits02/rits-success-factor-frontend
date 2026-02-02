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
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Login failed" }
      );
    }
  }
);
