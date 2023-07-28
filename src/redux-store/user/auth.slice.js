import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendPasswordRecoveryEmail, updateUserPassword, useEmailAndPassowrdLogin } from "api/requests";

const initialState = {
  isRecoveryLoading: false,
  isPassUpdateLoading: false,
  isLoginLoading: false,
};

export const loginUser = createAsyncThunk(
  "auth/loginWithEmailAndPassowrd",
  useEmailAndPassowrdLogin
);

export const sendRecoveryEmail = createAsyncThunk(
  "auth/sendRecoveryEmail",
  sendPasswordRecoveryEmail
);

export const sendPasswordUpdate = createAsyncThunk(
  "auth/passwordupdate",
  updateUserPassword
);

export const userAuthReducer = createSlice({
  name: "auth/makeAuthrequests",
  initialState,
  extraReducers: {
    //login the user
    [loginUser.pending]: (state) => {
      state.isLoginLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoginLoading = false;
    },
    [loginUser.rejected]: (state) => {
      state.isLoginLoading = false;
    },
    //send auth code
    [sendRecoveryEmail.pending]: (state) => {
      state.isRecoveryLoading = true;
    },
    [sendRecoveryEmail.fulfilled]: (state, { payload }) => {
      state.isRecoveryLoading = false;
    },
    [sendRecoveryEmail.rejected]: (state) => {
      state.isRecoveryLoading = false;
    },
    //send password update
    [sendPasswordUpdate.pending]: (state) => {
      state.isPassUpdateLoading = true;
    },
    [sendPasswordUpdate.fulfilled]: (state, { payload }) => {
      state.isPassUpdateLoading = false;
    },
    [sendPasswordUpdate.rejected]: (state) => {
      state.isPassUpdateLoading = false;
    },
  },
});

export default userAuthReducer.reducer;
