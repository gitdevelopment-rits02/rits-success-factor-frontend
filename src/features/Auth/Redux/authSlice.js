import { createSlice } from "@reduxjs/toolkit";
import { registerThunk, verifyEmailThunk, resendOtpThunk, loginThunk ,forgotPasswordThunk,  verifyForgotPasswordOtpThunk,  resetPasswordThunk  
} from "./authThunk";

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

//forgot password
forgotLoading: false,
forgotSuccess: false,
forgotError: null,
forgotMessage: null,

//forgot password otp
verifyForgotOtpLoading: false,
verifyForgotOtpError: null,
verifyForgotOtpSuccess: false,
//reset
resetLoading: false,
resetError: null,
resetSuccess: false,



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

  const token =
    action.payload?.token ||
    action.payload?.data?.token ||
    action.payload?.accessToken;

  if (token) {
    localStorage.setItem("token", token);
  }
})
      .addCase(loginThunk.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload?.message;
      })

      //forgot-password
.addCase(forgotPasswordThunk.pending, (state) => {
  state.forgotLoading = true;
  state.forgotError = null;
  state.forgotSuccess = false;  
  state.forgotMessage = null;    
})


.addCase(verifyForgotPasswordOtpThunk.fulfilled, (state, action) => {
  state.verifyForgotOtpLoading = false;
  state.verifyForgotOtpSuccess = true;

  const resetToken =
    action.payload?.tempToken ||
    action.payload?.token ||
    action.payload?.data?.token;

  if (resetToken) {
    localStorage.setItem("resetToken", resetToken);
  }
})



.addCase(forgotPasswordThunk.rejected, (state, action) => {
  state.forgotLoading = false;
  state.forgotError = action.payload?.message || "Forgot password failed";
})

.addCase(verifyForgotPasswordOtpThunk.pending, (state) => {
  state.verifyForgotOtpLoading = true;
  state.verifyForgotOtpError = null;
  state.verifyForgotOtpSuccess = false;
})

.addCase(verifyForgotPasswordOtpThunk.rejected, (state, action) => {
  state.verifyForgotOtpLoading = false;
  state.verifyForgotOtpError =
    action.payload?.message || "Invalid OTP";
})

//resetpassword
.addCase(resetPasswordThunk.pending, (state) => {
  state.resetLoading = true;
  state.resetError = null;
  state.resetSuccess = false;
})
.addCase(resetPasswordThunk.fulfilled, (state) => {
  state.resetLoading = false;
  state.resetSuccess = true;
  localStorage.removeItem("resetToken");
})

.addCase(resetPasswordThunk.rejected, (state, action) => {
  state.resetLoading = false;
  state.resetError = action.payload?.message || "Reset failed";
});


  },
});

export default authSlice.reducer;

 