import { createSlice } from "@reduxjs/toolkit";
import { registerThunk, verifyEmailThunk, resendOtpThunk, loginThunk } from "./authThunk";

const initialState = {
  // register
  registerLoading: false,
  registerError: null,
  registerData: null,

  // verify email
  verifyEmailLoading: false,
  verifyEmailError: null,
  verifyEmailData: null,

  // login 
  loginLoading: false,
  loginError: null,
  loginData: null,

  //resend otp
  resendOtpLoading: false,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //register
      .addCase(registerThunk.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerData = action.payload;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload?.message;
      })

      //verify-otp
      .addCase(verifyEmailThunk.pending, (state) => {
        state.verifyEmailLoading = true;
        state.verifyEmailError = null;
      })
      .addCase(verifyEmailThunk.fulfilled, (state, action) => {
        state.verifyEmailLoading = false;
        state.verifyEmailData = action.payload;
      })
      .addCase(verifyEmailThunk.rejected, (state, action) => {
        state.verifyEmailLoading = false;
        state.verifyEmailError = action.payload?.message;
      })

      //Resend otp
      .addCase(resendOtpThunk.pending, (state) => {
        state.resendOtpLoading = true;
      })
      .addCase(resendOtpThunk.fulfilled, (state) => {
        state.resendOtpLoading = false;
      })
      .addCase(resendOtpThunk.rejected, (state) => {
        state.resendOtpLoading = false;
      })

      // login
      .addCase(loginThunk.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginData = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload?.message;
      });

  },
});

export default authSlice.reducer;
